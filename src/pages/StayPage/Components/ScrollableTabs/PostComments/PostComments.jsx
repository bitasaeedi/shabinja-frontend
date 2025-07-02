import {
  Divider,
  TextField,
  Button,
  Typography,
  Box,
  Rating,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import API_URL from "../../../../../config/apiConfig";
const baseUrl = API_URL;

export default function PostComments({ id }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      service: 0,
      place: 0,
      periodicService: 0,
      cleanliness: 0,
      options: 0,
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/CommentTour`,
        {
          HostTourId: id,
          service: data.service,
          place: data.place,
          servicelang: data.periodicService,
          clean: data.cleanliness,
          option: data.options,
          Dics: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "comments response");
      return response.data;
    } catch (error) {
      console.log("comments Error:", error?.response?.data);
      return error?.response?.data;
    }
  };

  return (
    <>
      <Box>
        <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: 18, md: 20 },
            marginBottom: "1rem",
          }}
        >
          ثبت نظر
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}
          sx={{}}
          >
            {/* خدمات */}
            <Grid item xs={6} sm={4}>
              <Typography mb={".2rem"}>خدمات</Typography>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    sx={{color:"gold"}}
                  />
                )}
              />
            </Grid>
            {/*  sx={{ display: "flex", gap: ".7rem", alignItems: "stretch" }} */}
           
            {/* مکان */}
            <Grid item xs={6} sm={4}>
              <Typography mb={".2rem"}>مکان</Typography>
              <Controller
                name="place"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    sx={{color:"gold"}}
                  />
                )}
              />
            </Grid>

            {/* سرویس دوره‌ای */}
            <Grid item xs={6} sm={4}>
              <Typography mb={".2rem"}>سرویس دوره‌ای</Typography>
              <Controller
                name="periodicService"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    sx={{color:"gold"}}
                  />
                )}
              />
            </Grid>

            {/* پاکیزگی */}
            <Grid item xs={6} sm={4}>
              <Typography mb={".2rem"}>پاکیزگی</Typography>
              <Controller
                name="cleanliness"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    sx={{color:"gold"}}
                  />
                )}
              />
            </Grid>

            {/* امکانات رفاهی*/}
            <Grid item xs={6} sm={4}>
              <Typography mb={".2rem"}>امکانات رفاهی</Typography>
              <Controller
                name="options"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    sx={{color:"gold"}}
                  />
                )}
              />
            </Grid>

            {/* توضیحات */}
            <Grid item xs={12} sm={10}>
              <Typography mb={".3rem"}>توضیحات</Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="توضیحات خود را بنویسید..."
                  />
                )}
              />
            </Grid>

            {/* دکمه ثبت */}
            <Grid
              item
              xs={12}
            >
              <Box mt={2}>
                <Button type="submit" variant="contained" sx={{padding:"6px 40px"}}>
                  ثبت نظر
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>
    </>
  );
}
