
export async function getUserStatus(email: string): Promise<{ id: string; photoUrl: string; onboarded: boolean } | null> {
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
    
    const { id, photoUrl, onboarded } = data.data;
    
    return { id, photoUrl, onboarded };
    
  } catch (error) {
    console.error("Failed to fetch user status:", error);
    return null; // Maneja el error de manera adecuada en tu aplicación
  }
}
