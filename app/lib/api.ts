



// BASE URL
const BASE_URL = "https://localhost:5001/api";

// Auth Header
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
