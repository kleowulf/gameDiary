const deleteBtn = document.querySelectorAll('.delete')
const increaseBtn = document.querySelectorAll('.increase')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(increaseBtn).forEach((element)=>{
    element.addEventListener('click', increasePlays)
})

document.getElementById('searchBtn').addEventListener('click', searchGame)

async function deleteItem (){
    const id = this.parentNode.id

    try{
        const response = await fetch('deleteGame', {
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
        const response = await fetch('increasePlays', {
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
    const gameName = document.getElementById("searchText").value

    try{
        const response = await fetch(`searchAGame?gameName=${gameName}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},

        })

        const data = await response.json()
        console.log(data)
   
    }catch(err){
        console.log(err)
}
}