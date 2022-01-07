package com.example.notificacionescovid.data;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class LlamadaServer{


    public static String POST(URL url,JSONObject request) throws Exception {

        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

        urlConnection.setDoOutput(true);
        urlConnection.setDoInput(true);
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Accept", "application/json");

        //Enviamos la peticion

        char[] envio = request.toString().toCharArray();
        for(int i=0;i<envio.length;i++)
        {
            if(envio[i] == '"')
            {
                envio[i] = ' ';
            }
        }
        String requestFinal = String.valueOf(envio);
        System.out.println(requestFinal);

        OutputStreamWriter wr = new OutputStreamWriter(urlConnection.getOutputStream());
        wr.write(requestFinal);
        wr.close();


        System.out.println("Peticion enviada");

        //Construimos la respuesta
        String line = "";
        InputStream in = new BufferedInputStream(urlConnection.getInputStream());
        BufferedReader reader = new BufferedReader((new InputStreamReader(in)));
        StringBuilder sb = new StringBuilder();
        while((line = reader.readLine()) != null)
        {
            sb.append(line).append('\n');
        }
        in.close();
        System.out.println("Respuesta recibida");
        return sb.toString();
    }
}
