# EXAMEN MERCADOLIBRE

Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar
contra los X-Men.
Te ha contratado a ti para que desarrolles un proyecto que detecte si un
humano es mutante basándose en su secuencia de ADN.
Para eso te ha pedido crear un programa con un método o función con la siguiente firma (En
alguno de los siguiente lenguajes: Java / Golang / C-C++ / Javascript (node) / Python / Ruby)

    boolean isMutant(String[] dna); // Ejemplo Java
En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla
de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las
cuales representa cada base nitrogenada del ADN.


# REQUERIMIENTOS 

node v12.13.1

MongoDB 4.2.6 Enterprise

# DEPENDENCIAS DESTACADAS

- Express

Express.js, o simplemente Express, es un marco de aplicación web para Node.js, lanzado como software gratuito y de código abierto bajo la Licencia MIT. Está diseñado para crear aplicaciones web y API. Se le ha llamado el marco de servidor estándar de facto para Node.js. 

- mongodb

MongoDB es una base de datos distribuida, basada en documentos y de uso general que ha sido diseñada para desarrolladores de aplicaciones modernas y para la era de la nube.

- mongoose

 Mongoose es un marco de JavaScript que se usa comúnmente en una aplicación Node.js con una base de datos MongoDB

# ESTRUCTURA DEL PROYECTO

```
dump\
 |--mutantdb\       # Dump Database
src\
 |--controllers\    # Route controllers 
 |--models\         # Mongoose models 
 |--routes\         # Routes
 |--services\       # Business logic 
 |--database.js     # Database connect
 |--server.js       # Express app
 |--index.js        # App entry point
test\
 |--mutant.js       # Mutant test
 |--stats.js        # Stats test
 .env               # Config
```

# BASE DE DATOS

Se utilizo MongoDB y el dump de la base de datos se encuentra en :

```
dump\mutantdb
```

El proyecto esta configurado para trabajar con la base de datos que se encuentra en el cluster de  MongoDB:

```
mongodb+srv://meli:<password>@cluster0-j336h.mongodb.net/mutantdb?retryWrites=true&w=majority
```

# INSTALACION

### Clonar el repositorio 

```bash
git clone https://git.heroku.com/app-mutant-meli.git
```
### Ingresar al directorio

```bash
cd app-mutant-meli
```
### Instalar las dependencias

```bash
npm install
```

## CONFIGURACION DE VARIABLES DE ENTORNO

Se creo el file de configuracion .env con los siguientes parametros:
```
- DB_CONNECTION: Uri de Base de datos

- SEQUENCE_LENGTH: Número de secuencias para que sea mutante, en este caso son 4 pero es parametrizable

- SEQUENCES_FOR_POSITIVE: Número de casos positivos  para que sea mutante, en este caso son 2 pero es parametrizable

- PORT: Puerto local

- POSSIBLE_LETTERS: Caracteres validos de ADN en este caso son  ACGT
```
Los mismos parametros estan configurados en los settings de heroku para que funcione correctamente en el host.

## Ejecucion local

Para ejecutar el proyecto localmente ejecutar el siguiente comando:

```bash
npm run dev
```

Para crear un build del proyecto ejecutar  el  siguiente comando:

```bash
npm run start 
```

Para ejecutar el build:

```bash
npm run start 
```

## HOST UTILIZADO

Los fuentes se encuentran hosteados en HEROKU


# ESTRATEGIA ALGORITMO

El algoritmo utilizado para la busqueda de secuencias de ADN mutantes funciona de la siguiente manera:

- Se creo una variable global Sequences que me permite guardar la cantidad de secuencias encontradas, por ejemplo:

```
 {
"dna":["AAAA","TTTT","AAG","TATA" ]
 } 
```

Sequences = 2  

- Recorrer las Filas del Array con la funcion:

```javascript
checkRows();
```
Se recorren todas las filas, se valida si hay letras iguales en cada posicion, en caso de encontrar 4 letras iguales le suma 1 a la variable global Sequences 

- Recorrer las Columnas del Array con la funcion:

```javascript
checkColumns();
```
Se recorren todas las columnas, se valida si hay letras iguales en cada posicion, en caso de encontrar 4 letras iguales le suma 1 a la variable global Sequences 

- Recorrer las Diagonales Inferiorers del Array con la funcion: 

```javascript
checkDownFowardDiagonals();
```
Se recorren las diagonales inferiores, se valida si hay letras iguales en cada posicion, en caso de encontrar 4 letras iguales le suma 1 a la variable global Sequences.


- Recorrer las Diagonales Superiores del Array con la funcion:

```javascript
checkUpFowardDiagonals();
```
Se recorren las diagonales superiores, se valida si hay letras iguales en cada posicion, en caso de encontrar 4 letras iguales definidas en el parametro SEQUENCE_LENGTH entonces le suma 1 a la variable global Sequences.

Al final del recorrido de las 4 funciones anteriores se valida si Secuences > SEQUENCES_FOR_POSITIVE entonces es MUTANTE, despues se guarda el registro de ADN en la collection mutant_dnas.

