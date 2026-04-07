"use client";
import type { Product } from "../../app/types";

export default function ProductDetailsClient({ product }: { product: Product }) {
  // Presentational-only details: show description and server-provided reviews (no logic, no localStorage)
  const reviews: any[] = (product as any).reviews ?? [];

  return (
    <div className="space-y-3">
      <div className="text-sm text-zinc-600">Viewers: {String((product as any).viewers ?? "—")}</div>

      <div>
        <h4 className="font-medium mb-2">Customer reviews</h4>
        {reviews.length === 0 ? (
          <p className="text-sm text-zinc-600">No reviews yet.</p>
        ) : (
          <ul className="space-y-2 text-sm text-zinc-700">
            {reviews.map((r: any, i: number) => (
              <li key={i} className="border rounded p-2">
                <div className="font-medium">{r.user}</div>
                <div className="text-sm text-zinc-600">Rating: {r.rating}</div>
                <div className="mt-1">{r.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="text-sm text-zinc-600">(Reviews are read-only in this frontend build.)</p>
      </div>
    </div>
  );
}
