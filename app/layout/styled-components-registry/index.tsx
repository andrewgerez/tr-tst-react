import { useState } from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useServerInsertedHTML } from 'next/navigation'

type StyledComponentsRegistryProps = {
  children: React.ReactNode
}

function StyledComponentsRegistry({ children }: Readonly<StyledComponentsRegistryProps>) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
      ; (styledComponentsStyleSheet.instance as any).clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}

export default StyledComponentsRegistry
