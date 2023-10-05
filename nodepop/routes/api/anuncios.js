const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /api/agentes
// Devuelve una lista de agentes

/**
 * @openapi
 * /appi/agentes:
 *  get:
 *      description: devuelve una lista de agentes
 *      responses:
 *        200:
 *          description: Devuelve JSON
 */


router.get('/', async (req, res, next) =>{
  try{
    const filtroByTag = req.query.tags;
  
    const filtroByVenta = req.query.venta;
  
    const filtroByPrecio = req.query.precio;
  
    const filtroByNombre = req.query.nombre;

    const skip = req.query.skip;
    const limite = req.query.limit;
    const ordenacion = req.query.sort;
    const agrupacion = req.query.fields;

    const filtro = {};
    if (filtroByNombre) {
      filtro.nombre =   {$regex: '.*' + filtroByNombre + '.*' };
    }
    if (filtroByTag) {
      filtro.tags = filtroByTag;
    }

    if(filtroByVenta) {
      filtro.venta = filtroByVenta;
    }

    if(filtroByPrecio){
      if(!filtroByPrecio.includes('-')){
        filtro.precio = filtroByPrecio;
      // } else if(filtroByPrecio.charAt(0) === '-') {
      //    filtro.precio = {$lte: filtroByPrecio.substring(1, filtroByPrecio.length)};
      // } else if(filtroByPrecio.charAt(filtroByPrecio.length - 1) === '-'){
      //   console.log({$gte: filtroByPrecio.substring(0, filtroByPrecio.length)});
      //   filtro.precio = {$gte: filtroByPrecio.substring(0, filtroByPrecio.length - 1 )};
      } else {
        let precioArr = filtroByPrecio.split('-');
        console.log(precioArr);
        if(filtroByPrecio.charAt(0) === '-') {
          filtro.precio = {$lte: precioArr[0]};
        } else if(filtroByPrecio.charAt(filtroByPrecio.length - 1) === '-') {
          filtro.precio = {$gte: precioArr[0]};
        } else {
          filtro.precio = {$gte: precioArr[0], $lte: precioArr[1]};          
        }
      }
    }
    console.log(filtro.precio);

    // if (filtroByPrecio) {
    //   if (filtroByPrecio.includes('-')){
    //     let precioArr = filtroByPrecio.split('-');
    //     filtro.precio = {};
    //     if (precioArr[0]){
    //       filtro.precio['$gte'] = precioArr[0];
    //     }
    //     if (precioArr[1]){
    //       filtro.precio['$lte'] = precioArr[1];
    //     }
    //   }else{
    //     filtro.precio = filtroByPrecio;
    //   }
    // }

    const anuncios = await Anuncio.lista(filtro, skip, limite, ordenacion, agrupacion);

    res.json({result: anuncios});
  } catch (error) {
      next(error);
  }

});




module.exports = router;