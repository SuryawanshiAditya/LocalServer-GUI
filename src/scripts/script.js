// components
let controlBtn = document.getElementById("control-btn");

// set control button state
controlBtn.addEventListener("click", () => {
  let state = checkControlState("control-btn");
  if (state == "up") {
    terminateServer();
  } else if (state == "down") {
    startServer();
  }
});

// helper functions
function checkControlState(id) {
  let controlBtn = document.getElementById(id);
  if (controlBtn.innerText == "Start Server") {
    return "down";
  } else if (controlBtn.innerText == "Terminate Server") {
    return "up";
  }
}

function startServer() {
  controlBtn.innerText = "Terminate Server";
  controlBtn.style.background = "#f36760";
}

function terminateServer() {
  controlBtn.innerText = "Start Server";
  controlBtn.style.background = "rgb(87, 205, 168)";
}
