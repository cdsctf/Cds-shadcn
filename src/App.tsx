import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { CdsButton } from './components/ui/cdsbutton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button>This is a Button</Button>
      <br />
      <br />
      <CdsButton>This is a CdsButton</CdsButton>
    </>
  )
}

export default App
