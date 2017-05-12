//----- BaseProvider wrapper over the implementation of
//----- Ibex Provider and Twilio Provider
function BaseProvider(selector,service) {

    if (typeof selector != 'number')
        throw "incorrect provider";


    var self = this;
    var _provider;

    switch (selector) {
        case 1:
            //Initialize the ibex provider here
            _provider = new IbexProvider(service);
            break;
        case 2:
            //Initialize the twilio provider here
            _provider = new TwilioProvider(service);
            break;
        default:
            //Default initializing ibex library provider
            _provider = new IbexProvider();
            break;
    };


    //----- Hold Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio Hold call is taking callback function
    //----- Ibex Hold call is not taking any parameter
    self.holdCall = function (requestObject) {
        return _provider.hold(requestObject);
    }

    //----- Resume Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio Resume call is taking callback function
    //----- Ibex resume call is not taking any parameter
    self.resumeCall = function (requestObject) {
        return _provider.resume(requestObject);
    }

    //----- Consultancy Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio Resume call is taking callback function
    //----- Ibex resume call is not taking any parameter
    self.consultancyCall = function (requestObject) {
        return _provider.consultancy(requestObject);
    };

    //----- conference Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio Resume call is taking callback function
    //----- Ibex resume call is not taking any parameter
    self.conferenceCall = function (requestObject) {
        return _provider.conference(requestObject);
    };

    //----- Tansfer Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio transfer call is taking phoneNumber and callback function
    //----- Ibex iss providing 6 type of  transfer call
    //----- 1. TransferCallToAgent | parameter: type, target Campaign, target Agent, json lead data
    //----- 2. TransferCallToCampaign | parameter: type, target Campaign, json lead data
    //----- 3. TransferCallToIP | parameter: type, extAtIP, displayName, json lead data
    //----- 4. TransferCallToQueue | parameter: type, targetCampaign, queueId, json lead data
    //----- 5. TransferCallToTelco | parameter: type, countryCode, number, json lead data
    //----- default. CompleteTransfer | parameter: json lead data
    self.transferCall = function (requestObject) {

        _provider.transfer(requestObject);

        //switch (selector) {
        //    case 2:
        //        return _provider.transfer(obj.phoneNumber, obj.callback);
        //    case 1:
        //    default:
        //        switch (obj.TransferType) {
        //            case 1:
        //                return _provider.TransferCallToAgent(obj.type, obj.targetCampaign, obj.targetAgent, obj.jsonLead);
        //            case 2:
        //                return _provider.TransferCallToCampaign(obj.type, obj.targetCampaign, obj.jsonLead);
        //            case 3:
        //                return _provider.TransferCallToIP(obj.type, obj.extAtIP, obj.displayName, obj.jsonLead);
        //            case 4:
        //                return _provider.TransferCallToQueue(obj.type, obj.targetCampaign, obj.queueId, obj.jsonLead);
        //            case 5:
        //                return _provider.TransferCallToTelco(obj.type, obj.countryCode, obj.number, obj.jsonLead);
        //            default:
        //                return _provider.CompleteTransfer(obj.leadData);
        //                break;
        //        }

        //};
    };

    //----- Hangup Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio hangup call is taking callback function
    //----- Ibex hangup call is not taking any parameter
    self.hangupCall = function (requestObject) {
        _provider.hangup(requestObject);
    };

    //----- toggle Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio hangup call is taking callback function
    //----- Ibex hangup call is not taking any parameter
    self.toggleCall = function (requestObject) {
        _provider.toggle(requestObject);
    };

    //----- third Party Hangup Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio hangup call is taking callback function
    //----- Ibex hangup call is not taking any parameter
    self.thirdPartyHangupCall = function (requestObject) {
        _provider.thirdPartyHangup(requestObject);
    };

    //----- third Party Hangup Call Method 
    //----- Parameters obj accordingly, can be nullable
    //----- Twilio hangup call is taking callback function
    //----- Ibex hangup call is not taking any parameter
    self.deviceMute = function (requestObject) {
        if (requestObject.toMute)
            _provider.mute(requestObject);
        else
            _provider.unmute(requestObject);
    };

    //----- Manual Call Method
    //----- Taking obj which will resolve the complexity accordingly
    self.manualCall = function (requestObject) {
        return _provider.manualCall(requestObject);
    };

    //----- Send DTMF Method
    //----- Taking obj which will resolve the complexity accordingly
    self.sendDTMF = function (requestObject) {
        return _provider.sendDTMF(requestObject);
    };

    return self;
}

//var b1 = new BaseProvider(1);
//var b2 = new BaseProvider(2);