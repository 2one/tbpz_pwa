/* global require */

// VENDORS
jQuery = $ = require("jquery");
angular = require('angular');
ngRoute = require('angular-route');
ngSanitize = require('angular-sanitize');
ngTouch = require('angular-touch');
require('angular-i18n/angular-locale_fr-fr');
firebase = require('firebase');
require('browsernizr/test/fullscreen-api');
require('browsernizr/test/hiddenscroll');
require('browsernizr/test/inputtypes');
require('browsernizr/test/intl');
require('browsernizr/test/vibration');
require('browsernizr/test/serviceworker');
require('browsernizr/test/notification');
require('browsernizr/test/touchevents');
require('browsernizr/test/storage/localstorage');
require('browsernizr/test/storage/sessionstorage');
Modernizr = require("browsernizr");

// CONFIG
config = require('../../dist/js/config.js');

// UTILS
utils = require('./utils.js');

// ANGULAR SETUP
var app = angular.module('app', [ngRoute, ngSanitize, ngTouch]);
app.service('datasSce', require('./angular/services/datas.js'));
app.directive('bannerComponent', require('./angular/directives/banner.js'));
app.directive('headerComponent', require('./angular/directives/header.js'));
app.directive('navComponent', require('./angular/directives/nav.js'));
app.directive('toasterComponent', require('./angular/directives/toaster.js'));
app.directive('playerComponent', require('./angular/directives/player.js'));
app.controller('ArticleCtrl', require('./angular/controllers/article.js'));
app.controller('ArticlesCtrl', require('./angular/controllers/articles.js'));
app.controller('ErrorCtrl', require('./angular/controllers/error.js'));
app.controller('MainCtrl', require('./angular/controllers/main.js'));
app.controller('PageCtrl', require('./angular/controllers/page.js'));
app.controller('ShareCtrl', require('./angular/controllers/share.js'));
app.controller('PushCtrl', require('./angular/controllers/push.js'));
app.filter('parseContent', require('./angular/filters/parseContent.js'));
app.filter('secureUrl', require('./angular/filters/secureUrl.js'));
require('./angular/app.js')();
require('../../dist/js/templates.js');

// SERVICE WORKER
window.sw = null;
if (Modernizr.serviceworker) {
    require('./serviceworker/register.js')();
    require('./serviceworker/add2homescreen.js')();
}

// EXTERNAL LIBS
require('./external/analytics.js')();
require('./external/facebook.js')();
