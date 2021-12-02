import random

#Lectura de nombres .txt
nombres = open ('RUTA', 'r')
lecturaNombres = nombres.read()
print(lecturaNombres)
listaNombres = lecturaNombres.split()
nombres.close

#Lectura de RFIDs .txt
rfids = open ('RUTA', 'r')
lecturaRfids = rfids.read()
print(lecturaRfids)
listaRfids = lecturaRfids.split('\n')
rfids.close

#Lectura de apellidos .txt
apellidos = open ('RUTA', 'r')
lecturaApellidos = apellidos.read()
print(lecturaApellidos)
listaApellidos = lecturaApellidos.split()
apellidos.close

#Lectura de direcciones .txt
direcciones = open ('RUTA', 'r')
lecturaDirecciones = direcciones.read()
print(lecturaDirecciones)
listaDirecciones = lecturaDirecciones.split('\n')
direcciones.close

def genera_dni_aleatorio():
    letras_resto_division = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
    parte_numerica = random.randint(0, 99999999)
    letra = letras_resto_division[parte_numerica%23]
    dni = str(parte_numerica) + letra
    return dni

def genera_numero_telefono():
    inicio = random.randint(6,7)
    final = random.randint(10000000, 99999999)
    numero = str(inicio) + str(final)
    return numero

def crear_usuario():
    numero_extraccion = random.randint(0, len(listaNombres)-1)
    nombre = str(listaNombres.pop(numero_extraccion))
    
    numero_extraccion2 = random.randint(0, len(listaApellidos)-1)
    apellido1 = str(listaApellidos[numero_extraccion2])
    
    numero_extraccion3 = random.randint(0, len(listaApellidos)-1)
    apellido2 = str(listaApellidos[numero_extraccion3])

    username = nombre + apellido1 + str(numero_extraccion)
    password = nombre + apellido1 + str(numero_extraccion) + str(numero_extraccion2) +str(numero_extraccion3)
    dni = genera_dni_aleatorio()
    email = nombre + apellido1 + '@gmail.com'
    telefono = genera_numero_telefono()
    nombre_completo = str(nombre + ' ' + apellido1 + ' ' + apellido2)
    
    numero_extraccion4 = random.randint(0, len(listaDirecciones)-1)
    direccion = str(listaDirecciones[numero_extraccion4])

    ID = str(listaRfids.pop(0))

    usuario = [ID, username, password, dni, email, telefono, nombre_completo, direccion]

    return usuario

def crear_lista_usuarios(numero, lista):
    while (numero > 0):
        usuario = crear_usuario()
        lista.append(usuario)
        print (usuario)
        numero -=1
    return lista

def escribir_usuarios(lista):
    salida = open('RUTA', 'w')
    elemento_actual = 0
    for user in lista:
        for atributo in user:
            salida.write(str(atributo))
            print(user.index(atributo))
            if (user.index(atributo) != 7):
                salida.write(', ')
        salida.write('\n')
        salida.write('\n')
    salida.close


#Programa principal
    
numero_usuarios = 22
lista_usuarios = []
escribir_usuarios(crear_lista_usuarios(numero_usuarios, lista_usuarios))




