module.exports = function () {
    navigator.serviceWorker.register('./sw.js').then(function(swRegistration) {
        sw = swRegistration;
    });
};
