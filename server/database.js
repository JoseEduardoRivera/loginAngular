const mongoose =require ('mongoose');//modulo para conectar nodejs con mongoodb

//configuramos los parametros de la base de datos
url = 'mongodb://localhost/empreados';
dbparams = {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
};

mongoose.connect(url)
        .then( db => console.log("BD esta conectada"))
        .catch(err => console.log(err));

module.exports = mongoose;