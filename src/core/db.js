const { initializeApp } = require("firebase/app");
const { getDatabase, get, set, ref, query, endAt, startAt, orderByChild } = require("firebase/database");
const uuid = require('uuid');
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: process.env.DATABASE_URL
};

class DBAction {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.db = getDatabase(this.app);
  }
  
  get(node = 'tmp', page = 1, id = '') {
    id = id !== '' ? '/' + id : '';
    
    const r = ref(this.db, `${node}${id}`);
    
    
    return get(query(r, orderByChild('createdAt')));
  }
  
  set(node = 'tmp', data = {}) {
    const id = uuid.v4();
    const r = ref(this.db, `${node}/${id}`);
    
    set(r, data);
  }
}

exports.db = new DBAction();