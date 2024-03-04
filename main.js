
// inputs
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

// errors
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

// outputs
const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

//form
const form = document.querySelector(".age-calculator__input");

function validateDayInput() {
    let value = dayInput.value;
    if (value === "") {
        dayError.textContent = "This field is required"
    } else if (value <= 0 || value > 31) {
       dayError.textContent = " Must be a valid day";
    } else {
        dayError.textContent = ""
    }
}

function validateMonthInput() {
    let value = monthInput.value;
    console.log(value);
    if (value === "") {
        monthError.textContent = "This field is required"
    } else if (value <= 0 || value > 12) {
       monthError.textContent = " Must be a valid month";
    } else {
        monthError.textContent = ""
    }
}

function validateYearInput() {
    let value = yearInput.value;
    const a = new Date();
    console.log(a.getFullYear());
    
    if (value === "") {
        yearError.textContent = "This field is required"
    } else if (value <= 0 || value > a.getFullYear()) {
       yearError.textContent = " Must be in the past";
    } else {
        yearError.textContent = "" 
    }
}

function handleEmptyField() {
    if (dobInput.value === "") {
        console.log(dobInput.value);
        errors.textContent = "This field is required"
    } 
}

dayInput.addEventListener("input", validateDayInput);
monthInput.addEventListener("input", validateMonthInput);
yearInput.addEventListener("input", validateYearInput);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    handleEmptyField();
})

