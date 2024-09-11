'use client'

import queryClient from '@/services/client/client.service'
import type { FC } from 'react'
import { QueryClientProvider } from 'react-query'

type ChildrenLayoutProps = {
  children: React.ReactNode
}

const ChildrenLayout: FC<ChildrenLayoutProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ChildrenLayout
