"use strict";

$(() => {
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };
});
