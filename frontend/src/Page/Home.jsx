import { CreditCard, ShoppingBag, Receipt } from "lucide-react";
import BottomNavbar from "../Components/NavBar";

function Home() {
  return (
    <div className="min-h-screen bg-[#202020] pb-28 text-white">
      {/* Header */}
      <div className="px-6 py-8 md:px-[6%]">
        <p className="text-sm text-[#9999a8]">Welcome back</p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">
          Hello 👋
        </h1>
      </div>

      {/* Credit Limit Card */}
      <section className="mx-auto w-[calc(100%-32px)] max-w-[850px] rounded-[25px] bg-gradient-to-br from-[#34119d] via-[#4216c3] to-[#2e0c91] p-6">
        <p className="text-sm text-white/70">Available Credit Limit</p>

        <h2 className="mt-2 text-4xl font-bold">
          ₹50,000
        </h2>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Used</p>
            <p className="font-semibold">₹12,500</p>
          </div>

          <div>
            <p className="text-xs text-white/60">Available</p>
            <p className="font-semibold">₹37,500</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto mt-6 w-[calc(100%-32px)] max-w-[850px]">
        <h2 className="mb-4 text-xl font-bold">
          Quick Actions
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <button className="rounded-2xl border border-[#444] bg-[#111] p-5 transition hover:-translate-y-1 hover:border-[#8f35ff]">
            <ShoppingBag className="mx-auto text-[#cf6eff]" size={28} />
            <p className="mt-2 text-sm">Shop</p>
          </button>

          <button className="rounded-2xl border border-[#444] bg-[#111] p-5 transition hover:-translate-y-1 hover:border-[#8f35ff]">
            <Receipt className="mx-auto text-[#cf6eff]" size={28} />
            <p className="mt-2 text-sm">EMI Dues</p>
          </button>

          <button className="rounded-2xl border border-[#444] bg-[#111] p-5 transition hover:-translate-y-1 hover:border-[#8f35ff]">
            <CreditCard className="mx-auto text-[#cf6eff]" size={28} />
            <p className="mt-2 text-sm">Payments</p>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mx-auto mt-8 w-[calc(100%-32px)] max-w-[850px]">
        <h2 className="mb-4 text-xl font-bold">
          Recent Activity
        </h2>

        <div className="rounded-[25px] border border-[#444] bg-[#111] p-5">
          <p className="text-sm text-[#9999a8]">
            No recent transactions
          </p>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNavbar/>
    </div>
  );
}

export default Home;