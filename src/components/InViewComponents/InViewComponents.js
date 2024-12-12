import { Box } from "@mui/material";
import React, { useState } from "react";
import { InView } from "react-intersection-observer";

const InViewComponents = ({ getListData, children, skeletonComponent }) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChangeFunction = async () => {
    setLoading(true);
    const result = await getListData();
    setListData(result || []);
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
           
          })}{" "}
        </Box>
      ) : (
        <Box className=" p-0 m-0">
          {listData.length > 0 &&
            React.cloneElement(children, {
              lists: listData || [],
              // customSettings: customSettings,
              loading: loading,
            })}{" "}
        </Box>
      )}
    </InView>
  );
};

export default InViewComponents;
