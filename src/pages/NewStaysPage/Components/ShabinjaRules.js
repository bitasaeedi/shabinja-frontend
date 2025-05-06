import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import { useNavigate } from "react-router-dom";

const rules = [
  "استفاده از وب‌سایت تنها برای اهداف قانونی مجاز است.",
  "کاربران باید از اشتراک‌گذاری اطلاعات حساب کاربری خود با دیگران خودداری کنند.",
  "ورود اطلاعات نادرست ممکن است به مسدودسازی حساب کاربری منجر شود.",
  "کاربران مسئول تمامی فعالیت‌های انجام شده با حساب کاربری خود هستند.",
  "تمامی تراکنش‌ها در شبینجا مطابق قوانین جمهوری اسلامی ایران انجام می‌شود.",
  "بازگشت وجه تنها مطابق شرایط و ضوابط خاص امکان‌پذیر است.",
  "رعایت احترام به دیگر کاربران در تمامی ارتباطات الزامی است.",
  "هرگونه سوءاستفاده از خدمات یا محصولات شبینجا ممنوع است.",
  "کاربران موظف به به‌روزرسانی اطلاعات حساب کاربری خود هستند.",
  "شبینجا حق تغییر قوانین و مقررات را در هر زمان برای خود محفوظ می‌داند.",
  "کاربران باید از دسترسی غیرمجاز به حساب کاربری خود جلوگیری کنند.",
  "تمامی اطلاعات کاربران تحت حفاظت و محرمانگی قرار دارد.",
  "استفاده از ربات‌ها و ابزارهای خودکار برای دسترسی به وب‌سایت ممنوع است.",
  "تخطی از قوانین ممکن است به تعلیق یا حذف حساب کاربری منجر شود.",
  "تمامی ارتباطات مالی باید از طریق روش‌های تعیین‌شده در شبینجا انجام شود.",
  "ارسال هرگونه محتوای غیرمجاز، توهین‌آمیز یا غیرقانونی ممنوع است.",
  "شبینجا هیچ‌گونه مسئولیتی در قبال مشکلات ناشی از اشتباهات کاربر ندارد.",
  "کاربران موظف به مطالعه و پذیرش قوانین پیش از استفاده از خدمات هستند.",
  "وب‌سایت ممکن است برای بهبود خدمات به‌طور موقت غیرقابل دسترس شود.",
  "هرگونه تبلیغات یا بازاریابی بدون اجازه شبینجا ممنوع است.",
  "کاربران باید از مرورگرهای به‌روز برای استفاده از وب‌سایت استفاده کنند.",
  "شبینجا مسئولیتی در قبال ضرر و زیان ناشی از قطع اینترنت ندارد.",
  "کاربران باید از ارسال پیام‌های ناخواسته یا اسپم خودداری کنند.",
  "تمامی نظرات کاربران باید محترمانه و بدون توهین باشد.",
  "تغییر شماره تلفن یا ایمیل ثبت‌شده باید سریعاً به اطلاع شبینجا برسد.",
  "کاربرانی که قوانین را نقض کنند ممکن است از خدمات محروم شوند.",
  "شبینجا می‌تواند حساب‌های غیرفعال را پس از 6 ماه غیرفعال کند.",
  "تمامی اطلاعات مالی و شخصی کاربران محرمانه باقی خواهد ماند.",
  "در صورت وجود هرگونه سوال یا مشکل، کاربران باید از طریق پشتیبانی اقدام کنند.",
];

const ShabinjaRules = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      acceptRules: false, // Checkbox default value
    },
  });

  const onSubmit = async (data) => {
    setLoading(true)
    const { acceptRules } = data;
    if (acceptRules) {
      const myData = {};
      if (manageStepsContext?.stayCodeToComplete) {
        await manageStepsContext?.handleUpdateStay(myData);
        navigate(`/pannel/stays`);
        // manageStepsContext?.handleNext();
      }
    }
    setLoading(false)
  };

  // Check whether the "acceptRules" checkbox is selected
  const isNextDisabled = !watch("acceptRules");

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormGroup>
            <Grid container spacing={2}>
              {/* Rules Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    maxHeight: { xs: "300px", md: "400px" },
                    overflowY: "auto",
                    // border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: 2,
                    fontSize: { xs: 14, md: 16 },
                  }}
                  className="border shadow-sm"
                >
                  <List>
                    {rules.map((rule, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText
                          primary={`${index + 1}. ${rule}`}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: "14px", md: "16px" }, // Responsive font size
                              textAlign: "justify",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>

              {/* Checkbox to accept rules */}
              <Grid item xs={12}>
                <Controller
                  name="acceptRules"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="با قوانین موافقم"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          {/* Sidebar Card */}
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  mb: 1,
                }}
              >
                <GavelOutlinedIcon sx={{ mr: 1 }} />
                قوانین شبینجا
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                پذیرش قوانین شبینجا برای ثبت اقامتگاه الزامی است.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fixed Buttons */}
      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={isNextDisabled}
      />
    </>
  );
};

export default ShabinjaRules;
