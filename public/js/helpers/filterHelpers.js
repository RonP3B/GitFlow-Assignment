export const addFilterQuery = () => {
  const originUrl = window.location.origin;
  const selectedValue = $(".main #filter").val();
  const newUrl = selectedValue.isEmpty()
    ? `${originUrl}`
    : `${originUrl}?genre=${selectedValue}`;

  window.location = newUrl;
};
