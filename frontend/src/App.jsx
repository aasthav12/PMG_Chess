import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Landing from "./pages/Landing.jsx";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
    </Routes>
  );
}
