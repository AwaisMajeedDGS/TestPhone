'use strict';

(function () {
    var serv = angular.module('dwd.notificationSrvc', ['dwd.shared.utils', 'dwd.shared.Constant']);
    serv.service('NotificationSrvc', ['MethodProvider', 'constant', '$localstorage', 'notify', function (MethodProvider, constant, $localstorage, notify) {
        var self = this;
        var notificationKey = 'NotifyLogs';
        function getAll() {
            if ($localstorage.getObject(notificationKey) != null) {
                var data = $localstorage.getObject(notificationKey);
                return data;
            }
            return null;
        }
      
        self.get = function (type) {

            if (typeof type != 'undefined') {
                switch (type) {
                    case notify.sucess: return '';
                    case notify.all: return getAll();
                    case notify.error: return '';
                    case notify.warning: return '';
                    default:
                        break;
                }
            }

            return getAll();
        };
        self.add = function (obj) {
            if ($localstorage.getObject(notificationKey) != null) {
                var data = $localstorage.getObject(notificationKey);
                data.push(obj);
                $localstorage.setObject(notificationKey, data);
            }
            else {
                var temp = [];
                $localstorage.setObject(notificationKey, temp);
                var data = $localstorage.getObject(notificationKey);
                data.push(obj);
                $localstorage.setObject(notificationKey, data);
            }
        }

        self.initialize = function () {
            if ($localstorage.getObject(notificationKey) != null) {
                var data = $localstorage.getObject(notificationKey);
                data[0] = angular.copy({ type: 'Info', message: 'Welcome to WebDialer 2.0', module: 'Dialer', date: new Date(), id: 1, read: false, description: 'Welcome to WebDialer 2.0'  });
                $localstorage.setObject(notificationKey, data);
            }
            else {
                var temp = [];
                $localstorage.setObject(notificationKey, temp);
                var data = $localstorage.getObject(notificationKey);
                data.push({ type: 'Info', message: 'Welcome to WebDialer 2.0', module: 'Dialer', date: new Date(), id: 1, read: false, description: 'Welcome to WebDialer 2.0' });
                $localstorage.setObject(notificationKey, data);
            }
        }
    }
    ]);
    return serv;

})();
