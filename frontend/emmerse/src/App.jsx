import FrontPage from "./pages/front-page"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./pages/store";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/store" element={<Store/>} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
