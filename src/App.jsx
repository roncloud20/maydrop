import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Verify from './Pages/Verify'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
