'use client'

import { createContext, useContext } from 'react'

const ReadyContext = createContext(false)

export function ReadyProvider({
  children,
  ready,
}: {
  children: React.ReactNode
  ready: boolean
}) {
  return (
    <ReadyContext.Provider value={ready}>
      {children}
    </ReadyContext.Provider>
  )
}

export function useReady() {
  return useContext(ReadyContext)
}
