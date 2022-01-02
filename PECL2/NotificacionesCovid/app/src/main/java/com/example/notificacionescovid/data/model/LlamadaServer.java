package com.example.notificacionescovid.data.model;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

//https://github.com/heyletscode/Android-App-Backend-With-Node-JS
//Acabar

public interface LlamadaServer {


    @POST("/login")
    Call<LoginResult> executeLogin(@Body HashMap<String, String> map);

}
