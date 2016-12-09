app.filter('secureUrl', [function() {
    return function(url) {
        return String(url).replace(/http:\/\/thebackpackerz.com/gm, '\/\/secure.thebackpackerz.com');
    };
}]);
