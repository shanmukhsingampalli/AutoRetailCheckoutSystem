import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";
import ProtectedRoute from "./utils/ProtectedRoute";
import Bill from "./pages/Bill";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/all-products"
        element={
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills"
        element={
          <ProtectedRoute>
            <Bill />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
