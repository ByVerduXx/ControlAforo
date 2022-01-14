import random
import datetime


def gen_fecha():
    f = open ("log.txt","a")
    f.write("INSERT INTO log (id_usuario, entrada, salida) VALUES \n")
    for i in range (10,13):
        if i == 10 or i == 12:
            for j in range (1,32):
                for k in range (1,13):
                    hora_entrada = datetime.datetime(2021,i,j,random.randint(9,13),random.randint(0,59),random.randint(0,59))
                    hora_salida = hora_entrada + datetime.timedelta(hours=random.randint(4,8))
                    while hora_salida.hour>21 or hora_salida.day != hora_entrada.day:
                        hora_salida = hora_entrada + datetime.timedelta(hours=random.randint(4,8))
                    f.write("(")
                    f.write("'")    
                    f.write(str(k))
                    f.write("'")
                    f.write(",\t")
                    f.write("'")
                    f.write(str(hora_entrada)) 
                    f.write("'")
                    f.write(",\t")
                    f.write("'")
                    f.write(str(hora_salida))
                    f.write("'")
                    f.write("),")
                    f.write("\n")

        else:
            for j in range(1,31):
                for k in range (1,13):
                    hora_entrada = datetime.datetime(2021,i,j,random.randint(9,13),random.randint(0,59),random.randint(0,59))
                    hora_salida = hora_entrada + datetime.timedelta(hours=random.randint(4,8))
                    while hora_salida.hour>21 or hora_salida.day != hora_entrada.day:
                        hora_salida = hora_entrada + datetime.timedelta(hours=random.randint(4,8))
                    f.write("(")
                    f.write("'")    
                    f.write(str(k))
                    f.write("'")
                    f.write(",\t")
                    f.write("'")
                    f.write(str(hora_entrada)) 
                    f.write("'")
                    f.write(",\t")
                    f.write("'")
                    f.write(str(hora_salida))
                    f.write("'")
                    f.write(")")
                    f.write("\n")
    f.write(";")
    f.close()
    return

gen_fecha()