/* global require */

// VENDORS
jQuery = $ = require("jquery");
angular = require('angular');
ngRoute = require('angular-route');
ngSanitize = require('angular-sanitize');
ngTouch = require('angular-touch');

// CONFIG
config = require('./config.js');

// ANGULAR SETUP
var app = angular.module('app', [ngRoute, ngSanitize, ngTouch]);
app.service('datasSce', require('./angular/services/datas.js'));
app.directive('bannerComponent', require('./angular/directives/banner.js'));
app.directive('headerComponent', require('./angular/directives/header.js'));
app.directive('navComponent', require('./angular/directives/nav.js'));
app.controller('ArticleCtrl', require('./angular/controllers/article.js'));
app.controller('ArticlesCtrl', require('./angular/controllers/articles.js'));
app.controller('ErrorCtrl', require('./angular/controllers/error.js'));
app.controller('MainCtrl', require('./angular/controllers/main.js'));
app.controller('PageCtrl', require('./angular/controllers/page.js'));
app.controller('ShareCtrl', require('./angular/controllers/share.js'));
app.filter('parseContent', require('./angular/filters/parseContent.js'));
app.filter('secureUrl', require('./angular/filters/secureUrl.js'));
require('./angular/app.js')();

// SERVICE WORKER
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function() {
            console.log('Service Worker Registered');
        });

    window.addEventListener('beforeinstallprompt', function(e) {
        e.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome == 'dismissed') {
                ga('send', 'event', 'add2homescreen_ko', 'click', 'prompt');
                console.log('User cancelled home screen install');
            } else {
                ga('send', 'event', 'add2homescreen_ok', 'click', 'prompt');
                console.log('User added to home screen');
            }
        });
    });
}*/

// ANALYTICS
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
a=s.createElement(o),m=s.getElementsByTagName(o)[0];
a.async=1;
a.src=g;
m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47284909-1', 'thebackpackerz.com');
ga('send', 'pageview');
