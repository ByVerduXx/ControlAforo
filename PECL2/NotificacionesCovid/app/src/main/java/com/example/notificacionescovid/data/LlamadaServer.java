package com.example.notificacionescovid.data;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class LlamadaServer{


    public static String POST(URL url,byte[] request) throws Exception {

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        if(conn != null)
        {
            int length = request.length;

            /*conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            conn.setFixedLengthStreamingMode(length);
            conn.setRequestProperty("Content-Type", "application/json");

            conn.connect();
            for (int i = 0; i < 100; i++) {System.out.println(".");}
            OutputStream os = conn.getOutputStream();
            os.write(request);
            for (int i = 0; i < 100; i++) {System.out.println(".");}
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = in.readLine()) != null) {
                sb.append(line + "\n");
            }
            in.close();
            String response = sb.toString();
            for (int i = 0; i < 100; i++) {System.out.println(".");}
            System.out.println(response);*/
            
            HttpPost
            return response;
        }else{
            System.out.println("Conexion fallida");
            return null;

        }


    }

}
