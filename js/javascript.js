const gridSize = 800;
const gridDiv = document.querySelector("div.grid");
const slider = document.querySelector("#resolution");
const resolutionText = document.querySelector("#resolutiontext");
const colorPicker = document.querySelector("#colorpicker");

let mousePressed = false
let pixels = [];

function createGrid(resolution, size) {
    gridDiv.textContent = "";
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
            pixels.push(pixelDiv)
        }
    }
}

createGrid(slider.value, gridSize);

resolutionText.textContent = `${slider.value} x ${slider.value}`;


slider.addEventListener("input", () => {
    resolutionText.textContent = `${slider.value} x ${slider.value}`;
})

slider.addEventListener("change", () => {
    resolutionText.textContent = `${slider.value} x ${slider.value}`;
    createGrid(slider.value, gridSize);
})

addEventListener("mousedown", () => mousePressed = true)
addEventListener("mouseup", () => mousePressed = false)

addEventListener("mouseover", (e) => {
    for (let pixel of pixels) {
        if (pixel.matches(":hover") && mousePressed) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
})

