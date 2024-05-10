import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import RootLayout from "./components/RootLayout/RootLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const {token} = useAuth();
  return (
    <div>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} /> 
        {/* 
          
          
        {/* <Footer /> */}
      </Routes>
    </div>
  );
}

export default App;
