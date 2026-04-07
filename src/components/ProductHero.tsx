"use client";
import Image from "next/image";
import type { Product } from "../../app/types";

export default function ProductHero({ product }: { product: Product }) {
  // Stateless presentational hero: no hooks or interactivity.
  const first = product.images?.[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-4">
          <div className="relative h-96 w-full bg-gray-100 rounded">
            {first ? <Image src={first} alt={product.name} fill style={{ objectFit: "cover" }} /> : null}
          </div>
          <div className="mt-2 flex gap-2">
            {(product.images ?? []).map((src, i) => (
              <div key={i} className={`h-16 w-16 rounded overflow-hidden border`}>
                <Image src={src} alt={`${product.name} ${i}`} width={64} height={64} style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <h1 className="text-2xl font-semibold text-indigo-700">{product.name}</h1>
          {product.vendor ? <div className="text-sm text-zinc-600">By {product.vendor}</div> : null}
          <div className="mt-3 text-3xl font-bold text-emerald-600">${product.price}</div>
          <div className="mt-2 text-sm text-zinc-600">Rating: {product.rating ?? '—'}</div>

          <div className="mt-4 flex items-center gap-2">
            <label className="text-sm">Qty</label>
            <div className="w-20 border rounded p-1 text-center">1</div>
            <button className="px-3 py-2 bg-emerald-600 text-white rounded">Add to cart</button>
          </div>

          <div className="mt-4 text-sm text-zinc-600">
            <div>SKU: {String((product as any).sku ?? '—')}</div>
            <div>In stock: {product.stock ?? '—'}</div>
            <div>Category: {product.category}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
