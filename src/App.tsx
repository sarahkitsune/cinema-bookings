// import { useState } from 'react'

import Button from './components/Button'
import './App.css'

function App() {
  

  return (
    <div className="App">
      <h1>Cinema Bookings by Kitsune</h1>
      <p>Welcome to the cinema booking system!</p>
      <Button text="Book Now" onClick={() => alert('Booking functionality coming soon!')} />
    </div>
  )
}

export default App
