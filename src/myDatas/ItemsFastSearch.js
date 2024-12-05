import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import PoolIcon from "@mui/icons-material/Pool";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";

const ItemsFastSearch = [
  { icon: <VillaIcon sx={{ fontSize: { xs: 25, md: 35 } }} />, label: "ویلا" },
  { icon: <HomeIcon sx={{ fontSize: { xs: 25, md: 35 } }} />, label: "کلبه" },
  {
    icon: <NaturePeopleIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "بوم گردی",
  },
  {
    icon: <PoolIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "استخردار",
  },
  {
    icon: <BeachAccessIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "ساحلی",
  },
  {
    icon: <AgricultureIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "روستایی",
  },
  {
    icon: <StarIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "پیشنهاد ویژه",
  },
];

export default ItemsFastSearch;
