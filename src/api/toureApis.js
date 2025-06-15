import axios from "axios";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

// سرچ لیست اقامتگاه ها
export const HostTourSearchApi = async (searchData) => {
  console.log("name: ", searchData);
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      `${baseUrl}/HostTour/Search`,
      {
        title: searchData?.title || "",
        start: searchData?.start
          ? ConvertShamsiToMiladi(searchData?.start)
          : "",
        end: searchData?.end ? ConvertShamsiToMiladi(searchData?.end) : "",
        count: searchData?.count || 0,
        Room: searchData?.room || 0,
        minprice: searchData?.minprice || 0,
        maxprice: searchData?.maxprice || 0,
        skip: searchData?.skip || 0,
        take: searchData?.take || 10,
        sort: searchData?.sort || 0, //ترتیب مرتب کردن
        type: searchData?.type || 0,
        RolItemTourId: [],
        OtherItemTourId: [],
        AccommodationSpace: [],
        Locations: searchData?.locations || [],
        Rate: searchData?.rate || [],
        TypeHost: searchData?.typeHost || [], // نوع اقامتگاه
        TypeHostLoc: searchData?.typeHostLoc || [],
        RolItemTour: searchData?.rolItemTour || [],
        OtherItemTour: searchData?.otherItemTour || [],
        Province: searchData?.province || [],
        City: searchData?.city || [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response: ", searchData?.type, response);
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سرچ استان شهر و اقاماتگاه براساس عنوان
export const HostTourSearchTitleApi = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/HostTour/SearchTitle`, {
      params: {
        title: searchData?.title,
      },
      headers: {
        token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// مقاصد محبوب
export const FavoritDestinationApi = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/ItemHomeShbinja/GetAll`, {
      params: {},
      headers: {
        token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//دسته بندی
export const CategoryHostApi = async (searchData) => {
  try {
    // const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/CategoryHost/GetAll`, {
      params: {},
      headers: {
        // token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//  سرچ نوع اقامتگاه
export const GetTypeHostListApi = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/TypeHost/TypeHostList`, {
      params: {},
      headers: {
        token: token,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// /    لیست نوع منطقه
export const GetTypeHostLocListApi = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/TypeHostLoc/GetAll`, {
      params: {},
      headers: {
        token: token,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سرچ یک اقامتگاه
export const HostTourSearchOneApi = async (stayCode) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(
      `${baseUrl}/HostTour/GetTour/${stayCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    return error?.response?.data;
  }
};

// سرچ نظرات برای یک اقامتگاه
export const HostTourSearchCommentApi = async (stayCode) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(
      `${baseUrl}/HostTour/ListCommentsTourForHome/${stayCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// سرچ یک اقامتگاه برای ویرایش
export const HostTourSearchOneApiForEdit = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/HostTour/${guid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//  ایجاد یک اقامتگاه جدید
export const HostTourCreateApi = async (createData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      `${baseUrl}/HostTour`,
      {
        Title: createData?.title, // "اسم میزبان",
        TypeHostId: createData?.typeHostId, // 1, //نوع اقامت برحسب آی دی
        TypeHostLocId: createData?.typeHostLocId, //1, //منطقه اقامت برحسب آی دی
        ProvinceId: createData?.provinceId, //1, //استان برحسب آی دی
        CityId: createData?.cityId, //1, // شهر برحسب استان
        Start: createData?.start, //"12:00", // ساعت ورود برحسب رشته
        End: createData?.end, //"17:00", //ساعت خروج بر حسب رشته
        SizeOfTheInfrastructure: createData?.sizeOfTheInfrastructure, //120, // متراژ زیربنا
        AllSizeOfTheInfrastructure: createData?.allSizeOfTheInfrastructure, //120, // متراژ کل
        MinCapacity: createData?.minCapacity, //1, // حداقل نفرات
        MaxCapacity: createData?.maxCapacity, //1, /// حداکثر نفرات
        Room: createData?.room, //1, ///تعداد اتاف
        Bed: createData?.bed, //1, /// تعداد تخت خواب یک نفره
        BedTwo: createData?.bedTwo, //1, /// تعداد تخت خواب دونفره
        BedOld: createData?.bedOld, //1, /// تعداد تخت خواب سنتی
        BathRoom: createData?.bathRoom, //1, ///تعداد حمام
        OtherItemTourIds: createData?.otherItemTourIds, //["1", "2"], ////سایر امکانات برحسب لیست ای دی
        RolItemTourIds: createData?.rolItemTourIds, //["1", "2"], /// قوانین برحسب لیست آی دی
        Dics: createData?.dics, //"توضیحات",
        Loc: createData?.loc, //"لوکیشن",
        Address: createData?.address || "", // آدرس متنی
        tell: createData?.tell || "",
        zipCod: createData?.zipCod || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// به روز رسانی اقامتگاه
export const HostTourUpdateApi = async (updateData, guid) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      `${baseUrl}/HostTour/update`,
      {
        // Id: updateData?.id,
        Guid: guid,
        Title: updateData?.title, // "اسم میزبان",
        TypeHostId: updateData?.typeHostId, // 1, //نوع اقامت برحسب آی دی
        TypeHostLocId: updateData?.typeHostLocId, //1, //منطقه اقامت برحسب آی دی
        AccommodationSpaceId: updateData?.accommodationSpaceId, // فضای اقامتگاه (دربست)
        ProvinceId: updateData?.provinceId, //1, //استان برحسب آی دی
        CityId: updateData?.cityId, //1, // شهر برحسب استان
        Start: updateData?.start, //"12:00", // ساعت ورود برحسب رشته
        End: updateData?.end, //"17:00", //ساعت خروج بر حسب رشته
        SizeOfTheInfrastructure: updateData?.sizeOfTheInfrastructure, //120, // متراژ زیربنا
        AllSizeOfTheInfrastructure: updateData?.allSizeOfTheInfrastructure, //120, // متراژ کل
        MinCapacity: updateData?.minCapacity, //1, // حداقل نفرات
        MaxCapacity: updateData?.maxCapacity, //1, /// حداکثر نفرات
        Room: updateData?.room, //1, ///تعداد اتاف
        Bed: updateData?.bed, //1, /// تعداد تخت خواب یک نفره
        BedTwo: updateData?.bedTwo, //1, /// تعداد تخت خواب دونفره
        BedOld: updateData?.bedOld, //1, /// تعداد تخت خواب سنتی
        BathRoom: updateData?.bathRoom, //1, ///تعداد حمام
        OtherItemTourIds: updateData?.otherItemTourIds || [], //["1", "2"], ////سایر امکانات برحسب لیست ای دی
        RolItemTourIds: updateData?.rolItemTourIds || [], //["1", "2"], /// قوانین برحسب لیست آی دی
        Dics: updateData?.dics, //"توضیحات",
        Loc: updateData?.loc, //"لوکیشن",
        Step: updateData?.step, //"پله ها",
        Floor: updateData?.floor, //"طلبقه ",
        Disabled: updateData?.disabled, //"مناسب سالمندان",
        CancelReservation: updateData?.cancelReservation, //آسان=0 ,متعادل=1, سختگیرانه=2
        DiscountToday: updateData?.discountToday, //"تخفیف امروز ",
        DiscountSecond: updateData?.discountSecond, //"تخفیف فردا ",
        DiscountThrid: updateData?.discountThrid, //"تخفیف پسفردا ",
        DiscountWeeky: updateData?.discountWeeky, //"تخفیف هفتگی ",
        DiscountMonth: updateData?.discountMonth, //"تخفیف ماهانه ",
        DiscountOther: updateData?.discountOther, //"تخفیف متفرقه ",
        Address: updateData?.address, //"لوکیشن",
        tell: updateData?.tell,
        zipCod: updateData?.zipCod,
        // FileHost: updateData?.fileHost,
        IsRole: updateData?.isRoleF, //updateData?.isRoleF/
        // NationallImage: updateData?.nationallImage,
        PriceHostTourBaseSpring: [
          ...updateData?.priceHostTourBaseSpring,
          ///قیمت برای بهار
          // {
          //   PeriodType: 0, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          //   priceBase: 100000,
          //   otherPrice: 0,
          // },
        ],
        PriceHostTourBaseSummer: [
          ...updateData?.priceHostTourBaseSummer,
          ////قیمت برای تابستان
          // {
          //   PeriodType: 0,
          //   priceBase: 100000,
          //   otherPrice: 0,
          // },
        ],
        PriceHostTourBaseAutum: [
          ...updateData?.priceHostTourBaseAutum,
          ////قیمت برای پاییز
          // {
          //   periodType: 0,
          //   priceBase: 100000,
          //   otherPrice: 0,
          // },
        ],
        PriceHostTourBaseWinter: [
          ...updateData?.priceHostTourBaseWinter,
          ///قیمت برای زمستان
          // {
          //   PeriodType: 0,
          //   priceBase: 100000,
          //   otherPrice: 0,
          // },
        ],
        PriceHostTourTimer: [
          ///قیمت برای زمانهای مشخص
          // {
          //   start: "2025-11-16T00:00:00Z",
          //   end: "2025-11-17T00:00:00Z",
          //   priceBase: 100000,
          //   otherPrice: 0,
          // },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// آپلود سند اقامتگاه و کد ملی کاربر اقامتگاه
export const UploadDocumentsApi = async (updateData, guid) => {
  try {
    const token = localStorage.getItem("access_token");
    console.log(updateData, "UploadDocumentsApi");
    const response = await axios.post(
      `${baseUrl}/HostTour/UploadDocuments`,
      {
        Guid: guid,
        FileHost: updateData?.fileHost,
        NationallImage: updateData?.nationallImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// سرچ لیست اقامتگاههای من
export const MyHostTourSearchApi = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/HostTour/List`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سرچ  تصاویر اقامتگاه
export const HostTourSearchImagesApi = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      `${baseUrl}/HostTour/ListImage/${id}`,
      {
        skip: 0,
        take: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// آپلود عکس برای اقامتگاه
export const HostUploadImageApi = async (imageData, stayId, onProgress) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTour/Images`,
      {
        HostTourId: stayId,
        File: {
          FileName: imageData.FileName,
          Extension: imageData.Extension,
          Size: imageData.Size,
          Data: `${imageData.Data}`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress); // Pass the progress to the callback
          }
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// حذف عکس برای اقامتگاه
export const HostDeleteImageApi = async (guidImage) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTour/DeleteImage/${guidImage}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// حذف اقامتگاه
export const HostDeleteOneApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTour/delete/${guid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// رزروهای من
export const MyReservationsApi = async (data) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `${baseUrl}/HostTour/ListPriceiIsPayForuser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

//محاسبه قیمت
export const PriceCalculationApi = async (data) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTour/PriceCalculation`,
      {
        id: data?.id,
        start: ConvertShamsiToMiladi(data?.start),
        end: ConvertShamsiToMiladi(data?.end),
        conut: data?.conut,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error :", error?.response?.data || error.message);
    return error?.response?.data;
  }
};

// لیست قیمتهای اقامتگاه
export const PriceHostTourListApi = async (id) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `${baseUrl}/PriceHostTour/GetAll/${id}/4`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};
