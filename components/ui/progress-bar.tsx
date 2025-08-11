import React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  label
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span>{label || "Progress"}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all duration-300", barClassName)}
          style={{
            '--progress-width': `${percentage}%`,
            width: 'var(--progress-width)'
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
} 