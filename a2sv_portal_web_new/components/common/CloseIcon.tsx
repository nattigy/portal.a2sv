import React from 'react'

type Props = {
    onClose:()=>void
}

const CloseIcon = ({onClose}: Props) => {
  return (
    <div
    className="cursor-pointer"
    onClick={() => onClose()}
  >
    <svg
      className="font-bold text-gray-600"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 7L7 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7L21 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
  )
}

export default CloseIcon