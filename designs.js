// Create a grid that a user can color with clicks
//   - allows grid size entry and color selection

// When size is submitted by the user, call makeGrid()

// Set the inital 'paint' changes happen in click event
const PAINT = 'PAINT';
const ERASE = 'ERASE';
const theGridSize = document.forms.gridSize;
const userColor = document.getElementById('colorPicker');
const tileMode = document.getElementById('modeDisplay');
const displayHeight = document.getElementById('gridHeightDisplay');
const displayWidth = document.getElementById('gridWidthDisplay');
const userHeight = document.getElementById('inputHeight');
const userWidth = document.getElementById('inputWidth');

const grid = document.getElementById('pixelCanvas');
const gridCanvas = document.getElementById('gridCanvas');
let gridTileMode = PAINT // controls paint or erase of grid cells (td's)


theGridSize.submitGrid.onclick = function makeGrid(event) {
    // prevent page refreshing when clicking submit
    event.preventDefault();

    let mouseIsDown = false;

    const rows = userHeight.value;
    const columns = userWidth.value;

     // delete any previous table rows
    while (grid.hasChildNodes()) {
      grid.removeChild(grid.lastChild); // delete any previous table rows
    }

//Build the grid row by row and then append to the table
//  project rubrics requires use of for and while loops

    let tableRows = '';
    let r = 1;
    while (r <= rows) {
        tableRows += '<tr>';
        for (let c=1; c <= columns; c++) {
            tableRows += '<td></td>';
        }
        tableRows += '</tr>';
        r += 1;
    } // end while loop
    grid.insertAdjacentHTML('afterbegin', tableRows); // add grid to DOM
     // <p> tag with instructions for mouseover
    document.getElementById('legend').className = "legend";
    grid.classList.toggle('flyItIn'); // Fly in effect for table
    grid.classList.toggle('flyItIn2'); // use two to trigger reflow

    // grid.style.animationPlayState="paused";
// Listen for click to paint or erase a tile

    grid.addEventListener("click", function(event) {
        event.preventDefault();
        paintEraseTiles(event.target);
    });

// Listen for mouse down, up and over for continuous paint and erase


    grid.addEventListener('mousedown', function(event) {
        event.preventDefault();
        mouseIsDown = event.which === 1 ? true : false;
    });


    document.addEventListener('mouseup', function(event) {
        event.preventDefault();
        mouseIsDown = false;
    });


    grid.addEventListener('mouseover', function(event) {

        event.preventDefault();
        if (mouseIsDown) {paintEraseTiles(event.target);}
    }); // end continuous paint and erase

}; // end grid

// paint or erase cells based on the mode (girdTileMode)

function paintEraseTiles(targetCell) {
    if (targetCell.nodeName === 'TD') {
        targetCell.style.backgroundColor = gridTileMode === PAINT ? userColor.value : 'transparent';

    } else {
        console.log("Nice try: " + targetCell.nodeName + " talk to the hand!");
    }
}


theGridSize.height.oninput = function (){
    displayHeight.innerHTML = ' ' + theGridSize.height.value;

};
// Display how many cells wide the grid will be

theGridSize.width.oninput = function (){
    displayWidth.innerHTML = ' ' + theGridSize.width.value;

};


userColor.oninput = function (){
    gridTileMode = PAINT;
    tileMode.innerHTML = ' ' + gridTileMode;
};
// Erase colors from the grid


document.getElementById('clearGrid').addEventListener('click', function() {
    gridCanvas.classList.toggle('rotateCanvas'); // rotate the Design Canvas div
    let tiles = grid.getElementsByTagName('td');

    for(let i = 0; i <= tiles.length; i++) {
        tiles[i].style.backgroundColor = 'transparent';
    }
});


document.getElementById('mode').addEventListener('click', function(event) {
    gridTileMode = event.target.className.indexOf('paint') >=0 ? PAINT : ERASE;
  
    tileMode.innerHTML = ' ' + gridTileMode;
}); // end mode change / display
