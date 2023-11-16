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

//añadir
app.post('/crearmedicamentos', (req, res) => {
    let data = {
        NombreMedicamento: req.body.NombreMedicamento,
        DosisMedicamento: req.body.DosisMedicamento,
        Frecuencia: req.body.Frecuencia,
        DuracionDias: req.body.DuracionDias,
        ComentarioMedicamento: req.body.ComentarioMedicamento,
        MomentoDia: req.body.MomentoDia,
        hora_toma: "TIME(NOW())"
    }
    let sql = "INSERT INTO medicamentos SET ?"
    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error
        } else {
            res.send(results)
        }
    })
})
//tomar medicamento
app.put('/tomarmedicamentos:ID', (req, res) => {
    let id = req.params.ID
    let nombre = req.body.NombreMedicamento
    let dosis = req.body.DosisMedicamento
    let frecuencia = req.body.Frecuencia
    let duracion = req.body.DuracionDias
    let comentario = req.body.ComentarioMedicamento
    let momento = req.body.MomentoDia
    hora_toma = req.body.hora_toma

    let sql = `UPDATE medicamentos SET NombreMedicamento = "Prueba", DosisMedicamento = "700 mg", Frecuencia = "12:00:00", DuracionDias = 39, ComentarioMedicamento = "Otra prueba", MomentoDia = "noche" WHERE ID = 47`
    conexion.query(sql, [nombre, dosis, frecuencia, duracion, comentario, momento, id], function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results)
        }
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
    hora_toma = req.body.hora_toma

    let sql = "UPDATE medicamentos SET NombreMedicamento = ?, DosisMedicamento = ?, Frecuencia = ?, DuracionDias = ?, ComentarioMedicamento = ?, MomentoDia = ? WHERE ID = ?"
    conexion.query(sql, [nombre, dosis, frecuencia, duracion, comentario, momento, id], function (error, results) {
        if (error) {
            throw error;
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
