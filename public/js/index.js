"use strict";

import { addFilterQuery } from "./helpers/filterHelpers.js";

$(() => {
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  $(".main").on("change", "#filter", () => addFilterQuery());
});
