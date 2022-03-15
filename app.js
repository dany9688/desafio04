const express = require('express')
const { Router } = express
const app = express()
const router = Router()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/static', express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

let productos = [{
            title: "Libro",
            price: 15,
            thumbnail: "www.google.com",
            id: 0
        },
        {
            title: "Carpeta",
            price: 153,
            thumbnail: "www.google.com.ar",
            id: 1
    }]

//VER TODOS LOS PRODUCTOS
router.get('/productos', (req, res) => {res.send(productos)})

//NUEVO PRODUCTO
router.post('/productos',(req, res) => {
    let productosById = productos.sort((a, b) => a.id - b.id)
    const ultimoProducto = productosById[productosById.length - 1]
    const nuevoProducto = {title: req.body.title, price: req.body.price, thumbnail: parseInt(req.body.thumbnail), id: ultimoProducto.id + 1}
    productos.push(nuevoProducto)
    res.send(productos)
})

//VER PRODUCTO POR ID
router.get('/productos/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.send({error: 'El parámetro no es un número'})
        return
    }
    const id = parseInt(req.params.id);
    let productoById = productos.find(product => product.id == id );
    if(!productoById) {
        res.send({error: 'El producto no existe'})
        return
    }
    res.send(productoById)
})

//EDITAR PRODUCTO POR ID
router.put('/productos/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.send({error: 'El parámetro no es un número'})
        return
    }
    const id = parseInt(req.params.id);
    let productoById = productos.find(product => product.id == id );
    if(!productoById) {
        res.send({error: 'El producto no existe'})
        return
    }
    let pos = productos.indexOf(productoById)
    productoEdit = {title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: id}
    productos[pos] = productoEdit
    res.send(productos)
})

//ELIMINAR PRODUCTO POR ID
router.delete('/productos/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.send({error: 'El parámetro no es un número'})
        return
    }
    const id = parseInt(req.params.id);
    let productoById = productos.find(product => product.id == id );
    if(!productoById) {
        res.send({error: 'El producto no existe'})
        return
    }
    let pos = productos.indexOf(productoById)
    productos = productos.splice(pos - 1, 1)
    console.log(pos)
    console.log(productos)
    res.send(productos)
})

// FORMULARIO NUEVO PRODUCTO
router.get('/nuevoproducto', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

