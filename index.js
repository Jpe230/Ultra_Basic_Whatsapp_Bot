require('dotenv').config()
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const schedule = require('node-schedule');

const recipient = process.env.RECIPIENT;
const scheduleTime = process.env.TIME;
let isReady = false;

const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}


/* Add headless: true as a param if running from a VPS or Cloud Server */
const client = new Client({ puppeteer: {  }, session: sessionCfg });

client.initialize();

client.on('qr', (qr) => {
    /* Encode QR to something useful, could be printed to the terminal using QRCode-Terminal or Emailing it to you */ 
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

// TODO: Add more messages
const goodDays = [
    'Buenos días, que tengas un día bonito:) ❤️',
];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

client.on('ready', () => {
    console.log('READY, Waiting for Scheduler');
    isReady = true;
    
});

/* Cron-like library, use Cron, I was lazy and I did not wanted to add a Cron Job so I had to use this library
                                ┌───────────── minute (0 - 59)
                                │ ┌───────────── hour (0 - 23)
                                │ │ ┌───────────── day of the month (1 - 31)
                                │ │ │ ┌───────────── month (1 - 12)
                                │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
                                │ │ │ │ │                                   7 is also Sunday on some systems)
                                │ │ │ │ │
                                │ │ │ │ │                    */
//var j = schedule.scheduleJob('* * * * *', () => {
var j = schedule.scheduleJob(scheduleTime, () => {
    
    if(!isReady){
        console.error("User not ready");
        process.exit(1);
    }

    let y = Math.round(getRandomArbitrary(0, goodDays.length));
    client.sendMessage(`${recipient}@c.us`,goodDay[y]).then((response)=>{
        if(response.id.fromMe){
            console.log("done");
            //process.exit(1)
        }
    });

});

