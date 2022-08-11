const gridSize = 800;

const gridDiv = document.querySelector("div.grid");
const slider = document.querySelector("#resolution");
const resolutionText = document.querySelector("#resolutiontext");
const colorPicker = document.querySelector("#colorpicker");
const eraserButton = document.querySelector("button.eraser")
const gridlinesButton = document.querySelector("button.gridlines")
const resetButton = document.querySelector("button.reset");

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




// Draws color picker value if mouse is clicked
addEventListener("mousedown", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && eraserMode) {
            e.target.style.removeProperty("background-color");
        }else if (pixel.matches(":hover")) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})

// Draws color picker value if mouse is pressed and mouseover
addEventListener("mouseover", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && mousePressed && eraserMode) {
            e.target.style.removeProperty("background-color");
        } else if (pixel.matches(":hover") && mousePressed) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})




// Eraser functionality
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

// Onb button click resets the grid keeping the current resolution
resetButton.addEventListener("click", () => {
    createGrid(slider.value, gridSize);
});
