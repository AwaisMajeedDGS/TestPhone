'use strict';
(function () {

    var serv = angular.module('dwd.webdialerSrvc', ['dwd.shared.utils', 'dwd.shared.Constant']);
    serv.service('WebdialerSrvc', ['MethodProvider', 'constant', function (MethodProvider, constant) {
        var self = this;
        var apiurl = "http://localhost:51276";
        self.holdcall = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url,data);
        };
        self.consultancy = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.conference = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.transfer = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.cancel = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.toggle = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.manualcall = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
        self.endcall = function (data) {
            var url = apiurl + '/telephony/holdcall';
            return MethodProvider.post(url, data);
        };
    }]);

   
    return serv;

})();

String.prototype.FormattedEmail = function SayHi() {
    var formattedEmail = this.replace(/\./g, '');
    formattedEmail = formattedEmail.replace(/\@/g, '')
    return formattedEmail;
};