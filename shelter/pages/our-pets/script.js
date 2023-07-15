import Menu from "../../assets/js/Menu.js"; 
import Modal from "../../assets/js/Modal.js";
import Data from "../../assets/js/Data.js";

let menu = new Menu();
menu.menuDeviceChangeHandler();
menu.menuHandler();

let modal = new Modal();
modal.modalHandler();