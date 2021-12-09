var mqtt = require('mqtt');
var client = mqtt.connect(`mqtt://${process.env.MQTT_IP}:1883`);

client.on('connect', function () {
    if (client.connected) {
        console.log("Conectado");
        client.subscribe('entrada');
    }
});

client.on('message', function (topic, message) {
    console.log(message.toString());
});

exports.client = client;