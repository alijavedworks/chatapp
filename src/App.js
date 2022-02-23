import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router, Routes, Link, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Chats from "./pages/Chats";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AuthProvider from "./context/auth";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
