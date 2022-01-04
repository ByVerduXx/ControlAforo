package com.example.notificacionescovid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import android.widget.EditText;
import android.widget.TextView;

import com.example.notificacionescovid.databinding.ActivityMainBinding;
import com.example.notificacionescovid.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {

    TextView textoInicial;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        startActivity(intent);


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


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