// App.js

import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./context/authProvider";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
