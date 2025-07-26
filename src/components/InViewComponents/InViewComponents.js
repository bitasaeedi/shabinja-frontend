import { Box } from "@mui/material";
import React, { useState } from "react";
import { InView } from "react-intersection-observer";

const InViewComponents = ({
  getListData,
  children,
  skeletonComponent,
  favoritSkeleton,
  id,
  stayList
}) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState([]);

  const checkSimilarity = (result) => {

    const filteredResult = result.filter(r => r.id !== id);

    return filteredResult

  };

  const onChangeFunction = async () => {
    setLoading(true);
    let result= {};
    if(stayList){
      const allResults= await getListData();
       result =allResults?.items;
      setProvinces(allResults?.provinces)
    }
    else{
       result = await getListData();
    }
    if(id){
      setListData(checkSimilarity(result) || []);
    }
    else{
      setListData(result || []);
    }
    setLoading(false);
  };

  return (
    <InView onChange={(inView) => inView && onChangeFunction()} triggerOnce>
      {loading ? (
        <Box className=" p-0 m-0">
          {React.cloneElement(children, {
            lists: listData || [],
            loading: loading,
            skeletonComponent: skeletonComponent,
            favoritSkeleton: favoritSkeleton,
          })}{" "}
        </Box>
      ) : (
        <Box className=" p-0 m-0">
          {listData.length > 0 &&
            React.cloneElement(children, {
              lists: listData || [],
              provinces: provinces||[],
              // customSettings: customSettings,
              loading: loading,
              favoritSkeleton: favoritSkeleton,
            })}{" "}
        </Box>
      )}
    </InView>
  );
};

export default InViewComponents;
