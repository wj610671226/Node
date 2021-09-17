const callbackBody = function(success = 0, data = null, message = null) {
    return { success, data, message }
}

module.exports = callbackBody;