Si al final del recorrido la variable Sequences < SEQUENCES_FOR_POSITIVE entonces es HUMANO, despues se guarda el registro de ADN en la collection human_dnas.


```javascript

exports.isMutant = async function (reqDna) {
  Sequences = 0;	
  consecutive = 0;
  dna = reqDna;
  await checkRows();
  await checkColumns();
  await checkDownFowardDiagonals();
  await checkUpFowardDiagonals();

  return Sequences>=process.env.SEQUENCES_FOR_POSITIVE;

};

```


Por otro lado previamente se valida que el ARRAY enviando por POST sea de N x N y que los carateres cumplan con los caracteres validos definidos en el parametro POSSIBLE_LETTERS , en este caso ACGT, el programa se puede manipular para funcione con cualquier set de caracteres  por ejemplo DFYU.

# REPOSITORIO

Para garantizar el correcto deploy se dejan los fuentes en el git de Heroku:

```
https://git.heroku.com/app-mutant-meli.git
```


# ENDPOINTS

Se adjunta el proyecto POSTMAN configurado con los 2 endpoints
```
Mutantes.postman_collection.json
```
### POST DNA Humano

```bash
POST → https://app-mutant-meli.herokuapp.com/api/v1/mutant
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```

### GET Estadisticas

```bash
GET → https://app-mutant-meli.herokuapp.com/api/v1/stats
```

## DELETE Mutantes y Humanos

Antes de ejecutar los test recomiendo reiniciar las tablas ya que no se permite crear dna repetidos , para esto pueden ejecutar el siguiente comando:

```bash
npm run startdb
```

# TEST DE INTEGRACION

MOCHA Y CHAI

- MOCHA es un framework de pruebas para Node JS que puede ejecutarse desde la consola o desde un navegador. Como su propia web indica, permite realizar pruebas asíncronas de manera sencilla y divertida. Al ejecutar los test, permite la presentación de informes flexibles y precisos.

- CHAI es una librería de aserciones BDD/TDD para Node JS y navegador, que puede ser armónicamente emparejado con cualquier framework Javascript.

- Chai HTTP es una extensión de la librería CHAI, que permite realizar pruebas de integración con llamadas HTTP utilizando las aserciones de CHAI y todos los métodos de HTTP: GET, POST, PUT, DELETE, PATCH…

Recomendable borrar los datos de las colecciones:

```bash
npm run startdb
```
Ejecutar test:

```bash
npm run test
```

Los siguientes arrays estan reservados para los test:

```bash
  POST /api/v1/mutant:
  
    √ ES HUMANO 403-FORBIDDEN (430ms)

{"dna":["AGAG","TATA","AGAG","TATA"]}

    √ ES HUMANO 403-FORBIDDEN (353ms)

{"dna":["AGAGT","TATAA","AGAGA","TATGG","AGAGA"]}

    √ ES HUMANO PERO EXISTE EN LA BASE DE DATOS 403-FORBIDDEN (185ms)

{"dna":["AGAG","TATA","AGAG","TATA" ]}

    √ ES HUMANO PERO EXISTE EN LA BASE DE DATOS 403-FORBIDDEN (186ms)

{"dna":["AGAGT","TATAA","AGAGA","TATGG","AGAGA"]}

    √ ES MUTANTE 200-OK 

{"dna":["AGAA","TATA","AGAA","TATA"] }

    √ ES MUTANTE 200-OK 

{"dna":["AGAAA","TATAA","AGAAG","TATAA","AGAGT"] }

    √ ES MUTANTE 200-OK

{"dna":["AGAAA","TATAA","TGAAG","TATAA","AGAGT"] }

    √ ES MUTANTE 200-OK (10*10)

{"dna":["AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","GGGGGGGGGG"] }

    √ ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK 

{"dna":["AGAA","TATA","AGAA","TATA"] }

    √ ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK

{"dna":["AGAAA","TATAA","AGAAG","TATAA","AGAGT"] }

    √ ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK

{"dna":["AGAAA","TATAA","TGAAG","TATAA","AGAGT"] }

    √ ES MUTANTE PERO EXISTE EN LA BASE DE DATOS 200-OK (10*10)

{"dna":["AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","TTTTTTTTTT","GGGGGGGGGG","CCCCCCCCCC","AAAAAAAAAA","GGGGGGGGGG"] }

    √ Error LETRA-INVALIDA (S) 400

{"dna":["SGAA","TATA","AGAA","TATA"] }

    √ Error LETRA-INVALIDA (D) 400

{"dna":["AGAA","TATA","DGAA","TATA"] }

    √ Error ARRAY-INVALIDO 400

{"dna":["AGA","TATA","DGAA","TATA"]}

    √ Error ARRAY-INVALIDO 400

{"dna":["AGAA","TATA","DGAA"]}


  GET /api/v1/stats

    √ ESTADISTICAS 

```