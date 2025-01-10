import { METHOD } from "./choice.js"
import HttpRequest from "./HttpRequest.js"
import popupManager from "./popup.js"

const list = document.querySelector("#list")
const submitButton = document.querySelector(".submitButton")
const memberIDs = ["1", "2", "3", "4", "5"]
const httpRequest = new HttpRequest()
const popup = new popupManager()

const constructLI = (member) => {
    const newLiElement = document.createElement("li")

    const headerDiv = document.createElement("div")
    const titleSpan = document.createElement("span")
    const idSpan = document.createElement("span")

    const contentParagraph = document.createElement("p")

    contentParagraph.innerText = member.body
    idSpan.innerText = member.id
    titleSpan.innerText = member.title

    headerDiv.classList.add("header")
    titleSpan.classList.add("title")

    idSpan.classList.add("id")

    headerDiv.appendChild(titleSpan)
    headerDiv.appendChild(idSpan)
    newLiElement.appendChild(headerDiv)
    newLiElement.appendChild(contentParagraph)
    list.appendChild(newLiElement)

}

const fetchAllMembers = () => {
    memberIDs.forEach(async (id) => {
        const response = await httpRequest.call(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(response.success){
            constructLI(response.data)
        }
    })
}

const togglePopup = (data) => {
    const popup = document.querySelector(".popup")
    popup.classList.add("error", "on")
    popup.textContent = content
    setTimeout(() => {
        popup.classList.add("opacityOut")
        popup.classList.remove("on")
        setTimeout(() => {
            popup.classList = "popup"
        }, 500);
    }, 2000);
}


fetchAllMembers()


submitButton.addEventListener("click", async (e) => {
    e.preventDefault()   
    const response = await httpRequest.call("https://jsonplaceholder.typicode.com/posts", METHOD.POST, {
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    if(response.success){
        popup.toggle(true, "Utilisateur ajouter avec succès")
    }
})


