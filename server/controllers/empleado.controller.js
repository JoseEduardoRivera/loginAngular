const Empleados = require("../models/Empleados");

const empleadoController = {};

//lista de todos los empleados //async=el servidor manda la peticion pero podemos seguir
empleadoController.getEmpleados = async(req, res)=>{
    const empleados = await Empleados.find();
    res.json(empleados);
}//Fin de getEmpleados

empleadoController.createEmpleado = async(req, res)=>{
    //req.body contiene los datos a guardar
    console.log(req.body);
    //res.json("Empleado recibido");
    const empleado = new Empleados({
    nombre : req.body.nombre,
    puesto : req.body.puesto,
    departamento : req.body.departamento,
    salario : req.body.salario
    });
    console.log(empleado);
    await empleado.save()
    res.json({
        'status' : 'Empleado guardado correctamente'
    })
};//fin createEmpleado

//actualizar empleado
empleadoController.updateEmpleado = async(req, res)=>{
    const {id} = req.params;
    const empleado = {
        nombre: req.body.nombre,
        puesto : req.body.puesto,
        departamento : req.body.departamento,
        salario : req.body.salario
    }
    await Empleados.findByIdAndUpdate(id, {$set: empleado},{new: true});
    res.json({status: 'Empleado actualizado correctamente'});
};//fin update empleado

//consulta empleado por ID
empleadoController.getEmpleado = async(req, res)=>{
    //obtener el id de la peticion
    //console.log(req.params);
   // res.json("Recibido");
    const empleado = await Empleados.findById(req.params.id);
    res.json(empleado);
};//fin getEmpleado

//borrar empleado
empleadoController.deleteEmpleado = async(req, res)=>{
    const {id} = req.params;
    await Empleados.findByIdAndDelete(id);
    res.json({status: 'Empleado borrado correctamente'})
};//fin deleteEmpleado

module.exports = empleadoController;