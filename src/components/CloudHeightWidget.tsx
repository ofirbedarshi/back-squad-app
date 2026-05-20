import { useState } from 'react'
import { useCloudHeight } from '../hooks/useCloudHeight'
import CloudHeightModal from './CloudHeightModal'

function CloudHeightWidget() {
  const { settings, handleSaved, widgetLabel, hasHeight } = useCloudHeight()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="flex flex-col items-center touch-manipulation select-none active:opacity-70"
        aria-label="הגדרת גובה בסיס ענן"
      >
        <svg
          viewBox="0 0 110 62"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-14"
        >
          <path
            d="
              M 22 50
              Q 6 50 6 37
              Q 6 26 18 24
              Q 17 10 30 8
              Q 39 2 50 10
              Q 59 3 70 10
              Q 83 8 88 22
              Q 102 22 104 35
              Q 106 50 90 50
              Z
            "
            fill={hasHeight ? '#dbeafe' : '#f3f4f6'}
            stroke={hasHeight ? '#60a5fa' : '#d1d5db'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="55"
            y="36"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={hasHeight ? '17' : '17'}
            fontWeight="700"
            fill={hasHeight ? '#1d4ed8' : '#9ca3af'}
            fontFamily="system-ui, sans-serif"
          >
            {widgetLabel}
          </text>
        </svg>
      </button>

      {modalOpen && (
        <CloudHeightModal
          current={settings}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}

export default CloudHeightWidget
