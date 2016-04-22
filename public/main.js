'use strict';

$(function() {
  $('a.theme').click(storeTheme);
  console.log($('a.theme'));
});

// if (localStorage.theme && window.location.hostname.indexOf(localStorage.theme) === -1){
//   console.log('hi');
//   window.location = `/${localStorage.theme}`
//
// }

function storeTheme(e) {
  // e.preventDefault();
  // console.log( $(this) );
  localStorage.theme = "";
  var theme= $(this).attr('href');
  localStorage.theme = theme;
  console.log(theme)

}
