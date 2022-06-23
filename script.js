// script.js

let mouseDown = null;
let isFillButtonPressed = true;
let isEraseButtonPressed = false;

// Creates the grid
function addDiv(numberOfColumns) {
    const sketchContainer = document.querySelector('#sketchContainer');
    sketchContainer.style.setProperty('grid-template-columns','repeat('+numberOfColumns+', 1fr)');
    for(let i=0; i<numberOfColumns * numberOfColumns; i++) {
        const div = document.createElement('div');
        div.setAttribute('id', i)
        div.classList.add('gridSquare');
        div.addEventListener('mousemove', () => drawOrErase(div));
        sketchContainer.appendChild(div);
    }
    // console.log(sketchContainer.childElementCount);
}

// does the drawing on the sketch container
function drawOrErase(div){
    const colorPicker = document.querySelector('#colorPicker');
    if(mouseDown && isFillButtonPressed) {
        div.style.setProperty('background-color', colorPicker.value);
    } else if(mouseDown && isEraseButtonPressed) {
        div.style.setProperty('background-color', 'white');
    }
}

// Listens to the slider and then updates the grid
function updateGrid(pixelSliderValue) {
    const labelPixelSlider = document.querySelector('#pixelSliderLable');
    labelPixelSlider.textContent = `${pixelSliderValue} X ${pixelSliderValue}`;
    deleteDiv();
    addDiv(pixelSliderValue);
}

// Deletes all the child nodes of the gridContainer 
function deleteDiv() {
    const sketchContainer = document.querySelector('#sketchContainer');
    while(sketchContainer.firstChild){
        sketchContainer.removeChild(sketchContainer.firstChild);
    }
}

// when the clear button pressed it clear the grid
function clearGrid() {
    // console.log('clear button is pressed');
    const allGridSquare = Array.from(document.querySelectorAll('.gridSquare'));
    allGridSquare.forEach(girdSquare => {
        girdSquare.style.setProperty('background-color', 'white');
    });
}

// set the value of the mouseDown variable if mouse is down on the sketch container the it sets true else false
function setMouseDown(value) {
    mouseDown = value;
    console.log(value);
}

// if eraseButton is pressed and then fillButton is pressed. Add pressed class to fillButton and removes it form the fillbutton
// changes the state of isFillButtonPressed and isEraseButtonPressed accordingly
function fillButtonThings() {
    const fillButton = document.querySelector('#fillButton');
    const eraseButton = document.querySelector('#eraseButton');
    if(isEraseButtonPressed) {
        isFillButtonPressed = true;
        isEraseButtonPressed = false;
        fillButton.classList.add('pressed');
        eraseButton.classList.remove('pressed');
    }
}

// function is similar to the above function for the fillButtonThings just opposite
function eraseButtonThings() {
    const fillButton = document.querySelector('#fillButton');
    const eraseButton = document.querySelector('#eraseButton');
    if(isFillButtonPressed) {
        isFillButtonPressed = false;
        isEraseButtonPressed = true;
        fillButton.classList.remove('pressed');
        eraseButton.classList.add('pressed');
    }
}

function start() {
    deleteDiv();
    const pixelSlider = document.querySelector('#pixelSlider');
    const labelPixelSlider = document.querySelector('#pixelSliderLable');
        addDiv(pixelSlider.value);
    labelPixelSlider.textContent = `${pixelSlider.value} X ${pixelSlider.value}`;
    pixelSlider.addEventListener('input', () => updateGrid(pixelSlider.value));

    const gridContainer = document.querySelector('#sketchContainer');
    gridContainer.addEventListener('mousedown', () => setMouseDown(true));
    gridContainer.addEventListener('mouseup', () => setMouseDown(false));

    const fillButton = document.querySelector('#fillButton');
    fillButton.classList.add('pressed');
    fillButton.addEventListener('click', () => fillButtonThings());

    const eraseButton = document.querySelector('#eraseButton');
    eraseButton.addEventListener('click', () => eraseButtonThings());

    const clearButton = document.querySelector("#clearButton");
    clearButton.addEventListener('click', () => clearGrid());
}

start();