const deleteBtn = document.querySelectorAll('.delete')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
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