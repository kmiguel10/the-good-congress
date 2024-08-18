const BASE_URL = "https://api.congress.gov/v3";

// Ensure the function returns the result of fetchData
export const getCurrentCongress = async () => {
  return await fetchData("/congress/current");
};

const fetchData = async (endpoint: string) => {
  console.log("API Key: ", process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY);
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching data in service layer: ", error);
    throw error; // Ensure the error is re-thrown so it can be caught in the GET function
  }
};
