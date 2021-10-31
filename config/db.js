const mongoose = require('mongoose');

const dbConnector = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = dbConnector;