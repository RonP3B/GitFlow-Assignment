const showBackendToast = (toastMsg) => {
  Toastify({
    text: toastMsg,
    duration: 3500,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, orange, darkOrange)",
      fontSize: "1.05rem"
    },
  }).showToast();
};