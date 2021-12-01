var mqtt = require('mqtt');


class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = "192.168.187.128";
    }


    connect() {
        this.mqttClient = mqtt.connect('mqtt://' + this.host);

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe('test2', { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(topic.toString());
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }
}

module.exports = MqttHandler;