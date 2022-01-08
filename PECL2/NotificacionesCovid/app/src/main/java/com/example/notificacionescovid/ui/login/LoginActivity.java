package com.example.notificacionescovid.ui.login;

import android.app.Activity;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.notificacionescovid.R;
import com.example.notificacionescovid.data.LoginDataSource;

public class LoginActivity extends AppCompatActivity {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private Button loginButton;
    private final LoginDataSource loginDataSource = new LoginDataSource();
    private String response;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        usernameEditText = this.findViewById(R.id.username);
        passwordEditText = this.findViewById(R.id.password);
        loginButton = this.findViewById(R.id.login);;
        loginButton.setEnabled(true);


        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                try {
                    response = loginDataSource.login(usernameEditText.getText().toString().trim(),
                            passwordEditText.getText().toString().trim());

                    if (response == null) {
                        throw new Exception();
                    }
                    updateUiWithUser(usernameEditText.getText().toString());
                    finish();
                    setResult(Activity.RESULT_OK);
                }catch (Exception e)
                {
                    Toast.makeText(getApplicationContext(), R.string.login_failed, Toast.LENGTH_LONG).show();
                }
            }
        });


    }

    private void updateUiWithUser(String user) {
        String welcome = getString(R.string.welcome) + user;
        // TODO : initiate successful logged in experience

        Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
    }

}