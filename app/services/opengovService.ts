const BASE_URL = "https://api.congress.gov/v3";

export const getCurrentCongress = async () => {
  fetchData("/congress/current");
};

const fetchData = async (endpoint: string) => {
  console.log("API: ", process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY);
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.log("Error fetching data in service layer: ", error);
  }
};
