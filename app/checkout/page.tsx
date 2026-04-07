"use client";
import Link from "next/link";

export default function CheckoutPage() {
  // Presentational checkout page — no order submission or local persistence in this frontend-only build.
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <p className="mb-4">Checkout is disabled in this frontend-only build. Integrate your backend to process orders and persist purchase records.</p>
      <p>Go back to the <Link href="/">product list</Link>.</p>
    </div>
  );
}
