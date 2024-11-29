import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user/User";
import Login from "./auth/Login";
import Tamu from "./pages/bukuTamu/Tamu";
import Auth from "./auth/Auth";
import Chart2 from "./components/Chart2";
import Modaluser from "./pages/user/Modaluser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="tamu" element={<Tamu />} />
            <Route path="test" element={<Modaluser />} />
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
