const deleteBtn = document.querySelectorAll('.delete')
const increaseBtn = document.querySelectorAll('.increase')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(increaseBtn).forEach((element)=>{
    element.addEventListener('click', increasePlays)
})

async function deleteItem (){
    const name = this.parentNode.childNodes[1].innerText

    try{
        const response = await fetch('deleteGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemsFromJS' : name
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
    const name = this.parentNode.childNodes[1].innerText

    try{
        const response = await fetch('increasePlays', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemsFromJS' : name
            })
        })

        const data = await response.json()
        console.log(data)
        window.location.reload()
    }catch(err){
        console.log(err)
}
}