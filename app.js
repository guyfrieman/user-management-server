const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongo = require('./mongo');

app.listen(4000, () => console.log('listening on 4000'));
let db;
mongo.connectToServer((err) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
    db = mongo.getDb();
});

const Cryptr = require('cryptr');
const cryptr = new Cryptr('4E635266546A576E');
app.get('/', (req, res) => {
    db.collection('users').find().toArray()
    .then((results) => res.send(results.map(r => Object.assign({}, r, {password: cryptr.decrypt(r.password)})))
    );
});
app.post('/createUser', (req,res, next) => {
    const users = db.collection('users');
        users
        .insertOne(Object.assign({}, req.body, {password: cryptr.encrypt(req.body.password)}))
        .then(_ => res.json({sucess: true}))
        .catch(error => {
            next(error);
        });
});