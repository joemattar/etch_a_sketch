const gridSize = 800;

const gridDiv = document.querySelector("div.grid");
const slider = document.querySelector("#resolution");
const resolutionText = document.querySelector("#resolutiontext");
const colorPicker = document.querySelector("#colorpicker");
const darkenButton = document.querySelector(".radiobuttons#darken");
const lightenButton = document.querySelector(".radiobuttons#lighten");
const rainbowButton = document.querySelector(".radiobuttons#rainbow");
const eraserButton = document.querySelector("button.eraser");
const gridlinesButton = document.querySelector("button.gridlines");
const resetButton = document.querySelector("button.reset");
const saveButton = document.querySelector("button.save")

let mousePressed = false;
let eraserMode = false;
let pixels = [];


// Grid creation function
function createGrid(resolution, size) {
    gridDiv.textContent = "";
    pixels = [];
    gridDiv.style.height = `${gridSize}px`;
    gridDiv.style.width = `${gridSize}px`;
    for (let i = 1; i <= resolution; i++) {
        let rowpixelDiv = document.createElement("div");
        rowpixelDiv.classList.add("pixelRow");
        rowpixelDiv.style.height = `${size / resolution}px`;
        gridDiv.appendChild(rowpixelDiv);
        for  (let j = 1; j <= resolution; j++) {
            let pixelDiv = document.createElement("div");
            pixelDiv.classList.add("pixel");
            pixelDiv.style.width = `${size / resolution}px`;
            rowpixelDiv.appendChild(pixelDiv);
            pixels.push(pixelDiv);
        }
    }
}

// Function to convert hex color to rgb color
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
}

// Function to decrease opacity by 10% under certain conditions
function darkenColor(rgbColor) {
    if (!rgbColor) {
        rgbColor = hexToRgb(colorPicker.value);
        let rgbString = rgbColor.substring(4, rgbColor.length - 1);
        let rgbArray = rgbString.split(", ").map(Number);
        rgbColor = `rgba(${rgbArray.toString()}, 0.1)`;
    } else if (rgbColor) {
        if (rgbColor.charAt(3) !== "a") {
        } else { 
        let rgbString = rgbColor.substring(5, rgbColor.length - 1);
        let rgbArray = rgbString.split(", ").map(Number);
        rgbArray[3] += 0.1;
        rgbColor = `rgba(${rgbArray.toString()})`;
        }
    }
    return rgbColor
}

// Function to increase opacity by 10% under certain conditions
function lightenColor(rgbColor) {
    if (!rgbColor) {

    } else if (rgbColor) {
        if (rgbColor.charAt(3) !== "a") {
            let rgbString = rgbColor.substring(4, rgbColor.length - 1);
            let rgbArray = rgbString.split(", ").map(Number);
            rgbColor = `rgba(${rgbArray.toString()}, 0.9)`;
        } else {
            let rgbString = rgbColor.substring(5, rgbColor.length - 1);
            let rgbArray = rgbString.split(", ").map(Number);
            if (rgbArray[3] > 0.1) {
                rgbArray[3] -= 0.1;
            }
            rgbColor = `rgba(${rgbArray.toString()})`;
        }
    }
    return rgbColor
}

// Function to randomize colors
function colorRandomizer() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`
}

//Initial grid creation
createGrid(slider.value, gridSize);

// Initial resolution text
resolutionText.textContent = `${slider.value} x ${slider.value}`;

// Changes slider text on slider sliding only
slider.addEventListener("input", () => {
    resolutionText.textContent = `${slider.value} x ${slider.value}`;
})

// Changes slider text and resets grid with new resolution on slider change
slider.addEventListener("change", () => {
    resolutionText.textContent = `${slider.value} x ${slider.value}`;
    createGrid(slider.value, gridSize);
})

// Event listener to toggle mousePressed true or false
addEventListener("mousedown", () => mousePressed = true);
addEventListener("mouseup", () => mousePressed = false);

// Erases if mouse is clicked and eraser mode is true
// Draw random colors if mouse is clicked and rainbow mode is true
// Draws color picker value if mouse is clicked
addEventListener("mousedown", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && eraserMode) {
            e.target.style.removeProperty("background-color");
        } else if (pixel.matches(":hover") && darkenButton.matches(":checked")) {
            e.target.style.backgroundColor = darkenColor(e.target.style.backgroundColor);
        } else if (pixel.matches(":hover") && lightenButton.matches(":checked")) {
                e.target.style.backgroundColor = lightenColor(e.target.style.backgroundColor);
        } else if (pixel.matches(":hover") && rainbowButton.matches(":checked")) {
            e.target.style.backgroundColor = colorRandomizer();
        } else if (pixel.matches(":hover")) {            
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})

// Erases if mouse is pressed and mouseover and eraser mode is true
// Draw random colors if mouse is pressed and mouseover and rainbow mode is true
// Draws color picker value if mouse is pressed and mouseover
addEventListener("mouseover", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && mousePressed && eraserMode) {
            e.target.style.removeProperty("background-color");
        } else if (pixel.matches(":hover") && mousePressed && darkenButton.matches(":checked")) {
            e.target.style.backgroundColor = darkenColor(e.target.style.backgroundColor);
        } else if (pixel.matches(":hover") && mousePressed && lightenButton.matches(":checked")) {
            e.target.style.backgroundColor = lightenColor(e.target.style.backgroundColor);
        } else if (pixel.matches(":hover") && mousePressed && rainbowButton.matches(":checked")) {
            e.target.style.backgroundColor = colorRandomizer();
        } else if (pixel.matches(":hover") && mousePressed) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})

// Eraser mode functionality
eraserButton.addEventListener("click", () => {
    eraserButton.classList.toggle("pressed")
    if (eraserMode) {
        eraserMode = false;
    } else if (!eraserMode) {
        eraserMode = true;
    }
})

// Toggle Gridlines ON and Off
gridlinesButton.addEventListener("click", () => {
    gridlinesButton.classList.toggle("pressed")
    for (let pixel of pixels) {
        pixel.classList.toggle("removemargin");
    }
})

// On button click resets the grid keeping the current resolution
resetButton.addEventListener("click", () => {
    createGrid(slider.value, gridSize);
})


// FEATURE BELOW TO BE ADDED
// On button click save an image locally, should prompt for local path
// saveButton.addEventListener("click", () => {
// })
