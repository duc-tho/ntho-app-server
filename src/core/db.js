const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.API_KEY,
  projectId: process.env.API_KEY,
  storageBucket: process.env.API_KEY,
  messagingSenderId: process.env.API_KEY,
  appId: process.env.API_KEY,
  measurementId: process.env.API_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

exports.db = database;