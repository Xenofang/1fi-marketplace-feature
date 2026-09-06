import { useState } from "react";
import Marketplace from "./Marketplace";

import {
  Search,
  Store,
  ChevronRight,
} from "lucide-react";

import BottomNavbar from "../../Components/NavBar";
const brands = [
  {
    name: "Air India",
    subtitle: "No-cost EMIs upto 18 months",
    logo: "/assets/air-india.png",
  },
  {
    name: "Apple Premium Reseller",
    subtitle: "No-cost EMIs upto 24 months",
    logo: "/assets/apple.png",
  },
  {
    name: "CaratLane",
    subtitle: "No-cost EMIs upto 6 months",
    logo: "/assets/caratlane.png",
  },
  {
    name: "Croma",
    subtitle: "No-cost EMIs upto 12 months",
    logo: "/assets/croma.png",
  },
];

function Shop() {
  const [activeTab, setActiveTab] = useState("brands");
  const [search, setSearch] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBrandClick = (brand) => {
    console.log("Selected:", brand.name);
  };

  return (
    <div className="min-h-screen bg-[#202020] pb-28 text-white">

      {/* ================= HERO ================= */}

      <section
        className="
          relative
          min-h-[520px]
          overflow-hidden
          bg-gradient-to-br
          from-[#34119d]
          via-[#4216c3]
          to-[#2e0c91]
          px-6
          py-10
          md:min-h-[475px]
          md:px-[6%]
          md:py-12
        "
      >
        {/* Hero glow */}

        <div
          className="
            absolute
            right-[10%]
            top-[20%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-purple-500/30
            blur-[100px]
          "
        />

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            w-full
            md:w-[52%]
          "
        >
          {/* EMI Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/60
              px-4
              py-2
              text-xs
              font-bold
              tracking-[1.2px]
              md:text-sm
            "
          >
            <span className="text-lg">✦</span>
            NO-COST EMIs
          </div>

          {/* Heading */}

          <h1
            className="
              mt-5
              text-[39px]
              font-extrabold
              leading-[0.98]
              tracking-[-2px]
              sm:text-[46px]
              md:text-[56px]
              lg:text-[64px]
            "
          >
            Shop today,
            <br />

            <em className="font-normal">
              Pay later
            </em>{" "}
            using
            <br />

            Mutual funds.
          </h1>

          {/* Description */}

          <p
            className="
              mt-4
              text-base
              leading-[1.35]
              text-purple-100
              md:text-xl
            "
          >
            No credit score required. No interest.
            <br />
            Backed by your investments.
          </p>
        </div>

        {/* Hero image */}

        <div
          className="
            absolute
            bottom-0
            right-0
            flex
            h-[240px]
            w-full
            items-center
            justify-center
            md:h-full
            md:w-1/2
          "
        >
          <img
            src="/assets/shop-hero.png"
            alt="Shopping with mutual funds"
            className="
              h-full
              w-full
              max-w-[650px]
              object-contain
            "
          />
        </div>
      </section>

      {/* ================= TABS ================= */}

      <div
        className="
          relative
          z-20
          mx-auto
          mb-6
          grid
          min-h-[70px]
          w-[calc(100%-32px)]
          max-w-[850px]
          grid-cols-3
          rounded-full
          border
          border-[#484848]
          bg-[#28272d]
          p-[5px]
          md:min-h-[74px]
          md:-mt-5
          md:w-[calc(100%-72px)]
        "
      >
        {/* Top Brands */}

        <button
          type="button"
          className={`
            relative
            rounded-full
            text-sm
            font-bold
            transition
            md:text-xl
            ${
              activeTab === "brands"
                ? "bg-[#111111] text-[#d47cff]"
                : "text-[#9999a8]"
            }
          `}
          onClick={() => setActiveTab("brands")}
        >
          Top Brands

          {activeTab === "brands" && (
            <span
              className="
                absolute
                bottom-2
                left-1/2
                h-1
                w-7
                -translate-x-1/2
                rounded-full
                bg-[#8f35ff]
                md:w-10
              "
            />
          )}
        </button>

        {/* Nearby Stores */}

        <button
          type="button"
          className={`
            relative
            rounded-full
            text-sm
            font-bold
            transition
            md:text-xl
            ${
              activeTab === "nearby"
                ? "bg-[#111111] text-[#d47cff]"
                : "text-[#9999a8]"
            }
          `}
          onClick={() => setActiveTab("nearby")}
        >
          Nearby Stores

          {activeTab === "nearby" && (
            <span
              className="
                absolute
                bottom-2
                left-1/2
                h-1
                w-7
                -translate-x-1/2
                rounded-full
                bg-[#8f35ff]
                md:w-10
              "
            />
          )}
        </button>

        {/* Marketplace */}

        <button
          type="button"
          className={`
            relative
            rounded-full
            text-sm
            font-bold
            transition
            md:text-xl
            ${
              activeTab === "marketplace"
                ? "bg-[#111111] text-[#d47cff]"
                : "text-[#9999a8]"
            }
          `}
          onClick={() => setActiveTab("marketplace")}
        >
          Marketplace

          {activeTab === "marketplace" && (
            <span
              className="
                absolute
                bottom-2
                left-1/2
                h-1
                w-7
                -translate-x-1/2
                rounded-full
                bg-[#8f35ff]
                md:w-10
              "
            />
          )}
        </button>
      </div>

      {/* ================= SEARCH ================= */}

      <div
        className="
          mx-auto
          mb-7
          flex
          h-[62px]
          w-[calc(100%-32px)]
          max-w-[850px]
          items-center
          rounded-full
          border
          border-[#464646]
          bg-[#111111]
          px-5
          text-[#9da0ad]
          md:h-[65px]
          md:w-[calc(100%-72px)]
          md:px-7
        "
      >
        <Search
          size={26}
          className="shrink-0"
        />

        <input
          type="text"
          placeholder={
            activeTab === "marketplace"
              ? "Search products..."
              : "Search online stores..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            ml-4
            min-w-0
            flex-1
            bg-transparent
            text-base
            text-white
            outline-none
            placeholder:text-[#858793]
            md:text-xl
          "
        />
      </div>

      {/* ================= TOP BRANDS ================= */}

      {activeTab === "brands" && (
        <section
          className="
            mx-auto
            w-[calc(100%-32px)]
            max-w-[850px]
            md:w-[calc(100%-72px)]
          "
        >
          <h2 className="mb-5 text-2xl font-extrabold md:text-3xl">
            Top Brands
          </h2>

          <div className="flex flex-col gap-4 md:gap-5">
            {filteredBrands.map((brand) => (
              <button
                type="button"
                key={brand.name}
                onClick={() => handleBrandClick(brand)}
                className="
                  group
                  flex
                  min-h-[125px]
                  w-full
                  items-center
                  rounded-[25px]
                  border
                  border-[#444]
                  bg-[#111111]
                  p-[18px]
                  text-left
                  transition
                  hover:-translate-y-[2px]
                  hover:border-purple-700
                  hover:bg-[#151515]
                  active:scale-[0.99]
                  md:min-h-[166px]
                  md:rounded-[30px]
                  md:p-[26px]
                "
              >
                {/* Logo */}

                <div
                  className="
                    h-[82px]
                    w-[82px]
                    shrink-0
                    overflow-hidden
                    rounded-[19px]
                    bg-white
                    md:h-[114px]
                    md:w-[114px]
                    md:rounded-[25px]
                  "
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Information */}

                <div className="ml-[18px] min-w-0 md:ml-[35px]">
                  <h3
                    className="
                      text-lg
                      font-bold
                      leading-tight
                      text-white
                      md:text-[29px]
                    "
                  >
                    {brand.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-tight
                      text-[#8d8d99]
                      md:text-[21px]
                    "
                  >
                    {brand.subtitle}
                  </p>
                </div>

                {/* Arrow */}

                <ChevronRight
                  size={22}
                  className="
                    ml-auto
                    hidden
                    shrink-0
                    text-[#777]
                    transition
                    group-hover:translate-x-1
                    md:block
                  "
                />
              </button>
            ))}

            {filteredBrands.length === 0 && (
              <div
                className="
                  rounded-3xl
                  border
                  border-[#444]
                  bg-[#111111]
                  p-8
                  text-center
                  text-gray-400
                "
              >
                No stores found
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= NEARBY ================= */}

      {activeTab === "nearby" && (
        <section
          className="
            mx-auto
            w-[calc(100%-32px)]
            max-w-[850px]
            md:w-[calc(100%-72px)]
          "
        >
          <h2 className="mb-5 text-2xl font-extrabold md:text-3xl">
            Nearby Stores
          </h2>

          <div
            className="
              flex
              min-h-[250px]
              flex-col
              items-center
              justify-center
              rounded-[30px]
              border
              border-[#444]
              bg-[#111111]
              p-8
              text-center
            "
          >
            <Store
              size={42}
              className="text-purple-400"
            />

            <h3 className="mt-4 text-xl font-bold md:text-2xl">
              Find stores near you
            </h3>

            <p className="mt-2 max-w-[500px] text-gray-400">
              Discover stores where you can shop using your
              mutual fund investments.
            </p>

            <button
              type="button"
              onClick={() => console.log("Find nearby stores")}
              className="
                mt-5
                rounded-full
                bg-purple-600
                px-6
                py-3
                font-bold
                text-white
                transition
                hover:bg-purple-500
                active:scale-95
              "
            >
              Find Nearby Stores
            </button>
          </div>
        </section>
      )}

      {/* ================= MARKETPLACE ================= */}

      {activeTab === "marketplace" && (
        <Marketplace search={search} />
      )}
    <BottomNavbar/>
    </div>
  );
}

export default Shop;