
function capitalizeFirstLetter(input) {
    if (!input || input.length === 0) {
        return input;
    }

    // Capitalize the first letter of each word using a regular expression
    return input.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}
export { capitalizeFirstLetter }