import axios from "axios";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

export const HostTourSearchApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/HostTour/Search`, {
      params: {
        title: searchData?.title,
        start: searchData?.start,
        end: searchData?.end,
        count: searchData?.count,
        Room: searchData?.Room,
        minprice: searchData?.minprice,
        maxprice: searchData?.maxprice,
        skip: searchData?.skip,
        take: searchData?.take || 20,
        sort: searchData?.sort,
      },
      headers: {
        token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.error("Error searching for Userss:", error);
    throw error; // Re-throw the error for further handling
  }
};
