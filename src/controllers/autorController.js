import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find();
      req.resultado = listaAutores;
      next();
    } catch (erro) {
      next(erro);
    }
  }
  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({
        message: "Criado com sucesso!",
        autores: novoAutor,
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizaAutor(req, res, next) {
    try {
      const id = req.params.id;

      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: "Autor atualizado." });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id, req.body);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: "Autor excluído." });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
