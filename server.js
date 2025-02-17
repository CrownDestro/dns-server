const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');

const server = dgram.createSocket('udp4');

const db = { 
    'google.com': {
        type: 'A',
        data: '127.1.1.0'
    },
    'www.google.com': { 
        type: 'CNAME',
        data: 'google.com'
    },
    'github.com': {
        type: 'A',
        data: '140.82.114.4'
    },
    'www.github.com': {
        type: 'CNAME',
        data: 'github.com'
    },
    'api.github.com': {
        type: 'A',
        data: '140.82.113.5'
    },
};

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg); 
    console.log(incomingReq.questions);
    const ipFromDb = db[incomingReq.questions[0].name];

    if (ipFromDb) {
        const ans = dnsPacket.encode({
            type: 'response',  
            id: incomingReq.id,
            flags: dnsPacket.AUTHORITATIVE_ANSWER,
            questions: incomingReq.questions,
            answers: [{
                type: ipFromDb.type,
                class: 'IN',
                name: incomingReq.questions[0].name,
                data: ipFromDb.data
            }]
        });

        server.send(ans, rinfo.port, rinfo.address);
    } else {
        console.log('Domain not found in the database');
    }
});

server.bind(8053, () => console.log('DNS Server is running on port 8053'));