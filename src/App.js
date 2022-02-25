import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router, Routes, Link, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Chats from "./pages/Chats";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AuthProvider from "./context/auth";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { requireAuth } from "./components/requireAuth";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/"
              element={
                <requireAuth>
                  <Chats />
                </requireAuth>
              }
            />
            <Route
              exact
              path="/chats"
              element={
                <requireAuth>
                  <Chats />
                </requireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
