import { Box, Typography } from "@mui/material";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../App";
import HeaderMag from "./Components/HeaderMag";
import MainPart from "./Components/MainPart";
// import SwiperMag from "./Components/SwiperMag";
import { useParams } from "react-router-dom";
import MagHeader from "./Components/MagHeader";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import MagFooter from "./Components/MagFooter";

export const MagPageContext = createContext();

const MagazinePage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const appContext = useContext(AppContext);

  const [categoryList, setCategoryList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState();
  const [tagsFilter, setTagsFilter] = useState();
  const [titleFilter, setTitleFilter] = useState();
  useEffect(() => {
    appContext.setShowfooter();
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
      showHeader: false,
    });
  }, [appContext]);

  // get Category List
  const getCategoryList = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/Mag/BlogCategoryList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response?.data?.data, "get Category List");
      setCategoryList(response?.data?.data);
    } catch (error) {
      console.log(error, "getCategoryList Error");
      return error?.response?.data;
    }
  }, []);

  // get Tags List
  const getTagsList = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/Mag/MyTagList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response?.data?.data, "get Tags List");
    let sorted=  response?.data?.data?.sort((a, b) => a?.title.length - b.title.length)
      setTagsList(sorted);
    } catch (error) {
      console.log(error, "getTagsList Error");
      return error?.response?.data;
    }
  }, []);

  // get Selected Blog
  const getSelectedBlog = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/Mag/SelectedBlogList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response?.data?.data, "get Selected Blog");
      setSelectedBlog(response?.data?.data);
    } catch (error) {
      console.log(error, "getSelectedBlog Error");
      return error?.response?.data;
    }
  }, []);

  function handleCategoryFilter(filter) {
    setCategoryFilter(filter);
  }

  function handleTagsFilter(filter) {
    setTagsFilter(filter);
  }
  function handleTitleFilter(filter) {
    setTitleFilter(filter);
  }

  // get Blog List
  const getBlogList = useCallback(async () => {
    try {
      setBlogsLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${API_URL}/Mag/List`,
        {
          take: isMobile ? 5 : 10,
          skip: 0,
          myTagId: tagsFilter,
          categoryId: categoryFilter,
          title:titleFilter
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response?.data?.data, "get  Blogs");
      setBlogList(response?.data?.data);
    } catch (error) {
      console.log(error, "getSelectedBlog Error");
      return error?.response?.data;
    } finally {
      setBlogsLoading(false);
    }
  }, [categoryFilter, isMobile , titleFilter,tagsFilter]);

  useEffect(() => {
    getCategoryList();
    getTagsList();
    getSelectedBlog();
  }, [getCategoryList, getTagsList, getSelectedBlog]);

  useEffect(() => {
    console.log("fil", categoryFilter);
    getBlogList();
  }, [categoryFilter, getBlogList ,tagsFilter ,titleFilter]);

  return (
    <>
      <MagPageContext.Provider
        value={{
          categoryList,
          tagsList,
          selectedBlog,
          blogList,
          blogsLoading,
          handleCategoryFilter,
          handleTagsFilter,
          handleTitleFilter
        }}
      >
        <MagHeader />
        <Box
          sx={{
            bgcolor: "#f9f9f9",
            border: "1px solid #f9f9f9",
          }}
        >
          {/* slider */}
          {!id ? <HeaderMag isMobile={isMobile} /> : null}

          {/* title */}
          {!id && !isMobile ? (
            <Typography
              variant="h5"
              sx={{
                color: "white",
                textAlign: "center",
                py: 1.5,
                m: "2rem 3rem 2rem",
                borderRadius: 1.5,
                bgcolor: "black",
                fontSize: "23px",
              }}
            >
              مجله شبینجا
            </Typography>
          ) : (
            ""
          )}

          {/*small swiper */}
          {/* <SwiperMag /> */}

          {/* sidebar , ... */}
          <MainPart isMobile={isMobile} />
        </Box>
        {/* footer */}
        <MagFooter />
      </MagPageContext.Provider>
    </>
  );
};

export default MagazinePage;
