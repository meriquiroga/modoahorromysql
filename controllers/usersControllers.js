const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

const usersControllers = {
  ingresar: (req, res) => {
    res.render("ingresar", {
      title: "Ingresar",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      objetivo: req.session.objetivo,
      usuarioId: req.session.usuarioId,
    });
  },

  crearCuenta: (req, res) => {
    res.render("crear-cuenta", {
      title: "Crear cuenta",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      objetivo: req.session.objetivo,
      usuarioId: req.session.usuarioId,
    });
  },

  ingresarForm: async (req, res) => {
    const { email, password } = req.body;
    try {
      let usuario = await Usuario.findOne({ 
        where: {
          email }
        });
      if (bcryptjs.compareSync(password, usuario.password)) {
        req.session.logueado = true;
        req.session.name = usuario.name;
        req.session.objetivo = usuario.objetivo;
        req.session.usuarioId = usuario.id;
        return res.redirect("/balance");
      } else {
         return res.render("ingresar", {
          title: "Ingresar",
          error: "E-mail o contraseña incorrectos",
          logueado: req.session.logueado,
          name: req.session.name,
          objetivo: req.session.objetivo,
          usuarioId: req.session.usuarioId,
        });
      }
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


  crearCuentaForm: async (req, res) => {
    const { name, email, password, objetivo } = req.body;
    let hashedPass = bcryptjs.hashSync(password);
    const nuevoUser = await new Usuario({
      name,
      email,
      password: hashedPass,
      objetivo
    });
    try {
      let existeUser = await Usuario.findOne({ 
        where: {
          email }
        });
      if (!existeUser) {
        let agregarUser = await nuevoUser.save();
        req.session.logueado = true;
        req.session.name = agregarUser.name;
        req.session.objetivo = agregarUser.objetivo;
        req.session.usuarioId = agregarUser.id;
        req.session.movimiento = null;
        return res.redirect("/balance");
      } else {
        return res.render("crear-cuenta", {
          title: "Crear cuenta",
          error:
            "E-mail de registro en uso. Por favor, ingresá o creá tu cuenta con uno diferente",
          logueado: req.session.logueado,
          name: req.session.name,
          objetivo: req.session.objetivo,
          usuarioId: req.session.usuarioId,
        });
      }
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

  salir: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },

  editarObjetivo: async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.id);
        res.render("editar-objetivo", {
            title: "Editar objetivo",
            error: null,
            logueado: req.session.logueado,
            name: req.session.name,
            objetivo: usuario.objetivo,
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
  },

  guardarObjetivoEditado: async (req, res) => {
    await Usuario.update({ ...req.body, objetivo: req.body.objetivo}, {
      where: {
        id: req.params.id
      }});
    res.redirect("/balance");
  },
};

module.exports = usersControllers;
