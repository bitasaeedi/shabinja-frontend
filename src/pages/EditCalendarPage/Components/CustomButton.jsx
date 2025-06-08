import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#287dfa', 
    fontSize:'16px',
    margin:'4px 0',
    padding:'8px 0',
    width:"110px",
    '&:hover': {
      backgroundColor: '#287cfacc', 
    },
}));

export default CustomButton;