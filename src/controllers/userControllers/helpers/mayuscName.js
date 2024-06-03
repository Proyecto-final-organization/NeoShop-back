function mayuscName(name) {
    if (name.charAt(0) === name.charAt(0).toUpperCase()) {
        return name.charAt(0) + name.slice(1).toLowerCase();;
    } else {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
}

module.exports = mayuscName;