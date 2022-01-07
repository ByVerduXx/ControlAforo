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
            url = new URL("http://192.168.1.69:3001/users/login");
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    public String login(String username, String password) throws Exception{

        String token = null;

        /*String out = "{\"username\":\"%s\",\"password\":\"%s\"}";
        out = String.format(out, username, password);
        byte[] json = out.getBytes(StandardCharsets.UTF_8);
        */
        JSONObject request = new JSONObject();
        JSONObject cred = new JSONObject();
        cred.put("username","'"+username+"'");
        cred.put("password","'"+password+"'");
        request.put("body",cred);



        String response = LlamadaServer.POST(url, request);
        System.out.println(response);
        if(!response.equals(""))
        {
            token = "ey193829303403940394";
        }
        return token;
    }

    public void logout() {
        // TODO: revoke authentication
    }
}