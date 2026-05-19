import './androidBridge.types'

export function saveTextFileToDevice(fileName: string, content: string): string {
  const bridge = window.BackSquadAndroid
  if (!bridge?.saveTextFile) {
    throw new Error('ייצוא לקובץ זמין רק באפליקציה במכשיר')
  }
  try {
    const savedName = bridge.saveTextFile(fileName, content)
    if (typeof savedName !== 'string' || savedName.trim().length === 0) {
      throw new Error('שמירת הקובץ נכשלה')
    }
    return savedName.trim()
  } catch (e) {
    if (e instanceof Error && e.message.length > 0) {
      throw e
    }
    throw new Error('שמירת הקובץ נכשלה')
  }
}
