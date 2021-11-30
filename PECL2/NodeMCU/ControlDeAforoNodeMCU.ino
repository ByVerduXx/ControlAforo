#include <ESP8266WiFi.h>

#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN D0
#define SS_PIN D8

MFRC522 reader(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

// REGION: Wireless config
const char* ssid ="VerduWifi";
const char* password="verduwifimovil2001";
const char* namehost="NODE1";

//leds
#define G_LED D1
#define R_LED D2

//buzzer
#define BUZZER D3


void setup() {
  initSerial();
  //initWifi();  //descomentar esto
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
}

void loop()
{
  digitalWrite(R_LED, HIGH);
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
      serial += "-";
    }
  }
  // Transform to uppercase
  serial.toUpperCase();

  Serial.println("Read serial is: " + serial);
  digitalWrite(R_LED, LOW);
  digitalWrite(G_LED, HIGH);
  //tone(BUZZER,3000,1000); //error sound
  successTone();
  delay(2000);
  digitalWrite(G_LED, LOW);

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

void successTone() {
  
  tone(BUZZER,5000);
  delay(300);
  noTone(BUZZER);
  delay(100);
  tone(BUZZER,5000);
  delay(300);
  noTone(BUZZER);  
}
