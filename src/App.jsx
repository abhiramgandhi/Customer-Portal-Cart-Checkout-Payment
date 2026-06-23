import { useState } from "react";
import Cart from "./pages/Cart";       
import Checkout from "./pages/Checkout"; 
import Payments from "./pages/payments";

function App() {
  // State variable to manage multi-page dynamic layout switching
  const [currentPage, setCurrentPage] = useState("cart");

  return (
    <>
      {/* Conditional rendering pipeline setup for structural views routing */}
      {currentPage === "cart" && (
        <Cart navigateTo={setCurrentPage} />
      )}
      
      {currentPage === "checkout" && (
        <Checkout navigateTo={setCurrentPage} />
      )}
      
      {currentPage === "payments" && (
        <Payments navigateTo={setCurrentPage} />
      )}
    </>
  );
}

export default App;