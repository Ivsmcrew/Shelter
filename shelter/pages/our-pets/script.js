import DataStorage from "../../assets/js/DataStorage.js";
import Menu from "../../assets/js/Menu.js"; 
import Modal from "../../assets/js/Modal.js";
import Pagination from "../../assets/js/Pagination.js";

let dataStorage = new DataStorage();

let menu = new Menu();
menu.menuDeviceChangeHandler();
menu.menuHandler();

let modal = new Modal();
modal.getPetsData( dataStorage );
modal.modalHandler();

let pagination = new Pagination();
pagination.getPetsData( dataStorage );
document.querySelector(`.pets-content > h3`).after( ...pagination.createComponent() );

