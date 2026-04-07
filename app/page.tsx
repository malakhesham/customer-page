"use client";
import { useMemo, useState, useEffect } from "react";
import ProductCard from "../src/components/ProductCard";
import type { Product } from "./types";
import { fetchProducts } from "./lib/api";

const CATEGORIES = [
  "All",
  "Phone",
  "Laptop",
  "AirPods",
  "Smart Watch",
  "Tablet",
  "iPad",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then((data) => {
        if (mounted && Array.isArray(data)) setProducts(data as Product[]);
      })
      .catch(() => {
        if (mounted) setProducts([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.approved ?? true)
      .filter((p) => {
        if (category && category !== "All") return String(p.category ?? "").toLowerCase().includes(category.toLowerCase());
        return true;
      })
      .filter((p) => {
        if (search.trim() === "") return true;
        return (
          String(p.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
          (p.vendor && String(p.vendor).toLowerCase().includes(search.toLowerCase()))
        );
      })
      .filter((p) => {
        if (minPrice !== "" && Number(minPrice) > (p.price ?? 0)) return false;
        if (maxPrice !== "" && Number(maxPrice) < (p.price ?? 0)) return false;
        return true;
      });
  }, [products, search, category, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <main className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name " className="md:col-span-2 border rounded p-2" /> */}
          <input placeholder="Search by name" className="md:col-span-2 border rounded p-2"/>
          {/* <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select> */}
          <select className="border rounded p-2">
          {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
          ))}
          </select>
          <div className="flex gap-2">
            {/* <input value={minPrice} onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Min Price" className="border rounded p-2 w-1/2" type="number" />
            <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Max Price" className="border rounded p-2 w-1/2" type="number" /> */}
            <input placeholder="Min Price" className="border rounded p-2 w-1/2" type="number"/>
            <input placeholder="Max Price" className="border rounded p-2 w-1/2" type="number"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
