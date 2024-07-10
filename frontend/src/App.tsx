import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Transfer from "./Pages/Transfer";
import UserContexts from "./Utils/UserContext";

function App() {
  return (
    <>
      <UserContexts>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </BrowserRouter>
      </UserContexts>
    </>
  );
}

export default App;
