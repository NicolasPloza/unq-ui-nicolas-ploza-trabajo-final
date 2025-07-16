import './styles/App.css'
import { SesionProvider} from './contexts/SesionContext'
import Game from './components/Game'
import { BoardProvider } from './contexts/BoardContext'


function App() {
  
  return (
    <SesionProvider>
        <BoardProvider>
          <Game/>
        </BoardProvider>      
    </SesionProvider>     
  )
}

export default App
