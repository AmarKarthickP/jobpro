export async function apiCall(method: string, args: any = {}) {
  try {
    const res = await fetch(`/api/method/${method}`, {
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "API Error");
    }

    return data.message;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}