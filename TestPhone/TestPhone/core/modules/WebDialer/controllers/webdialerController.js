'use strict';

var webdialerControllers = (function () {
    var ctrl = {};
    ctrl.Controller = function (app) {
        app.controller('webdialerController', ['$scope', '$rootScope', 'WebdialerSrvc', '$sce', 'events', 'MessageService', '$interval', 'constant', '$timeout', '$location', function ($scope, $rootScope, WebdialerSrvc, $sce, events, MessageService, $interval, constant, $timeout, $location) {
            $scope.view = {
                //#region webdialer variables
                OnCall: false,
                submitted: false,
            };
            //webdialer

            $scope.dtmf = function () {
                // Device fucntion call
            }

            $scope.hold = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.holdcall(data).success(function (data) {
                    
                }).error(function (data) {

                });
            }

            $scope.consultancy = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.consultancy(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.conference = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.conference(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.transfer = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.transfer(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.cancel = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.cancel(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.toggle = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.toggle(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.manualcall = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.manualcall(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.endcall = function () {
                var data = { who: 1, agentId: 5111, IsConferenceConsultancy: false };
                WebdialerSrvc.dtmfcommand(data).success(function (data) {

                }).error(function (data) {

                });
            }

            $scope.mute = function () {
                // Device fucntion call
            }
          
        }]);
       
        return app;
    };
    return ctrl;
})();


