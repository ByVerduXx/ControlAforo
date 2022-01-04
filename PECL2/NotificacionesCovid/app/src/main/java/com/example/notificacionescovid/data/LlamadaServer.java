package com.example.notificacionescovid.data;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

//https://github.com/heyletscode/Android-App-Backend-With-Node-JS
//Acabar

public class LlamadaServer{


    public static String POST(URL url,JSONObject cred) throws Exception {





        /*StringBuilder postData = new StringBuilder();
        for (HashMap.Entry<String,String> param : request.entrySet()) {
            if (postData.length() != 0) postData.append('&');
            postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
            postData.append('=');
            postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
        }
        System.out.println(postData);
        byte[] postDataBytes = postData.toString().getBytes("UTF-8");
        */
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        if(conn != null)
        {
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept", "application/json");

            conn.setDoOutput(true);

            System.out.println(cred.toString());

            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(cred.toString());
            wr.flush();

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = in.readLine()) != null) {
                sb.append(line + "\n");
            }
            in.close();
            String response = sb.toString();
            System.out.println(response);

            return response;
        }else{
            System.out.println("Conexion fallida");
            return null;

        }


    }

}
