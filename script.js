import { METHOD } from "./choice.js"
import HttpRequest from "./HttpRequest.js"
import popupManager from "./popup.js"

const list = document.querySelector("#list")
const submitButton = document.querySelector(".submitButton")
const formElement = document.querySelector("form")
const contentElement = document.querySelector(".content")
const titleElement = document.querySelector(".title")
const memberIDs = [1, 2, 3, 4, 5]
const httpRequest = new HttpRequest()
const popup = new popupManager()
let members = []

// Construit la liste à afficher
const constructLI = (members) => {
        const orderedMembers = members.sort((a, b) => a.id - b.id)
        list.innerHTML = ""
        orderedMembers.forEach(member => {
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
            // Suppression d'une donnée
            newLiElement.addEventListener("click", async(e) => {
                const deleteElement = window.confirm("Supprimer cet element ?")
                if(deleteElement){
                    const response = await httpRequest.call(`https://jsonplaceholder.typicode.com/posts/1`, METHOD.DELETE)
                    if(response.success){
                        popup.toggle(true, "Utilisateur supprimer avec succès")
                    }
                    members = members.filter(memb => memb.id !== member.id)
                    constructLI(members)

                }
            })
            list.appendChild(newLiElement)
        })
    
}

// Récupère les premières données, affiche ces premières données
const fetchFirstMembers = async () => {
    const promises = memberIDs.map(async (id) => {
        const response = await httpRequest.call(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(response.success){
            members.push(response.data)
            return response.data
        }
    })
    await Promise.all(promises)
    constructLI(members)
}



// Soumission du formulaire d'ajout
submitButton.addEventListener("click", async (e) => {
    console.log(members)
    e.preventDefault()   
    if(formElement.reportValidity()){
        const formData = new FormData(formElement)
        const response = await httpRequest.call("https://jsonplaceholder.typicode.com/posts", METHOD.POST, {
            title: formData.get("title"),
            body: formData.get("content"),
            userId: memberIDs[memberIDs.length - 1] + 1,
        })
        if(response.success){
            members.push(response.data)
            constructLI(members)
            contentElement.value = ""
            titleElement.value = ""
            popup.toggle(true, "Utilisateur ajouter avec succès")
        }
    }
})



fetchFirstMembers()