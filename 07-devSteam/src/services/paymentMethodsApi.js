const API_URL =
  import.meta.env.VITE_PAYMENT_API_URL ||
  "http://localhost:3001/api/payment-methods";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível concluir a operação.");
  }

  return data;
}

export async function listPaymentMethods() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}

export async function createPaymentMethod(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function deletePaymentMethod(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response);
}
