const express = require('express');//permite crear servidor web
const morgan = require ('morgan');//permite ver las peticiones del usuario en el servidor
const cors = require('cors');//permite comunicacion fuera del servidor
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const authorization = require ('auth-header');

const Users = require('./models/Users');
const app = express();
const {mongoose} = require("./database");

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('secret','my_secret_1357');


//Middleware - capas intermedias para conectar nuestra aplicacion
app.use(express.json());   //permite interpretar respuestas json dentro del servidor
app.use(express.urlencoded({ extended: true })); //Para recibir los datos del formulario en texto
app.use(morgan('dev'));     //solo se carga en desarrollo
app.use(cors());

//ruta para iniciar sesion en la api
app.post('/api/login',async(req,res)=>{
    const email = req.body.email;
    const passwd = req.body.password;
    return new Promise((resolve,reject)=>{
        Users.findOne({email:email})
            .then ((user)=>{
                if(!user){
                    res.json({success:false,message:'Usuario no encontrado'})

                }else{
                    if(bcrypt.compareSync(passwd, user.password)){
                        const expire = 3600;
                        const token = jwt.sign(
                            {user},
                            app.get('secret'),
                            {expiresIn:expire}
                        )
                        res.json({
                            success:true,
                            token:token
                        })
                    }else{
                        res.json({success:false,message:'Password no coincide'})
                    }
                }
            })
    })
});
/*
app.use((request,response,next)=>{
    var tokenauth = '';
    if (request.get('authorization')){
        auth = authorization.parse(request.get('authorization'));
        if(auth.scheme == 'token-auth')
        tokenauth = auth.token;
    }
    const token = request.body.token ||
                  request.query.token ||
                  tokenauth;
    if(token){
        jwt.verify(token,request.app.get('secret'), (err, decoded)=>{
            if(err){
                return response.json({success:false,message:'fallo de autenticacion'})
                
            }else{
                request.decoded = decoded;
                next();
            }
        })
    }else{
        return response.status(403).send({
            success: false,
            message: 'el token no existe'
        })
    }
});*/



//Rutas del servidor
app.use('/api/empleados',require('./routes/empleados.routes'));//http://localhost:3000/api/empleados
app.use('/api/users',require('./routes/users.routes'));


//Iniciar el servidor
app.listen(app.get('port'), ()=>{
    console.log("Servidor corriendo | Localhost:"+app.get('port'));
});

