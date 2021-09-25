const path = require("path");
const Movimiento = require("../models/Movimiento");
const Usuario = require("../models/Usuario");

const movimientosControllers = {
  home: (req, res) => {
    res.render("index", {
      title: "Home",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      objetivo: req.session.objetivo,
      usuarioId: req.session.usuarioId,
    });
  },

  error: (req, res) => {
    res.render("error", {
      title: "Hubo un error",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      objetivo: req.session.objetivo,
      usuarioId: req.session.usuarioId,
    });
  },

  balance: async (req, res) => {
    if (req.session.logueado) {
      try {
        let usuario = await Usuario.findOne({ 
          where: {
            id: req.session.usuarioId }
          });
        req.session.objetivo = usuario.objetivo;
        
        const movimientos = await Movimiento.findAll({
          where: {
          usuarioId: req.session.usuarioId,
          }
        });
        
        return res.render("balance", {
          title: "Balance",
          movimientos,
          error: null,
          logueado: req.session.logueado,
          name: req.session.name,
          objetivo: req.session.objetivo,
          usuarioId: req.session.usuarioId,
        });
      } catch (error) {
        res.render("error", {
          title: "Hubo un error",
          error: error,
          logueado: req.session.logueado,
          name: req.session.name,
          objetivo: req.session.objetivo,
          usuarioId: req.session.usuarioId,
        });
      }
    }
    return res.redirect("/crear-cuenta");
  },

  guardarMovimiento: async (req, res) => {
    const { date, description, number, usuarioId } = req.body;
    let newMovimiento = new Movimiento({
      date,
      description,
      number,
      usuarioId,
    });
    try {
      await newMovimiento.save();
      res.redirect("/balance");
      
    } catch (error) {
      res.render("error", {
        title: "Hubo un error",
        error: error,
        logueado: req.session.logueado,
        name: req.session.name,
        objetivo: req.session.objetivo,
        usuarioId: req.session.usuarioId,
      });
    }
  },

  eliminar: async (req, res) => {
    let movaborrar = await Movimiento.findByPk(req.params.id)
    await movaborrar.destroy()
    res.redirect("/balance");
  },
  
  editar: async (req, res) => {
    try {
        let movaeditar = await Movimiento.findByPk(req.params.id);
        res.render("editar", {
            title: "Editar movimiento",
            error: null,
            logueado: req.session.logueado,
            name: req.session.name,
            objetivo: req.session.objetivo,
            usuarioId: req.session.usuarioId,
            movimientoId: req.params.id,
            movimiento: movaeditar
       });
    } catch (error) {
      res.render("error", {
        title: "Hubo un error",
        error: error,
        logueado: req.session.logueado,
        name: req.session.name,
        objetivo: req.session.objetivo,
        usuarioId: req.session.usuarioId,
      });
    }
  },

  guardarEditado: async (req, res) => {
    console.log(req.body)
    await Movimiento.update({ ...req.body, description:req.body.description, number:req.body.number }, { 
      where: {
        id: req.params.id 
    }});
    res.redirect("/balance");
  },

};

module.exports = movimientosControllers;
