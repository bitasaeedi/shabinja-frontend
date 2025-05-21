import axios from "axios";
import API_URL from "../config/apiConfig";
const baseUrl = API_URL;
const subUrl = "";

// دریافت پیامک
export const ApiCheckAndSms = async (searchData) => {
  try {
    // const token = localStorage.getItem("token");
    const response = await axios.post(`${baseUrl}${subUrl}/user/CheckAndSms`, {
      UserName: searchData?.UserName, // 09*********
      token:
        "03AFcWeA6dLMvuLUo08Q3nAAGWvX0TTKyITEqAFdMPL9-2otMQc5UTxygNw6CEC3YhqkgpUBhEajMuhYEiaOJj7hGTeaoGFIeQGe8Dsu2eCwPz0yd6qdSS17MSxflpwYd_ynvlWsW2SxXMVhj2JeeLgUwqGn1UVd7ZCqnmmS3WWooYhYa6tu90PSVrMzJZengCUZdlTXWnuKSflIbU25nmm01rBV4kJQaaM30qsDt6ydSGlPLh3l4JcJtPogee640bKZSUGdUF8XTE_TpUnktZTDlDPudAxI5q5yxkLImQoAkXObxlnbOu2k33nzo2TPz4XCCiYRV6Q0u0jUpKmbHIABPQuxbGhMB60XreGgpHdYkX-3dITDFgEQTTOzD7H5o5RUY4ru9CbXNvVrge5I4O5MyGDhjaREsfKdR6M7DE6EsAsezSmnUnE9cWYAYWZVbdY0X9yj7Ry1w5e2EH5-AJ6m-bHrMvq6lFV2eEN5hgmRvcXDrGPWeLprvD0G2OV1GVaj2wC88qQrZTYxMItmrLl3StlT-ntaNaPXNqIU4ecAPTsJFZE0mrRo3gtW_Jy79C3W31T-Yu5l341vI_xZwS6oMJdP-yA2OakN_lbrbakMYM72L8LbawehpM2ayGQjWpHf9-Yq1oIFLTPIiK29gFlMVTiJiIRCDmza0A5Xs71KkmbsMfSYhukDKf0ykuwLElod3wd8uB4M7PJastwmtnzVVIE92pf-bncvoqsz7NwF5koDqlmdNYxMnfUHiEZkahPUXvdqwXBFUyCU5O0SFxeoUp3CXy9UzATMwdb1XM4r_9MyOfHVU3_liGR0N5t4xk6UqPHX6yrOJ7ABNB5cXsoGI8oMfpi349iQ",
    });

    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.error("Error ", error);
    throw error; // Re-throw the error for further handling
  }
};
// دریافت توکن
export const ApiGetTokenShabinja = async (searchData) => {
  try {
    console.log(searchData, "searchData");
    const response = await axios.post(
      `${baseUrl}${subUrl}/user/GetTokenShabinja`,
      {
        grant_type: "", // Make sure the grant_type is correctly set if needed
        client_secret: "98fa8e277cbe46b9a518284eba50f671", // Use your secret
        username: searchData?.username, // Your username
        password: searchData?.password, // Your password
        refresh_token: "", // Your refresh token (if needed)
        client_id: "Client_UI", // Your client ID
        isAdmin: false, // Whether the user is admin
        // token:
          // "03AFcWeA6dLMvuLUo08Q3nAAGWvX0TTKyITEqAFdMPL9-2otMQc5UTxygNw6CEC3YhqkgpUBhEajMuhYEiaOJj7hGTeaoGFIeQGe8Dsu2eCwPz0yd6qdSS17MSxflpwYd_ynvlWsW2SxXMVhj2JeeLgUwqGn1UVd7ZCqnmmS3WWooYhYa6tu90PSVrMzJZengCUZdlTXWnuKSflIbU25nmm01rBV4kJQaaM30qsDt6ydSGlPLh3l4JcJtPogee640bKZSUGdUF8XTE_TpUnktZTDlDPudAxI5q5yxkLImQoAkXObxlnbOu2k33nzo2TPz4XCCiYRV6Q0u0jUpKmbHIABPQuxbGhMB60XreGgpHdYkX-3dITDFgEQTTOzD7H5o5RUY4ru9CbXNvVrge5I4O5MyGDhjaREsfKdR6M7DE6EsAsezSmnUnE9cWYAYWZVbdY0X9yj7Ry1w5e2EH5-AJ6m-bHrMvq6lFV2eEN5hgmRvcXDrGPWeLprvD0G2OV1GVaj2wC88qQrZTYxMItmrLl3StlT-ntaNaPXNqIU4ecAPTsJFZE0mrRo3gtW_Jy79C3W31T-Yu5l341vI_xZwS6oMJdP-yA2OakN_lbrbakMYM72L8LbawehpM2ayGQjWpHf9-Yq1oIFLTPIiK29gFlMVTiJiIRCDmza0A5Xs71KkmbsMfSYhukDKf0ykuwLElod3wd8uB4M7PJastwmtnzVVIE92pf-bncvoqsz7NwF5koDqlmdNYxMnfUHiEZkahPUXvdqwXBFUyCU5O0SFxeoUp3CXy9UzATMwdb1XM4r_9MyOfHVU3_liGR0N5t4xk6UqPHX6yrOJ7ABNB5cXsoGI8oMfpi349iQ", 
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the correct Content-Type is set
        },
      }
    );

    return response.data; // Return the response data from the API
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;

    // throw error; // You can handle the error further if needed
  }
};
