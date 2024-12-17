import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import PoolIcon from "@mui/icons-material/Pool";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DomainIcon from '@mui/icons-material/Domain';
const ItemsFastSearch = [
  {
    icon: <VillaIcon sx={{ fontSize: { xs: 30, md: 45 } }} />,
    label: "ویلا",
    linkAddres: "/residence-villas",
    description: "اجاره ویلا",
  },
  {
    icon: <HomeIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "کلبه",
    linkAddres: "/residence-cottage",
    description: "اجاره کلبه",
  },
  {
    icon: <NaturePeopleIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "بوم‌گردی",
    linkAddres: "/residence-ecotourism",
    description: "اجاره بوم‌گردی",
  },
  {
    icon: <PoolIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "استخردار",
    linkAddres: "/residence-pool",
    description: "اجاره استخردار",
  },
  {
    icon: <BeachAccessIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "ساحلی",
    linkAddres: "/residence-coastal",
    description: "اجاره ساحلی",
  },
  {
    icon: <LocationCityIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "آپارتمانی",
    linkAddres: "/residence-coastal",
    description: "اجاره خانه آپارتمانی",
  },
  {
    icon: <AgricultureIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "روستایی",
    linkAddres: "/residence-village",
    description: "اجاره روستایی",
  },
  {
    icon: <StarIcon sx={{ fontSize: { xs: 25, md: 35 } }} />,
    label: "پیشنهاد ویژه",
  },
];

export default ItemsFastSearch;
