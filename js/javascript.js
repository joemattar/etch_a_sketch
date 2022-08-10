const gridSize = 800;

const gridDiv = document.querySelector("div.grid");
const slider = document.querySelector("#resolution");
const resolutionText = document.querySelector("#resolutiontext");
const colorPicker = document.querySelector("#colorpicker");
const resetButton = document.querySelector("button.reset");

let mousePressed = false
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

// Draws color picker value if mouse is pressed and mouseover
addEventListener("mousedown", () => mousePressed = true);
addEventListener("mouseup", () => mousePressed = false);
addEventListener("mouseover", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && mousePressed) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})


// Onb button click resets the grid keeping the current resolution
resetButton.addEventListener("click", () => {
    createGrid(slider.value, gridSize);
});
