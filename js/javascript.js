const gridSize = 800;
let gridResolution = 16;

const gridDiv = document.querySelector("div.grid");


function createGrid(resolution, size) {
    gridDiv.textContent = "";
    gridDiv.style.height = `${gridSize}px`;
    gridDiv.style.width = `${gridSize}px`;
    for (let i = 1; i <= resolution; i++) {
        let rowPixelDiv = document.createElement("div");
        rowPixelDiv.classList.add("pixelRow");
        rowPixelDiv.style.height = `${Math.floor(size / resolution)}px`;
        gridDiv.appendChild(rowPixelDiv);
        for  (let j = 1; j <= resolution; j++) {
            let colPixelDiv = document.createElement("div");
            colPixelDiv.classList.add("pixel");
            colPixelDiv.style.width = `${Math.floor(size / resolution)}px`;
            rowPixelDiv.appendChild(colPixelDiv);
        }
    }
}


createGrid(gridResolution, gridSize);