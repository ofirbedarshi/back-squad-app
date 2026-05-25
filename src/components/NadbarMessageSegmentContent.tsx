import { useNadbarBlockChatContext } from './NadbarBlockChatContext'
import { useNadbarChatContext } from './NadbarChatContext'
import NadbarInlineUserVarInput from './NadbarInlineUserVarInput'
import NadbarUserVarChoiceInput from './NadbarUserVarChoiceInput'
import type { NadbarMessage } from '../domain/nadbar.types'
import {
  isNadbarTargetVarLoadOnly,
  isNadbarUserVarEditableAt,
  NADBAR_TARGET_LOAD_EMPTY_LABEL,
  parseNadbarMessageSegments,
  resolveNadbarUserVarDisplayValue,
  resolveResourceSegment,
  sanitizeNadbarNumericUserVarInput,
} from '../utils/nadbarMessageFill'

const ECHO_EMPTY_LABEL = '(מחושב אוטומטי)'
const ECHO_VALUE_CLASS = 'inline text-base italic text-neutral-500'

interface NadbarMessageSegmentContentProps {
  content: string
  messages: readonly NadbarMessage[]
  messageIndex: number
}

function NadbarMessageSegmentContent({
  content,
  messages,
  messageIndex,
}: NadbarMessageSegmentContentProps) {
  const { blockIndex, allBlockMessageVars, onUserVarChange } = useNadbarBlockChatContext()
  const { userVarFields, varInitialFromBlock, resources, blockFooterActions } =
    useNadbarChatContext()
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

        const value = resolveNadbarUserVarDisplayValue(
          segment.varName,
          blockIndex,
          allBlockMessageVars,
          varInitialFromBlock,
        )
        const loadOnly = isNadbarTargetVarLoadOnly(
          blockFooterActions,
          blockIndex,
          segment.varName,
        )
        const editable = isNadbarUserVarEditableAt(messages, messageIndex, segment.varName, {
          blockFooterActions,
          blockIndex,
        })

        if (!editable) {
          const emptyLabel = loadOnly ? NADBAR_TARGET_LOAD_EMPTY_LABEL : ECHO_EMPTY_LABEL
          if (!value.trim()) {
            return (
              <span
                key={index}
                className="inline-block font-medium text-red-600 underline decoration-red-600 underline-offset-2"
                aria-label={`${segment.varName} — ${emptyLabel}`}
              >
                {emptyLabel}
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
        const choiceSpec = userVarFields?.[segment.varName]
        const isChoice = choiceSpec?.input === 'choice'

        if (isChoice && choiceSpec.options) {
          return (
            <NadbarUserVarChoiceInput
              key={index}
              options={choiceSpec.options}
              value={value}
              onChange={(next) => onUserVarChange(segment.varName, next)}
              ariaLabel={segment.varName}
            />
          )
        }

        return (
          <NadbarInlineUserVarInput
            key={index}
            value={value}
            numeric={numeric}
            ariaLabel={segment.varName}
            onChange={(event) => {
              const next = numeric
                ? sanitizeNadbarNumericUserVarInput(event.target.value)
                : event.target.value
              onUserVarChange(segment.varName, next)
            }}
          />
        )
      })}
    </p>
  )
}

export default NadbarMessageSegmentContent
