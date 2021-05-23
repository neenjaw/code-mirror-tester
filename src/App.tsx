import styled from 'styled-components'
import './App.css'
import { CodeEditor } from './components/code-editor'

const HeaderText = styled.h1`
  margin: 0;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderText>Codemirror</HeaderText>
      </header>
      <main>
        <CodeEditor />
      </main>
    </div>
  )
}

export default App
