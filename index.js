'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.4889090d-2230-4f91-a9bb-c103f9fde628';
const questions = require('./questions');

// Define states
var states = {
  TEST: '_TEST'
};

const messages = {
  launch: 'Welcome to Drunk Test. I am an expert at detecting if people are drunk or not.',
  startPrompt: 'Say start to take a test.',
  help: 'Drunk Test asks you a list of questions to determine if you are drunk',
  stop: 'Goodbye'
};

const questionsAsked = 0;

function logHandler(name) {
  console.log('Intent: ' + name);
};

const mainHandlers = {
  'LaunchRequest': function() {
    logHandler(this.name);

    this.emit(':ask', messages.launch, messages.startPrompt);
  },

  'AMAZON.HelpIntent': function() {
    logHandler(this.name);

    this.emit(':ask', messages.help, messages.startPrompt);
  },

  'Unhandled': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  },

  'StartIntent': function() {
    logHandler(this.name);

    this.handler.state = states.TEST;

    this.emitWithState('Question');
  },

  'AMAZON.StopIntent': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  },

  'AMAZON.CancelIntent': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  }
};

const testHandlers = Alexa.CreateStateHandler(states.TEST, {
  'Question': function() {
    let message = '';
    if (0 === questionsAsked) {
      message += "All right. Let's start your test.";
    }

    let question = ' How old are you?';

    message += question;

    this.emit(':ask', message, question);
  },

  'AnswerIntent': function() {
    this.emit(':tell', 'answer yo');
  },

  'AMAZON.StopIntent': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  },

  'AMAZON.CancelIntent': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  },

  'Unhandled': function() {
    logHandler(this.name);

    this.handler.state = null;
    this.emit(':tell', messages.stop);
  }
});

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);

  alexa.registerHandlers(mainHandlers, testHandlers);
  alexa.execute();
};
