export const addFilterQuery = () => {
  const originUrl = window.location.origin;
  const selectedValue = $(".main #filter").val();
  const newUrl = selectedValue.isEmpty()
    ? `${originUrl}/movies`
    : `${originUrl}/movies?genre=${selectedValue}`;

  window.location = newUrl;
};
