import FrontPage from "./pages/front-page"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./pages/store";
import Auth from "./pages/auth";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<FrontPage/>} />
          <Route path="/store" element={<Store/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
