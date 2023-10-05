import './App.css'
import MainContents from './components/MainContents'
import Container from '@mui/material/Container'

function App() {

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
      <Container maxWidth="lg">
        <MainContents />
      </Container>
    </div>
  )
}

export default App
