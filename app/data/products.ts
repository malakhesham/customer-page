// Temporary single-product example used for UI verification.
// Replace this with backend data when your API is available.
// Use `any[]` here to avoid type collisions while this file is used only

export const products: any[] = [
	{
		id: "iphone-15-pro",
		name: "iPhone 15 Pro",
		description: "iPhone 15 Pro with A17 chip, 6.1-inch Super Retina display, and advanced camera system.",
		price: 999,
		images: ["/images/iphone-15-pro.jpg"],
		category: "Phone",
		vendor: "Apple",
		rating: 4.8,
		stock: 42,
		specs: { screen: "6.1in", storage: "256GB", ram: "8GB", color: ["black", "silver", "blue"] },
		reviews: [
			{ user: "Alice", rating: 5, comment: "Amazing performance and camera", date: "2026-04-01" },
		],
		viewers: 120,
		approved: true,
		sku:  "APL-IP15P-256",
	},
];
// export type Product = typeof products[number];