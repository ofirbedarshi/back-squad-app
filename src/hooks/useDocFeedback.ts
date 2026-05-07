import { useMemo, useState } from 'react'
import type { CommentsBySection, DocSection } from '../components/base/docFeedback.types'

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
  const [commentsBySection, setCommentsBySection] = useState<CommentsBySection>({})
  const sections = useMemo(() => parseDocSections(markdown), [markdown])
  const hasComment = Object.values(commentsBySection).some((comment) => comment.trim().length > 0)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function handleCommentChange(sectionId: string, value: string) {
    setCommentsBySection((current) => ({
      ...current,
      [sectionId]: value,
    }))
  }

  function buildWhatsAppShareUrl(shareTitle: string) {
    const comments = sections
      .map((section) => {
        const comment = commentsBySection[section.id]?.trim()
        if (!comment) {
          return null
        }

        return `*${section.title}*\n${comment}`
      })
      .filter(Boolean)
      .join('\n\n')

    if (!comments) {
      return null
    }

    const shareText = `הערות למסמך: ${shareTitle}\n\n${comments}`
    return `https://wa.me/?text=${encodeURIComponent(shareText)}`
  }

  return {
    isOpen,
    sections,
    hasComment,
    open,
    close,
    toPlainText,
    handleCommentChange,
    commentsBySection,
    buildWhatsAppShareUrl,
  }
}
