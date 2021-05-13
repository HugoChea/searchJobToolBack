require('dotenv').config();

module.exports = {
    mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustersearchjob.ubpkj.mongodb.net/ClusterSearchJob?retryWrites=true&w=majority`,
    //ryushi & searchJobTool
    secretOrKey: "secret"
};