import { notFound } from "next/navigation";
import { fetchProduct } from "../../lib/api";
import ProductDetailsClient from "../../../src/components/ProductDetailsClient";
import ProductHero from "../../../src/components/ProductHero";
import type { Product } from "../../types";


type Props = {
	params: { id: string };
};

export default async function ProductPage({ params }: Props) {
	const product = (await fetchProduct(params.id)) as Product | null;
	if (!product) return notFound();

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
				<div className="grid grid-cols-1 gap-6">
					<div>
						<ProductHero product={product} />

						<div className="mt-6">
							<h2 className="text-lg font-medium mb-2">Description</h2>
							<p className="mb-4 text-zinc-700">{product.description}</p>
						</div>

						<ProductDetailsClient product={product} />

						<div className="grid grid-cols-1 gap-4">
							<div>
								<h3 className="font-medium mb-2">Specifications</h3>
								<dl className="grid grid-cols-1 gap-y-1 text-sm text-zinc-800">
									{Object.entries(product.specs ?? {}).map(([k, v]) => (
										<div key={k} className="flex justify-between">
											<dt className="font-medium text-zinc-700">{k}</dt>
											<dd>{Array.isArray(v) ? v.join(", ") : String(v)}</dd>
										</div>
									))}
								</dl>
							</div>

							<div className="flex gap-6">
								<div>
									<h4 className="font-medium black">Product info</h4>
									<p className="text-sm">SKU: {String((product as any).sku ?? "—")}</p>
									<p className="text-sm">In stock: {product.stock}</p>
									<p className="text-sm">Category: {product.category}</p>
								</div>
								<div>
									<h4 className="font-medium">Shipping</h4>
									<p className="text-sm">Weight: {String((product as any).shipping?.weight ?? "—")}</p>
									<p className="text-sm">Dimensions: {String((product as any).shipping?.dimensions ?? "—")}</p>
									<p className="text-sm">Origin: {String((product as any).shipping?.origin ?? "—")}</p>
								</div>
							</div>

							<div>
								<h4 className="font-medium mb-2">Customer reviews</h4>
								{product.reviews && product.reviews.length > 0 ? (
									<ul className="space-y-2 text-sm text-zinc-700">
										{product.reviews.map((r: any, idx: number) => (
											<li key={idx} className="border rounded p-2">
												<div className="font-medium">{r.user}</div>
												<div className="text-sm text-zinc-900">Rating: {r.rating}</div>
												<div className="mt-1">{r.comment}</div>
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm text-zinc-600">No reviews yet.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

