const express = require ('express');
const router = express.Router();

//Importamos las funciones del controlador
const empleados = require('../controllers/empleado.controller');
//CRUD DE EMPLEADOS*************************************************************************

//cuando el usuario pida /api/empleados/ se ejecuta la funcion del controlador
// http://localhost:3000?api/empleados
//solicitar todos los empleados <--- select * from empleados
router.get('/',empleados.getEmpleados);

//crear empleados
router.post('/',empleados.createEmpleado);

//obtener un elpleado
router.get('/:id',empleados.getEmpleado);

//actualizar un empleado
router.put('/:id', empleados.updateEmpleado);

//eliminar un empleado
router.delete('/:id', empleados.deleteEmpleado);
module.exports = router;