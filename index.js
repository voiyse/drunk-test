'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.4889090d-2230-4f91-a9bb-c103f9fde628';

// Define states
var states = {
  INIT: '_INIT',
  TEST: '_TEST'
};

const launch = function() {
  this.emit(':ask', 'Welcome to Drunk Test. I am an expert at detecting if people are drunk or not.', 'Say start to take a test.');
};

const help = function() {
  this.emit(':ask', 'Drunk Test asks you a list of questions to determine if you are drunk', 'Say start to take a test');
};

const start = function() {
  this.handler.state = states.TEST;
  this.emit('TestIntent');
};

const test = function() {
  this.emit(':tell', 'Hello');
};

const stop = function() {
  this.handler.state = null;
  this.emit(':tell', 'Goodbye');
};

const mainHandlers = {
  'LaunchRequest': launch,

  'AMAZON.HelpIntent': help,

  'Unhandled': stop,

  'StartIntent': start,

  'AMAZON.StopIntent': stop,

  'AMAZON.CancelIntent': stop
};

const testHandlers = Alexa.CreateStateHandler(states.TEST, {
  'AMAZON.StopIntent': stop,

  'AMAZON.CancelIntent': stop,

  'Unhandled': stop,

  'TestIntent': test
});

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);

  alexa.registerHandlers(mainHandlers, testHandlers);
  alexa.execute();
};
