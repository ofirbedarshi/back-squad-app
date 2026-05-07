import { useMemo, useState } from 'react'
import type { CommentsByBullet, DocSection } from '../components/base/docFeedback.types'

function stripFrontMatter(markdown: string) {
  if (!markdown.startsWith('---')) {
    return markdown
  }

  const endOfFrontMatter = markdown.indexOf('\n---', 3)
  if (endOfFrontMatter === -1) {
    return markdown
  }

  return markdown.slice(endOfFrontMatter + 4).trim()
}

function parseDocSections(markdown: string): DocSection[] {
  const content = stripFrontMatter(markdown)

  return content
    .split('\n## ')
    .slice(1)
    .map((rawSection, index) => {
      const lines = rawSection.split('\n').map((line) => line.trim())
      const title = lines[0] ?? `קטע ${index + 1}`
      const bodyLines = lines.slice(1).filter(Boolean)

      return {
        id: `${index}-${title}`,
        title,
        bodyLines,
      }
    })
}

function toPlainText(line: string) {
  return line.replace(/\*\*(.*?)\*\*/g, '$1')
}

export function useDocFeedback(markdown: string) {
  const [isOpen, setIsOpen] = useState(false)
  const [generalNote, setGeneralNote] = useState('')
  const [commentsByBullet, setCommentsByBullet] = useState<CommentsByBullet>({})
  const [visibleInputsByBullet, setVisibleInputsByBullet] = useState<Record<string, boolean>>({})
  const sections = useMemo(() => parseDocSections(markdown), [markdown])
  const hasBulletComment = Object.values(commentsByBullet).some((comment) => comment.trim().length > 0)
  const hasComment = hasBulletComment || generalNote.trim().length > 0

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function toggleBulletCommentInput(bulletId: string) {
    setVisibleInputsByBullet((current) => ({
      ...current,
      [bulletId]: !current[bulletId],
    }))
  }

  function handleBulletCommentChange(bulletId: string, value: string) {
    setCommentsByBullet((current) => ({
      ...current,
      [bulletId]: value,
    }))
  }

  function buildWhatsAppShareUrl(shareTitle: string) {
    const bulletComments = sections.flatMap((section) =>
      section.bodyLines
        .map((line, lineIndex) => {
          if (!line.startsWith('- ')) {
            return null
          }

          const bulletId = `${section.id}-${lineIndex}`
          const comment = commentsByBullet[bulletId]?.trim()
          if (!comment) {
            return null
          }

          const bulletText = toPlainText(line.slice(2))
          return `*${section.title}*\n• ${bulletText}\nהערה: ${comment}`
        })
        .filter(Boolean),
    )

    const cleanGeneralNote = generalNote.trim()
    const feedbackParts = [...bulletComments]

    if (cleanGeneralNote) {
      feedbackParts.push(`*הערות כלליות*\n${cleanGeneralNote}`)
    }

    if (feedbackParts.length === 0) {
      return null
    }

    const shareText = `הערות למסמך: ${shareTitle}\n\n${feedbackParts.join('\n\n')}`
    return `https://wa.me/?text=${encodeURIComponent(shareText)}`
  }

  return {
    isOpen,
    sections,
    hasComment,
    open,
    close,
    toPlainText,
    generalNote,
    setGeneralNote,
    commentsByBullet,
    visibleInputsByBullet,
    toggleBulletCommentInput,
    handleBulletCommentChange,
    buildWhatsAppShareUrl,
  }
}
