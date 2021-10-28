#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>

// REGION: rfid config

#define RST_PIN D3
#define SS_PIN D4

MFRC522 reader(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;
String serial = "";

// REGION: Wireless config
const char* ssid ="VerduWifi";
const char* password="verduwifimovil2001";
const char* namehost="NODE1";

void setup() {
  initSerial();
  initWifi();

  SPI.begin(); // Init SPI bus
  reader.PCD_Init(); // Init MFRC522
  for (byte i = 0; i < 6; i++)
  {
    key.keyByte[i] = 0xFF; //keyByte is defined in the "MIFARE_Key" 'struct' definition in the .h file of the library
  }
  Serial.println();
  Serial.println("RFID READY");
  
  Serial.println();
}

void loop() {
  if (!reader.PICC_IsNewCardPresent())
  {
    return;
  }
  if (!reader.PICC_ReadCardSerial())
  {
    return;
  }
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
      serial += "-";
    }
  }
  serial.toUpperCase();
  Serial.println("Read serial is: " + serial);
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

void initSerial() {
  Serial.begin(115200);  
  Serial.setTimeout(5000);
  // Initializing serial port
  while(!Serial) { }
  //Mensaje de bienvenida
  Serial.println("Booting ...... \n");
  Serial.println("\tDevice running");
}
