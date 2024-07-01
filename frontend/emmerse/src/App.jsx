import FrontPage from "./pages/front-page"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./pages/store";
import Auth from "./pages/auth";4
import Cart from "./pages/cart";
import Details from "./pages/details";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<FrontPage/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/details" element={<Details/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
