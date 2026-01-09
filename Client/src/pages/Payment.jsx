import { useLocation } from "react-router-dom";

function Payment() {
  const { state } = useLocation();
  const plan = state?.plan;

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No plan selected</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200
                 flex justify-center items-start pt-32 px-4 relative z-10"
    >
      {/* CARD */}
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-8 z-20">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Payment Verification
        </h2>

        <p className="text-sm text-center text-gray-600 mt-1 mb-5">
          Enter your payment details to activate credits
        </p>

        {/* PLAN DETAILS */}
        <div className="bg-gray-100 rounded-xl p-4 mb-5 text-sm space-y-2">
          <p>📦 <b>Plan:</b> {plan.id}</p>
          <p>🎯 <b>Credits:</b> {plan.credits}</p>
          <p>💰 <b>Amount Paid:</b> ₹{plan.price}</p>
        </div>

        {/* WEB3FORMS */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-4"
        >
          <input
            type="hidden"
            name="access_key"
            value="5129367d-10f9-4acf-8103-9ba03a6b6092"
          />

          <input type="hidden" name="Plan" value={plan.id} />
          <input type="hidden" name="Credits" value={plan.credits} />
          <input type="hidden" name="Amount" value={plan.price} />

          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number (used for UPI)"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="utr"
            placeholder="UTR / Transaction ID"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <p className="text-xs text-gray-500">
            ℹ UTR is available in your UPI app payment history
          </p>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full text-lg"
          >
            Submit Payment Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
