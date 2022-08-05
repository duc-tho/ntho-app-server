const { initializeApp, } = require("firebase/app");
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: '../data/ntho.db'
});
 
sequelize.authenticate();

const {
  getDatabase,
  get,
  set,
  ref,
  query,
  endAt,
  startAt,
  orderByKey,
} = require("firebase/database");
const uuid = require("uuid");
const { JWT } = require("google-auth-library");
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

class DBAction {
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

exports.getToken = function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require("../../fbauth.json");
    let jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      ["https://www.googleapis.com/auth/cloud-platform"],
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
};

exports.db = new DBAction();
