package com.example.notificacionescovid.data;


import android.widget.Toast;

import org.json.JSONObject;

import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    private final LlamadaServer server = new LlamadaServer();

    public String login(String username, String password) throws Exception{

        String token = null;
        JSONObject request = new JSONObject();
        request.put("username",username);
        request.put("password",password);



        JSONObject response = server.POST(request);
        if(response != null)
        {
            token = response.get("token").toString();
        }

        return token;
    }

}