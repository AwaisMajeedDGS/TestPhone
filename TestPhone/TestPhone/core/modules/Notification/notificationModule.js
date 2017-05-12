'use strict'




var notificationModule = (function () {
    var app = angular.module('dwd.notificationModule', ['dwd.notificationSrvc']);
    app.config([
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
    }
    ]);
    (function () {
        notificationCtrl.Controller(app);
    })();
})();