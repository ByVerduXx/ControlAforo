package com.example.notificacionescovid.data;


import org.json.JSONObject;

import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    private URL url;

    public LoginDataSource()
    {
        try {
            url = new URL("http://192.168.1.136:3001/users/login");
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    public String login(String username, String password) throws Exception{

        String token = null;

        String out = "{\"username\":\"%s\",\"password\":\"%s\"}";
        out = String.format(out, username, password);
        byte[] json = out.getBytes(StandardCharsets.UTF_8);



        String response = LlamadaServer.POST(url, json);
        System.out.println(response);
        if(response != null)
        {
            token = "ey193829303403940394";
        }
        return token;
    }

    public void logout() {
        // TODO: revoke authentication
    }
}