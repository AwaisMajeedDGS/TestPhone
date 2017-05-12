

(function () {

    var module = angular.module('dwd.shared.Constant', []);
    module.constant('constant', {
        appName: 'Webdialer',
        appVersion: 2.0,
        //UserID: requestContext.worker.claims.userID,
        //apiUrl: requestContext.application.urls.apiBaseURL,
        //serviceapiUrl: requestContext.application.urls.serviceapiBaseURL,
        //telephoneApiUrl: requestContext.application.urls.telephonyApiBaseURL,
        //hubConnection: requestContext.application.urls.hubConnectionURL,
        //toastDelay: 3000,
        //Email: requestContext.worker.claims.email,
        //ApplicationClientID: requestContext.worker.claims.applicationClientID,
        //NetUID: requestContext.worker.claims.netUID,
        //CreatedByUserID: requestContext.worker.claims.userID,
        //ModifiedByUserID: requestContext.worker.claims.modifiedByUserID,
        //AccessToken: requestContext.worker.claims.accessToken,
        //WorkerSID: requestContext.worker.claims.workerSID,
        //CallerID: requestContext.application.configurations.callerId,
        //IsCallback: requestContext.application.configurations.isCallBack,
        //InProduction: requestContext.application.configurations.callerId,
        //Offline: requestContext.worker.activities.Offline,
        //Break: requestContext.worker.activities.Break,
        //OffBreak: requestContext.worker.activities.OffBreak,
        //CoachingCounseling: requestContext.worker.activities.CoachingCounseling,
        //ManualCall: requestContext.worker.activities.ManualCall,
        //TeamMeeting: requestContext.worker.activities.TeamMeeting,
        //Callback: requestContext.worker.activities.Callback,
        //Training: requestContext.worker.activities.Training,
        //Busy: requestContext.worker.activities.Busy,
        //Wrap: requestContext.worker.activities.Wrap,
        //BasicInfoStep: 0,
        //ContactInfoStep: 1,
        //OetStep: 2,
        //SaleStep: 3,
        //PrimarySkill: 29,
        //SecondarySkill: 30
    });
    module.constant('notify', {
        all: 'All',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        information: 'Information'
    });
    module.constant('events', {
        OnCall: 'OnCall',
        OnConsultancy: 'OnConsultancy',
        OnConference: 'OnConference',
        OnHold: 'OnHold',
        OnResume: 'OnResume',
        OnHoldResume: 'OnHoldResume',
        OnToggle: 'OnToggle',
        OnEndCall: 'OnEndCall',
        OnCancel: 'OnCancel',
        OnTransfer: 'OnTransfer',
        OpenDialPad: 'OpenDialPad',
        InboundCall: 'InboundCall',
        OutBoundCall: 'OutBoundCall',
        OnReservationReject: 'OnReservationReject',
        OnReservationCancelled: 'OnReservationCancelled',
        OnWrap: 'OnWrap',
        OnThirdPartyCancel: 'OnThirdPartyCancel'
    });
    return module;


})();