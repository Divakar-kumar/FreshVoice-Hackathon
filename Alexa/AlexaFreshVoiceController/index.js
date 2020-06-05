'use strict';
const Alexa = require('alexa-sdk');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const APP_ID = 'amzn1.ask.skill.2f958e56-4a7f-4a12-a669-1094680cd698';
const API = require('./ApiService/Services');
const CommonUtil = require('./ApiService/CommonUtil');
const SKILL_NAME = 'Slide Controller';
const GET_MARKET_MESSAGE = "Here's your briefings: ";
const HELP_MESSAGE = "Here's your help";
const HELP_REPROMPT = 'What would like to do next?';
const ERROR_REPROMPT = 'There was some error occured , Please try later';
const STOP_MESSAGE = 'Goodbye!';
const speechOutput = "ok";

const handlers = {
    'LaunchRequest': function () {
        API.InitializeFirebase();
        this.emit(':ask', 'Welcome to FreshVoice App ! Please say the code to continue', HELP_REPROMPT);
    },
    'CodeIntent': function () {
        const self = this;
        const codeValue = (self.event.request.intent.slots.CODEVALUE.value ? (self.event.request.intent.slots.CODEVALUE.value) : null);
        API.UpdateCode(codeValue);
        console.log("inside code intent", codeValue);
        self.response.speak('We have updated the code ,Now you can ask me to create or delete ticket')
            .listen('What else would you like to do?');
        self.emit(':responseReady');
    },
    'CreateTicketIntent': function () {
        const self = this;
        console.log("Code recieved");
        API.CreateTicketIntent().then(function () {
            console.log("inside create ticket operation");
            API.RemoveCreateTicket().then(function () {
                self.response.speak('We have created the ticket')
                    .listen('What else would you like to do?');
                self.emit(':responseReady');
            });
        });
    },
    'DeleteTicketIntent': function () {
        const self = this;
        console.log("Code recieved");
        API.DeleteTicketIntent().then(function () {
            console.log("inside delete ticket operation");
            API.RemoveDeleteTicket().then(function () {
                self.response.speak('We have deleted the freshvoice tickets')
                    .listen('What else would you like to do?');
                self.emit(':responseReady');
            });
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.YESIntent': function () {
        console.log('reached yes intent');
        this.response
            .speak(HELP_MESSAGE)
            .listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        this.response
            .speak(HELP_MESSAGE)
            .listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        this.response
            .speak(HELP_MESSAGE)
            .listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        var message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';
        this.response.speak(message).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
