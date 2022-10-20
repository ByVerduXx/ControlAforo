package com.example.notificacionescovid;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.notificacionescovid.Mqtt.ServicioMqtt;
import com.example.notificacionescovid.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {

    TextView usuario;
    TextView oficina;
    TextView aforo;
    TextView positivo;
    SharedPreferences sp;
    Intent mqtt;
    Intent login;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (android.os.Build.VERSION.SDK_INT > 9)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        iniciarLogin();

    }

    @Override
    public void onResume() {
        super.onResume();
        actualizarDatos();
        iniciarMqtt();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        getMenuInflater().inflate(R.menu.menu_main_activity,menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        sp = getSharedPreferences("login",MODE_PRIVATE);
        SharedPreferences.Editor editor = sp.edit();
        editor.remove("usuario");
        editor.commit();

        stopService(mqtt);
        iniciarLogin();

        return true;
    }

    public void actualizarDatos()
    {
        usuario = findViewById(R.id.usuario);
        sp = getSharedPreferences("login",MODE_PRIVATE);

        String username = sp.getString("usuario","");
        usuario = findViewById(R.id.usuario);
        usuario.setText("Usuario: "+username);

    }

    public void iniciarLogin()
    {
        login = new Intent(this, LoginActivity.class);
        startActivity(login);
    }

    public void iniciarMqtt()
    {
        mqtt = new Intent(this, ServicioMqtt.class);
        startService(mqtt);
    }
}