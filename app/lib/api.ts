// // Lightweight API client wrappers. These call backend endpoints under /api/*.
// // If the backend is not yet available, they fall back to localStorage so the app keeps working.

// export type CartLine = { id: string; quantity: number };

// async function safeFetch(url: string, opts?: RequestInit) {
//   try {
//     const res = await fetch(url, opts);
//     if (!res.ok) throw new Error(`Status ${res.status}`);
//     return await res.json();
//   } catch (e) {
//     // propagate error to caller for graceful fallback
//     throw e;
//   }
// }

// // Products
// import { products as localProducts } from "../data/products";

// export async function fetchProducts() {
//   try {
//     return await safeFetch('/api/products');
//   } catch (e) {
//     // If the backend isn't present yet, return the local example products
//     return localProducts;
//   }
// }

// export async function fetchProduct(id: string) {
//   try {
//     return await safeFetch(`/api/products/${encodeURIComponent(id)}`);
//   } catch (e) {
//     // fallback to local example data
//     const found = localProducts.find((p: any) => String(p.id) === String(id));
//     if (found) return found;
//     throw e;
//   }
// }

// // Cart
// export async function fetchCart(): Promise<CartLine[]> {
//   try {
//     return await safeFetch('/api/cart');
//   } catch (e) {
//     // fallback to localStorage
//     try {
//       const raw = localStorage.getItem('cart');
//       return raw ? JSON.parse(raw) : [];
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function addToCart(id: string, qty = 1): Promise<CartLine[]> {
//   try {
//     return await safeFetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, qty }) });
//   } catch (e) {
//     // optimistic local update
//     try {
//       const raw = localStorage.getItem('cart');
//       const arr: CartLine[] = raw ? JSON.parse(raw) : [];
//       const found = arr.find((x) => x.id === id);
//       if (found) found.quantity = Math.max(1, found.quantity + qty);
//       else arr.push({ id, quantity: qty });
//       localStorage.setItem('cart', JSON.stringify(arr));
//       return arr;
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function updateCartItem(id: string, qty: number): Promise<CartLine[]> {
//   try {
//     return await safeFetch(`/api/cart/${encodeURIComponent(id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ qty }) });
//   } catch (e) {
//     try {
//       const raw = localStorage.getItem('cart');
//       const arr: CartLine[] = raw ? JSON.parse(raw) : [];
//       if (qty <= 0) {
//         const next = arr.filter((x) => x.id !== id);
//         localStorage.setItem('cart', JSON.stringify(next));
//         return next;
//       }
//       const found = arr.find((x) => x.id === id);
//       if (found) found.quantity = qty;
//       localStorage.setItem('cart', JSON.stringify(arr));
//       return arr;
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function clearCart(): Promise<CartLine[]> {
//   try {
//     return await safeFetch('/api/cart/clear', { method: 'POST' });
//   } catch (e) {
//     try {
//       localStorage.removeItem('cart');
//       return [];
//     } catch (_) {
//       return [];
//     }
//   }
// }

// // Favorites
// export async function fetchFavorites(): Promise<string[]> {
//   try {
//     return await safeFetch('/api/favorites');
//   } catch (e) {
//     try {
//       const raw = localStorage.getItem('favorites');
//       return raw ? JSON.parse(raw) : [];
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function addFavorite(id: string): Promise<string[]> {
//   try {
//     return await safeFetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
//   } catch (e) {
//     try {
//       const raw = localStorage.getItem('favorites');
//       const arr: string[] = raw ? JSON.parse(raw) : [];
//       if (!arr.includes(id)) arr.push(id);
//       localStorage.setItem('favorites', JSON.stringify(arr));
//       return arr;
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function removeFavorite(id: string): Promise<string[]> {
//   try {
//     return await safeFetch(`/api/favorites/${encodeURIComponent(id)}`, { method: 'DELETE' });
//   } catch (e) {
//     try {
//       const raw = localStorage.getItem('favorites');
//       const arr: string[] = raw ? JSON.parse(raw) : [];
//       const next = arr.filter((x) => x !== id);
//       localStorage.setItem('favorites', JSON.stringify(next));
//       return next;
//     } catch (_) {
//       return [];
//     }
//   }
// }

// // Reviews & views
// export async function fetchReviews(productId: string) {
//   try {
//     return await safeFetch(`/api/products/${encodeURIComponent(productId)}/reviews`);
//   } catch (e) {
//     try {
//       const raw = localStorage.getItem(`reviews_${productId}`);
//       return raw ? JSON.parse(raw) : [];
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function submitReview(productId: string, payload: { user?: string; rating: number; comment: string }) {
//   try {
//     return await safeFetch(`/api/products/${encodeURIComponent(productId)}/reviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
//   } catch (e) {
//     try {
//       const key = `reviews_${productId}`;
//       const raw = localStorage.getItem(key);
//       const arr = raw ? JSON.parse(raw) : [];
//       const next = [...arr, { ...payload, date: new Date().toISOString() }];
//       localStorage.setItem(key, JSON.stringify(next));
//       return next;
//     } catch (_) {
//       return [];
//     }
//   }
// }

// export async function incrementView(productId: string) {
//   try {
//     await safeFetch(`/api/products/${encodeURIComponent(productId)}/views`, { method: 'POST' });
//   } catch (e) {
//     try {
//       const key = `views_${productId}`;
//       const raw = localStorage.getItem(key);
//       const prev = raw ? Number(raw) : 0;
//       localStorage.setItem(key, String(prev + 1));
//     } catch (_) {
//       // ignore
//     }
//   }
// }




// BASE URL
const BASE_URL = "https://localhost:5001/api";

// 🔐 Auth Header
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// error handling
async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw text || "Something went wrong";
  }
  return res.json();
}

// ================== AUTH ==================

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse(res);
  localStorage.setItem("token", data.token); // store token for authenticated requests
  return data;
}

export async function register(data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

// ================== PRODUCTS ==================

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/Product`);
  return handleResponse(res);
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${BASE_URL}/Product/${id}`);
  return handleResponse(res);
}

// ================== CART ==================

export async function fetchCart() {
  const res = await fetch(`${BASE_URL}/Cart`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

export async function addToCart(productId: string, quantity = 1) {
  const res = await fetch(
    `${BASE_URL}/Cart?productId=${productId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(res);
}

export async function updateCartItem(productId: string, quantity: number) {
  const res = await fetch(
    `${BASE_URL}/Cart?productId=${productId}&quantity=${quantity}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(res);
}

export async function clearCart() {
  const res = await fetch(`${BASE_URL}/Cart/clear`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

// ================== FAVORITES ==================

export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/Favorite`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

export async function addFavorite(productId: string) {
  const res = await fetch(`${BASE_URL}/Favorite?productId=${productId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

export async function removeFavorite(productId: string) {
  const res = await fetch(`${BASE_URL}/Favorite/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

// ================== REVIEWS ==================

export async function fetchReviews(productId: string) {
  const res = await fetch(`${BASE_URL}/Review/${productId}`);
  return handleResponse(res);
}

export async function submitReview(
  productId: number,
  rating: number,
  comment: string
) {
  const res = await fetch(`${BASE_URL}/Review`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, rating, comment }),
  });

  return handleResponse(res);
}

// ================== ORDERS ==================

export async function checkout(items: { productId: number; quantity: number }[]) {
  const res = await fetch(`${BASE_URL}/Order/checkout`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(items),
  });

  return handleResponse(res);
}
