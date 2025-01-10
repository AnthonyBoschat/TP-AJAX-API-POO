class popupManager{
    constructor(){

    }

    toggle(success, content){
        const popup = document.querySelector(".popup")
        popup.classList.add(success ? "success" : "error", "on")
        popup.textContent = content
        setTimeout(() => {
            popup.classList.add("opacityOut")
            popup.classList.remove("on")
            setTimeout(() => {
                popup.classList = "popup"
            }, 500);
        }, 2000);
    }
}

export default popupManager