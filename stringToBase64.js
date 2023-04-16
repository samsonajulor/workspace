// convert the string to base64

function stringToBase64(str) {
    return new Buffer.from(str).toString('base64');
}

console.log(stringToBase64('630fef78-548e-4e6e-b702-f667de63f523:gC212pMOsLYMhSYHG6ZUFmnZ4V0jw2P7cPcAZwrk'));