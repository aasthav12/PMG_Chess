function validateEmail(email) {
    if (typeof email != "string") {
        return false;
    }
    return email.trim().toLowerCase().endsWith("@pmg.com");
}

module.exports = { validateEmail };