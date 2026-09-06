import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Page/Home";
import Shop from "./Page/Shop/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;