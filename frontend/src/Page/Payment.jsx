import { useState } from "react";
import { ArrowLeft, Check, CreditCard } from "lucide-react";

const formatPrice = (price) =>
  `₹${Number(price || 0).toLocaleString("en-IN")}`;

export default function PaymentPage({
  product,
  variant,
  plan,
  onBack,
  onPayment,
}) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const price = Number(variant?.price ?? product?.price ?? 0);
  const emi = Number(plan?.emi ?? plan?.monthlyEmi ?? 0);
  const tenure = plan?.tenure ?? plan?.months ?? 0;

  const handlePayment = async () => {
    setLoading(true);

    await onPayment?.({
      product,
      variant,
      plan,
      paymentMethod,
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-212.5">

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-full bg-[#151515] p-3 hover:bg-[#222]"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="text-sm text-gray-400">
              Complete your purchase
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Order */}
          <section className="rounded-3xl border border-[#292929] bg-[#111] p-5">

            <h2 className="mb-5 text-lg font-bold">
              Order Summary
            </h2>

            <div className="flex gap-4">
              <img
                src={variant?.image || product?.image}
                alt={product?.name}
                className="h-24 w-24 rounded-2xl bg-[#1b1b1b] object-contain p-2"
              />

              <div>
                <h3 className="font-bold">
                  {product?.name || product?.title}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {variant?.name || variant?.label}
                </p>

                <p className="mt-2 text-lg font-bold text-purple-400">
                  {formatPrice(price)}
                </p>
              </div>
            </div>

            {/* EMI */}
            <div className="mt-6 rounded-2xl bg-[#181818] p-4">
              <p className="text-sm text-gray-400">
                Selected EMI
              </p>

              <div className="mt-2 flex justify-between">
                <span className="font-semibold">
                  {plan?.name || `${tenure} Months EMI`}
                </span>

                <Check className="text-purple-400" size={20} />
              </div>

              <p className="mt-2 text-sm text-gray-400">
                {formatPrice(emi)} / month
              </p>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-3xl border border-[#292929] bg-[#111] p-5">

            <h2 className="mb-5 text-lg font-bold">
              Payment Method
            </h2>

            <div className="space-y-3">
              {["upi", "card"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full rounded-2xl border p-4 text-left ${
                    paymentMethod === method
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-[#292929] bg-[#151515]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {method === "upi"
                        ? "UPI"
                        : "Debit / Credit Card"}
                    </span>

                    {paymentMethod === method && (
                      <Check
                        size={18}
                        className="text-purple-400"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="my-6 border-t border-[#292929] pt-5">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Total
                </span>

                <span className="text-xl font-bold">
                  {formatPrice(price)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="
                flex w-full items-center justify-center gap-2
                rounded-2xl bg-purple-600 py-4
                font-bold transition
                hover:bg-purple-500
                disabled:opacity-50
              "
            >
              <CreditCard size={18} />

              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}