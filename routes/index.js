const express = require('express')
const router = express.Router()
const movimientosControllers = require('../controllers/controllers')
const usersControllers = require('../controllers/usersControllers')

router.route('/')
.get(movimientosControllers.home)

router.route('/error')
.get(movimientosControllers.error)

router.route('/balance')
.get(movimientosControllers.balance)
.post(movimientosControllers.guardarMovimiento)

router.route('/editar/:_id')
.get(movimientosControllers.editar)
.post(movimientosControllers.guardarEditado)

router.route('/editar-objetivo/:_id')
.get(usersControllers.editarObjetivo)
.post(usersControllers.guardarObjetivoEditado)

router.route('/eliminar/:_id')
.get(movimientosControllers.eliminar)

router.route('/ingresar')
.get(usersControllers.ingresar)
.post(usersControllers.ingresarForm)

router.route('/crear-cuenta')
.get(usersControllers.crearCuenta)
.post(usersControllers.crearCuentaForm)

router.route('/salir')
.get(usersControllers.salir)

module.exports = router