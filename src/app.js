'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const requestPromise = require('request-promise-native');

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb()
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('MoaciIntent');
  },

  async MoaciIntent() {
    const moaciReq = await getMoaciRequest();

    this.tell(moaciReq);
  },

  async MaxConsumptionIntent() {
    const moaciReq = await getMaxConsumptionRequest();

    this.tell("O consumo máximo do sistema é: " + moaciReq);
  }

});

async function getMoaciRequest() {
  const options = {
    uri: 'https://www.omdbapi.com/?i=tt1179056&apikey=76c8a8a0',
    json: true
  };
  const data = await requestPromise(options);

  return data.Title;
}

async function getMaxConsumptionRequest() {
  const options = {
    uri: 'http://200.19.179.216:443/alexa/user_dcf5d08d-f20b-4825-ac3b-d40e9769c75e/consumption/now',
    json: true
  };
  const data = await requestPromise(options);

  return data.home_consumption;
}

module.exports = { app };
