import random

def gen_positivos():
    f = open("positivos.sql","w")
    for i in range(1,51):
        usuario = random.randint(1,20)
        fecha = f'{random.choice([2021, 2022])}-{random.randint(1,12)}-{random.randint(1,28)} {random.randint(0,23)}:{random.randint(0,59)}:{random.randint(0,59)}'
        f.write(f"INSERT INTO positivos (id_positivo, fecha_positivo, id_usuario) VALUES ('{i}', '{fecha}', '{usuario}');\n")
    f.close()
    return


if __name__ == "__main__":
    gen_positivos()
    