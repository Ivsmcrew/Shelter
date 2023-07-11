import Menu from "../../assets/js/Menu.js"; 
import Modal from "../../assets/js/Modal.js";

window.onload = function() {
    let menu = new Menu();
    menu.menuDeviceChangeHandler();
    menu.menuHandler();

    let modal = new Modal(
        {
            name: "Jennifer",
            img: "../../assets/images/pets-jennifer.png",
            type: "Dog",
            breed: "Labrador",
            description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
            age: "2 months",
            inoculations: "none",
            diseases: "none",
            parasites: "none"
          }
    );
    modal.createModalNodes();
    modal.assembleModalNodes();
}

