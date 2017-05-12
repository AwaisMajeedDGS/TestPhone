'use strict';

var sharedModule = (function () {
    var app = angular.module('dwd.shared', ['dwd.shared.utils', 'dwd.shared.Constant', 'dwd.shared.filters']);

    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
    }]);

    return app;


})();