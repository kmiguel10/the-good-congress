const BASE_URL = "http://www.opensecrets.org/api/?";

//"http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=__apikey__";

//http://www.opensecrets.org/api/?method=getLegislators&output=json&id=MN&apikey=a9a2e803a1a6757d370eb30b4abb8e7d

const API_KEY = process.env.NEXT_PUBLIC_OPEN_SECRETS_API_KEY;

//Returns current members by state
export const getLegislators = async (stateCode: string) => {
  return await fetchData(`method=getLegislators&output=json&id=${stateCode}`);
};

const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    console.log("Error fetching data in service layer: ", error);
    throw error; // Ensure the error is re-thrown so it can be caught in the GET function
  }
};
