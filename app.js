// toggle menu
var handburger = document.getElementsByClassName("handburger")[0];
handburger.addEventListener("click", () => {
  var menuItems = document.getElementsByClassName("menu-items")[0];
  menuItems.classList.toggle("active");
});
