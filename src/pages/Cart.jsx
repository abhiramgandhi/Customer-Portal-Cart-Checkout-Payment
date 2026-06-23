import { useState } from "react";

export default function Cart({ navigateTo }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Handcrafted Metal Musical Trio Wall Hanging (Set of 3)", desc: "Traditional Art of Jharkhand", price: 599, quantity: 1 },
    { id: 2, name: "Vanya Eco-Friendly Bamboo Tricycle Decorative Basket", desc: "Traditional Art of Jharkhand", price: 299, quantity: 1 },
    { id: 3, name: "Hand-Painted Tribal Art Bottle Decor", desc: "Traditional Art of Jharkhand", price: 399, quantity: 1 },
  ]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handler functions to update item values
  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const updatedQty = item.quantity + amount;
            return updatedQty > 0 ? { ...item, quantity: updatedQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Math metrics summation logic blocks purely based on current active items
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-[#FBF7F2] min-h-screen text-[#1E1612] font-['Inter']">
      
      {/* Header */}
      <header className="bg-[#FFFFFF] border-b border-[#F0E6D8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#8B3A2A] rounded-md bg-[#8B3A2A]/5 shrink-0"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#8B3A2A] tracking-wide font-['Playfair_Display']">
              JHARCRAFT — <span className="text-xs sm:text-sm font-normal text-[#4B5563]">Customer</span>
            </h1>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex gap-4 items-center">
            <button type="button" className="border border-[#F0E6D8] px-3 py-1.5 rounded-xl bg-[#D4A24C]/10 text-[#D4A24C] hover:shadow-md transition-all">
              🔔
            </button>
            <button type="button" className="border border-[#F0E6D8] px-4 py-1.5 rounded-xl text-sm font-medium text-[#4B5563] flex items-center gap-1 bg-[#FFFFFF]">
              EN <span>▼</span>
            </button>
            <button type="button" className="bg-[#8B3A2A] text-[#FFFFFF] px-5 py-1.5 rounded-xl text-sm font-medium hover:bg-[#6D2D22] transition-colors shadow-sm">
              User ▼
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#8B3A2A] text-2xl focus:outline-none p-1"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown Header Utilities */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#F0E6D8] bg-[#FFFFFF] p-4 flex flex-wrap gap-3 justify-between items-center transition-all">
            <div className="flex gap-2">
              <button type="button" className="border border-[#F0E6D8] px-3 py-1.5 rounded-xl bg-[#D4A24C]/10 text-[#D4A24C]">
                🔔 Notification
              </button>
              <button type="button" className="border border-[#F0E6D8] px-4 py-1.5 rounded-xl text-sm font-medium text-[#4B5563] bg-[#FFFFFF]">
                EN ▼
              </button>
            </div>
            <button type="button" className="bg-[#8B3A2A] text-[#FFFFFF] px-5 py-1.5 rounded-xl text-sm font-medium">
              User ▼
            </button>
          </div>
        )}
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          
          {/* Sidebar / Navigation Links */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-[#FFFFFF] border border-[#F0E6D8] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm h-fit">
            <h3 className="text-[#4B5563] text-xs font-bold tracking-wider mb-3 sm:mb-4 uppercase hidden md:block">
              Menu
            </h3>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none snap-x">
              {[
                "Dashboard",
                "Profile",
                "Orders",
                "Wishlist",
                "Cart",
                "Addresses",
                "Support",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (navigateTo) {
                      navigateTo(item.toLowerCase());
                    }
                  }}
                  className={`snap-center shrink-0 md:w-full text-left px-4 py-2.5 md:p-3 text-xs sm:text-sm rounded-xl font-medium border transition-all ${
                    item === "Cart"
                      ? "bg-[#8B3A2A] text-[#FFFFFF] border-[#8B3A2A] shadow-sm"
                      : "border-transparent text-[#4B5563] hover:bg-[#FBF7F2] hover:text-[#1E1612]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Products List */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7 space-y-4 sm:space-y-5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between shadow-sm hover:shadow-md hover:border-[#D4A24C] transition-all duration-300"
                >
                  <div className="flex gap-4 sm:gap-5 items-start sm:items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FBF7F2] border border-[#F0E6D8] rounded-xl shrink-0 overflow-hidden">
                      <img 
                        src={`/images/${item.id}.jpg`} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-[#1E1612] mb-0.5 sm:mb-1 wrap-break-word line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-[#4B5563] mb-2 sm:mb-4">{item.desc}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center border border-[#8B3A2A]/20 rounded-lg overflow-hidden bg-[#FFFFFF]">
                          <button 
                            type="button" 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="text-[#8B3A2A] px-2.5 py-1 text-sm font-bold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 font-semibold text-sm text-[#1E1612] bg-[#FBF7F2]/40 min-w-8 text-center">{item.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="text-[#8B3A2A] px-2.5 py-1 text-sm font-bold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(item.id)}
                          className="border border-[#8B3A2A]/30 text-[#8B3A2A] px-3 py-1 rounded-lg text-xs font-medium bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-colors sm:ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Item Pricing Layout */}
                  <div className="flex justify-between sm:justify-end items-center border-t border-dashed border-[#F0E6D8] pt-3 sm:pt-0 sm:border-t-0 text-right">
                    <span className="text-xs text-[#4B5563] sm:hidden">Subtotal:</span>
                    <p className="text-lg sm:text-xl font-bold text-[#8B3A2A]">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-2xl sm:rounded-3xl p-10 text-center text-[#4B5563] shadow-sm">
                Your cart is empty!
              </div>
            )}
          </div>

          {/* Checkout Order Summary Container */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:border-[#D4A24C] transition-all duration-300">
              <h2 className="text-lg font-bold text-[#1E1612] mb-4 font-['Playfair_Display']">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm text-[#4B5563]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E1612]">₹{subtotal}</span>
                </div>
              </div>

              <hr className="my-4 border-[#F0E6D8]" />

              <div className="flex justify-between font-bold text-[#8B3A2A] text-lg">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full border border-[#F0E6D8] rounded-xl p-3 mt-5 text-sm bg-[#FBF7F2] text-[#1E1612] placeholder-[#4B5563]/60 focus:outline-none focus:border-[#D4A24C]"
              />

              <button 
                type="button"
                disabled={cartItems.length === 0}
                onClick={() => navigateTo && navigateTo("checkout")}
                className="w-full mt-4 bg-[#8B3A2A] text-[#FFFFFF] py-3.5 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}