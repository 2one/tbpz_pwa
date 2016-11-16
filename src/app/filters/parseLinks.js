app.filter('parseLinks', [function() {
    return function(html) {
        return String(html).replace(/<a([^>]*)href="http:\/\/thebackpackerz.com/gm, '<a$1href="\/#').replace(/_blank/gm, '_self');
    };
}]);
