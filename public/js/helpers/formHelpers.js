const fields = ["name", "description", "status", "genre"];

const showAlert = (msg) => {
  $(".alert span").html(msg);
  $(".alert").fadeIn(500).delay(2000).fadeOut(500);
};

const checkFields = () => {
  for (const field of fields) if ($(`#${field}`).val().isEmpty()) return false;
  return true;
};

const highlightEmptyFields = () => {
  for (const field of fields)
    if ($(`#${field}`).val().isEmpty()) $(`#${field}`).addClass("is-invalid");
    else $(`#${field}`).removeClass("is-invalid");
};

export const clearFields = (edit) => {
  for (const field of fields) {
    if (field === "status") {
      $(`#${field}`).val("Active");
      continue;
    }

    $(`#${field}`).val("").removeClass("is-invalid");
  }

  $(`#${fields[0]}`).focus();
};

export const validateMoviesForm = () => {
  if (checkFields()) {
    $(".main .form-movies").submit();
  } else {
    highlightEmptyFields();
    showAlert("You must complete all the fields");
  }
};
