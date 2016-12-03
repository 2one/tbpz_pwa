app.filter('parseLinks', [function() {
    return function(html) {
        return String(html).replace(/<a([^>]*)href="http:\/\/thebackpackerz.com\/([^rewind|timeline][^\"]*)"([^>]*)>/gm, '<a$1href="/$2"$3>').replace(/_blank/gm, '_self');
    };
}]);
