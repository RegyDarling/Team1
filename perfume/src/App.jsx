import React from 'react'
import { useState } from 'react'
const App = () => {
  const [name,setName] = useState ("Mensah")
  setName("Yusif")
  return (
    <><div>
      <h1>my name is {name}</h1>

      <button onClick={handleClick}>click me</button>
    </div>
    </>
  )
}

export default App
