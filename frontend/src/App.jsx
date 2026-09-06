import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Page/Home";
import Shop from "./Page/Shop/Shop";
import Emi from "./Page/Emi";
import Limit from "./Page/Limit";
import Profile from "./Page/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Shop />} />
        <Route path="/emi" element={<Emi />} />
        <Route path="/limit" element={<Limit />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;