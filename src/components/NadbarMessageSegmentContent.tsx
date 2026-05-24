import type { NadbarMessageUserVars } from '../domain/nadbar.types'
import {
  parseNadbarMessageSegments,
  resolveResourceSegment,
} from '../utils/nadbarMessageFill'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

const INLINE_INPUT_CLASS =
  'inline-block min-w-[3rem] max-w-[8rem] border-0 border-b border-neutral-800 bg-transparent px-0.5 py-0 text-sm text-neutral-900 underline decoration-neutral-800 decoration-1 underline-offset-2 outline-none focus:border-blue-500'

interface NadbarMessageSegmentContentProps {
  content: string
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMessageSegmentContent({
  content,
  resources,
  messageVars,
  onUserVarChange,
}: NadbarMessageSegmentContentProps) {
  const segments = parseNadbarMessageSegments(content)

  return (
    <p className="whitespace-pre-wrap break-words">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.text}</span>
        }

        if (segment.type === 'resource') {
          const fill = resolveResourceSegment(segment.tokenKey, resources)
          if (fill.type === 'value') {
            return (
              <span key={index} className="underline">
                {fill.value}
              </span>
            )
          }
          if (fill.type === 'missing') {
            return (
              <span key={index} className="font-medium text-red-600">
                {fill.prompt}
              </span>
            )
          }
          return <span key={index}>{`{{${segment.tokenKey}}}`}</span>
        }

        return (
          <input
            key={index}
            type="text"
            value={messageVars[segment.varName] ?? ''}
            onChange={(event) => onUserVarChange(segment.varName, event.target.value)}
            className={INLINE_INPUT_CLASS}
            aria-label={segment.varName}
          />
        )
      })}
    </p>
  )
}

export default NadbarMessageSegmentContent
