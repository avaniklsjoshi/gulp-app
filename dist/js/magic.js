'use strict';

$(document).ready(function () {

  $('a').click(function (e) {
    alert('you are in admin section');
    e.preventDefault();
  });
});