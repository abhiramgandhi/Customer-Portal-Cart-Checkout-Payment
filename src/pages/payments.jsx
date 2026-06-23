import React, { useState } from "react";

export default function Payments({ navigateTo }) {
  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const baseAmount = 1716;
  const codCharge = selectedMethod === "COD" ? 15 : 0;
  const totalAmount = baseAmount + codCharge;

  const paymentMethods = [
    "UPI",
    "Card",
    "Net Banking",
    "COD",
  ];

  return (
    <div className="bg-[#FBF7F2] min-h-screen text-[#1E1612] font-sans">

      {/* Header */}
      <header className="bg-white border-b border-[#F0E6D8]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#8B3A2A] rounded-md bg-[#8B3A2A]/5"></div>

            <h1 className="text-2xl font-bold text-[#8B3A2A] tracking-wide">
              JHARCRAFT
              <span className="text-sm font-normal text-[#4B5563] ml-2">
                Customer
              </span>
            </h1>
          </div>

          <div className="flex gap-4 items-center">

            <button
              type="button"
              className="border border-[#F0E6D8] px-3 py-1.5 rounded-xl bg-[#D4A24C]/10"
            >
              🔔
            </button>

            <button
              type="button"
              className="border border-[#F0E6D8] px-4 py-1.5 rounded-xl text-sm"
            >
              EN ▼
            </button>

            <button
              type="button"
              className="bg-[#8B3A2A] text-white px-5 py-1.5 rounded-xl text-sm"
            >
              User ▼
            </button>

          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Stepper */}

        <div className="bg-white border border-[#F0E6D8] rounded-3xl p-3 flex flex-wrap gap-4 shadow-md mb-8">

          <div className="px-8 py-3 rounded-2xl bg-[#FBF7F2] border border-[#F0E6D8] font-semibold text-[#4B5563]">
            1 Address
          </div>

          <div className="px-8 py-3 rounded-2xl bg-[#FBF7F2] border border-[#F0E6D8] font-semibold text-[#4B5563]">
            2 Shipping
          </div>

          <div className="px-8 py-3 rounded-2xl bg-[#8B3A2A] text-white font-semibold shadow-md">
            3 Payment
          </div>

          <div className="px-8 py-3 rounded-2xl bg-[#FBF7F2] border border-[#F0E6D8] font-semibold text-[#4B5563]">
            4 Review
          </div>

        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Left Payment Area */}

          <div className="col-span-12 lg:col-span-9">

            <div className="bg-white border border-[#D4A24C] rounded-[36px] p-10 shadow-xl">

              <h2 className="text-[#D4A24C] text-2xl font-bold mb-8 uppercase">
                Payment Method
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

                {paymentMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedMethod(method)}
                    className={`py-5 rounded-2xl font-semibold text-lg transition-all
                    ${
                      selectedMethod === method
                        ? "bg-[#8B3A2A] text-white shadow-lg"
                        : "bg-[#FBF7F2] border border-[#F0E6D8] text-[#4B5563]"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

                            {/* Dynamic Forms */}

              {selectedMethod === "UPI" && (
                <div className="space-y-6">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Enter UPI ID
                    </label>

                    <input
                      type="text"
                      placeholder="name@bank"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">
                      Popular UPI Apps
                    </h3>

                    <div className="grid grid-cols-3 gap-4">

                      <button className="border border-[#F0E6D8] rounded-xl p-4 hover:border-[#8B3A2A]">
                        GPay
                      </button>

                      <button className="border border-[#F0E6D8] rounded-xl p-4 hover:border-[#8B3A2A]">
                        PhonePe
                      </button>

                      <button className="border border-[#F0E6D8] rounded-xl p-4 hover:border-[#8B3A2A]">
                        Paytm
                      </button>

                    </div>
                  </div>

                </div>
              )}

              {selectedMethod === "Card" && (
                <div className="grid md:grid-cols-2 gap-5">

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Name on Card
                    </label>

                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="***"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                </div>
              )}

              {selectedMethod === "Net Banking" && (
                <div className="space-y-5">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Select Bank
                    </label>

                    <select className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]">

                      <option>SBI</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Canara Bank</option>

                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Account Holder Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Account Holder Name"
                      className="w-full border border-[#F0E6D8] rounded-xl p-4 bg-[#FBF7F2]"
                    />
                  </div>

                </div>
              )}

              {selectedMethod === "COD" && (
                <div className="bg-[#FFF7ED] border border-[#D4A24C] rounded-2xl p-5">

                  <h3 className="font-bold text-[#8B3A2A] text-lg mb-2">
                    Cash on Delivery
                  </h3>

                  <p className="text-[#4B5563]">
                    Extra Charges ₹15 will be added to your order.
                  </p>

                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-10">

                <button
                  type="button"
                  onClick={() => navigateTo?.("shipping")}
                  className="border border-[#8B3A2A] text-[#8B3A2A] px-8 py-4 rounded-xl font-semibold"
                >
                  ← Back To Shipping
                </button>

                <button
                  type="button"
                  className="bg-[#8B3A2A] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#6D2D22]"
                >
                  Pay ₹{totalAmount}
                </button>

              </div>

            </div>
          </div>

                    {/* Right Summary */}

          <div className="col-span-12 lg:col-span-3">

            <div className="bg-white border border-[#F0E6D8] rounded-[36px] p-6 shadow-xl">

              <h3 className="text-sm text-[#4B5563] font-semibold mb-3">
                You're Paying
              </h3>

              <p className="text-4xl font-bold text-[#8B3A2A] mb-4">
                ₹{totalAmount}
              </p>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹1497</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹99</span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹120</span>
                </div>

                {selectedMethod === "COD" && (
                  <div className="flex justify-between text-[#8B3A2A] font-semibold">
                    <span>COD Charges</span>
                    <span>₹15</span>
                  </div>
                )}

              </div>

              <hr className="my-5 border-[#F0E6D8]" />

              <div className="flex justify-between text-lg font-bold">

                <span>Total</span>

                <span className="text-[#8B3A2A]">
                  ₹{totalAmount}
                </span>

              </div>

              <div className="mt-5 text-xs text-[#4B5563]">
                Order #JHC-00000
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}