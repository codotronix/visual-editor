import { useState } from 'react'
import clsx from "clsx"
import styled from '@emotion/styled'
import './App.css'
import { Header, Footer } from './components/vse'
import Editor from "./components/editor/Editor"

const StyledApp = styled.div`
  background: var(--color-bg);
  color: var(--color-text);
`

function App() {
  const [isLightMode, setLightMode] = useState(false)

  return (
    <StyledApp className={clsx('vse', isLightMode && 'light' )}>
      <Header 
        isLightMode={isLightMode} 
        toggleLightMode={() => setLightMode(!isLightMode)}
      />
      <Editor />
      <Footer />
    </StyledApp>
  )
}

export default App
