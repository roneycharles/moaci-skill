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

});

async function getMoaciRequest() {
  const options = {
    uri: 'https://200.19.179.216/alexa/user_dcf5d08d-f20b-4825-ac3b-d40e9769c75e/home_appliance/now',
    json: true
  };
  const moaciReq = await requestPromise(options);
  
  console.log(moaciReq)
  return 
}

module.exports = { app };
