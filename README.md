# Welcome to the challenge 

>This challenge was split in two (exercises & mini project)

Part 1
1. Diseñar un algoritmo para resolver la problemática de turnos en el
        departamento de urgencias de un hospital, las prioridades son las siguientes:
        ○ Por color, hay tres colores: rojo, naranja y verde, donde el rojo tiene
        más prioridad que el naranja y el naranja más que el verde.
        ○ Por tiempo de llegada, el primero que llega es el primero que atienden,
        pero respetando la prioridad por color, es decir, si un naranja llegó
        antes que un rojo, se atiende primero al rojo.
    Solution:
    
    ```pseudocode
        1 hacer mientras existan pacientes en espera
            1.1 comparar por orden de llegada (primero al ultimo)
                si existe paciente con prioridad == roja
                    que entre paciente con dicha prioridad
                    quitar de la lista
                si existe paciente con prioridad == amarilla
                    que entre paciente con dicha prioridad
                    quitar de la lista                
                sino
                    que entre paciente con prioridad verde
                    quitar de la lista
        salir del hacer mientras

        2 quiere ingresar un paciente a la lista de espera?
            ingresar fecha
            ingresar prioridad
            agregar a paciente en espera
    ```

    
    
    
2. Diseñar un algoritmo que invierta el orden de un arreglo dado con longitud x,
        tratar de hacerlo con los menos pasos posibles.
        ○    Ejemplo de entrada [0,2,4,3,1,5,6,7,8] tendría de salida [8,7,6,5,1,3,4,2,0]
    
    solution:
    
    ```javascript
        let array = [0,2,4,3,1,5,6,7,8]; // arreglo de entrada
        let newArray = [];

        for(let position = 0; position < array.length; position++) {
            newArray[position] = array[array.length - (position + 1)];
        }
    ```
    
3. JS: Explicar brevemente las diferencias entre callback, promesas sin usar el async/await, promesas usando el async/await y observadores.

    answer:
    estos conceptos o funcionalidades son naturalmente asincronos y se utilizan o se pueden utilizar en los mismos eventos, las *callback* son funciones que se utilizan desoues de haber disparado un evento asincrona al igual que los otros (promises & async/await) ejemplo:
        
    ```javascript
        const mongoose = require('mongoose');
        const Store = mongoose.model('Store');

        exports.createStore = (req,res) => {
        const store = newStore(req.body);
        // My callback   
        store.save(function(err, store){
            if(!err){
            res.redirect('/somePath')
            } else {
            res.redirect('/someOtherPath', errors: err)
            }
        })
        }
    ```
    en el ejemplo de arriba se trata de una funcion anonima que va a ser ejecutada una vez que el evento haya sido disparado.
    nota: se vuelve un poco ilegible a  estarlos anidando.

    Las *promises* es basicamente un objeto que se ejecuta despues del evento asincrono aqui podemos identificar de una forma el manejo de errores y se puede evitar mas facil el anidamiento. ejemplo:

    ```javascript

        const mongoose = require('mongoose');
        const Store = mongoose.model('Store');
        const StoreB = mongoose.model('StoreB');

        // Tells package to use es6 promises
        mongoose.Promise = global.Promise;

        exports.createStore = (req, res, next) => {
        const store = new Store(req.body);
        const itemB = StoreB
            .findOne({ id: req.params._id})
            .catch(next);
    ```
    
    en el ejemplo de arriba se muestra una promise, lo cual hace mas facil el manejo del evento icluso se puede ir encadenando despues del catch mas acciones que se deseen realizar con base a esa accion.

    el async/await hace basicamente lo que una promesa pero con una forma de declararlo y ejecutarlo mas secuencial y supuestamente mas limpia, en lo personal me inclino mas hacia las promesas.
    aqui un ejemplo:

    ```javascript
        const mongoose = require('mongoose');
        const Store = mongoose.model('Store');
        const StoreB = mongoose.model('StoreB');

        // Tells package to use es6 promises
        mongoose.Promise = global.Promise

        exports.createStore = async (req, res) => {
        const store = new Store(req.body);
        // I'm await-ed so don't move on until I'm done!  
        const record_we_want_to_associate = await StoreB.findOne({_id: req.params.id});
        store.storeb_id = record_we_want_to_associate._id

        // I'm await-ed so don't move on until I'm done! 
        await store.save();
        res.render('index', { stores: stores });
        };
    ```
    las sintaxis para usarlo basicamente es el async de lado de la funcion y el await en la parte de la promise.

    los ejemplos fueron sacados de esta blog de [medium] (https://medium.com/@ThatGuyTinus/callbacks-vs-promises-vs-async-await-f65ed7c2b9b4) 

Part 2

Crear con nodejs, mongodb y angular 2+ un singin/signup utilizando
tecnologías como mongoose, express, jwt, las características deben ser las
siguientes:
○ Protección de rutas, los usuarios firmados sólo podrán acceder al
“home”, mientras que los no firmados sólo podrán acceder al signin y
signup.
○ Almacenamiento del token por lado del cliente.
○ Si te sientes familiarizado con otra librería puedes usarla, por ejemplo
en vez de express usar sails, hapi o cualquier otra.
○ La entrega del proyecto será por medio de GitHub o similar.

Instruction to run:

``` bash
    challengeApp> node server.js
    challengeApp> ng serve -o
```

### that's it

> Powered By *Gelacio Azael Fernandez Aldava*