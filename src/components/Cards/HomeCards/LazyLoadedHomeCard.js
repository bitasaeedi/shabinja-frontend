import React, { Suspense } from "react";
import HomeCardSkeleton from "./HomeCardSkeleton";

const HomeCard = React.lazy(() => import("./HomeCards"));

const LazyLoadedHomeCard = () => {
  return (
    <Suspense fallback={<HomeCardSkeleton />}>
      <HomeCard />
    </Suspense>
  );
};

export default LazyLoadedHomeCard;
