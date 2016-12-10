app.filter('parseContent', [function() {
    return function(html) {
        return String(html)
            .replace(/href="http:\/\/thebackpackerz.com\/([^rewind][^timeline][^\"]+)"/gm, 'href="/$1"')
            .replace(/_blank/gm, '_self')
            .replace(/src="http:\/\/thebackpackerz.com\/([^\"]+)"/gm, 'src="\/\/secure.thebackpackerz.com\/$1"');;
    };
}]);
