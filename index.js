let gridSize = 12;
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

// ISSUE: Problem erasing a single tile, just toggles with right click.
function draw(e) {
  e.target.style.backgroundColor = (e.target.style.backgroundColor === "black" ? "white" : "black")
}

function inputSize() {
  const sizeinput = document.getElementById("sizeinput")
  const newSize = sizeinput.value;
  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    gridSize = newSize;
    initGrid();
  } else {
    alert("Please enter a number between 1 and 100.");
    sizeinput.value = gridSize;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  (() => {
    console.log("Initializing app...");
    initGrid();
  })();

  // Events for determining whether mouse is being clicked and dragged
  document.addEventListener("mousedown", (e) => {
    isDrawing = true;
    currentButton = e.buttons;
  });
  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  // Restrict right click menu on grid
  const drawgrid = document.getElementById("drawgrid");
  drawgrid.addEventListener("contextmenu", (e) => e.preventDefault());

  // Setup size input
  const sizeinput = document.getElementById("sizeinput");
  sizeinput.value = gridSize

  sizeinput.addEventListener("input", inputSize)
});

function initGrid() {
  const drawgrid = document.getElementById("drawgrid");
  // Clear grid
  drawgrid.innerHTML = ""
  
  // Generate grid based on inputted size
  for(var i = 0; i < gridSize ** 2; i++) {
    const drawbox = document.createElement("div");
    drawbox.classList.add("drawbox")
    drawbox.style.flex = `0 0 calc(100%/${gridSize})`;

    drawbox.addEventListener("mouseenter", drag);
    drawbox.addEventListener("mousedown", draw);
    
    drawgrid.append(drawbox);
  }
}