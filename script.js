import { METHOD } from "./choice.js"
import HttpRequest from "./HttpRequest.js"
import popupManager from "./popup.js"

const list = document.querySelector("#list")
const submitButton = document.querySelector(".submitButton")
const formElement = document.querySelector("form")
const memberIDs = [1, 2, 3, 4, 5]
const httpRequest = new HttpRequest()
const popup = new popupManager()
let members = []

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


fetchAllMembers()


submitButton.addEventListener("click", async (e) => {
    e.preventDefault()   
    const formData = new FormData(formElement)
    const response = await httpRequest.call("https://jsonplaceholder.typicode.com/posts", METHOD.POST, {
        title: formData.get("title"),
        body: formData.get("content"),
        userId: memberIDs[memberIDs.length - 1] + 1,
      })
    if(response.success){
        constructLI(response.data)
        popup.toggle(true, "Utilisateur ajouter avec succès")
    }
})


