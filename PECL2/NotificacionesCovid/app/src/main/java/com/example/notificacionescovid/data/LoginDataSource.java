package com.example.notificacionescovid.data;

import android.widget.Toast;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URL;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    private URL url;

    public LoginDataSource()
    {



    }

    public String login(String username, String password) throws Exception{
            // TODO: handle loggedInUser authentication
        String token = null;
            /*JSONObject request = new JSONObject();
            request.put("username","Manu01");
            request.put("password", "123456");



            String response = LlamadaServer.POST(new URL("http://localhost:3001/users/login"), request);*/
        System.out.println(username+" = "+ password);
        if(username.equals("Manu01") && password.equals("123456"))
        {
            token = "ey193829303403940394";
        }
        return token;
    }

    public void logout() {
        // TODO: revoke authentication
    }
}