
//---- IProvider Interface for handling all providers
//---- contains methods for hold, resume, consultancy, conference, transfer, hangup
//---- and many more objects
function IProvider() {
    if (this.constructor === IProvider)
        throw new Error("Can't instantiate an interface!");

    this.hold = function (requestObject) {
        throw new Error("hold implementation not provided!");
    };

    this.resume = function (requestObject) {
        throw new Error("resume implementation not provided!");
    };

    this.consultancy = function (requestObject) {
        throw new Error("consultancy implementation not provided!");
    };

    this.conference = function (requestObject) {
        throw new Error("conference implementation not provided!");
    };

    this.transfer = function (requestObject) {
        throw new Error("transfer implementation not provided!");
    };

    this.hangup = function (requestObject) {
        throw new Error("hangup implementation not provided!");
    };

    this.toggle = function (requestObject) {
        throw new Error("toggle implementation not provided!");
    };

    this.thirdPartyHangup = function (requestObject) {
        throw new Error("thirdPartyHangup implementation not provided!");
    };

    this.mute = function (requestObject) {
        throw new Error("mute implementation not provided!");
    };

    this.unmute = function (requestObject) {
        throw new Error("unmute implementation not provided!");
    };

    this.manualCall = function (requestObject) {
        throw new Error("manualCall implementation not provided!");
    };
    
    this.sendDTMF = function (requestObject) {
        throw new Error("sendDTMF implementation not provided!");
    };
}


//---- IbexProvider class inheriting from IProvider interface
function IbexProvider(serve) {
    var self = this;
    var service = serve;
    IProvider.apply(self, arguments);

    self.hold = function (requestObject) {
        //hold logic
        console.log("Ibex Provider hold call");
        return service.post(requestObject.url, requestObject.data);

    };

    self.resume = function (requestObject) {
        //resume logic
        console.log("Ibex Provider resume call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.consultancy = function (requestObject) {
        //consultancy logic
        console.log("Ibex Provider consultancy call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.conference = function (requestObject) {
        //consultancy logic
        console.log("Ibex Provider conference call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.transfer = function (requestObject) {
        //transfer logic
        console.log("Ibex Provider transfer call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.hangup = function (requestObject) {
        //hangup logic
        console.log("Ibex Provider hangup call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.toggle = function (requestObject) {
        //toggle logic
        console.log("Ibex Provider toggle call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.thirdPartyHangup = function (requestObject) {
        //thirdPartyHangup logic
        console.log("Ibex Provider cancel call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.mute = function (requestObject) {
        //mute logic
        console.log("Ibex Provider mute call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.unmute = function (requestObject) {
        //unmute logic
        console.log("Ibex Provider unmute call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.manualCall = function (requestObject) {
        //manualCall logic
        console.log("Ibex Provider manual call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.sendDTMF = function (requestObject) {
        //sendDTMF logic
        console.log("Ibex Provider DTMF call");
        return service.post(requestObject.url, requestObject.data);
    };

    return self;
}

IbexProvider.prototype = Object.create(IProvider.prototype);
IbexProvider.prototype.constructor = IbexProvider;


//---- TwilioProvider class inheriting from IProvider interface
function TwilioProvider(service) {
    var self = this;
    IProvider.apply(self, arguments);

    self.hold = function (requestObject) {
        //hold logic
        console.log("Twilio Provider hold call");
        return service.post(requestObject.url, requestObject.data);
    };

    self.resume = function (requestObject) {
        //resume logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.consultancy = function (requestObject) {
        //consultancy logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.conference = function (requestObject) {
        //consultancy logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.transfer = function (requestObject) {
        //transfer logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.hangup = function (requestObject) {
        //hangup logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.toggle = function (requestObject) {
        //toggle logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.thirdPartyHangup = function (requestObject) {
        //thirdPartyHangup logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.mute = function (requestObject) {
        //mute logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.unmute = function (requestObject) {
        //unmute logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.manualCall = function (requestObject) {
        //manualCall logic
        return service.post(requestObject.url, requestObject.data);
    };

    self.sendDTMF = function (requestObject) {
        //sendDTMF logic
        return service.post(requestObject.url, requestObject.data);
    };

    return self;
}

TwilioProvider.prototype = Object.create(IProvider.prototype);
TwilioProvider.prototype.constructor = TwilioProvider;
