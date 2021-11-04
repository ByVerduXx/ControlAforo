#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>

#include <SPI.h>
#include <MFRC522.h>
#define LONGITUD_BYTES 18
#define LONGITUD_BYTES_ESCRITURA 16
#define SS_PIN D8
#define RST_PIN D0
#define MODO_LECTURA 1
#define MODO_ESCRITURA 2
#define MODO MODO_ESCRITURA
MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;
// Init array that will store new NUID
byte nuidPICC[4];

String receptorr = "Raul";

const char *ssid = "VerduWifi";
const char *password = "verduwifimovil2001";
const char *host = "192.168.8.104";


bool leer(char mensaje[LONGITUD_BYTES])
{

  if (!rfid.PICC_IsNewCardPresent())
  {
    return false;
  }
  if (!rfid.PICC_ReadCardSerial())
  {
    Serial.println("Error leyendo serial");
    return false;
  }
  byte bloque = 1; // El bloque que leemos
  byte longitud = LONGITUD_BYTES;
  byte buferLectura[LONGITUD_BYTES];

  MFRC522::StatusCode estado;
  estado = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid));
  if (estado != MFRC522::STATUS_OK)
   {
    Serial.println("Error autenticando");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }
  estado = rfid.MIFARE_Read(bloque, buferLectura, &longitud);
  if (estado != MFRC522::STATUS_OK)
  {
    Serial.println("Error leyendo bloque");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }

  for (uint8_t i = 0; i < LONGITUD_BYTES - 2; i++)
  {
    mensaje[i] = buferLectura[i];
  }
  // Ya pueden retirar la tarjeta

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  return true;
}




void setup() {
 Serial.begin(115200);
   delay(10);
  Serial.println();
  Serial.println();
  Serial.println("Conectandose a: ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED ) { //Cuenta hasta 50 y si no se conecta cancela la operación 
    delay(500);
    Serial.print(".");
  }



  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();




  
  Serial.println();
  Serial.println("Conectado al WIFI");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
 SPI.begin(); // Init SPI bus
 rfid.PCD_Init(); // Init MFRC522
 Serial.println();
 Serial.print(F("Reader :"));
 rfid.PCD_DumpVersionToSerial();
 for (byte i = 0; i < 6; i++) {
   key.keyByte[i] = 0xFF;
 }
 Serial.println();
 Serial.println(F("This code scan the MIFARE Classic NUID."));
 Serial.print(F("Using the following key:"));
 printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
}
int value = 0;



void loop() {
  ArduinoOTA.handle();
 // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
 /*if ( ! rfid.PICC_IsNewCardPresent())
   return;
 // Verify if the NUID has been readed
 if ( ! rfid.PICC_ReadCardSerial())
   return;
 Serial.print(F("PICC type: "));
 MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
 Serial.println(rfid.PICC_GetTypeName(piccType));
 // Check is the PICC of Classic MIFARE type
 /*if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
     piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
     piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
   Serial.println(F("Your tag is not of type MIFARE Classic."));
   return;
 }
 /*if (rfid.uid.uidByte[0] != nuidPICC[0] ||
     rfid.uid.uidByte[1] != nuidPICC[1] ||
     rfid.uid.uidByte[2] != nuidPICC[2] ||
     rfid.uid.uidByte[3] != nuidPICC[3] ) {
   Serial.println(F("A new card has been detected."));
   // Store NUID into nuidPICC array
   for (byte i = 0; i < 4; i++) {
     nuidPICC[i] = rfid.uid.uidByte[i];
   }
   Serial.println(F("The NUID tag is:"));
   Serial.print(F("In hex: "));
   printHex(rfid.uid.uidByte, rfid.uid.size);
   Serial.println();
   Serial.print(F("In dec: "));
   printDec(rfid.uid.uidByte, rfid.uid.size);
   Serial.println();
 }
 else Serial.println(F("Card read previously."));
 // Halt PICC
 rfid.PICC_HaltA();
 // Stop encryption on PCD
 rfid.PCD_StopCrypto1();*/
  delay(2000);
 char contenidoRfid[LONGITUD_BYTES] = "";
bool lecturaExitosa = leer(contenidoRfid);
if (lecturaExitosa)
{
  Serial.println("Lo que hay escrito es:");
  Serial.print(F("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
  Serial.println(contenidoRfid);
   delay(2000);
   ++value;
   Serial.println("Conectandose a: ");
   Serial.println(host);

    WiFiClient client;
    const int httPort = 80;
    if(! client.connect(host,httPort)){

      Serial.println("La conexión ha fallado");
      return;      
    }

    String url = "http://127.0.0.1/prueba/envia_datos2.php";
    String datoss = (String) contenidoRfid;
    String data = "emisor="+datoss+"&receptor="+receptorr+/*"&info=willson*/"&correo=Rodolfo@gmail.com";


    Serial.println("Requesting URL: ");
    Serial.println(url);

     client.print(String("POST ") + url + " HTTP/1.0\r\n" + 
               "Host: " + host + "\r\n" +
               "Accept: *"+ "/" + "*\r\n" +
               "Content-Length: " + data.length() + "\r\n" +
               "Content-Type: application/x-www-form-urlencoded" + "\r\n" +
               "\r\n" + data);     

    delay(10);
    
    Serial.println("Respond: ");
    while(client.available()){

      String line = client.readStringUntil('\r');
      Serial.println(line);
    }

    Serial.println();

    Serial.println("La conexión ha sido cerrada");
}
else
{
  Serial.println("Error leyendo. Tal vez no hay RFID presente");
}

   /*delay(2000);
   ++value;
   Serial.println("Conectandose a: ");
   Serial.println(host);

    WiFiClient client;
    const int httPort = 80;
    if(! client.connect(host,httPort)){

      Serial.println("La conexión ha fallado");
      return;      
    }

    String url = "http://127.0.0.1/prueba/envia_datos.php";
    String datoss = (String) contenidoRfid;
    String data = "emisor="+datoss+"&receptor="+receptorr+"Willson&info=willson&correo=Rodolfo@gmail.com";


    Serial.println("Requesting URL: ");
    Serial.println(url);

     client.print(String("POST ") + url + " HTTP/1.0\r\n" + 
               "Host: " + host + "\r\n" +
               "Accept: *"+ "/" + "*\r\n" +
               "Content-Length: " + data.length() + "\r\n" +
               "Content-Type: application/x-www-form-urlencoded" + "\r\n" +
               "\r\n" + data);     

    delay(10);
    
    Serial.println("Respond: ");
    while(client.available()){

      String line = client.readStringUntil('\r');
      Serial.println(line);
    }

    Serial.println();

    Serial.println("La conexión ha sido cerrada");*/
}
/**
   Helper routine to dump a byte array as hex values to Serial.
*/
void printHex(byte *buffer, byte bufferSize) {
 for (byte i = 0; i < bufferSize; i++) {
   Serial.print(buffer[i] < 0x10 ? " 0" : " ");
   Serial.print(buffer[i], HEX);
 }
}
/**
   Helper routine to dump a byte array as dec values to Serial.
*/
void printDec(byte *buffer, byte bufferSize) {
 for (byte i = 0; i < bufferSize; i++) {
   Serial.print(buffer[i] < 0x10 ? " 0" : " ");
   Serial.print(buffer[i], DEC);
 }
}
