const mongoose = require('mongoose');

// definir el esquema de los agentes
const anuncioSchema = mongoose.Schema({
  nombre: {type: String, index: true },
  venta: {type: Boolean, index: true },
  precio: {type: Number, index: true },
  foto: {type: String},
  tags: [{type: String }]
}, {
 // collection: 'agentes' // para forzar un nombre en concreto en la base de datos
});

// Tipos de métodos:
// - Estatico: método que esta en el modelo (p.e. Agente.lista())
// - De instancia: metodo que tienen las instancias (p.e. agente.saluda())

anuncioSchema.statics.listaSimple = function() {
  const query = Anuncio.find(); // devuelve un objeto de tipo query que es un thenable
  return query.exec();
}

anuncioSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro); // devuelve un objeto de tipo query que es un thenable
  //const query = Anuncio.find({precio: { '$gte': '1000' }});
  console.log(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo de agente
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo de agente (opcional)
module.exports = Anuncio;


