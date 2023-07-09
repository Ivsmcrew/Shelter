import Menu from "../../assets/js/Menu.js"; 

window.onload = function() {
    let menu = new Menu();
    menu.menuDeviceChangeHandler();
    menu.menuHandler();
}