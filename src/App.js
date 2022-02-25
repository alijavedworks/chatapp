import "./App.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Router, Routes, Link, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Chats from "./pages/Chats";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AuthProvider from "./context/auth";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { RequireAuth } from "./components/RequireAuth";
import { WithoutAuth } from "./components/WithoutAuth";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              exact
              path="/login"
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <WithoutAuth>
                  <Signup />
                </WithoutAuth>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <WithoutAuth>
                  <Signup />
                </WithoutAuth>
              }
            />
            <Route
              exact
              path="/chats"
              element={
                <RequireAuth>
                  <Chats />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to={"/chats"} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
