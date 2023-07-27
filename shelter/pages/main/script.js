import DataStorage from "../../assets/js/DataStorage.js";
import Menu from "../../assets/js/Menu.js"; 
import Modal from "../../assets/js/Modal.js";
import Slider from "../../assets/js/Slider.js";

let dataStorage = new DataStorage();

let menu = new Menu();
menu.menuDeviceChangeHandler();
menu.menuHandler();

let modal = new Modal();
modal.getPetsData( dataStorage );
modal.modalHandler();

let slider = new Slider();
slider.getPetsData( dataStorage );
document.querySelector(`section.pets > h3`).after( slider.createComponent() );



 