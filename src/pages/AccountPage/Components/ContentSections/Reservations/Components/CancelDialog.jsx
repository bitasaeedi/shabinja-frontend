import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import API_URL from "../../../../../../config/apiConfig";
import axios from "axios";
const baseUrl = API_URL;

export default function CancelDialog({
  open,
  setOpen,
  handleCancel,
  loadingCancel,
  changeReason
}) {
  // titles of reason
  const [titles, setTitle] = useState([]);
  const getTitles = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/MyReason/List/0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", response?.data?.data);

      setTitle(response?.data?.data);
    } catch (error) {
      console.log(error?.response);
      return error?.response;
    }
  };

  useEffect(() => {
    getTitles();
  }, []);

  const [checkedOptions, setCheckedOptions] = useState({});

  const [reasonText, setReasonText] = useState(""); //متن سایر دلایل


  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event , order) => {
    console.log("e" , event , " order" , order);
    
    const { name, checked } = event.target;
    
    if (checked) {
      // If this checkbox is being checked, uncheck all others
      setCheckedOptions({
        [name]: true,
      });
      if(order !== 1000){ //1000 = more
        changeReason(titles[order].title)
        console.log("1",titles[order]?.title);
      }else{
        changeReason("سایر دلایل")
      }
    } else {
      setCheckedOptions({});
    }
  };

  const handlereasonTextChange = (event) => {
    setReasonText(event.target.value);
    changeReason(event.target.value)
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>لغو رزرو</DialogTitle>
      <DialogContent>
        <DialogContentText mb={1} sx={{ fontSize: 14 }}>
          لطفاً دلیل لغو رزرو را انتخاب و توضیح دهید:
        </DialogContentText>

        {/* لیست چک‌باکس‌ها */}
        <FormGroup sx={{ fontSize: 15 }}>
          {titles?.map((item, index) => {
            return (
              <FormControlLabel key={index}
                sx={{ fontSize: 15 }}
                control={
                  <Checkbox
                    checked={checkedOptions[`option${item?.order}`] || false}
                    onChange={(event)=>{handleCheckboxChange(event,item?.order)}}
                    name={`option${item?.order}`}
                  />
                }
                label={item?.title}
              />
            );
          })}

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedOptions.more || false}
                onChange={(event)=>{handleCheckboxChange(event,1000)}}
                name="more"
              />
            }
            label="سایر دلایل"
          />
        </FormGroup>

        {/* فیلد توضیح دلایل */}
        {checkedOptions.more && (
          <TextField
            label="توضیح دلیل لغو (اختیاری)"
            multiline
            rows={2}
            fullWidth
            margin="normal"
            value={reasonText}
            sx={{ fontSize: 16 }}
            onChange={handlereasonTextChange}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        <Button onClick={() => handleCancel({ checkedOptions, reasonText })}>
          {loadingCancel ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            "تایید"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
