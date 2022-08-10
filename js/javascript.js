const gridDiv = document.querySelector("div.grid");
const slider = document.querySelector("#resolution")
const resolutionText = document.querySelector("#resolutiontext");

const gridSize = 800;

function createGrid(resolution, size) {
    gridDiv.textContent = "";
    gridDiv.style.height = `${gridSize}px`;
    gridDiv.style.width = `${gridSize}px`;
    for (let i = 1; i <= resolution; i++) {
        let rowPixelDiv = document.createElement("div");
        rowPixelDiv.classList.add("pixelRow");
        rowPixelDiv.style.height = `${size / resolution}px`;
        gridDiv.appendChild(rowPixelDiv);
        for  (let j = 1; j <= resolution; j++) {
            let colPixelDiv = document.createElement("div");
            colPixelDiv.classList.add("pixel");
            colPixelDiv.style.width = `${size / resolution}px`;
            rowPixelDiv.appendChild(colPixelDiv);
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