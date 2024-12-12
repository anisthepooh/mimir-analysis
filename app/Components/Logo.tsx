import { TestTubeDiagonal } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <span className="flex gap-1 items-baseline font-bold text-sky-800 text-base">
      <span className="w-5 h-5 bg-sky-800 rounded-md flex items-center justify-center border-t-2 border-t-sky-400">
        <TestTubeDiagonal size={12} className="text-sky-200" />
      </span>
      <span>
        Mimir
        <span className="text-[10px] text-sky-600"> v.1.0</span>
      </span>
    </span>
  )
}

export default Logo