module.exports = function($scope) {

    if (!sw) {
        return false;
    }

    firebase.initializeApp(config.firebase);
    messaging = firebase.messaging();

    $scope.setButton = function($event) {
        if (Notification.permission === 'denied') {
            angular.element('#pushButton').remove();
        } else {
            sw.pushManager.getSubscription().then(function(subscription) {
                if (subscription !== null) {
                    angular.element('#pushButton').prop('checked', true);
                } else {
                    angular.element('#pushButton').prop('checked', false);
                }
            });
        }
    };
    $scope.setButton();

    $scope.setSubscription = function($event) {
        if ($event.target.checked) {
            $scope.subscribe();
        } else {
            $scope.unsubscribe();
        }
    };

    $scope.subscribe = function() {
        sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: utils.urlB64ToUint8Array(config.notification.publicKey)
        })
        .then(function(subscription) {
            $scope.updateSubscriptionOnServer(subscription);
            $scope.setButton();
        })
        .catch(function(err) {
            console.error('Failed to subscribe the user: ', err);
            $scope.setButton();
        });
    };

    $scope.unsubscribe = function() {
        sw.pushManager.getSubscription().then(function(subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function(error) {
            console.error('Error unsubscribing', error);
            $scope.setButton();
        })
        .then(function() {
            $scope.updateSubscriptionOnServer(null);
            $scope.setButton();
        });
    };

    $scope.updateSubscriptionOnServer = function(obj) {
        console.log('updateSubscriptionOnServer');
    };

};
