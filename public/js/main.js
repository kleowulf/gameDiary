const deleteBtn = document.querySelectorAll('.delete')
const increaseBtn = document.querySelectorAll('.increase')
const ratingSelector = document.getElementById("ratingsSelctor")

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(increaseBtn).forEach((element)=>{
    element.addEventListener('click', increasePlays)
})

ratingSelector.addEventListener("change", filterByRating)

document.getElementById('searchBtn').addEventListener('click', searchGame)

async function deleteItem (){
    const id = this.parentNode.id

    try{
        const response = await fetch('/games/deleteGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemId' : id
            })
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }catch(err){
        console.log(err)
}
}

async function increasePlays() {
    const id = this.parentNode.id
    const name = this.parentNode.childNodes[1].innerText
    const plays = Number(this.parentNode.childNodes[10].innerText)
    console.log(this.parentNode.childNodes)
    console.log(plays)
    console.log(name)
    console.log(id)

    try{
        const response = await fetch('/games/increasePlays', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemId' : id,
                
            })
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }catch(err){
        console.log(err)
}
}

async function searchGame () {
    const gameName = document.getElementById("searchText").value;
    window.location.href = `/searchAGame?searchGame=${encodeURIComponent(gameName)}`
}

async function filterByRating () {
    console.log("rating selected")
    const gameRating = Number(ratingSelector.value)

    try{
        const response = await fetch(`searchByRating?rating=${gameRating}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},

        })

        window.location.href = `searchByRating?rating=${gameRating}`
   
    }catch(err){
        console.log(err)
}
}