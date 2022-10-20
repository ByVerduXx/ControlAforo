#include <ESP8266WiFi.h>

#include <SPI.h>
#include <MFRC522.h>

#include <PubSubClient.h>

#define RST_PIN D0
#define SS_PIN D8

MFRC522 reader(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

// REGION: Wireless config
const char* ssid ="NOMBREWIFI";
const char* password="CONTRASEÑA";
const char* namehost="NODE1";

//REGION: mqtt
const char* mqttServer = "192.168.1.166";
const int mqttPort = 1883;
#define pub_topic "Oficina1/entrada"
#define sub_topic "Oficina1/alerta"

WiFiClient espClient;
PubSubClient client(espClient);

//leds
#define G_LED D1
#define R_LED D2

//buzzer
#define BUZZER D3

void setup() {
  initSerial();
  initWifi();
  client.setServer(mqttServer,mqttPort);
  client.setCallback(callback);
  pinMode(G_LED, OUTPUT);
  pinMode(R_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  SPI.begin();

  reader.PCD_Init();
  // Just wait some seconds...
  delay(4);
  // Prepare the security key for the read and write functions.
  // Normally it is 0xFFFFFFFFFFFF
  // Note: 6 comes from MF_KEY_SIZE in MFRC522.h
  for (byte i = 0; i < 6; i++)
  {
    key.keyByte[i] = 0xFF; //keyByte is defined in the "MIFARE_Key" 'struct' definition in the .h file of the library
  }
  Serial.println("Ready!");
  digitalWrite(R_LED, HIGH);
}

void loop()
{
  if (!client.connected()) {
    reconnectMQTT();  
  }
  client.loop();
  
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if (!reader.PICC_IsNewCardPresent())
  {
    return;
  }

  // Select one of the cards. This returns false if read is not successful; and if that happens, we stop the code
  if (!reader.PICC_ReadCardSerial())
  {
    return;
  }

  // At this point, the serial can be read. We transform from byte to hex

  String serial = "";
  for (int x = 0; x < reader.uid.size; x++)
  {
    // If it is less than 10, we add zero
    if (reader.uid.uidByte[x] < 0x10)
    {
      serial += "0";
    }
    // Transform the byte to hex
    serial += String(reader.uid.uidByte[x], HEX);
    // Add a hypen
    if (x + 1 != reader.uid.size)
    {
      serial += " ";
    }
  }
  // Transform to uppercase
  serial.toUpperCase();

  Serial.println("Read serial is: " + serial);
  char buf[12];
  serial.toCharArray(buf,12);
  client.publish(pub_topic, buf);

  // Halt PICC
  reader.PICC_HaltA();
  // Stop encryption on PCD
  reader.PCD_StopCrypto1();
}

void initWifi() {
  Serial.println();
  Serial.print("Wifi connecting to ");  
  Serial.println(ssid);

  WiFi.hostname(namehost);
  WiFi.begin(ssid,password);
  Serial.println();
  Serial.print("Connecting");

  while(WiFi.status() != WL_CONNECTED){
      delay(500);
      Serial.print(".");
  }
  Serial.println("Wifi Connected Success!!");
  Serial.print("NodeMCU IP Adress: ");
  Serial.println(WiFi.localIP());
  
}

void reconnectMQTT(){
  while(!client.connected()) {
    Serial.println("Intentando conectarse a MQTT");
    if (client.connect("NodeMCUAforo")){
      Serial.println("Connected");
      client.subscribe(sub_topic);
    } else {
        Serial.println("Failed");
        Serial.println(client.state());
        delay(1000);
      }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println(); 
  if ((char)payload[0] == '0') {
      errorTone();
  } else {
      digitalWrite(R_LED, LOW);
      digitalWrite(G_LED, HIGH);
      successTone();
      delay(2000);
      digitalWrite(G_LED, LOW); 
      digitalWrite(R_LED, HIGH);
    }
}

void initSerial() {
  Serial.begin(115200);  
  Serial.setTimeout(5000);
  // Initializing serial port
  while(!Serial) { }
  //Mensaje de bienvenida
  Serial.println("Booting ...... \n");
  Serial.println("\tDevice running");
}

void successTone() {
  
  tone(BUZZER,5000);
  delay(300);
  noTone(BUZZER);
  delay(100);
  tone(BUZZER,5000);
  delay(300);
  noTone(BUZZER);  
}

void errorTone() {
  tone(BUZZER, 4000);
  delay(1000);
  noTone(BUZZER);  
}
