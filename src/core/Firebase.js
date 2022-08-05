const { initializeApp, } = require("firebase/app");
const { getDatabase, get, set, ref } = require("firebase/database");
const uuid = require("uuid");
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: process.env.DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

class FirebaseDatabase {
  constructor() {
    this.db = getDatabase(app);
  }

  get(node = "tmp", page = 1, id = "") {
    id = id !== "" ? "/" + id : "";

    const r = ref(this.db, `${node}${id}`);

    return get(r);
  }

  set(node = "tmp", data = {}, autoId = true) {
    const id = autoId ? "/" + uuid.v4() : "";
    const r = ref(this.db, `${node}${id}`);

    set(r, data);
  }
}

exports.FirebaseDatabase = new FirebaseDatabase();
