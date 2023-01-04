cells = document.getElementsByClassName("cell")
Array.from(cells).forEach(element => {
    console.log(element)
    element.addEventListener('click',()=>
    {
        console.log(element)
        element.classList.add("x")

    })
});
//Player factory
const Player = (name,sign) =>
{
 
    return {name,sign}
}
let person1 = Player("jackson","x")
console.log(person1)