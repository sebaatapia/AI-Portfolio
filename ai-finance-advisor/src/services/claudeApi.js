const API_URL = "http://localhost:3002/api/analyze-expenses";

export const analyzeExpenses = async (expenses) => {
  console.log('🚀 Calling proxy server...');
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expenses })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Proxy request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Got response from proxy!');
    return data;
    
  } catch (error) {
    console.error('Error calling proxy:', error);
    throw error;
  }
};