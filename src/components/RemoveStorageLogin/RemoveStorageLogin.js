

const RemoveStorageLogin = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
  localStorage.removeItem("guid");
  localStorage.removeItem("user_id");
};

export default RemoveStorageLogin;
