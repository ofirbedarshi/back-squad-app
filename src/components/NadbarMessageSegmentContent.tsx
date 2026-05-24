import { useMemo } from 'react'
import type { NadbarMessage, NadbarMessageUserVars, NadbarUserVarFields } from '../domain/nadbar.types'
import {
  buildUserVarFirstMessageIndex,
  parseNadbarMessageSegments,
  resolveResourceSegment,
  sanitizeNadbarNumericUserVarInput,
} from '../utils/nadbarMessageFill'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

const INLINE_INPUT_CLASS =
  'inline-block min-w-[3rem] max-w-[8rem] border-0 border-b border-neutral-800 bg-transparent px-0.5 py-0 text-sm text-neutral-900 underline decoration-neutral-800 decoration-1 underline-offset-2 outline-none focus:border-blue-500'

const ECHO_EMPTY_LABEL = '(מחושב אוטומטי)'
const ECHO_VALUE_CLASS = 'inline text-base italic text-neutral-500'

interface NadbarMessageSegmentContentProps {
  content: string
  messages: readonly NadbarMessage[]
  messageIndex: number
  resources: NadbarMessageResources
  messageVars: NadbarMessageUserVars
  userVarFields?: NadbarUserVarFields
  onUserVarChange: (varName: string, value: string) => void
}

function NadbarMessageSegmentContent({
  content,
  messages,
  messageIndex,
  resources,
  messageVars,
  userVarFields,
  onUserVarChange,
}: NadbarMessageSegmentContentProps) {
  const segments = parseNadbarMessageSegments(content)
  const userVarFirstMessageIndex = useMemo(
    () => buildUserVarFirstMessageIndex(messages),
    [messages],
  )

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

        const value = messageVars[segment.varName] ?? ''
        const editable = userVarFirstMessageIndex.get(segment.varName) === messageIndex

        if (!editable) {
          if (!value.trim()) {
            return (
              <span
                key={index}
                className="inline-block font-medium text-red-600 underline decoration-red-600 underline-offset-2"
                aria-label={`${segment.varName} — ${ECHO_EMPTY_LABEL}`}
              >
                {ECHO_EMPTY_LABEL}
              </span>
            )
          }

          return (
            <span key={index} className={ECHO_VALUE_CLASS} aria-label={segment.varName}>
              {value}
            </span>
          )
        }

        const numeric = userVarFields?.[segment.varName]?.input === 'numeric'

        return (
          <input
            key={index}
            type="text"
            inputMode={numeric ? 'numeric' : undefined}
            pattern={numeric ? '[0-9]*' : undefined}
            value={value}
            onChange={(event) => {
              const next = numeric
                ? sanitizeNadbarNumericUserVarInput(event.target.value)
                : event.target.value
              onUserVarChange(segment.varName, next)
            }}
            className={INLINE_INPUT_CLASS}
            aria-label={segment.varName}
          />
        )
      })}
    </p>
  )
}

export default NadbarMessageSegmentContent
