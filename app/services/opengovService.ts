const BASE_URL = "https://api.congress.gov/v3";
const API_KEY = process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY;
const LIMIT = 250;

// Returns the current congress
export const getCurrentCongress = async () => {
  return await fetchData("/congress/current");
};

//Returns the list of members specified by congress
export const getMembersByCurrentCongress = async (congress: string) => {
  return await fetchDataForCurrentMembers(`/member/congress/${congress}`);
};

const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching data in service layer: ", error);
    throw error; // Ensure the error is re-thrown so it can be caught in the GET function
  }
};

const fetchDataForCurrentMembers = async (endpoint: string) => {
  let allMembers: Member[] = [];
  let offset = 0;
  const totalItems = 550; // Known total number of items

  while (offset < totalItems) {
    const url = `${BASE_URL}${endpoint}?offset=${offset}&limit=${LIMIT}&api_key=${API_KEY}&format=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.members && Array.isArray(data.members)) {
        allMembers = allMembers.concat(data.members);
      }
      offset += LIMIT;
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  }

  return allMembers;
};
