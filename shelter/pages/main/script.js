`use strict`

window.onload = function() {
    menuDeviceChanger();
    menuHandler();
}

function menuDeviceChanger() {
    let menu = document.querySelector(`header > nav`);

    if (document.documentElement.clientWidth < 751) {
        menu.className = `menu-mobile`
    }
    window.addEventListener(`resize`, function() {
        if (document.documentElement.clientWidth < 751) {
            menu.className = `menu-mobile`
        } else {
            menu.className = `menu-desktop`
        }
    })
}

function menuHandler() {
    let burger = document.querySelector(`.burger`);
    let menu = document.querySelector(`header > nav`);

    document.addEventListener(`click`, function(event) {
        if (event.target == burger) {
            menuOpenToggler(burger);
        } else {
            if (burger.classList.contains(`burger_opened`) && event.target != menu) {
                burger.classList.toggle(`burger_opened`);
                menu.classList.toggle(`menu-mobile_opened`);
                document.body.style.overflow = `auto`;
            }
        } 
    })
}

function menuOpenToggler(elem) {
    elem.classList.toggle(`burger_opened`);
    if (elem.classList.contains(`burger_opened`)) {
        document.body.style.overflow = `hidden`;
    } else {
        document.body.style.overflow = `auto`
    }

    document.querySelector(`header > nav`).classList.toggle(`menu-mobile_opened`);


}