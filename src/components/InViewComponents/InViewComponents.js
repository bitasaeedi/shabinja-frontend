import { Box } from "@mui/material";
import React, { useState } from "react";
import { InView } from "react-intersection-observer";



const InViewComponents = ({ getListData, children }) => {
  const [listData, setListData] = useState([]);
  const onChangeFunction = async () => {
    const result = await getListData();
    setListData(result);
  };
  return (
    <InView onChange={(inView) => inView && onChangeFunction()} triggerOnce>
      <Box className=" p-0 m-0">
        {listData.length > 0 &&
          React.cloneElement(children, { lists: listData })}{" "}
      </Box>
    </InView>
  );
};

export default InViewComponents;
