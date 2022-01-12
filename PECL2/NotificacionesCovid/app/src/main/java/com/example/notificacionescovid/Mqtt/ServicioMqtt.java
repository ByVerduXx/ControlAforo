package com.example.notificacionescovid.Mqtt;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.example.notificacionescovid.MainActivity;
import com.example.notificacionescovid.R;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.*;


public class ServicioMqtt extends Service{



    private MqttAndroidClient client;
    private MqttConnectOptions options;
    private final int NOTIFICATION_ID = 0;
    private final String CHANNEL_ID = "channelid";

    public void onCreate()
    {
        super.onCreate();

        options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);

    }

    @Override
    public int onStartCommand(Intent intent,int flags, int startId)
    {
        String clientId = MqttClient.generateClientId();
        client = new MqttAndroidClient(this.getApplicationContext(),"tcp://192.168.1.11:1883",clientId);


        client.setCallback(new MqttCallbackExtended() {
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                System.out.println("Se ha conectado");
            }

            @Override
            public void connectionLost(Throwable cause) {
                System.out.println("Se ha perdido la conexion");
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                System.out.println("Ha llegado un mensaje");
                createNotificationChannel();
                createNotification(message.toString());
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {

            }
        });
        try {
            client.connect(options, new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {

                    System.out.println("Conectado");
                    SharedPreferences sp = getSharedPreferences("login", MODE_PRIVATE);
                    if(!sp.getString("usuario", "").equals(""))
                    {
                        System.out.println(sp.getString("usuario", ""));
                        suscribirTopic(sp.getString("usuario", ""));
                    }
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    System.out.println("Failure");
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }

    return Service.START_STICKY;
    }


    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }


    private void suscribirTopic(String user)
    {
        try
        {
            client.subscribe("notificaciones/"+user,0);
            System.out.println("Subscription done");
        }catch(Exception e)
        {
            e.printStackTrace();
        }

    }

    private void createNotificationChannel()
    {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            CharSequence nombre = "Notificacion";
            NotificationChannel notificationChannel = new NotificationChannel(CHANNEL_ID,nombre, NotificationManager.IMPORTANCE_HIGH);
            NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(notificationChannel);
        }
    }

    private void createNotification(String msn)
    {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(),CHANNEL_ID);
        builder.setSmallIcon(R.drawable.ic_launcher_foreground);
        builder.setContentTitle("Contacto con Positivo Covid");
        builder.setContentText("El usuario "+msn+" ha dado positivo en covid y ha estado en contacto con usted. Guarde cuarentena");
        builder.setColor(Color.BLUE);
        builder.setPriority(NotificationCompat.PRIORITY_MAX);
        builder.setLights(Color.BLUE,1000,1000);
        builder.setVibrate(new long[]{1000,1000,1000,1000});
        builder.setDefaults(Notification.DEFAULT_SOUND);
        builder.setShowWhen(true);
        builder.setContentIntent(PendingIntent.getActivity(this,0,new Intent(this, MainActivity.class),0));
        builder.setStyle(new NotificationCompat.BigTextStyle()
                .bigText("El usuario "+msn+" ha dado positivo en covid y ha estado en contacto con usted. Guarde cuarentena"));

        NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(getApplicationContext());
        notificationManagerCompat.notify(NOTIFICATION_ID,builder.build());

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        try {
            client.disconnect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
        System.out.println("MQTT Reiniciado");
    }
}

























