init();

function createGrid(cellSize) {

    const gridElement = document.createElement("div");
    const cellElement = document.createElement("div");
    const gridCount = 512 / cellSize;
    const cellCount = gridCount * gridCount;

    gridElement.className = "grid";
    gridElement.draggable = false;
    gridElement.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${gridCount}, 1fr)`;

    cellElement.className = "grid-cell";
    cellElement.draggable = false;

    for (let i = 0; i < cellCount; i++) {

        gridElement.append(cellElement.cloneNode(true));

    }

    return gridElement;

}

function appendGrid(parent, cellSize) {

    const grid = createGrid(cellSize);

    parent.innerHTML = "";
    parent.append(grid);

}

function paintGrid(cellArray, color) {

    cellArray.forEach((cell) => {

        cell.style.backgroundColor = color;

    });

}

function paintCell(cell, color) {

    if (color === "rainbow") {

        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        cell.style.backgroundColor = `rgb(${r},${g},${b})`;

    } else {

        cell.style.backgroundColor = color;

    }

}

function init() {

    const gridContainer = document.querySelector(".grid-container");
    const colorSelector = document.querySelector("#color-selector");
    const eraseCheckbox = document.querySelector("#erase-checkbox");
    const rainbowCheckbox = document.querySelector("#rainbow-checkbox");
    const sizeSelector = document.querySelector("#size-selector");
    const fillGrid = document.querySelector("#paint-grid");
    const eraseGrid = document.querySelector("#erase-grid");
    let isDrawing = false;

    appendGrid(gridContainer, 16);

    document.addEventListener("mousedown", () => {

        isDrawing = true;

    });
    
    document.addEventListener("mouseup", () => {

        isDrawing = false;

    });

    gridContainer.addEventListener("mouseover", (e) => {

        if (isDrawing) {

            if (eraseCheckbox.checked) {

                paintCell(e.target, "white");

            } else if (rainbowCheckbox.checked) {

                paintCell(e.target, "rainbow");

            } else {

                paintCell(e.target, colorSelector.value);

            }

        }

    });

    gridContainer.addEventListener("click", (e) => {

        if (eraseCheckbox.checked) {

            paintCell(e.target, "white");

        } else if (rainbowCheckbox.checked) {

            paintCell(e.target, "rainbow");

        } else {

            paintCell(e.target, colorSelector.value);

        }

    });

    sizeSelector.addEventListener("change", (e) => {appendGrid(gridContainer, e.target.value)});
    fillGrid.addEventListener("click", () => {paintGrid(gridContainer.querySelectorAll(".grid-cell"), colorSelector.value)});
    eraseGrid.addEventListener("click", () => {paintGrid(gridContainer.querySelectorAll(".grid-cell"), "white")})

}