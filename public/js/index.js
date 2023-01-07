"use strict";

import { addFilterQuery } from "./helpers/filterHelpers.js";
import { validateForm, clearMovieForm } from "./helpers/formHelpers.js";

$(() => {
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  $(".main").on("change", "#filter", () => addFilterQuery());
  $("#btn-submit").click(() => validateForm());
  $("#btn-clear").click(() => clearMovieForm());
});
