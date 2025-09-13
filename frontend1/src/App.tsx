import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/Home";
import Bill from "./pages/Bill";
import Payment from "./pages/payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingCart />} />
      <Route path="/bill" element={<Bill />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;
