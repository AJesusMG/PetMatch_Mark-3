// getUserStatus.ts
export async function getUserStatus(email: string): Promise<{ userId: string; photoUrl: string; onboarded: boolean } | null> {
  try {
    const response = await fetch(`/api/auth/onboarding?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Asegúrate de que la respuesta contiene los campos que esperas
    const { userId, photoUrl, onboarded } = data.data;
    
    return { userId, photoUrl, onboarded };
  } catch (error) {
    console.error("Failed to fetch user status:", error);
    return null; // Maneja el error de manera adecuada en tu aplicación
  }
}
