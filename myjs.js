function changeShape() {
    let selectedShape = document.getElementById("shape").value;

    let rectangleInputs = document.getElementById("rectangleInputs");
    let triangleInputs = document.getElementById("triangleInputs");
    let squareInput = document.getElementById("squareInput");
    let circleInput = document.getElementById("circleInput");

    rectangleInputs.style.display = selectedShape === "rectangle" ? "block" : "none";
    triangleInputs.style.display = selectedShape === "triangle" ? "block" : "none";
    squareInput.style.display = selectedShape === "square" ? "block" : "none";
    circleInput.style.display = selectedShape === "circle" ? "block" : "none";

    document.getElementById("output").style.display = "none";

    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url('background.png')";
}

function calculateArea() {
    let selectedShape = document.getElementById("shape").value;
    let length, width, base, height, side, radius;
    let lengthUnit, widthUnit, baseUnit, heightUnit, sideUnit, radiusUnit;

    if (selectedShape === "rectangle") {
        length = document.getElementById("rectLength").value;
        width = document.getElementById("rectWidth").value;
        lengthUnit = document.getElementById("rectLengthUnit").value;
        widthUnit = document.getElementById("rectWidthUnit").value;
    } else if (selectedShape === "triangle") {
        base = document.getElementById("triBase").value;
        height = document.getElementById("triHeight").value;
        baseUnit = document.getElementById("triBaseUnit").value;
        heightUnit = document.getElementById("triHeightUnit").value;
    } else if (selectedShape === "square") {
        side = document.getElementById("squareSide").value;
        sideUnit = document.getElementById("squareSideUnit").value;
    } else if (selectedShape === "circle") {
        radius = document.getElementById("circleRadius").value;
        radiusUnit = document.getElementById("circleRadiusUnit").value;
    }

    let validationError = validateInputs(selectedShape, length, width, base, height, side, radius);

    if (validationError) {
        alert(validationError);
        if (selectedShape === "rectangle") {
            document.getElementById("rectLength").value = "";
            document.getElementById("rectWidth").value = "";
        } else if (selectedShape === "triangle") {
            document.getElementById("triBase").value = "";
            document.getElementById("triHeight").value = "";
        } else if (selectedShape === "square") {
            document.getElementById("squareSide").value = "";
        } else if (selectedShape === "circle") {
            document.getElementById("circleRadius").value = "";
        }
        return;
    }

    length = convertToCm(parseFloat(length), lengthUnit);
    width = convertToCm(parseFloat(width), widthUnit);
    base = convertToCm(parseFloat(base), baseUnit);
    height = convertToCm(parseFloat(height), heightUnit);
    side = convertToCm(parseFloat(side), sideUnit);
    radius = convertToCm(parseFloat(radius), radiusUnit);

    let area;
    if (selectedShape === "rectangle") {
        area = length * width;
    } else if (selectedShape === "triangle") {
        area = 0.5 * base * height;
    } else if (selectedShape === "square") {
        area = side * side;
    } else if (selectedShape === "circle") {
        area = 3.14 * radius * radius;
    }

    let outputUnit = document.getElementById("outputUnit").value;
    let convertedArea = convertFromCm(area, outputUnit);
    document.getElementById("areaOutput").textContent = convertedArea.toFixed(2);
    document.getElementById("output").style.display = "block";
}

function validateInputs(shape, length, width, base, height, side, radius) {
    let errorMessage = "";

    if (shape === "rectangle") {
        errorMessage += validateNumberInput(length, "Length");
        errorMessage += validateNumberInput(width, "Width");
    } else if (shape === "triangle") {
        errorMessage += validateNumberInput(base, "Base");
        errorMessage += validateNumberInput(height, "Height");
    } else if (shape === "square") {
        errorMessage += validateNumberInput(side, "Side");
    } else if (shape === "circle") {
        errorMessage += validateNumberInput(radius, "Radius");
    }

    return errorMessage;
}

function validateNumberInput(input, inputName) {
    let err = "";
	
    if (input=="") {
        err = `${inputName} cannot be empty.\n`;
    }else if (input.trim()=="") {
        err = `${inputName} cannot be only spaces.\n`;
    }else if (/[A-Za-z]/.test(input)) {
        err = `${inputName} must not contain alphabets.\n`;
    } else {
        let number = parseFloat(input);
        if (isNaN(number)) {
            err = `${inputName} cannot include special characters.\n`;
        } else if (number < 0) {
            err = `${inputName} cannot be negative.\n`;
        } else if (number === 0) {
            err = `${inputName} cannot be zero.\n`;
        }
    }
    return err;
}

function convertToCm(value, unit) {
    switch (unit) {
        case "mm":
            return value / 10;
        case "cm":
            return value;
        case "in":
            return value * 2.54;
        case "ft":
            return value * 30.48;
        case "m":
            return value * 100;
        default:
            return 0;
    }
}

function convertFromCm(value, unit) {
    switch (unit) {
        case "mm":
            return value * 100;
        case "cm":
            return value;
        case "in":
            return value / 2.54;
        case "ft":
            return value / 30.48;
        case "m":
            return value / 100;
        default:
            return 0;
    }
}
