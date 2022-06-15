const express = require('express');
const router = express.Router();

const users = require('../controllers/user.controller');

//Obtener todos los usuarios
router.get('/',users.getUsers);

//agregar usuario
router.post('/',users.createUser);

//eliminar usuario
router.delete('/:id',users.deleteUser);

//actualizar usuario
router.put('/:id',users.updateUser);

//obtener un usuario
router.get('/:id',users.getUser);

module.exports = router;