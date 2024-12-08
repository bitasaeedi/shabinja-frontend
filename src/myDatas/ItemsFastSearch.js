import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import PoolIcon from "@mui/icons-material/Pool";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";

const ItemsFastSearch = [
  {
    icon: <VillaIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "ویلا",
    linkAddres: "/all/villas",
    description: "اجاره ویلا",
  },
  {
    icon: <HomeIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "کلبه",
    linkAddres: "/all/cottage",
    description: "اجاره کلبه",
  },
  {
    icon: <NaturePeopleIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "بوم‌گردی",
    linkAddres: "/all/ecotourism",
    description: "اجاره بوم‌گردی",
  },
  {
    icon: <PoolIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "استخردار",
    linkAddres: "/all/pool",
    description: "اجاره استخردار",
  },
  {
    icon: <BeachAccessIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "ساحلی",
    linkAddres: "/all/coastal",
    description: "اجاره ساحلی",
  },
  {
    icon: <AgricultureIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "روستایی",
    linkAddres: "/all/village",
    description: "اجاره روستایی",
  },
  {
    icon: <StarIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "پیشنهاد ویژه",
  },
];

export default ItemsFastSearch;
