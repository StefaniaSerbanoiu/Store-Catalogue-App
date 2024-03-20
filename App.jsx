import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Read from './Read'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path = '/create' element={<Create />}></Route>
      <Route path='/update/:id' element={<Update />}></Route>
      <Route path='/read/:id' element={<Read />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App