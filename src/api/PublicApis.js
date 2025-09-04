import axios from "axios";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

// فضای اقامتگاه
export const GetAccommodationSpace = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/AccommodationSpace/GetAll`, {
      params: {
        // title: searchData?.title,
      },
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// لیست قوانین
export const GetRollesList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/RolItemTour/RolItemTourList`, {
      params: {
        // title: searchData?.title,
      },
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سایر امکانات
export const GetOtherItemTourList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${baseUrl}/OtherItemTour/OtherItemTourList`,
      {
        params: {
          // title: searchData?.title,
        },
        headers: {
          token: token,
        },
      }
    );
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// استان ها
export const getProvinceList = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/Province/ProvinceList`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// شهرهای براساس ای دی استان
export const getCityListByProvinceId = async (provinceId) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(
      `${baseUrl}/city/ListByProvinceId/${provinceId}`,
      {
        // headers: {
        //   token: token, // Add the token to the request header
        // },
      }
    );
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//  لیست عنوان اسلایدر ها
export const GetListTitleSlidersApi = async (searchData) => {
  try {
    const response = await axios.get(`${baseUrl}/ListForHome/GetAll`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};
// check show comments
export const handleCheckShowComments = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${baseUrl}/SiteSetting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     console.log(response, "show comments");
    return response?.data?.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// لیست کامنت ها درباره سایت
export const GetCommentsAboutSiteApi = async (searchData) => {
  try {
    const response = await axios.get(`${baseUrl}/HostTour/ListCommentsTourUserAllForHome`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

  //png to webp
  export const convertImageToWebP = (file, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
                  type: "image/webp",
                });
                console.log("📤 فایل اصلی:", file.name, "-", (file.size / 1024).toFixed(1), "KB");
                console.log("📥 WebP تبدیل‌شده:", webpFile.name, "-", (webpFile.size / 1024).toFixed(1), "KB");
  
                resolve(webpFile);
              } else {
                reject("WebP conversion failed");
              }
            },
            "image/webp",
            quality
          );
        };
        img.src = reader.result;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };