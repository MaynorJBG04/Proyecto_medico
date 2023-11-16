//JS para la API

var express = require('express')
var mysql = require('mysql')
var cors = require('cors')

var app = express()
app.use(express.json())
app.use(cors())

//datos para conexion
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdapis'
})
//conexion a la base de datos
conexion.connect(function (error) {
    if (error) {
        throw error
    } else {
        console.log('Conexion exitosa')
    }
})

//muestra  las medicinas
app.get('/vermedicamentos', (req, res) => {
    conexion.query('SELECT * FROM medicamentos', (error, filas) => {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})

//ver 1 medicamento

app.get('/vermedicamentos/:id', (req, res) => {
    conexion.query('SELECT * FROM medicamentos', (error, filas) => {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})


//añadir
app.post('/crearmedicamentos', (req, res) => {
    let data = {
        NombreMedicamento: req.body.NombreMedicamento,
        DosisMedicamento: req.body.DosisMedicamento,
        Frecuencia: req.body.Frecuencia,
        DuracionDias: req.body.DuracionDias,
        ComentarioMedicamento: req.body.ComentarioMedicamento,
        MomentoDia: req.body.MomentoDia,
        hora_toma: req.body.hora_toma
    }
    let sql = "INSERT INTO medicamentos SET ?"
    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error
        }
        const nuevoID = results.insertId;

        // Segunda consulta para actualizar hora_toma
        let sqlUpdate = "UPDATE medicamentos SET hora_toma = TIME(NOW()) WHERE ID = ?";
        conexion.query(sqlUpdate, [nuevoID], function (errorUpdate, resultsUpdate) {
            if (errorUpdate) {
                throw errorUpdate;
            }

            res.send(resultsUpdate);
        });
    })
})

//editar
app.put('/editarmedicamentos:ID', (req, res) => {
    let id = req.params.ID
    let nombre = req.body.NombreMedicamento
    let dosis = req.body.DosisMedicamento
    let frecuencia = req.body.Frecuencia
    let duracion = req.body.DuracionDias
    let comentario = req.body.ComentarioMedicamento
    let momento = req.body.MomentoDia

    let sql = "UPDATE medicamentos SET NombreMedicamento = ?, DosisMedicamento = ?, Frecuencia = ?, DuracionDias = ?, ComentarioMedicamento = ?, MomentoDia = ? WHERE ID = ?"
    conexion.query(sql, [nombre, dosis, frecuencia, duracion, comentario, momento, id], function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results)
        }
    })
})
//Tomar
//Jala desde el SQL, pero aquí no
app.put('/tomarmedicamentos:ID', (req, res) => {
    let id = req.params.ID
    let frecuencia = req.body.Frecuencia
    let hora_toma = req.body.hora_toma

    let sql = `UPDATE medicamentos 
    SET hora_toma = IF((ADDTIME(Frecuencia, TIME(NOW()))) > '24:00:00', 
    SUBTIME(ADDTIME(Frecuencia, TIME(NOW())), '24:00:00'), ADDTIME(Frecuencia, TIME(NOW()))) 
    WHERE ID = 9`

    conexion, query(sql, [id, frecuencia, hora_toma], function (error, results) {
        if (error) {
            throw error
        } else {
            res.send(results)
        }
    })
})
//eliminar
app.delete('/eliminarmedicamentos/:ID', (req, res) => {
    conexion.query("DELETE FROM medicamentos WHERE id = ?", [req.params.ID], function (error, filas) {
        if (error) {
            throw error;
        } else {
            res.send(filas)
        }
    })
})

app.get('/', function (req, res) {
    res.send('Ruta de inicio')
}
)
app.listen('3000', function () {
    console.log('Sevidor en el 3000')
})

