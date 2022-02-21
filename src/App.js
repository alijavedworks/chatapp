import "./App.css";
import { Router, Routes, Link, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Chats from "./pages/Chats";
import GroupChats from "./pages/GroupChats";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/groupchats" element={<GroupChats />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
