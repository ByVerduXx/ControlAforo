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
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class ServicioMqtt extends Service {



    private MqttAndroidClient client;
    private MqttConnectOptions options;
    private final int NOTIFICATION_ID = 0;

    public void onCreate()
    {
        super.onCreate();

        String clientId = MqttClient.generateClientId();
        client = new MqttAndroidClient(this.getApplicationContext(),"tcp://192.168.1.166:1883",clientId);

        options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);
    }

    @Override
    public int onStartCommand(Intent intent,int flags, int startId)
    {
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
                    System.out.println(sp.getString("usuario", ""));
                    suscribirTopic(sp.getString("usuario", ""));
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    System.out.println("Failure");
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
        /*try
        {

            IMqttToken token = client.connect();
            System.out.println("Comprobamos la conexion");

            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {

                    System.out.println("MQTT connected");

                    //Nos suscribimos al topic
                    SharedPreferences sp = getSharedPreferences("login",MODE_PRIVATE);
                    suscribirTopic(sp.getString("usuario",""));

                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    System.out.println("Error conectando a MQTT");
                }
            });


        }catch(Exception e)
        {
            e.printStackTrace();
        }

        client.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable cause) {}

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {

                if(topic.contains("alert"))
                {
                    String mqttText = new String(message.getPayload());

                    createNotificationChannel();
                    createNotification(mqttText);
                }

            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {}
        });
*/
    return START_STICKY;
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
            NotificationChannel notificationChannel = new NotificationChannel("Positivo",nombre, NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(notificationChannel);

        }
    }

    private void createNotification(String msn)
    {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(),"Positivo");
        builder.setSmallIcon(R.drawable.ic_launcher_foreground);
        builder.setContentTitle("Contacto con Positivo Covid");
        builder.setColor(Color.BLUE);
        builder.setPriority(NotificationCompat.PRIORITY_HIGH);
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
}