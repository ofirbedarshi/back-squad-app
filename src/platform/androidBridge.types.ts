export interface BackSquadAndroidBridge {
  saveTextFile(fileName: string, content: string): string
}

declare global {
  interface Window {
    BackSquadAndroid?: BackSquadAndroidBridge
  }
}

export {}
