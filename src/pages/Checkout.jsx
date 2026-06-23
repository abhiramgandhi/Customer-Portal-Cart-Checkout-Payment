import { useState } from "react";

export default function Checkout({ navigateTo }) {
  // Local active flow status state configuration controller (1=Address, 2=Shipping, 3=Payment, 4=Review)
  const [activeStep, setActiveStep] = useState(1);

  // Dynamic variable tracker to monitor shipping choices
  const [shippingMethod, setShippingMethod] = useState("standard"); // options: "standard" or "express"

  // state variable to track selected payment mode tab
  const [selectedMethod, setSelectedMethod] = useState("UPI");

  // New state to track selected popular UPI App for QR code display
  const [selectedApp, setSelectedApp] = useState("");

  // New state to handle order placed notification view
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [addressData, setAddressData] = useState({
    name: "",
    mobile: "",
    addressLine: "",
    addressLine2: "", 
    country: "",
    state: "",
    pinCode: ""
  });

  const [mobileError, setMobileError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const countriesList = [
    "India", "United States", "United Kingdom", "Australia", "Canada", 
    "Germany", "France", "Japan", "Singapore", "United Arab Emirates",
    "Saudi Arabia", "New Zealand", "South Africa", "Malaysia", "Sri Lanka",
    "Nepal", "Bangladesh", "Netherlands", "Switzerland", "Italy"
  ];

  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setAddressData((prev) => ({ ...prev, [name]: value }));

    if (formError) setFormError("");

    if (name === "mobile") {
      if (value === "") {
        setMobileError("");
      } else if (!/^\d*$/.test(value)) {
        setMobileError("Please enter numbers only");
      } else if (value.length > 10) {
        setMobileError("Please enter valid 10-digit phone number");
      } else {
        setMobileError("");
      }
    }

    if (name === "pinCode") {
      if (value === "") {
        setPinCodeError("");
      } else if (!/^\d*$/.test(value)) {
        setPinCodeError("Please enter numbers only");
      } else if (value.length > 6) {
        setPinCodeError("Pin code cannot exceed 6 digits");
      } else {
        setPinCodeError("");
      }
    }
  };

  const handleProceedToShipping = () => {
    setIsSubmitted(true); 
    const { name, mobile, addressLine, country, state, pinCode } = addressData;

    if (!name || !mobile || !addressLine || !country || !state || !pinCode) {
      setFormError("Please fill all mandatory fields");
      return;
    }

    if (mobileError || mobile.length !== 10) {
      setFormError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (pinCodeError || pinCode.length !== 6) {
      setFormError("Please enter a valid 6-digit Pin Code");
      return;
    }

    setFormError("");
    setIsSubmitted(false);
    setActiveStep(2);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const paymentMethods = ["UPI", "Card", "Net Banking", "COD"];

  const baseSubtotal = 1497;
  const shippingCharge = shippingMethod === "express" ? 99 : 0;
  const gstCharge = 120;
  const codExtraCharges = (activeStep >= 3 && selectedMethod === "COD") ? 15 : 0;
  
  const totalAmountCalculated = baseSubtotal + shippingCharge + gstCharge + codExtraCharges;

  const dummyUpiString = `upi://pay?pa=jharcraft@dummybank&pn=Jharcraft&am=${totalAmountCalculated}&cu=INR&tn=OrderPayment`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=${encodeURIComponent(dummyUpiString)}`;

  return (
    <div className="bg-[#FBF7F2] min-h-screen text-[#1E1612] font-['Inter']">
      
      {/* Header section component rendering */}
      <header className="bg-[#FFFFFF] border-b border-[#F0E6D8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-8 h-8 shrink-0 border border-[#8B3A2A] rounded-md bg-[#8B3A2A]/5"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#8B3A2A] tracking-wide font-['Playfair_Display'] text-center sm:text-left">
              JHARCRAFT — <span className="text-sm font-normal text-[#4B5563]">Customer</span>
            </h1>
          </div>

          <div className="flex gap-3 items-center justify-center w-full sm:w-auto">
            <button type="button" className="border border-[#F0E6D8] px-3 py-1.5 rounded-xl bg-[#D4A24C]/10 text-[#D4A24C] hover:shadow-md transition-all">
              🔔
            </button>
            <button type="button" className="border border-[#F0E6D8] px-4 py-1.5 rounded-xl text-sm font-medium text-[#4B5563] flex items-center gap-1 bg-[#FFFFFF]">
              EN <span>▼</span>
            </button>
            <button type="button" className="bg-[#8B3A2A] text-[#FFFFFF] px-5 py-1.5 rounded-xl text-sm font-medium hover:bg-[#6D2D22] transition-colors shadow-sm whitespace-nowrap">
              User ▼
            </button>
          </div>
        </div>
      </header>

      {/* Conditional Layout Rendering: If Order Placed, show full-screen centered block */}
      {orderPlaced ? (
        <div className="min-h-[calc(100-80px)] flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xl bg-[#FFFFFF] border border-[#D4A24C] rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-xl animate-fadeIn">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-4xl border border-green-200 shadow-sm">
              ✅
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#8B3A2A] font-['Playfair_Display']">
                Your Order Placed Successfully!
              </h2>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                Thank you for shopping with Jharcraft. Your order has been recorded and is being prepared for shipment.
              </p>
            </div>
            
            <div className="bg-[#FBF7F2] border border-[#F0E6D8] rounded-2xl p-4 max-w-sm mx-auto text-sm text-left space-y-1.5">
              <p className="text-gray-500">Payment Mode: <span className="font-semibold text-gray-800">{selectedMethod}</span></p>
              <p className="text-gray-500">Amount Paid: <span className="font-bold text-[#8B3A2A]">₹{totalAmountCalculated}</span></p>
              <p className="text-gray-500">Deliver To: <span className="font-semibold text-gray-800">{addressData.name}</span></p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigateTo && navigateTo("dashboard")}
                className="w-full sm:w-auto border border-[#8B3A2A] text-[#8B3A2A] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#8B3A2A]/5 transition-all"
              >
                Go to Dashboard
              </button>
              <button
                type="button"
                onClick={() => navigateTo && navigateTo("orders")}
                className="w-full sm:w-auto bg-[#8B3A2A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] transition-colors shadow-md"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Workspace Dashboard Layout wrapper */
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Main Sidebar Navigation controller blocks */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-[#FFFFFF] border border-[#F0E6D8] rounded-3xl p-5 shadow-lg h-fit">
              <h3 className="text-[#4B5563] text-xs font-bold tracking-wider mb-4 uppercase">
                Menu
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
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
                    className={`text-left p-3 text-sm rounded-xl font-medium border transition-all truncate ${
                      item === "Cart"
                        ? "bg-[#8B3A2A] text-[#FFFFFF] border-[#8B3A2A] shadow-md"
                        : "border-transparent text-[#4B5563] hover:bg-[#FBF7F2] hover:text-[#1E1612]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout Steps Central View area container */}
            <div className="col-span-12 md:col-span-8 lg:col-span-6 space-y-6">
              
              {/* Top Steps Progress Tab Indicator Bar */}
              <div className="w-full overflow-x-auto pb-2 -mb-2 scrollbar-none">
                <div className="gap-2 bg-[#FFFFFF] p-2 rounded-2xl border border-[#F0E6D8] shadow-sm flex min-w-max md:inline-flex">
                  {[
                    { id: 1, text: "1 Address" },
                    { id: 2, text: "2 Shipping" },
                    { id: 3, text: "3 Payment" },
                    { id: 4, text: "4 Review" }
                  ].map((stepObj) => (
                    <button 
                      key={stepObj.id}
                      type="button" 
                      disabled={stepObj.id > 1 && (!addressData.name || !addressData.mobile || mobileError !== "" || addressData.mobile.length !== 10 || !addressData.addressLine || !addressData.state || !addressData.country || addressData.pinCode.length !== 6 || pinCodeError !== "")}
                      onClick={() => setActiveStep(stepObj.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        activeStep === stepObj.id 
                          ? "bg-[#8B3A2A] text-[#FFFFFF] shadow-md" 
                          : "border border-[#F0E6D8] bg-[#FBF7F2] text-[#4B5563]"
                      }`}
                    >
                      {stepObj.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Local STEP 1: Delivery Address Form Blocks */}
              {activeStep === 1 && (
                <div className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-3xl p-5 sm:p-6 shadow-lg hover:border-[#D4A24C] transition-all duration-300">
                  <h2 className="mb-5 text-xs font-bold uppercase tracking-wider text-[#D4A24C]">
                    Delivery Address
                  </h2>

                  {formError && (
                    <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
                      ⚠️ {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Name <span className="text-red-500 font-bold">*</span>
                      </span>
                      <input 
                        type="text" 
                        name="name" 
                        value={addressData.name} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your name"
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none transition-all ${
                          isSubmitted && !addressData.name 
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`} 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Mobile <span className="text-red-500 font-bold">*</span>
                      </span>
                      <input 
                        type="text" 
                        name="mobile" 
                        value={addressData.mobile} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your mobile number"
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none transition-all ${
                          mobileError || (isSubmitted && !addressData.mobile)
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`} 
                      />
                      {mobileError && (
                        <span className="text-xs text-red-500 font-medium px-1 mt-0.5">
                          ⚠️ {mobileError}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Address Line <span className="text-red-500 font-bold">*</span>
                      </span>
                      <input 
                        type="text" 
                        name="addressLine" 
                        value={addressData.addressLine} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your address"
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none transition-all ${
                          isSubmitted && !addressData.addressLine 
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`} 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Address Line 2 <span className="text-gray-400 font-normal text-[9px]">(Optional)</span>
                      </span>
                      <input 
                        type="text" 
                        name="addressLine2" 
                        value={addressData.addressLine2} 
                        onChange={handleInputChange} 
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className="border border-[#F0E6D8] p-3 rounded-xl text-sm bg-[#FBF7F2] text-[#1E1612] focus:outline-none focus:border-[#8B3A2A]" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Country <span className="text-red-500 font-bold">*</span>
                      </span>
                      <select 
                        name="country" 
                        value={addressData.country} 
                        onChange={handleInputChange} 
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none cursor-pointer transition-all ${
                          isSubmitted && !addressData.country 
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`}
                      >
                        <option value="">Select Country</option>
                        {countriesList.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        State <span className="text-red-500 font-bold">*</span>
                      </span>
                      <select 
                        name="state" 
                        value={addressData.state} 
                        onChange={handleInputChange} 
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none cursor-pointer transition-all ${
                          isSubmitted && !addressData.state 
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`}
                      >
                        <option value="">Select State</option>
                        {statesList.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="text-[10px] font-bold text-[#4B5563] uppercase">
                        Pin Code <span className="text-red-500 font-bold">*</span>
                      </span>
                      <input 
                        type="text" 
                        name="pinCode" 
                        maxLength="6"
                        value={addressData.pinCode} 
                        onChange={handleInputChange} 
                        placeholder="Enter 6-digit pin code"
                        className={`border p-3 rounded-xl text-sm text-[#1E1612] focus:outline-none transition-all ${
                          pinCodeError || (isSubmitted && !addressData.pinCode)
                            ? "border-red-500 bg-red-50/50 focus:border-red-500" 
                            : "border-[#F0E6D8] bg-[#FBF7F2] focus:border-[#8B3A2A]"
                        }`} 
                      />
                      {pinCodeError && (
                        <span className="text-xs text-red-500 font-medium px-1 mt-0.5">
                          ⚠️ {pinCodeError}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => navigateTo && navigateTo("cart")}
                      className="w-full sm:w-auto border border-[#8B3A2A] text-[#8B3A2A] px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-all duration-200 text-center"
                    >
                      &larr; Back to Cart
                    </button>
                    <button 
                      type="button" 
                      onClick={handleProceedToShipping} 
                      className="w-full sm:w-auto bg-[#8B3A2A] text-[#FFFFFF] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] transition-colors shadow-md text-center"
                    >
                      Proceed to Shipping &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Local STEP 2: Shipping Method Form Block */}
              {activeStep === 2 && (
                <div className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-3xl p-5 sm:p-6 shadow-lg hover:border-[#D4A24C] transition-all duration-300">
                  <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#D4A24C]">
                    Shipping Method
                  </h2>
                  <div className="space-y-4 text-sm font-medium mb-6">
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-[#FBF7F2] transition-colors">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === "standard"} 
                        onChange={() => setShippingMethod("standard")}
                        className="accent-[#8B3A2A] w-4 h-4" 
                      />
                      <span>Standard 5-7 days &middot; <span className="text-[#4B5563] font-normal">Free</span></span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-[#FBF7F2] transition-colors">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === "express"} 
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#8B3A2A] w-4 h-4" 
                      />
                      <span>Express 2-3 days &middot; <span className="text-[#8B3A2A]">₹99</span></span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setActiveStep(1)}
                      className="w-full sm:w-auto border border-[#8B3A2A] text-[#8B3A2A] px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-all duration-200 text-center"
                    >
                      &larr; Back to Address
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActiveStep(3)} 
                      className="w-full sm:w-auto bg-[#8B3A2A] text-[#FFFFFF] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] transition-colors shadow-md text-center"
                    >
                      Proceed to Payment &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Local STEP 3: Integrated Payment Method Interface */}
              {activeStep === 3 && (
                <div className="bg-[#FFFFFF] border border-[#D4A24C] rounded-3xl p-5 sm:p-8 shadow-xl">
                  <h2 className="text-[#D4A24C] text-lg sm:text-xl font-bold mb-6 uppercase">
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {paymentMethods.map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => {
                          setSelectedMethod(method);
                          setSelectedApp(""); 
                        }}
                        className={`py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all cursor-pointer text-center ${
                          selectedMethod === method
                            ? "bg-[#8B3A2A] text-white shadow-md font-bold"
                            : "bg-[#FBF7F2] border border-[#F0E6D8] text-[#4B5563] hover:border-[#8B3A2A]"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6 min-h-40">
                    {selectedMethod === "UPI" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Enter UPI ID</label>
                          <input type="text" placeholder="name@bank" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none focus:border-[#8B3A2A]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xs text-[#4B5563] mb-2 uppercase tracking-wider">Popular UPI Apps</h3>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {["GPay", "PhonePe", "Paytm"].map((app) => (
                              <button 
                                key={app}
                                type="button" 
                                onClick={() => setSelectedApp(app)}
                                className={`border rounded-xl p-3 text-xs sm:text-sm transition-all ${selectedApp === app ? "border-[#8B3A2A] bg-[#8B3A2A]/5 font-bold text-[#8B3A2A]" : "border-[#F0E6D8] bg-[#FBF7F2] hover:border-[#8B3A2A]"}`}
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedApp && (
                          <div className="mt-6 border border-[#F0E6D8] bg-[#FBF7F2] rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center animate-fadeIn">
                            <h4 className="text-sm font-bold mb-2 text-[#8B3A2A]">Scan QR Code to pay via {selectedApp}</h4>
                            <p className="text-xs text-gray-500 mb-4">Please scan the QR code using your {selectedApp} app to complete the payment of ₹{totalAmountCalculated}</p>
                            
                            <div className="w-40 h-40 sm:w-44 sm:h-44 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center shadow-md">
                              <img 
                                src={qrCodeUrl} 
                                alt={`${selectedApp} QR Code`} 
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>

                            <button 
                              type="button"
                              onClick={() => alert(`Verifying payment from ${selectedApp}...`)}
                              className="mt-4 bg-[#8B3A2A] hover:bg-[#6D2D22] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
                            >
                              Verify Payment
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedMethod === "Card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Card Number</label>
                          <input type="text" placeholder="1234 5678 9012 3456" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Name on Card</label>
                          <input type="text" placeholder="Card Holder Name" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">CVV</label>
                            <input type="password" placeholder="***" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none" />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMethod === "Net Banking" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Select Bank</label>
                          <select className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] cursor-pointer focus:outline-none">
                            <option>SBI</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Account Holder Name</label>
                          <input type="text" placeholder="Enter Account Holder Name" className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2] focus:outline-none" />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "COD" && (
                      <div className="bg-amber-50/60 border border-amber-200 text-amber-900 rounded-xl p-4 text-sm leading-relaxed">
                        📌 <strong>Cash on Delivery selected:</strong> Extra ₹15 handling charge will be collected upon successful product delivery.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-[#F0E6D8] mt-6">
                    <button 
                      type="button" 
                      onClick={() => setActiveStep(2)}
                      className="w-full sm:w-auto border border-[#8B3A2A] text-[#8B3A2A] px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-all duration-200 text-center"
                    >
                      &larr; Back to Shipping
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActiveStep(4)} 
                      className="w-full sm:w-auto bg-[#8B3A2A] text-[#FFFFFF] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] transition-colors shadow-md text-center"
                    >
                      Proceed to Review &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Local STEP 4: Review Details Block */}
              {activeStep === 4 && (
                <div className="bg-[#FFFFFF] border border-[#F0E6D8] rounded-3xl p-5 sm:p-6 shadow-lg space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#D4A24C]">
                    Review Your Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-[#FBF7F2] border border-[#F0E6D8] rounded-2xl p-4 space-y-2">
                      <h3 className="font-bold text-[#8B3A2A]">Delivery Address</h3>
                      <p className="font-semibold">{addressData.name}</p>
                      <p className="text-[#4B5563] text-xs">{addressData.addressLine}</p>
                      {addressData.addressLine2 && <p className="text-[#4B5563] text-xs">{addressData.addressLine2}</p>}
                      <p className="text-[#4B5563] text-xs">{addressData.state}, {addressData.country} - {addressData.pinCode}</p>
                      <p className="text-[#4B5563] text-xs">📞 {addressData.mobile}</p>
                    </div>

                    <div className="bg-[#FBF7F2] border border-[#F0E6D8] rounded-2xl p-4 space-y-2">
                      <h3 className="font-bold text-[#8B3A2A]">Shipping & Payment</h3>
                      <p className="text-xs"><span className="text-[#4B5563]">Method:</span> <span className="font-semibold uppercase">{shippingMethod} Shipping</span></p>
                      <p className="text-xs"><span className="text-[#4B5563]">Payment Mode:</span> <span className="font-semibold">{selectedMethod}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#F0E6D8]">
                    <button 
                      type="button" 
                      onClick={() => setActiveStep(3)}
                      className="w-full sm:w-auto border border-[#8B3A2A] text-[#8B3A2A] px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#FFFFFF] hover:bg-[#8B3A2A] hover:text-[#FFFFFF] transition-all duration-200 text-center"
                    >
                      &larr; Back to Payment
                    </button>
                    <button 
                      type="button" 
                      onClick={handlePlaceOrder} 
                      className="w-full sm:w-auto bg-[#8B3A2A] text-[#FFFFFF] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6D2D22] transition-colors shadow-md text-center"
                    >
                      Confirm & Place Order ✔
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Sticky Order Summary Pricing component panel */}
            <div className="col-span-12 lg:col-span-3 bg-[#FFFFFF] border border-[#F0E6D8] rounded-3xl p-5 shadow-lg h-fit space-y-4 lg:sticky lg:top-24">
              <h3 className="text-sm font-bold tracking-wide text-[#1E1612]">Order Summary</h3>
              
              <div className="space-y-2 text-xs font-medium text-[#4B5563] border-b border-[#F0E6D8] pb-3">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-[#1E1612]">₹{baseSubtotal}</span></div>
                <div className="flex justify-between"><span>Shipping Charge</span><span className="text-[#1E1612]">{shippingCharge > 0 ? `+ ₹${shippingCharge}` : "FREE"}</span></div>
                <div className="flex justify-between"><span>Estimated GST</span><span className="text-[#1E1612]">+ ₹{gstCharge}</span></div>
                {activeStep >= 3 && selectedMethod === "COD" && (
                  <div className="flex justify-between text-amber-700"><span>COD Handling Fee</span><span>+ ₹15</span></div>
                )}
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-bold text-[#1E1612]">Total Amount</span>
                <span className="text-lg font-black text-[#8B3A2A]">₹{totalAmountCalculated}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}