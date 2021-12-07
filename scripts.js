let rows = 64;
let columns = 64;

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
            cell.style.backgroundColor = 'red';
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
