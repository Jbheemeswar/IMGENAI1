import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UPI_ID = "juttigabheemeswar-1@okicici";
const QR_IMAGE = "/upi-qr.png";

const plans = [
  { id: "Basic", price: 10, credits: 100 },
  { id: "Advanced", price: 50, credits: 500 },
  { id: "Business", price: 250, credits: 5000 },
];

function BuyCredit() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const submitProof = () => {
    if (!selectedPlan) {
      alert("Please select a plan first");
      return;
    }

    const planObj = plans.find(p => p.id === selectedPlan);
    navigate("/payment", { state: { plan: planObj } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4">

      {/* MAIN CARD */}
      <div
        className="w-[460px] rounded-3xl shadow-2xl p-10
        bg-gradient-to-br from-indigo-50 via-white to-cyan-50
        backdrop-blur-md border border-white/60"
      >

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Upgrade Your Credits
        </h2>
        <p className="text-lg text-center text-gray-700 mt-2 mb-6">
          Get more image generations instantly!
        </p>

        {/* FEATURES */}
        <div className="flex justify-center gap-6 text-sm mb-7 text-gray-600">
          <span>⚡ Instant access</span>
          <span>🔒 Secure payment</span>
          <span>✨ High-quality</span>
        </div>

        {/* PLANS */}
        <div className="space-y-5">
          {plans.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`flex justify-between items-center rounded-2xl px-6 py-5 cursor-pointer transition-all
              border
              ${selectedPlan === p.id
                ? "border-black bg-white/70 shadow-md"
                : "border-gray-200 bg-white/40 hover:bg-white/60"}`}
            >
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {p.id}
                </p>
                <p className="text-base text-gray-600">
                  {p.credits} credits
                </p>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ₹{p.price}
              </p>
            </div>
          ))}
        </div>

        {/* UPI SECTION */}
        <div className="bg-white/60 rounded-2xl p-6 mt-8 text-center backdrop-blur-sm">
          <p className="text-lg font-semibold text-gray-900 mb-3">
            Pay via UPI
          </p>

          <img
            src={QR_IMAGE}
            alt="UPI QR"
            className="w-40 mx-auto mb-3"
          />

          <p className="text-base font-mono text-gray-900">
            {UPI_ID}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Use any UPI app (GPay, PhonePe, Paytm)
          </p>
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={submitProof}
          className="w-full bg-black text-white text-xl py-3.5 rounded-full mt-8 hover:opacity-90 transition"
        >
          Continue
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Credits will be added after payment verification
        </p>

      </div>
    </div>
  );
}

export default BuyCredit;
