#include <WiFi.h>

#include <MFRC522.h>
#include <SPI.h>

#define SS_PIN 9
#define RST_PIN 10

char* ssid = "ManuWifi"; //Incluimos el nombre de nuestra red wifi
const char* password = "1m2a3n4u";


#define LONGITUD_BYTES 18
#define LONGITUD_BYTES_ESCRITURA 16

MFRC522 rfid(SS_PIN,RST_PIN); //creamos la instancia del RC522
MFRC522::MIFARE_Key key;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  initWifi(); //Iniciamos la conexion wifi de la placa
  initRfid(); //Iniciamos el sensor NFC RC522

}

void loop() {
  // put your main code here, to run repeatedly:

  char contenidoRfid[LONGITUD_BYTES] = "";
  bool exito = leer(contenidoRfid);
  if(exito){
    Serial.println("Lo que hay escrito es:");
    Serial.print(F("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
    Serial.println(contenidoRfid);
    delay(2000);
  }else{
     Serial.println("Error leyendo");
  }
  
}

void initWifi(){


  
  Serial.println();
  Serial.println("Conectandose a la red: ");
  Serial.println(ssid);
  
  //WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }
  Serial.println("Conectado al WiFi");
  Serial.println("Direccion IP: ");
  Serial.println(WiFi.localIP());
}


bool leer(char mensaje[LONGITUD_BYTES]){
  if(!rfid.PICC_IsNewCardPresent()){
    return false;
  }
  if(!rfid.PICC_ReadCardSerial()){
    Serial.println("Error leyendo serial");
    return false;
  }
  byte bloque = 1;
  byte longitud = LONGITUD_BYTES;
  byte bufferLectura[LONGITUD_BYTES];
  
  MFRC522::StatusCode estado;
  estado = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloque, &key, &(rfid.uid));
  
  if (estado != MFRC522::STATUS_OK){
    Serial.println("Error autenticando");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }
  estado = rfid.MIFARE_Read(bloque, bufferLectura, &longitud);
  if (estado != MFRC522::STATUS_OK){
    Serial.println("Error leyendo bloque");
    Serial.println(rfid.GetStatusCodeName(estado));
    return false;
  }

  for (uint8_t i = 0; i < longitud - 2; i++){
    mensaje[i] = bufferLectura[i];
  }
  // Ya pueden retirar la tarjeta

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  return true;

  
}


void initRfid(){
  
  SPI.begin(); //Iniciamos el bus SPI
  rfid.PCD_Init(); //Iniciamos el rfid
  Serial.println();
  Serial.println(F("Reader :"));
  rfid.PCD_DumpVersionToSerial();
  for(byte i=0;i<6;i++){
    key.keyByte[i]=0xFF;
  }
  Serial.println();
  Serial.println(F("This code scan the MIFARE Classic NUID."));
  Serial.print(F("Using the following key:"));
  printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
  

}


void printHex(byte *buffer,byte bufferSize){
  for(byte i=0;i<bufferSize; i++){
    Serial.print(buffer[i]< 0x10 ? "0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
