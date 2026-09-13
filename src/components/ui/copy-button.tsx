"use client"

import * as React from "react"

import { useClipboard } from "@/hooks/use-clipboard"

type CopyButtonProps = {
  value: string
  timeout?: number
  children: (payload: { copied: boolean; copy: () => void }) => React.ReactNode
}

function CopyButton({ value, timeout = 1000, children }: CopyButtonProps) {
  const clipboard = useClipboard({ timeout })

  return (
    <>
      {children({
        copied: clipboard.copied,
        copy: () => clipboard.copy(value),
      })}
    </>
  )
}

export { CopyButton }
export type { CopyButtonProps }
