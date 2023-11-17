const changeDateInputType = fieldID => {
    const field = document.getElementById(fieldID);
    if (field.type === "datetime-local") {
        field.type = "date";
    } else {
        field.type = "datetime-local";
    }
};

function convertTimestampToDaysHoursMinutes(timestamp) {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(timestamp / oneDay);
    const hours = Math.floor((timestamp % oneDay) / oneHour);
    const minutes = Math.floor((timestamp % oneHour) / oneMinute);

    return {
        days,
        hours,
        minutes
    };
}

// Przykładowe użycie
const timestamp = 23456789; // Twój timestamp
const timeObject = convertTimestampToDaysHoursMinutes(timestamp);

console.log(timeObject.days + " dni, " + timeObject.hours + " godzin, " + timeObject.minutes + " minut");


document.getElementById("clickMe").addEventListener("click", () => {
    changeDateInputType("cdbm_test");
});
