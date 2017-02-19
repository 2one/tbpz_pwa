module.exports = function () {
    window.addEventListener('beforeinstallprompt', function(e) {
        e.userChoice.then(function(choiceResult) {
            var tag = (choiceResult.outcome == 'dismissed') ? 'add2homescreen_ko' : 'add2homescreen_ok';
            ga('send', 'event', tag, 'click', 'prompt');
        });
    });
};
