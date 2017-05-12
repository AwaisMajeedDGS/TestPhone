'use strict'

var navigationModule = (function () {
    var app = angular.module('dwd.webdialerModule', ['dwd.shared.filters', 'dwd.shared.directives', 'dwd.shared.utils', 'dwd.webdialerSrvc', 'dwd.shared.Constant', 'ng-selectize', 'pageslide-directive']);
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
    }
    ]);
    (function () {
        webdialerControllers.Controller(app);
    })();

    return app;
})();
