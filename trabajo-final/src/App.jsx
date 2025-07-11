import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Row from './components/Row'
import { SesionProvider, useSesion } from './contexts/SesionContext'
import Game from './components/Game'


function App() {
  
  return (
    <SesionProvider>
      <Game/>
    </SesionProvider>     
  )
}

export default App
