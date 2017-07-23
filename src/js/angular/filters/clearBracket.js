module.exports = function() {
    return function(string) {
        return String(string)
            .replace(/^\[.*\] (.*)/g, '$1');
    };
};
