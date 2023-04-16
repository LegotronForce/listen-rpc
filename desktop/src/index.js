const express   = require('express');
const chalk     = require('chalk');
const cors      = require('cors');
const bodyParser= require('body-parser');

const app = express();

let info = {
    title: 'No title yet',
    likes: '0 likes',
    views: '0 views',
    name:  'No creator yet',
    time: [[0, 0], [0, 0]],
};

/**
 * @param {[[number, number], [number, number]]} t 
 */
function parseTime(t) {
    return `${t[0][0]}:${t[0][1].toString().padStart(2, '0')}/${t[1][0]}:${(t[1][1]).toString().padStart(2, '0')}`;
}

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send(`Why are you connecting to the webserver, you weirdo!`);
});

app.post('/dp', function(req, res) {
    info = req.body;
    res.end('Recieved successfully I think');
});

// Update every second
setInterval(() => {
    console.clear();
    console.log(`${chalk.whiteBright(info.title)} - ${chalk.yellowBright(info.name)}\n`
        + `${chalk.yellow(parseTime(info.time))} - ${chalk.greenBright(info.likes)} - ${chalk.blueBright(info.views)}`
    );
}, 500);

app.listen(4942, () => {
    console.log(`${chalk.green('Desktop application has started listening')}`);
});