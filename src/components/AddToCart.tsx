"use client";
export default function AddToCart({ id, productId, onClick }: { id?: string; productId?: string; onClick?: () => void }) {
  // Presentational add-to-cart button. No cart logic here.
  const pid = id ?? productId;
  if (!pid) return null;
  return (
    <button onClick={onClick ?? (() => {})} className="px-3 py-1 bg-green-500 text-white rounded text-sm">
      Add to cart
    </button>
  );
}
