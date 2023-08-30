// import-mongoose.
const mongoose = require('mongoose');

// Connection-URI.
const mongoURI = process.env.MONGO_URI

// Connect-to-mongodb.
mongoose.connect(mongoURI);

// export-mongoose.
module.exports = mongoose;