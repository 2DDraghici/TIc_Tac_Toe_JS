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

oneplayerButton = document.getElementById("1player_button")
twoplayerbutton= document.getElementById("2player_button")
multiplayer_selection = document.getElementById("multiplayer_selection")
singleplayer_selection = document.getElementById("singleplayer_selection")
twoplayerbutton.addEventListener("click", ()=>
{
    console.log("2 player mode selected")
    multiplayer_selection.classList.remove("unselected")
    singleplayer_selection.classList.add("unselected")

})

oneplayerButton.addEventListener("click", ()=>
{
    console.log("1 player mode selected")
    multiplayer_selection.classList.add("unselected")
    singleplayer_selection.classList.remove("unselected")

})

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,8,9],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,5,8],
    [2,5,6]
]

//check for win
function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination =>
        {
            return combination.every( index =>
                {
                    return cells[index].classList.contains(currentClass)
                })
        })
}
