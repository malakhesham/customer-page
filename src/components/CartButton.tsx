"use client";
import Link from "next/link";

export default function CartButton() {
  // Presentational-only cart button. No state or context.
  return (
    <Link href="/cart" className="inline-flex items-center gap-2 px-3 py-2 rounded bg-indigo-600 text-white text-sm">
      🛒 <span>Cart</span>
      <span className="inline-flex items-center justify-center w-6 h-6 bg-white text-indigo-600 rounded-full text-xs">0</span>
    </Link>
  );
}
