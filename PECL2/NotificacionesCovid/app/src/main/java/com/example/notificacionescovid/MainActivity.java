package com.example.notificacionescovid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;

import com.example.notificacionescovid.data.LoginDataSource;
import com.example.notificacionescovid.databinding.ActivityMainBinding;
import com.example.notificacionescovid.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {

    TextView usuario;
    TextView oficina;
    TextView aforo;
    TextView positivo;
    public static final int REQUEST_CODE = 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        if (android.os.Build.VERSION.SDK_INT > 9)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }



        Intent intent = new Intent(this, LoginActivity.class);

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

    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        SharedPreferences sp = getSharedPreferences("login",MODE_PRIVATE);
        SharedPreferences.Editor editor = sp.edit();
        editor.remove("token");
        editor.commit();

        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);

        return true;
    }
}