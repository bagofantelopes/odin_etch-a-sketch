let rows = 64;
let columns = 64;
let color = "#0000ff";

const grid = document.getElementById('grid-container');

const makeGrid = (rows, columns) => {
    // set size of grid template css properties
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', columns);
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
const sizer = document.querySelector('input');

// Button event listeners

// code for color change button/input
const colorButton = document.querySelector('#color-picker');
colorButton.value = color;
colorButton.addEventListener('input', (e) => {
    color = e.target.value;
});

const eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('click', () => {
    color = "ffffff";
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach(div => {
        div.style.backgroundColor = 'white';
    });
});
