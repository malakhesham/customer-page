"use client";
import Link from "next/link";
import Image from "next/image";
import FavButton from "./FavButton";
import AddToCart from "./AddToCart";
import type { Product } from "../../app/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition">
      <div className="block">
        <Link href={`/products/${product.id}`} className="group block">
          <div className="relative h-48 w-full bg-gray-200">
            {product.images?.[0] ? (
              <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: "cover" }} />
            ) : null}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-indigo-700 group-hover:text-indigo-800">{product.name}</h3>
            <p className="text-sm text-zinc-600">{product.category}</p>
          </div>
        </Link>
        <div className="p-4 pt-0 flex items-center justify-between">
          <div className="text-lg font-bold text-emerald-600">${product.price}</div>
          <div className="flex items-center gap-2">
            <FavButton id={product.id} />
            <AddToCart id={product.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
