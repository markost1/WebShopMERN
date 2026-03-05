import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminHomePage from './pages/admin/AdminHomePage'
import ProductDetails from './pages/ProductDetails'
import SearchResults from './pages/SearchResults'
import About from './pages/About'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        
        {/* admin pages */}
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
