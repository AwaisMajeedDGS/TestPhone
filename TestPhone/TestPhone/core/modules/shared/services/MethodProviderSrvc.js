///The module contains
///MethodProvider Service
///LocalStorage factory



'use strict';


(function () {

    var serv = angular.module('dwd.shared.utils', ['dwd.shared.Constant'])
            .config(['$httpProvider', function ($httpProvider) {
                //disable this for resource intercept
                $httpProvider.interceptors.push('httpRequestInterceptor');
                // Don't strip trailing slashes from calculated URLs
                //$resourceProvider.defaults.stripTrailingSlashes = false;
            }]);


    // http methods
    serv.service('MethodProvider', ['$http', function ($http) {
        var self = this;
        self.get = function (url) {
            var obj = {
                url: url,
                async: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return $http(obj);
        };
        self.getSync = function (url) {
            var obj = {
                url: url,
                async: false,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return $http(obj);
        };
        self.post = function (url, data) {
            var obj = {
                url: url,
                async: true,
                method: 'POST',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                }
            };
            if (typeof data != 'undefined' || typeof data != null) {
                obj.data = data;
            }
            return $http(obj);
        };
        self.postSync = function (url, data) {
            var obj = {
                url: url,
                async: false,
                method: 'POST',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                }
            };
            if (typeof data != 'undefined' || typeof data != null) {
                obj.data = data;
            }
            return $http(obj);
        };
        self.postEncoded = function (url, data) {
            var obj = {
                method: 'POST',
                url: url,
                async: true,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            }
            return $http(obj);
        }
        self.put = function (url, data) {
            var obj = {
                url: url,
                async: true,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if (typeof data != 'undefined' && data != null) {
                obj.data = JSON.stringify(data);
            }
            return $http(obj);
        };
        self.delete = function (url) {
            var obj = {
                url: url,
                async: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return $http(obj);
        };
    }]);
    //Main filters operations
    serv.service('FilterService', function () {
        this.StartWith = function (items, char, key) {

            var filtered = [];
            if (char != "" && key != "" && typeof items != "undefined") {

                if (key == 'Created' || key == 'Modified') {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var date = $.datepicker.formatDate("dd M yy", new Date(item[key]));
                        if (date == char) {
                            filtered.push(item);
                        }

                    }

                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var val = "" + item[key];
                        if (char.substring(0, 1).toLowerCase() == val.substring(0, 1).toLowerCase()) {
                            filtered.push(item);
                        }
                    }
                }

                return filtered;
            }
            else {
                return items;
            }

        }
        this.EndWith = function (items, char, key) {
            var filtered = [];
            if (char != "" && key != "") {
                var letterMatch = new RegExp(char.substring(char.length - 1, char.length), 'i');
                if (key == 'Created' || key == 'Modified') {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var date = $.datepicker.formatDate("dd M yy", new Date(item[key]));
                        if (date == char) {
                            filtered.push(item);
                        }

                    }

                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var val = "" + item[key];
                        if (char.substring(char.length - 1, char.length).toLowerCase() == val.substring(item[key].length - 1, item[key].length).toLowerCase()) {
                            filtered.push(item);
                        }
                    }
                }
                return filtered;
            }
            else {
                return items;
            }
        }
        this.Contains = function (items, char, key) {
            var filtered = [];
            if (char != "" && key != "") {
                if (key == 'Created' || key == 'Modified') {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var date = $.datepicker.formatDate("dd M yy", new Date(item[key]));
                        if (date == char) {
                            filtered.push(item);
                        }

                    }

                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var val = "" + item[key];
                        if (val.toLowerCase().indexOf(char.toLowerCase()) !== -1) {
                            filtered.push(item);
                        }

                    }
                }
                return filtered;
            }
            else {
                return items;
            }
        }
        this.Equals = function (items, char, key) {
            var filtered = [];


            if (char != "" && key != "") {
                if (key == 'Created' || key == 'Modified') {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var date = $.datepicker.formatDate("dd M yy", new Date(item[key]));
                        if (date.toLowerCase() == char.toLowerCase()) {
                            filtered.push(item);
                        }

                    }

                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item[key] == char) {
                            filtered.push(item);
                        }

                    }
                }

                return filtered;
            }
            else {
                return items;
            }
        }
    });
    // Advance Search filter operation
    serv.service('CommonOperation', function () {
        this.StartWithLetter = function (char, value) {
            if (typeof char != 'undefined' && typeof value != 'undefined') {
                var letterMatch = new RegExp(char, 'i');
                var val = "" + value;
                if (letterMatch.test(val.substring(0, 1))) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        this.EndWithLetter = function (char, value) {
            if (typeof char != 'undefined' && typeof value != 'undefined') {
                var letterMatch = new RegExp(char, 'i');
                var val = "" + value;
                if (letterMatch.test(value.substring(val.length - 1, value.length))) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        this.ContainsLetter = function (char, value) {
            if (typeof char != 'undefined' && typeof value != 'undefined') {
                var letterMatch = new RegExp(char, 'i');
                var val = "" + value;
                if (val.indexOf(char) !== -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        this.EqualsLetter = function (char, value) {
            if (typeof char != 'undefined' && typeof value != 'undefined') {
                var letterMatch = new RegExp(char, 'i');
                var val = "" + value;
                if (char == val) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    });
    //local storage
    serv.factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                if (typeof defaultValue == 'undefined') {
                    defaultValue = null;
                }
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || null);
            }
        }
    }]);
    serv.factory('httpRequestInterceptor', ['constant', function (constant) {
        var resources = {};
        resources.request = function (config) {
            config.headers['Authorization'] = 'Bearer ' + constant.AccessToken;
            config.timeout = 30000;
            return config;
        }
        return resources;
    }]);
    serv.service('ValidationService', function () {
        var self = this;
        self.patterns = [
                   { value: '', text: 'No pattern', pattern: '' },
                   { value: '1', text: 'Phone Numbers(10 digits)', pattern: /^[0-9]{10}$/ },
                   { value: '2', text: 'Alphabets & Numbers', pattern: /^[A-Za-z0-9 ]{1,35}$/ },
                   { value: '3', text: 'Date Format (mm/dd/yyy)', pattern: /^\d{1,2}\/\d{1,2}\/\d{4}$/ },
                   { value: '4', text: 'Time Format (HH:MM AM|PM)', pattern: /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i },
                   { value: '5', text: 'Email', pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
        ];
        self.getPattern = function (val) {
            var pattern = _.find(self.patterns, function (x) { return x.value == val });
            return pattern;
        }
        self.getAllPatterns = function () {
            return self.patterns;
        }
        self.validatePhone = function (num) {
            if ((num.toString().length > 10)) {
                return false;
            }
            if (!/^[0-9]+$/.test(num)) {
                return false;
            }

            return true;
        };
        self.validateName = function (name) {
            if (!/^[A-Za-z0-9 ]{3,35}$/.test(name)) {
                return false;
            }
            return true;
        };
        self.validateEmpty = function (val) {
            if (!(val != null && val != undefined)) {
                return false;
            }
            if (!val.toString().length > 0) {
                return false;
            }
            return true;
        };
        self.validateTime = function (time) {
            var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
            if (!regex.test(time)) {
                return false;
            }
            return true;
        };
        self.validateDate = function (dateString) {
            // First check for the pattern
            if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
                return false;

            // Parse the date parts to integers
            var parts = dateString.split("/");
            var day = parseInt(parts[1], 10);
            var month = parseInt(parts[0], 10);
            var year = parseInt(parts[2], 10);

            // Check the ranges of month and year
            if (year < 1000 || year > 3000 || month == 0 || month > 12)
                return false;

            var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // Adjust for leap years
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                monthLength[1] = 29;

            // Check the range of the day
            return day > 0 && day <= monthLength[month - 1];
        }
        self.validateEmail = function (email) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(email)) {
                return false;
            }
            return true;
        }

        return self;
    });
    serv.service('MessageService', function (constant) {
        var self = this;
        self.success = function (message) {
            var text = '<span style="background-color:#51A351;padding:0 10px;color:#fff"><i class="fa fa-check fa-fw"></i>' + message + '</span>';
            var successToast = $(text);
            Materialize.toast(successToast, constant.toastDelay);
        };
        self.info = function (message) {
            var text = '<span style="background-color:#51A351;padding:0 10px;color:#fff"><i class="fa fa-info fa-fw"></i>' + message + '</span>';
            var successToast = $(text);
            Materialize.toast(successToast, constant.toastDelay);
        };
        self.warning = function (message) {
            var text = '<span style="background-color:#F89406;padding:0 10px;color:#fff"><i class="fa fa-exclamation-triangle fa-fw"></i>' + message + '</span>';
            var successToast = $(text);
            Materialize.toast(successToast, constant.toastDelay);
        };
        self.error = function (message) {
            var text = '<span style="background-color:#BD362F;padding:0 10px;color:#fff"><i class="fa fa-times fa-fw"></i>' + message + '</span>';
            var successToast = $(text);
            Materialize.toast(successToast, constant.toastDelay);
        };
        return self;
    });
    serv.factory('SignalRSrvc', ['constant', '$rootScope',  function (constant, $rootScope) {
        var connection = $.hubConnection(constant.hubConnection + '/signalr', { useDefaultPath: false, jsonp: true, transport: 'webSockets' });
        window.communicationHub = connection.createHubProxy('DWDCommunicationHub');
        window.communicationHub.on('broadcastForcelogOffNotification', function (data) {
            $rootScope.$broadcast('ForcelogOffNotification', JSON.parse(data));
        });
        window.communicationHub.on('thirdPartyHangupNotification', function (data) {
            $rootScope.$broadcast('ThirdPartyHangupNotification', JSON.parse(data));
        });
        window.communicationHub.on('manualCallHangupNotification', function (data) {
            $rootScope.$broadcast('ManualCallHangupNotification', JSON.parse(data));
        });
        window.communicationHub.on('clientSessionEnd', function (data) {
            $rootScope.$broadcast('ClientSessionEnd', JSON.parse(data));
        });
        window.communicationHub.on('tfnsUpdatedEventNotification', function (data) {
            $rootScope.$broadcast('TFNUpdatedEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('skillsUpdatedEventNotification', function (data) {
            $rootScope.$broadcast('SkillsUpdatedEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('greetingsUpdatedEventNotification', function (data) {
            $rootScope.$broadcast('GreetingsUpdatedEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('scriptsUpdatedEventNotification', function (data) {
            $rootScope.$broadcast('ScriptsUpdatedEventNotification', JSON.parse(data));
        });

        //---- 
        //---- IbexLibrary related event callback
        //---- 
        window.communicationHub.on('agentOnWrapup', function (data) {
            $rootScope.$broadcast('AgentOnWrapupEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnWait', function (data) {
            $rootScope.$broadcast('AgentOnWaitEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnVoiceStateChange', function (data) {
            $rootScope.$broadcast('AgentOnVoiceStateChangeEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnTalk', function (data) {
            $rootScope.$broadcast('AgentOnTalkEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnSupervisorMessage', function (data) {
            $rootScope.$broadcast('AgentOnSupervisorMessageEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnRecordingStateChange', function (data) {
            $rootScope.$broadcast('AgentOnRecordingStateChangeEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnPlayMessageComplete', function (data) {
            $rootScope.$broadcast('AgentOnPlayMessageCompleteEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnLeadChange', function (data) {
            $rootScope.$broadcast('AgentOnLeadChangeEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnHoldStateChange', function (data) {
            $rootScope.$broadcast('AgentOnHoldStateChangeEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnConsultHoldToggle', function (data) {
            $rootScope.$broadcast('AgentOnConsultHoldToggleEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnConferenceStateChange', function (data) {
            $rootScope.$broadcast('AgentOnConferenceStateChangeEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnCampaignLogout', function (data) {
            $rootScope.$broadcast('AgentOnCampaignLogoutEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnCall', function (data) {
            $rootScope.$broadcast('AgentOnCallEventNotification', JSON.parse(data));
        });
        window.communicationHub.on('agentOnBreak', function (data) {
            $rootScope.$broadcast('AgentOnBreakEventNotification', JSON.parse(data));
        });
        //---- 
        //---- IbexLibrary related event callback end here
        //---- 

        var warning_counts = 0;
        var conn = {
            init: function () {
                connection.qs = onConnected();
                connection.start().done(function () {
                    console.log('Hub has started');
                    $rootScope.$broadcast('HubStared', true);
                });
            },
            callQueueNotification: function () {
                window.communicationHub.invoke('CallMonitorQueue');
            },
            callQueueDataNotification: function (data) {
                window.communicationHub.invoke('CallMonitorQueue',data);
            },
            callDequeueNotification: function () {
                window.communicationHub.invoke('CallMonitorDequeue', data);
            },
            userLoginNotification: function (data) {
                window.communicationHub.invoke('UserLogin', data);
            },
            userStatusNotification: function (data) {
                window.communicationHub.invoke('UserStatus', data);
            },
            userStatusUpdateNotification: function (data) {
                window.communicationHub.invoke('UserStatusupdate', data);
            },
            userStatusGridUpdateNotification: function (data) {
                window.communicationHub.invoke('UserStatusgridupdate', data);
            },
            sliderCallNotification: function (data) {
                window.communicationHub.invoke('sliderCallStats', data);
            },
            saleNotification: function (data) {
                window.communicationHub.invoke('userSales', data);
            },
            userForceLogOffNotification: function (data) {
                window.communicationHub.invoke('ForceLogOff', data);
            },
            logoutCount: function (data) {
                window.communicationHub.invoke('UserLogOut', data);
            },
            answeredCall: function () {
                window.communicationHub.invoke("AnsweredCallNotification");
            },
            sessionEnd: function () {
                window.communicationHub.invoke('SessionEnd', { Email: constant.Email, FromApp: 'agent' });
            }
        };
        function onConnected() {
            return "NetUID=66sada-asdassd-dsada&Email=" + constant.Email + "&WorkerSID=" + constant.WorkerSID; // hassaankhan@gmail.com
        }
        conn.init();
        return conn;

    }]);
    return serv;


})();