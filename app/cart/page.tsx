"use client";
import Link from "next/link";

export default function CartPage() {
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <p className="mb-4"></p>
      <p>
        Visit the <Link href="/">product list</Link> to view items.
      </p>
    </div>
  );
}
