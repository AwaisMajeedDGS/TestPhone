'use strict';


var notificationCtrl = (function () {
    var ctrl = {};
    ctrl.Controller = function (app) {
        app.controller('notificationCtrl', ['$scope', '$rootScope', 'NotificationSrvc', '$localstorage', 'notify', function ($scope, $rootScope, NotificationSrvc, $localstorage, notify) {
            $scope.notifications = [];
            $scope.selectedNotification = {};
            $scope.notification = [];
            $scope.openNotificationPanel = false;
            $scope.showDetail = false;
            // Notification receive event
            $scope.$on('NotificationEvent', function (event, data) {
                data.id = guid();
                NotificationSrvc.add(data);
                if ($scope.notifications.length > 4) {
                    $scope.notifications.pop();
                }
                $scope.notifications.push(data);
                $scope.notification.push(data);
            });
            $scope.markAsRead = function (obj) {
                var notify = _.find($scope.notifications, function (x) { return x.id == obj.id });
                if (!_.isUndefined(notify)) {
                    delete notify.$$hashKey;
                    var index = _.indexOf($scope.notifications, notify);
                    if (!_.isUndefined(index) && index != -1) {
                        $scope.notifications.splice(index, 1);
                    }
                }
                var data = NotificationSrvc.get('All');
                var ob = _.findIndex(data, function (x) { return x.id == obj.id });
                if (!_.isUndefined(ob) && ob != -1) {
                    data[ob].read = true;
                    $localstorage.setObject('NotifyLogs', data);
                }
                $scope.openNotificationPanel = true;
                $scope.notification = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.notification.push(data[i]);
                }
                obj.read = true;
                $scope.selectedNotification = obj;
                $scope.showDetail = true;
            }
            $scope.markAllAsRead = function () {
                $scope.notifications = [];
                var data = NotificationSrvc.get('All');
                for (var i = 0; i < data.length; i++) {
                    data[i].read = true;
                }
                $localstorage.setObject('NotifyLogs', data);
                $scope.notification = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.notification.push(data[i]);
                }
            }
            $scope.countUnReadMessages = function () {
                var count = 0;
                var data = _.filter($scope.notifications, function (x) { return x.read == false });
                if (!_.isUndefined(data)) {
                    return data.length;
                }
                return count;
            }
            $scope.toggle = function () {
                $scope.openNotificationPanel = !$scope.openNotificationPanel;
                if (!$scope.openNotificationPanel) {
                    setTimeout(function () { $scope.showDetail = false; }, 100);
                }
            }
            $scope.hideDetails = function () {
                $scope.selectedNotification = {};
                $scope.showDetail = false;
            }
            $scope.showDetails = function (obj) {
                $scope.markAsRead(obj);
            }
            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();
            }
            function initialize() {
                NotificationSrvc.initialize();
                var data = NotificationSrvc.get('All');
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.notification.push(data[i]);
                    }
                    var obj = _.filter($scope.notification, function (x) { return x.read == false; });
                    if (!_.isUndefined(obj)) {
                        var takeRight = _.takeRight(obj, 4);
                        for (var i = 0; i < takeRight.length; i++) {
                            $scope.notifications.push(takeRight[i]);
                        }
                    }
                }
            }
            initialize();
        }]);
        return app;
    };
    return ctrl;

})();




