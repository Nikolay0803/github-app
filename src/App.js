import { BrowserRouter, Route, Routes } from "react-router-dom";

import User from "./components/pages/User/User";
import Home from "./components/pages/Home/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:login" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
