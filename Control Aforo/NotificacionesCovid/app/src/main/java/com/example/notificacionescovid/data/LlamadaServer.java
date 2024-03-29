package com.example.notificacionescovid.data;


import org.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;


public class LlamadaServer{

    private URL url;

    public LlamadaServer() {
        try {
            this.url = new URL("http://192.168.1.136:3001/users/login");
        } catch (Exception e) {
            e.getStackTrace();
        }
    }


    public synchronized JSONObject POST(JSONObject request) throws Exception {

        //Conectamos con el servidor
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

        urlConnection.setDoOutput(true);
        urlConnection.setDoInput(true);
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Accept", "application/json");
        urlConnection.connect();


        //Enviamos la peticion
        OutputStreamWriter wr = new OutputStreamWriter(urlConnection.getOutputStream());
        wr.write(request.toString());
        wr.flush();
        wr.close();


        //Construimos la respuesta
        String line = "";
        InputStream in = new BufferedInputStream(urlConnection.getInputStream());
        BufferedReader reader = new BufferedReader((new InputStreamReader(in)));
        StringBuilder sb = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            sb.append(line).append('\n');
        }
        in.close();

        return new JSONObject(sb.toString());
    }
}
