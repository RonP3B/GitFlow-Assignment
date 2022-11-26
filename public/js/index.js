"use strict";

import { addFilterQuery } from "./helpers/filterHelpers.js";
import { validateMoviesForm, clearFields } from "./helpers/formHelpers.js";

$(() => {
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  $(".main").on("change", "#filter", () => addFilterQuery());
  $("#btn-save").click(() => validateMoviesForm());
  $("#btn-clear").click(() => clearFields());
});
