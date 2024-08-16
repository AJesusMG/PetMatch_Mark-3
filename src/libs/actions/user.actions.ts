export default async function getUserId(email:string) {
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
      
      // Assuming the userId is returned in the data object
      return data.data.userId;
    } catch (error) {
      console.error("Failed to fetch userId:", error);
      return null; // Handle the error appropriately in your app
    }
  }
  