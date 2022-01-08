package com.example.notificacionescovid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.view.Menu;
import android.widget.EditText;
import android.widget.TextView;

import com.example.notificacionescovid.databinding.ActivityMainBinding;
import com.example.notificacionescovid.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {

    TextView textoInicial;

    @Override
    protected void onCreate(Bundle savedInstanceState) {



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        if (android.os.Build.VERSION.SDK_INT > 9)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        startActivity(intent);


        /*textoInicial = this.findViewById(R.id.TextView);

        textoInicial.setText("Comeme las pelotas");*/

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {

        getMenuInflater().inflate(R.menu.menu_main_activity,menu);
        return true;
    }
}