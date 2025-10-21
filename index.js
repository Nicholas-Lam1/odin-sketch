let isDrawing = false;
let currentButton = 0;

function drag(e) {
  if (isDrawing) {
    if (currentButton === 1) {
      e.target.style.backgroundColor = "black";
    } 
    else if (currentButton === 2) {
      e.target.style.backgroundColor = "white";
    }
  }
}

function draw(e) {
  e.target.style.backgroundColor = (e.target.style.backgroundColor === "black" ? "white" : "black")
}

document.addEventListener("DOMContentLoaded", () => {
  (() => {
    console.log("Initializing app...");
    initGrid();
  })();

  document.addEventListener("mousedown", (e) => {
    isDrawing = true;
    currentButton = e.buttons;
    e.preventDefault(); 
  });

  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  document.addEventListener("contextmenu", (e) => e.preventDefault());
});

function initGrid() {
  const drawgrid = document.getElementById("drawgrid");
  
  for(var i = 0; i < 256; i++) {
    const drawbox = document.createElement("div");
    drawbox.classList.add("drawbox")

    drawbox.addEventListener("mouseenter", drag);
    drawbox.addEventListener("mousedown", draw);
    
    drawgrid.append(drawbox);
  }
}