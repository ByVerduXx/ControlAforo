import random

cadena_inicio = "INSERT INTO usuarios VALUES ("
cadena_final = ");"

#Lectura de nombres .txt
nombres = open ('Nombres.txt', 'r')
lecturaNombres = nombres.read()
print(lecturaNombres)
listaNombres = lecturaNombres.split()
nombres.close

#Lectura de RFIDs .txt
rfids = open ('RFIDs.txt', 'r')
lecturaRfids = rfids.read()
print(lecturaRfids)
listaRfids = lecturaRfids.split('\n')
rfids.close

#Lectura de apellidos .txt
apellidos = open ('Apellidos.txt', 'r')
lecturaApellidos = apellidos.read()
print(lecturaApellidos)
listaApellidos = lecturaApellidos.split()
apellidos.close

#Lectura de direcciones .txt
direcciones = open ('Direcciones.txt', 'r')
lecturaDirecciones = direcciones.read()
print(lecturaDirecciones)
listaDirecciones = lecturaDirecciones.split('\n')
direcciones.close

def genera_dni_aleatorio():
    letras_resto_division = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
    digitos = 8
    cifras = ''
    while (digitos>0):
        cifras += str(random.randint(0, 9))
        digitos -= 1
    letra = letras_resto_division[int(cifras)%23]
    dni = cifras + letra
    return str(dni)

def genera_numero_telefono():
    numero = str(random.randint(6,7))
    digitos = 8
    while (digitos > 0):
        numero += str(random.randint(0, 9))
        digitos -= 1
    return str(numero)

def crear_usuario(ids):
    numero_extraccion = random.randint(0, len(listaNombres)-1)
    nombre = str(listaNombres.pop(numero_extraccion))
    
    numero_extraccion2 = random.randint(0, len(listaApellidos)-1)
    apellido1 = str(listaApellidos[numero_extraccion2])
    
    numero_extraccion3 = random.randint(0, len(listaApellidos)-1)
    apellido2 = str(listaApellidos[numero_extraccion3])

    username = nombre + apellido1
    password = nombre + apellido1 + '1234'
    password = password.lower()
    dni = genera_dni_aleatorio()
    email = (nombre + apellido1 + '@gmail.com').lower()
    telefono = genera_numero_telefono()
    nombre_completo = str(nombre + ' ' + apellido1 + ' ' + apellido2)
    
    numero_extraccion4 = random.randint(0, len(listaDirecciones)-1)
    direccion = str(listaDirecciones[numero_extraccion4])

    usuario = ["'"+ids+"'", "'"+username+"'", "'"+password+"'", "'"+dni+"'", "'"+email+"'", "'"+telefono+"'", "'"+nombre_completo+"'", "'"+direccion+"'"]

    return usuario

def crear_lista_usuarios(numero, lista):
    ids = 1
    while (numero > 0):
        usuario = crear_usuario(str(ids))
        lista.append(usuario)
        print (usuario)
        numero -=1
        ids +=1
    return lista

def escribir_usuarios(lista):
    salida = open('Usuarios generados.sql', 'w')
    rfids = open ('Lista RFIDs.txt', 'w')
    salida.write('INSERT INTO oficinas VALUES (1,10);\n')
    salida.write('INSERT INTO oficinas VALUES (2,5);\n')
    salida.write('INSERT INTO oficinas VALUES (3,20);\n')
    salida.write('\n')
    contador = 0
    for user in lista:
        salida.write(cadena_inicio)
        for atributo in user:
            salida.write(str(atributo))
            if (user.index(atributo) != 7):
                salida.write(', ')
        salida.write(cadena_final)
        salida.write('\n')
        salida.write('INSERT INTO rfid VALUES (')
        salida.write(f'"{listaRfids[contador].strip()}",')
        salida.write(', ')
        salida.write(str(user[0]))
        salida.write(', 1);')
        salida.write('\n')
        salida.write('\n')

        rfids.write(f'{listaRfids[contador]} - {user[1]}\n')
        contador += 1
    salida.close
    rfids.close


#Programa principal
    
numero_usuarios = 22
lista_usuarios = []
escribir_usuarios(crear_lista_usuarios(numero_usuarios, lista_usuarios))









