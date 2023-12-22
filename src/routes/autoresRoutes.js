import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores, paginar);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.put("/autores/:id", AutorController.atualizaAutor);
routes.post("/autores/", AutorController.cadastrarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

export default routes;