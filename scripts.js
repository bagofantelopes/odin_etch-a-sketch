// Default variables
let rows = 64;
let columns = 64;
let color = "#0000ff";
let bgColor = '#ffffff';

// Makes the grid!
const grid = document.getElementById('grid-container');
const makeGrid = (rows, columns) => {
    // set size of grid template css properties
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', columns);
    grid.style.backgroundColor = bgColor;
    // generate the grid's cells
    for (i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        //cell.style.height = '25px';
        //cell.style.width = '25px';
        //cell.innerText = (i + 1);
        grid.appendChild(cell).className = "grid-item";
        
        // change color of a cell on mouseover for "drawing" effect!
        cell.addEventListener('mouseenter', () => {
            cell.style.backgroundColor = color;
        });
        
        /*
        cell.addEventListener('mouseout', () => {
            setTimeout( () => {
                cell.style.backgroundColor = 'white';
            }, 500);
        });
        */
    };
};

makeGrid(rows, columns);

// Grid size selector
const sizer = document.querySelector('#grid-size-selector');
sizer.addEventListener('input', (e) => {
    //console.log(e.target.valueAsNumber);
    let p = document.querySelector('#size-display');
    p.textContent = `${e.target.value}x${e.target.value}`;
    rows = e.target.valueAsNumber;
    columns = e.target.valueAsNumber;
});

const submitSize = document.querySelector('#size-submit');
submitSize.addEventListener('click', () => {
    clearCanvas();
    makeGrid(rows, columns);
});

// Button event listeners

// code for color change button/input
const colorButton = document.querySelector('#color-picker');
colorButton.value = color;
colorButton.addEventListener('input', (e) => {
    color = e.target.value;
});

const bgButton = document.querySelector('#background-picker');
bgButton.value = bgColor;
bgButton.addEventListener('input', (e) => {
    bgTemp = bgColor;
    bgColor = e.target.value;
    console.log(bgTemp);
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach(div => {
        if (div.style.backgroundColor != color)
            div.style.backgroundColor = bgColor;
    });
});


const eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('click', () => {
    let p = document.querySelector('#erase-button');
    if (p.textContent == 'Eraser: On') {
        color = colorButton.value;
        p.textContent = 'Eraser: Off';
    } else if (p.textContent == 'Eraser: Off') {
        p.textContent = 'Eraser: On';
        color = bgColor;    
    }
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    clearCanvas();
});


// function to return the canvas to blank whitespace
const clearCanvas = () => {
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach(div => {
        div.style.backgroundColor = bgColor;
    });
    color = colorButton.value;
    bgColor = bgButton.value;
};
