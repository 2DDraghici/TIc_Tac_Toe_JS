cells = document.getElementsByClassName("cell")
Array.from(cells).forEach(element => {
    console.log(element)
    element.addEventListener('click',()=>
    {
        console.log(element)
        element.classList.add("x")

    })
});