//variables for each item called out by an id in the HTML page
let ourForm = document.getElementById("ourForm")
let ourField = document.getElementById("ourField")
let ourList = document.getElementById("ourList")

// create an event on submit and make sure the default isn't set
ourForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    createItem(ourField.value)
})

//section of code to create a list item when they are put into the input element
function createItem(x){
    let ourHTML = `<li>${x}<button onclick="deleteItem(this)">Delete</button></li>`
    ourList.insertAdjacentHTML("beforeend", ourHTML)
    ourField.value = ""
    ourField.focus()
}

// section of code to delete each item on delete button clicj
function deleteItem(elementToDelete){
    elementToDelete.parentElement.remove()
}