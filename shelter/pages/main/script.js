import Menu from "../../assets/js/Menu.js"; 
import Modal from "../../assets/js/Modal.js";
import DataStorage from "../../assets/js/DataStorage.js";

let dataStorage = new DataStorage();

let menu = new Menu();
menu.menuDeviceChangeHandler();
menu.menuHandler();

let modal = new Modal();
modal.getPetsData( dataStorage );
modal.modalHandler();



