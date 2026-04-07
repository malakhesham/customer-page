"use client";
import Link from "next/link";

export default function FavsPage() {
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
      <p></p>
      <h1 className="mt-4">Go back to the.</h1> <Link href="/" className=" copper-600">product list</Link>
      
    </div>
  );
}
