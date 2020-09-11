const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');

// Lead-List Service
class LeadList {
  constructor() {
    this.leads = [];
  }
  async find() {
    return this.leads;
  }
  async create() {
    const lead = {
      id: this.lead.length, // DB needs to create the ID
      text: data.text,
      tech: data.tech,
      viewer: data.viewer
    }
    lead.time = moment().format('h:mm:ss a');
    this.leads.push(lead);
    return lead;
  }
  
}

const app = express(feathers());

// Parse Json
app.use(express.json());

// configure Socketio realtime
app.configure(socketio());

//Enable the rest service
app.configure(express.rest());

//Register the Service
app.use('/leads', new LeadList());

// New connection for the ch
app.on('connection', conn => app.channel('stream').join(conn));

//Publish events to the stream
app.publish(data => app.channel('stream'));

const PORT = process.env.PORT || 3030;

app.listen(PORT).on('listening', () => console.log (`Realtime running`));