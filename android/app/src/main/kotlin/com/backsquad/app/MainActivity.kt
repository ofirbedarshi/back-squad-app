package com.backsquad.app

import android.Manifest
import android.content.Intent
import android.content.ActivityNotFoundException
import android.content.pm.PackageManager
import android.annotation.SuppressLint
import android.content.ContentValues
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler
import java.io.File

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var pendingPermissionRequest: PermissionRequest? = null

    companion object {
        private const val REQUEST_AUDIO_PERMISSION = 1001
        private const val TAG = "MainActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setupEdgeToEdge()

        webView = WebView(this).also { wv ->
            configureWebView(wv)
            setContentView(wv)
        }

        webView.loadUrl("https://appassets.androidplatform.net/assets/www/index.html")
    }

    private fun setupEdgeToEdge() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun configureWebView(wv: WebView) {
        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", AssetsPathHandler(this))
            .build()

        wv.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest) {
                // If the Android runtime permission is already granted, pass it straight through.
                // Otherwise ask the OS first, then grant or deny once the user responds.
                if (ContextCompat.checkSelfPermission(
                        this@MainActivity,
                        Manifest.permission.RECORD_AUDIO
                    ) == PackageManager.PERMISSION_GRANTED
                ) {
                    request.grant(request.resources)
                } else {
                    pendingPermissionRequest = request
                    ActivityCompat.requestPermissions(
                        this@MainActivity,
                        arrayOf(Manifest.permission.RECORD_AUDIO),
                        REQUEST_AUDIO_PERMISSION
                    )
                }
            }
        }

        wv.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest,
            ): WebResourceResponse? {
                return assetLoader.shouldInterceptRequest(request.url)
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest,
            ): Boolean {
                // Keep in-app navigation inside the local asset origin.
                val host = request.url.host ?: return true
                if (host == "appassets.androidplatform.net") {
                    return false
                }

                // Open external links (e.g. WhatsApp deep links) outside the WebView.
                return try {
                    startActivity(Intent(Intent.ACTION_VIEW, request.url))
                    true
                } catch (_: ActivityNotFoundException) {
                    true
                }
            }
        }

        wv.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            loadWithOverviewMode = true
            useWideViewPort = true
        }

        wv.addJavascriptInterface(WebAppBridge(this), "BackSquadAndroid")

        // Consume native WebView long-click so Chromium does not start text-selection ActionMode.
        // JS still receives touch events; app long-press timers keep working.
        wv.setOnLongClickListener { true }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray,
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_AUDIO_PERMISSION) {
            val pending = pendingPermissionRequest
            pendingPermissionRequest = null
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                pending?.grant(pending.resources)
            } else {
                pending?.deny()
            }
        }
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    internal fun saveTextFileToDownloads(fileName: String, content: String): String {
        val safeName = sanitizeExportFileName(fileName)
        val bytes = content.toByteArray(Charsets.UTF_8)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val values = ContentValues().apply {
                put(MediaStore.MediaColumns.DISPLAY_NAME, safeName)
                put(MediaStore.MediaColumns.MIME_TYPE, "text/csv")
                put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
            }
            val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                ?: throw IllegalStateException("MediaStore insert failed")
            contentResolver.openOutputStream(uri)?.use { stream ->
                stream.write(bytes)
            } ?: throw IllegalStateException("MediaStore openOutputStream failed")
        } else {
            @Suppress("DEPRECATION")
            val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
            if (!downloadsDir.exists() && !downloadsDir.mkdirs()) {
                throw IllegalStateException("Downloads directory unavailable")
            }
            File(downloadsDir, safeName).writeBytes(bytes)
        }
        return safeName
    }

    private fun sanitizeExportFileName(fileName: String): String {
        val base = fileName.substringAfterLast('/').substringAfterLast('\\')
        if (base.contains("..")) {
            throw IllegalArgumentException("Invalid file name")
        }
        val stem = base.removeSuffix(".csv").removeSuffix(".CSV")
        val safe = buildString {
            for (ch in stem) {
                if (ch in 'a'..'z' || ch in 'A'..'Z' || ch in '0'..'9' || ch == '.' || ch == '_' || ch == '-') {
                    append(ch)
                }
            }
        }
        val finalStem = safe.ifEmpty { "notes-export" }
        return "$finalStem.csv"
    }

    private class WebAppBridge(private val activity: MainActivity) {
        @JavascriptInterface
        fun saveTextFile(fileName: String, content: String): String {
            return try {
                activity.saveTextFileToDownloads(fileName, content)
            } catch (e: Exception) {
                Log.e(TAG, "saveTextFile failed", e)
                ""
            }
        }
    }
}
