import Swal from "sweetalert2";
// import "./SweetAlertStyles.css"; // Import the CSS file

const SweetAlert = (icon, text, time) => {
  const swalIcon = icon === true ? "success" : icon === false ? "error" : "error";

  return Swal.fire({
    icon: swalIcon,
    text: text || "خطای نامشخص",
    showConfirmButton: false,
    timer: time || 3500,
    timerProgressBar: true,
    customClass: {
      popup: "custom-swal-popup", // Apply custom styling class here
      icon: "icon-swal-fire",
    },
  });
};

export default SweetAlert;
