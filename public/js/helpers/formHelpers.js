import { showToast } from "./showToast.js";

const checkRequiredFields = () => {
  let res = true;

  $(".required-field").each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};

const highlightFields = () => {
  $(".required-field").each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("is-invalid");
    else $(this).removeClass("is-invalid");
  });
};

export const clearMovieForm = () => {
  const fields = ["name", "description", "status", "genre"];

  for (const field of fields) {
    if (field === "status") {
      $(`#${field}`).val("0");
      continue;
    }

    $(`#${field}`).val("").removeClass("is-invalid");
  }

  $(`#${fields[0]}`).focus();
};

export const validateForm = () => {
  if (checkRequiredFields()) {
    $(".default-form").submit();
  } else {
    highlightFields();
    showToast("You must complete all the fields");
  }
};
