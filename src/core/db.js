const { initializeApp } = require("firebase/app");
const { getDatabase, get, set, ref, query, endAt, startAt, orderByKey } = require("firebase/database");
const admin = require("firebase-admin");

const serviceAccount = require("../../fbauth.json");

const uuid = require('uuid');
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: process.env.DATABASE_URL
};
const app = admin.initializeApp(firebaseConfig);

class DBAction {
  constructor() {
    this.db = getDatabase(app);
  }
  
  get(node = 'tmp', page = 1, id = '') {
    id = id !== '' ? '/' + id : '';
    
    const r = ref(this.db, `${node}${id}`);
    
    
    return get(r);
  }
  
  set(node = 'tmp', data = {}, autoId = true) {
    const id = autoId ? '/' + uuid.v4() : '';
    const r = ref(this.db, `${node}${id}`);
    
    set(r, data);
  }
}

exports.db = new DBAction();