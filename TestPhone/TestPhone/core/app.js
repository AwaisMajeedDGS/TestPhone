'use strict';

function initializeApp() {
    angular.bootstrap(document, ['dwd']);
}

var ngApp = (function(initializeApp){
    var app = angular.module('dwd', ['dwd.webdialerModule'])
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
    }]);
   
    if (typeof initializeApp != undefined && typeof initializeApp === 'function')
    {
        initializeApp();
    }

    app.run(function ($rootScope) {

        //signalr socket open
        //https://github.com/JustMaier/angular-signalr-hub

        //var connection = $.hubConnection(huConectioN + '/signalr', { useDefaultPath: false, jsonp: true, transport: 'webSockets' });

        //$rootScope.$on('call-queue-data-notification', function (eventName, data) {
        //    window.communicationHub.invoke('CallMonitorQueue', data);
        //});

        //window.communicationHub.on('broadcastForcelogOffNotification', function (data) {
        //    $rootScope.$broadcast('dsaad', data);
        //});

    });

    app.factory('HubConnection', ['$rootScope', 'Hub', function ($rootScope, Hub) {
        
        //initialize it with constant url
        var serverUrl;

        //Hub setup
        var hub = new Hub(serverUrl, {
            listeners: {
                'broadcastForcelogOffNotification': function (data) {
                    callBackSignal(JSON.parse(data));
                },
                'thirdPartyHangupNotification': function (data) {
                    var result = JSON.parse(data);
                    var user = userEmailAddress.FormattedEmail();
                    if (result.ConferenceRoomId.split('_')[1] == user) {
                        if (result.AgentCallId == controller.callSession.AgentCallID) {
                            notify("information", "third party has cancelled the call.", 5000, false);
                            isAgentOnConsultancyOrConference = false;
                            controller.callSession.ThirdPartyCallID = "";
                            try {
                                notificationViewModel.addNotification({ type: 'Success', message: 'third party has cancelled the call.', module: 'Dialer', date: new Date() });
                            } catch (e) {

                            }
                            PubSub.publish('dialpadNotification', data);
                        }
                    }
                },
                'manualCallHangupNotification': function (data) {
                    var result = JSON.parse(data);
                    //conference room split by _ then idex[1]
                    var user = userEmailAddress.FormattedEmail();
                    if (result.ConferenceRoomId.split('_')[1] == user) {
                        if (result.CallStatus == 'failed') {
                            notify("error", "warning(" + (++warning_counts) + "): you have dialed an incorrect number.", 4000, false);
                            switch (warning_counts) {
                                case 2: notify("error", "warning: you are dialing continuously wrong number", 5000, false); break;
                                case 3: notify("error", "warning: this was your final warning. your status will be reported to the higher authorities.", 5000, false); break;
                                case 4: notify("error", "your status has been locked and reported to supervisor for consecutive wrong outbound dialing", 5000, false); warning_counts = 0; break;
                                default: break;
                            }
                        }
                    } else if (result.CallStatus == 'no-answer') {
                        notify("error", "the number you have dialed is not answering", 5000, false);
                    }
                },
                'clientSessionEnd': function (data) {
                    if (data && typeof userEmailAddress != 'undefined') {
                        data = JSON.parse(data);
                        var clientApps = ['dial', 'admin', 'insight'];
                        if (userEmailAddress == data.Email && clientApps.indexOf(data.FromApp) != -1) {
                            window.onbeforeunload = null;
                            window.onunload = null;
                            if (agentOnCall) {
                                controller.hangup();
                                if (typeof navigationViewModel != 'undefined') {
                                    navigationViewModel.modifyLeadDisposition();
                                    navigationViewModel.addCallStatusLog(controller.callSession.CustomerCallID, "cancelled", "Call cancelled due to forced disposed agent Callsid");
                                }
                            }
                            localStorage.clear();
                            notify("information", "Your session has been expired.", 4000, false);
                            window.location = window.location.origin + '/account/signoutlocal';
                            return;
                        }
                    }
                },
                'skillsUpdatedEventNotification': function (data) {
                    if (data) {
                        var result = JSON.parse(data);
                        var obj = localStorage.getItem('skillsUpdated');
                        if (obj != null) {
                            for (var i = 0 ; i < result.skills.length ; i++) {
                                obj = $.map(obj, function (o) {
                                    if (o.ID == result.skills[i].ID) {
                                        o = result.skills[i];
                                    }
                                    return o;
                                });
                            }
                            localStorage.setItem('skillsUpdated', JSON.stringify(obj));
                        }

                    }
                },
                'greetingsUpdatedEventNotification': function (data) {
                    if (data) {
                        var obj = localStorage.getItem('GreetingList');
                        if (obj != null) {
                            for (var i = 0 ; i < result.greetings.length ; i++) {
                                obj = $.map(obj, function (o) {
                                    if (o.ID == result.greetings[i].ID) {
                                        o = result.greetings[i];
                                    }
                                    return o;
                                });
                            }
                            localStorage.setItem('GreetingList', JSON.stringify(obj));
                        }
                    }
                },
                'scriptsUpdatedEventNotification': function (data) {
                    if (data) {
                        var obj = localStorage.getItem('scriptsUpdated');
                        if (obj != null) {
                            for (var i = 0 ; i < result.scripts.length ; i++) {
                                obj = $.map(obj, function (o) {
                                    if (o.ID == result.scripts[i].ID) {
                                        o = result.scripts[i];
                                    }
                                    return o;
                                });
                            }
                            localStorage.setItem('scriptsUpdated', JSON.stringify(obj));
                        }
                    }
                }
            },
            methods: ['CallMonitorQueue', 'CallMonitorQueue', 'CallMonitorDequeue', 'UserLogin', 'UserStatus', 'UserStatusupdate',
            'UserStatusgridupdate', 'sliderCallStats', 'userSales', 'ForceLogOff', 'UserLogOut', 'AnsweredCallNotification'],
            errorHandler: function (error) {
                console.error(error);
            }
        });

        //$rootScope.$on('call-queue-data-notification',)
       
        return hub;
    }]);

    return app;
})(initializeApp);
