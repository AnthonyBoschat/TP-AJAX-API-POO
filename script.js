const list = document.querySelector("#list")

const memberIDs = ["1", "2", "3", "4", "5"]

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
        const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const member = await result.json()
        constructLI(member)
    })
}

fetchAllMembers()
