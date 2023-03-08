// elements 
let controlBtn = document.getElementById('control-btn')

// set control button state
controlBtn.addEventListener('click', () => {
    let state = checkControlState('control-btn')
    if (state == "enabled") {
        controlBtn.innerText = "Start Server"
        controlBtn.style.background = "rgb(87, 205, 168)"
    } else if (state == "disabled") {
        controlBtn.innerText = "Terminate Server"
        controlBtn.style.background = "#f36760"
    }
})

// helper functions 
function checkControlState(id) {
    let controlBtn = document.getElementById(id)
    if (controlBtn.innerText == "Start Server") {
        return "disabled"
    } else if (controlBtn.innerText == "Terminate Server") {
        return "enabled"
    }
}