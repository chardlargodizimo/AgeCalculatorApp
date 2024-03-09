//form element
const form = document.querySelector(".age-calculator__input");

// current date 
const now = new Date();

// input elements
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

// input labels
const dayInputLabel = document.getElementsByTagName("label")[0];
const monthInputLabel = document.getElementsByTagName("label")[1];
const yearInputLabel = document.getElementsByTagName("label")[2];

// output elements
const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

// output labels
const yearOutputLabel = document.getElementById('year-output-label');
const monthOutputLabel = document.getElementById('month-output-label');
const dayOutputLabel = document.getElementById('day-output-label');

// error elements
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

// error messages
const ERROR_MESSAGES = {
    requiredField: "This field is required",
    invalidDay: "Must be a valid day",
    invalidMonth: "Must be a valid month",
    invalidYear: "Must be in the past",
    invalidDate: "Must be a valid date"
}

// function to reset output values
const resetOutput = () => {
    yearOutput.textContent = "--";
    monthOutput.textContent = "--";
    dayOutput.textContent = "--";
}

// function to rename labels based on singular or plural
const renameLabel = (label, dateSegment, singularLabel, pluralLabel) => {
    if (dateSegment <= 1) {
        label.textContent = singularLabel;
    } else {
        label.textContent = pluralLabel;
    }
};

// function to truncate input values to a specified length
const truncateInput = (input, maxLength) => {
    const onlyDigits = input.value.replace(/\D/g, '');
    const truncatedValue = onlyDigits.slice(0, maxLength);
    input.value = truncatedValue;
};

// event listener for month input to truncate to 2 digits
monthInput.addEventListener('input', (e) => {
    truncateInput(e.target, 2);
});

// event listener for day input to truncate to 2 digits
dayInput.addEventListener('input', (e) => {
    truncateInput(e.target, 2);
});

// event listener for year input to truncate to 4 digits
yearInput.addEventListener('input', (e) => {
    truncateInput(e.target, 4);
});

const errorState = (input, label, color) => {
    input.style.borderColor = color;
    label.style.color = color;
}

// function to validate year input
const validateYearInput = () => {    
    if (yearInput.value === "") {
        yearError.textContent = ERROR_MESSAGES.requiredField;
        errorState(yearInput, yearInputLabel, "#ff5757");
    } else if (yearInput.value > now.getFullYear()) {
        yearError.textContent = ERROR_MESSAGES.invalidYear;
        errorState(yearInput, yearInputLabel, "#ff5757");
    } else if (yearInput.value == now.getFullYear() && monthInput.value - 1 > now.getMonth()) {
        monthError.textContent = ERROR_MESSAGES.invalidMonth;        
        errorState(monthInput, monthInputLabel, "#ff5757");
        yearError.textContent = "";
    } else if (yearInput.value == now.getFullYear() && monthInput.value -1 == now.getMonth() && dayInput.value > now.getDate()) {
        dayError.textContent = ERROR_MESSAGES.invalidDay;
        errorState(dayInput, dayInputLabel, "#ff5757");
        yearError.textContent = "";
    } else {
        yearError.textContent = ""
        errorState(yearInput, yearInputLabel, "");
        return true;
    }
    resetOutput();
    return false;
}

// function to validate day and month input
const validateDayAndMonthInput =  (input, label, error, minValue, maxValue, errorMessageKey) => {
    if (input.value === "") {
        error.textContent = ERROR_MESSAGES.requiredField;
        errorState(input, label, "#ff5757");
    } else if (input.value <= minValue || input.value > maxValue) {
        error.textContent = ERROR_MESSAGES[errorMessageKey];
        errorState(input, label, "#ff5757");
    } else {
        error.textContent = "";
        errorState(input, label, "");
        return true;
    }  
    resetOutput();
    return false;
}

// function to validate all inputs
const validateInputs = () => {
    const isDayValid = validateDayAndMonthInput(dayInput, dayInputLabel, dayError, 0, 31, "invalidDay");
    const isMonthValid = validateDayAndMonthInput(monthInput, monthInputLabel, monthError, 0, 12, "invalidMonth");
    const isYearValid = validateYearInput();
    return isDayValid && isMonthValid && isYearValid;
}

// function to check if the date is valid
const isValidDate = (day, month, year) => {
    month = month - 1;
    let birthDate = new Date(year, month, day);
    if (day == birthDate.getDate() && month == birthDate.getMonth() && year == birthDate.getFullYear()) {
        return true;
    } else {
        dayError.textContent = ERROR_MESSAGES.invalidDate;
        errorState(dayInput, dayInputLabel, "#ff5757");
        errorState(monthInput, monthInputLabel, "#ff5757");
        errorState(yearInput, yearInputLabel, "#ff5757");
        resetOutput();
        return false;
    }
}

// function to calculate and display age
const calculateAndDisplayAge = () => {
    let birthDate = `${monthInput.value}/${dayInput.value}/${yearInput.value}`;
    let DOB = new Date(birthDate);
    let newYear = now.getFullYear() - DOB.getFullYear();
    let newMonth = now.getMonth() - DOB.getMonth();
    let newDay = now.getDate() - DOB.getDate();

    if (newMonth < 0 || (newMonth === 0 && newDay < 0)) {
    newYear--;
    newMonth += 12;
    }

    if (newDay < 0) {
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    newDay += lastMonth.getDate();
    newMonth--;
    }

    renameLabel(yearOutputLabel, newYear, "year", "years");
    renameLabel(monthOutputLabel, newMonth, "month", "months");
    renameLabel(dayOutputLabel, newDay, "day", "days");

    yearOutput.textContent = newYear;
    monthOutput.textContent = newMonth;
    dayOutput.textContent = newDay;
}

// event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs() && isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
        calculateAndDisplayAge();
    }
})