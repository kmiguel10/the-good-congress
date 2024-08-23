const BASE_URL = "http://www.opensecrets.org/api/?";

//"http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=__apikey__";

//http://www.opensecrets.org/api/?method=getLegislators&output=json&id=MN&apikey=a9a2e803a1a6757d370eb30b4abb8e7d

const API_KEY = process.env.NEXT_PUBLIC_OPEN_SECRETS_API_KEY;

const currentYear = new Date().getFullYear();

//Provides the top ten industries contributing to a specified candidate for a House or Senate seat or member of Congress. These are 6-year numbers for Senators/Senate candidates; 2-year total for Representatives/House candidates.
export const candIndustry = async (cid: string) => {
  return await fetchData(
    `method=candIndustry&output=json&cid=${cid}&cycle=${currentYear}`
  );
};

//Returns top contributors to specified candidate for a House or Senate seat or member of Congress. These are 6-year numbers for senators/Senate candidates; 2-year numbers for representatives/House candidates.
export const candContrib = async (cid: string) => {
  return await fetchData(
    `method=candContrib&output=json&cid=${cid}&cycle=${currentYear}`
  );
};

//Provides summary fundraising information for specified politician
export const candSummary = async (cid: string) => {
  return await fetchData(
    `method=candSummary&output=json&cid=${cid}&cycle=${currentYear}`
  );
};

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
