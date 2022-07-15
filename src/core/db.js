const { initializeApp } = require("firebase/app");
const { getDatabase, get, set, ref, query, endAt, startAt, orderByKey } = require("firebase/database");
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
  
  get(node = '', page = 1, id = '') {
    id = id !== '' ? '/' + id : '';
    
    let r = ref(this.db, `${node}${id}`);
    
    
    return get(query(r, orderByKey(), startAt("0"), endAt("10")));
  }
}

exports.db = new DBAction();