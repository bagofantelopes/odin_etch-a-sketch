// Default variables
let rows = 64;
let columns = 64;
let color = '#0000ff';
let bgColor = '#ffffff';
let shading = false;
let random = false;

// Makes the grid!
const grid = document.getElementById('grid-container');
const makeGrid = (rows, columns) => {
    // set size of grid template css properties
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', columns);

    // generate the grid's cells
    for (i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        grid.appendChild(cell).className = "grid-item";
        cell.style.backgroundColor = bgColor;

        // change color of a cell on mouseover for "drawing" effect!
        cell.addEventListener('mouseenter', (e) => {
            if (shading) {
                cell.style.backgroundColor = cell_shading(e.target.style.backgroundColor);
            } else if (random) {
                cell.style.backgroundColor = random_color();
            } else {
                cell.style.backgroundColor = color;
            }

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

// Event listener for the Grid Size range input element
const sizer = document.querySelector('#grid-size-selector');
sizer.addEventListener('input', (e) => {
    let p = document.querySelector('#size-display');
    p.textContent = `${e.target.value}x${e.target.value}`;
    rows = e.target.valueAsNumber;
    columns = e.target.valueAsNumber;
});

// event listener for submitting the new grid parameters
// a bit primitive but it works
const submitSize = document.querySelector('#size-submit');
submitSize.addEventListener('click', () => {
    clear_canvas();
    makeGrid(rows, columns);
});


// Button event listeners

// Event listener for Draw Color button
const colorButton = document.querySelector('#color-picker');
colorButton.value = color; // sets the default draw color on the color input
colorButton.addEventListener('input', (e) => {
    color = e.target.value;
});

// event for Background color button
const bgButton = document.querySelector('#background-picker');
bgButton.value = bgColor; // sets the default background color on the color input
bgButton.addEventListener('input', (e) => {
    bgTemp = bgColor; // store the old background color
    bgColor = e.target.value;

    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach(div => {
        // convert the default rgb value to a hex value
        hex = rgb_to_hex(div.style.backgroundColor);
        if (hex == bgTemp) { // if current background color of cells matches old one, change it
            div.style.backgroundColor = bgColor;
        };
    });
});

// event for Erase button
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

// event for Shading button
const shaderButton = document.getElementById('shading-button');
shaderButton.addEventListener('click', () => {
    let s = document.querySelector('#shading-button');
    if (s.textContent == 'Shading: On') {
        shading = false;
        s.textContent = 'Shading: Off';
        s.style.boxShadow = 'none';
    } else if (s.textContent == 'Shading: Off') {
        shading = true;
        s.textContent = 'Shading: On';
        s.style.boxShadow = '0 25px 50px 25px #e66465';
    }
});

// event for Random Color button
const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', () => {
    let r = document.querySelector('#random-button');
    if (r.textContent == 'Rainbow: On') {
        r.textContent = 'Rainbow: Off';
        random = false;
    } else if (r.textContent = 'Rainbow: Off') {
        r.textContent = 'Rainbow: On';
        random = true;
    }
});

// Event handler for Reset Button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    clear_canvas();
});

// clear_canvas function
// return the canvas to blank whitespace
const clear_canvas = () => {
    color = '#0000ff';
    colorButton.value = color;
    bgColor = '#ffffff';
    bgButton.value = bgColor;
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach(div => {
        div.style.backgroundColor = bgColor; // reset to currently selected background color
    });
};

// cell_shading function
// 'shades' a cell on the grid by adding 10% more 'black' to the cell each time it is called
const cell_shading = (rgb) => {
    let colorArr = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
    // I don't think this is the most effective way to do this, but 25.5 is 10% of 255 so
    // it seemed like a reasonable solution to me
    let r, g, b;
    if (colorArr == "") {
        r = 255, g = 255, b = 255; // reads and shades blank white cells correctly
    } else {
        r = parseInt(colorArr[0]), g = parseInt(colorArr[1]), b = parseInt(colorArr[2]);
    }
    return `rgb(${r-=25.5}, ${g-=25.5}, ${b-=25.5})`;
}

// random_color function
// returns an rgb string with random values between 0 and 255
const random_color = () => {
    let c = () => Math.random() * 255 >> 0;
    return `rgb(${c()}, ${c()}, ${c()})`;
}

// rgb_to_hex function
// converts rgb strings to hex strings
// I suppose it wouldn't be needed if you just used rgb strings exclusively,
// but I thought this was cool to mess around with anyway
const rgb_to_hex = (rgb) => {
    let hex = rgb.split("(")[1].split(")")[0];
    hex = hex.split(',');
    let hexa = hex.map((x) => {
        x = parseInt(x).toString(16);
        return (x.length==1) ? "0"+x : x;
    })
    return "#"+hexa.join("");
}