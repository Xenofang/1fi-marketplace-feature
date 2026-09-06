import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, Check, CreditCard, ChevronRight } from "lucide-react";

import { getProducts } from "../../services/ProductApi";
import PaymentPage from "../../Components/Payment";

function Marketplace({ search = "" }) {
  const [showPayment, setShowPayment] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // --------------------------------
  // FETCH PRODUCTS
  // --------------------------------
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);

        // Select first product by default
        if (data.length > 0) {
          const firstProduct = data[0];

          setSelectedProduct(firstProduct);
          setSelectedVariant(firstProduct.variants?.[0] ?? null);
          setSelectedPlan(firstProduct.emiPlans?.[0] ?? null);
        }
      } catch (err) {
        console.error("Marketplace error:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // --------------------------------
  // SEARCH
  // --------------------------------
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";

      const productDetails = Array.isArray(product.details)
        ? product.details.join(" ").toLowerCase()
        : String(product.details || "").toLowerCase();

      const productVariants = Array.isArray(product.variants)
        ? product.variants
            .map((variant) =>
              typeof variant === "object"
                ? variant.name || ""
                : String(variant),
            )
            .join(" ")
            .toLowerCase()
        : "";

      return (
        productName.includes(query) ||
        productDetails.includes(query) ||
        productVariants.includes(query)
      );
    });
  }, [products, search]);

  // --------------------------------
  // PRODUCT SELECTION
  // --------------------------------
  const handleProductSelect = (product) => {
    setSelectedProduct(product);

    setSelectedVariant(product.variants?.[0] ?? null);

    setSelectedPlan(product.emiPlans?.[0] ?? null);
  };

  // --------------------------------
  // VARIANT SELECTION
  // --------------------------------
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  // --------------------------------
  // EMI SELECTION
  // --------------------------------
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // --------------------------------
  // PROCEED
  // --------------------------------
  if (showPayment) {
    return (
      <PaymentPage
        product={selectedProduct}
        variant={selectedVariant}
        plan={selectedPlan}
        onBack={() => setShowPayment(false)}
        onPayment={async (paymentData) => {
          console.log("Payment:", paymentData);
        }}
      />
    );
  }

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="mx-auto w-[calc(100%-32px)] max-w-[850px] pb-10">
        <div className="rounded-3xl border border-[#292929] bg-[#111111] p-10 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />

          <p className="text-sm text-gray-400">Loading products...</p>
        </div>
      </section>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error) {
    return (
      <section className="mx-auto w-[calc(100%-32px)] max-w-[850px] pb-10">
        <div className="rounded-3xl border border-red-500/30 bg-[#111111] p-10 text-center">
          <ShoppingBag size={42} className="mx-auto text-red-400" />

          <h3 className="mt-4 text-lg font-bold text-white">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // NO PRODUCTS

  if (products.length === 0) {
    return (
      <section className="mx-auto w-[calc(100%-32px)] max-w-[850px] pb-10">
        <div className="rounded-3xl border border-[#292929] bg-[#111111] p-10 text-center">
          <ShoppingBag size={42} className="mx-auto text-purple-400" />

          <h3 className="mt-4 text-xl font-bold text-white">
            No products available
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            There are currently no products in the marketplace.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[calc(100%-32px)] max-w-[850px] pb-28 md:pb-10">
      {/* HEADER*/}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Marketplace
          </h2>

          <p className="mt-1 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
            Shop now and pay later using your mutual funds.
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-500/10 md:h-12 md:w-12">
          <button className="text-purple-400 p-2 hover:bg-purple-50 rounded-full transition-colors">
            <ShoppingBag size={23} />
          </button>
        </div>
      </div>

      {/* SEARCH RESULT */}
      {search.trim() && (
        <p className="mb-4 text-sm text-gray-500">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      )}

      {/* NO SEARCH RESULTS */}
      {filteredProducts.length === 0 && (
        <div className="rounded-3xl border border-[#292929] bg-[#111111] p-10 text-center">
          <ShoppingBag size={40} className="mx-auto text-gray-600" />

          <h3 className="mt-4 text-lg font-bold text-white">
            No products found
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Try searching for a different product.
          </p>
        </div>
      )}

      {/*PRODUCT LIST */}
      <div className="space-y-5">
        {filteredProducts.map((product) => {
          const isSelected = selectedProduct?.id === product.id;

          const details = Array.isArray(product.details)
            ? product.details
            : product.details
              ? [product.details]
              : [];

          return (
            <div
              key={product.id}
              className={`
                overflow-hidden
                rounded-3xl
                border
                transition-all
                duration-200
                ${
                  isSelected
                    ? "border-purple-500/70 bg-[#171717] shadow-lg shadow-purple-950/20"
                    : "border-[#303030] bg-[#111111] hover:border-[#4a4a4a]"
                }
              `}
            >
              {/* PRODUCT SUMMARY */}
              <button
                type="button"
                onClick={() => handleProductSelect(product)}
                className="w-full p-4 text-left sm:p-5"
              >
                <div className="flex gap-4 sm:gap-5">
                  {/* IMAGE */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white sm:h-32 sm:w-32 md:h-36 md:w-36">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-2"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-white sm:text-xl md:text-2xl">
                          {product.name}
                        </h3>

                        {details.length > 0 && (
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400 sm:text-sm">
                            {details.join(" • ")}
                          </p>
                        )}
                      </div>

                      {isSelected && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white">
                          <Check size={16} />
                        </div>
                      )}
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xl font-bold text-white sm:text-2xl">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </p>

                      <p className="mt-1 text-xs font-medium text-green-400 sm:text-sm">
                        No-cost EMI available
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              {/* SELECTED PRODUCT*/}
              {isSelected && (
                <div className="border-t border-[#2f2f2f] px-4 pb-5 pt-5 sm:px-5">
                  {/* ================================
                      VARIANTS
                  ================================= */}
                  {Array.isArray(product.variants) &&
                    product.variants.length > 0 && (
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-white sm:text-base">
                          Select variant
                        </h4>

                        <div className="flex flex-wrap gap-2.5">
                          {product.variants.map((variant, index) => {
                            const variantName =
                              typeof variant === "object"
                                ? variant.name
                                : variant;

                            const variantId =
                              typeof variant === "object"
                                ? variant.id
                                : variant;

                            const selectedId =
                              selectedVariant &&
                              typeof selectedVariant === "object"
                                ? selectedVariant.id
                                : selectedVariant;

                            const isVariantSelected =
                              selectedId === variantId ||
                              selectedVariant === variant;

                            return (
                              <button
                                key={variantId || index}
                                type="button"
                                onClick={() => handleVariantSelect(variant)}
                                className={`
                                    rounded-xl
                                    border
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                      isVariantSelected
                                        ? "border-purple-500 bg-purple-500/15 text-purple-300"
                                        : "border-[#414141] bg-[#202020] text-gray-300 hover:border-purple-500/50 hover:text-white"
                                    }
                                  `}
                              >
                                {variantName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Product Details */}
                  <div className="mt-5 rounded-2xl border border-[#292929] bg-[#1d1d1d] p-4 sm:mt-6">
                    <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">
                      Product details
                    </h4>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Product</p>

                        <p className="mt-1 truncate text-sm text-gray-200">
                          {product.name}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Variant</p>

                        <p className="mt-1 truncate text-sm text-gray-200">
                          {selectedVariant
                            ? typeof selectedVariant === "object"
                              ? selectedVariant.name
                              : selectedVariant
                            : "Not selected"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Price</p>

                        <p className="mt-1 text-sm text-gray-200">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Interest</p>

                        <p className="mt-1 text-sm font-medium text-green-400">
                          No interest
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*  EMI PLANS */}
                  {Array.isArray(product.emiPlans) &&
                    product.emiPlans.length > 0 && (
                      <div className="mt-5 sm:mt-6">
                        <div className="mb-3 flex items-center gap-2">
                          <CreditCard size={19} className="text-purple-400" />

                          <h4 className="text-sm font-semibold text-white sm:text-base">
                            Select EMI plan
                          </h4>
                        </div>

                        <div className="space-y-2.5">
                          {product.emiPlans.map((plan, index) => {
                            const isPlanSelected = selectedPlan?.id === plan.id;

                            return (
                              <button
                                key={plan.id || index}
                                type="button"
                                onClick={() => handlePlanSelect(plan)}
                                className={`
                                    w-full
                                    rounded-2xl
                                    border
                                    p-4
                                    text-left
                                    transition
                                    ${
                                      isPlanSelected
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-[#414141] bg-[#202020] hover:border-purple-500/40"
                                    }
                                  `}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <p className="font-semibold text-white">
                                      {plan.months} Months
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                      ₹
                                      {Number(
                                        plan.monthlyAmount || 0,
                                      ).toLocaleString("en-IN")}{" "}
                                      / month
                                    </p>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-xs font-semibold text-green-400 sm:text-sm">
                                      No-cost EMI
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                      {plan.interest ?? 0}% interest
                                    </p>
                                  </div>
                                </div>

                                {isPlanSelected && (
                                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-purple-300 sm:text-sm">
                                    <Check size={15} />
                                    Selected
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* ================================
                      SELECTED EMI
                  ================================= */}
                  {selectedPlan && (
                    <div className="mt-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 sm:mt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-400 sm:text-sm">
                            Selected EMI
                          </p>

                          <p className="mt-1 text-base font-bold text-white sm:text-lg">
                            {selectedPlan.months} months
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400 sm:text-sm">
                            Monthly payment
                          </p>

                          <p className="mt-1 text-base font-bold text-white sm:text-lg">
                            ₹
                            {Number(
                              selectedPlan.monthlyAmount || 0,
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================================
                      CTA
                  ================================= */}
                  <button
                    type="button"
                    disabled={!selectedVariant || !selectedPlan}
                    onClick={() => setShowPayment(true)}
                    className=" mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 text-base font-bold text-white transition
                     hover:bg-purple-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40">
                    Proceed to Payment
                    <ChevronRight size={21} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Marketplace;
