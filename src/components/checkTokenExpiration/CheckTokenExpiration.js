import RemoveStorageLogin from "../RemoveStorageLogin/RemoveStorageLogin";

const CheckTokenExpiration = () => {
  const expirationTime = localStorage.getItem("expires_in");
  if (expirationTime && new Date().getTime() > expirationTime) {
    // توکن منقضی شده است، کاربر را به صفحه لاگین هدایت کنید
    // localStorage.clear();
    RemoveStorageLogin()
    // navigate('/login');
  }
};

export default CheckTokenExpiration;
