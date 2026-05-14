/** Clears browser/WebView DOM selection (handles OS copy/select-all chrome). */
export function clearDomTextSelection(): void {
  try {
    window.getSelection()?.removeAllRanges()
  } catch {
    /* WebView may throw on unusual ranges */
  }
}
