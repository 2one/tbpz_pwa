module.exports = function() {
    window.fbAsyncInit = function() {
        FB.init({appId: '630483397057569', status: true, cookie: true, xfbml: true});
    };
    (function() {
        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol +
            '//connect.facebook.net/fr_FR/all.js';
        document.getElementById('fb-root').appendChild(e);
    }());
};
