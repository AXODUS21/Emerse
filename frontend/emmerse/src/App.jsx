import FrontPage from "./pages/front-page"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./pages/store";
import Profile from "./pages/profile";
import Auth from "./pages/auth";4
import Cart from "./pages/cart";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<FrontPage/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
