const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://guyfrieman:liannitay@cluster0.ufesz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;
module.exports ={
    connectToServer: (callback) => {
    MongoClient.connect(connectionString, (err, client) => {
        db = client.db('users');
        db.collection('users').createIndex({'email':1}, {unique:true});
        return callback(err);
        });
    },
    getDb: () => db
}