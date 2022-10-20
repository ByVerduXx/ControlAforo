var mqtt = require('mqtt');
var client = mqtt.connect(`mqtt://${process.env.MQTT_IP}:1883`);
const {cardHandler} = require('./cards_mqtt')

client.on('connect', function () {
    if (client.connected) {
        console.log("Conectado");
        client.subscribe('+/entrada')
    }
});

client.on('message', function (topic, message) {
    let oficina = topic.toString().split('/')[0]
    if (oficina.match(/Oficina[0-9]+/)) {
        cardHandler(message.toString(), client, oficina)
    }
});

exports.client = client;