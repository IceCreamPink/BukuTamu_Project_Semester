import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user/User";
import Login from "./auth/Login";
import Chart from "./components/Chart";
import Tamu from "./pages/bukuTamu/Tamu";
import Auth from "./auth/Auth";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="tamu" element={<Tamu />} />
          </Route>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
