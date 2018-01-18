import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as RxDB from 'rxdb';
import { QueryChangeDetector} from 'rxdb';
import {schema} from './Schema';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const syncURL = 'http://localhost:5984/';
const dbName = 'chatdb';

class App extends Component {
  async createDatabase () {
    const db = await RxDB.create(
      {name: dbName, adapter: 'idb', password: '12345678'}
    );

    db.waitForLeadership().then(() => {
      document.title = 'CROWN' + document.title;
    });

    const messagesCollection = await db.collection ({
      name: 'messages',
      schema: schema
    });

    messagesCollection.sync({ remote: syncURL + dbName + '/' });

    return db;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
