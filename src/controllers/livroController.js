import { autor, livro } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  }
  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (autorEncontrado !== null) {
        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({
          message: "Criado com sucesso!",
          livro: livroCriado,
        });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizaLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
      res.status(200).json({ message: "Livro atualizado." });
    } catch (erro) {
      next(erro);
    }
  }
  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id, req.body);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
      res.status(200).json({ message: "Livro excluído." });
    } catch (erro) {
      next(erro);
    }
  }
  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = livro.find(busca).populate("autor");
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};
  const regex = new RegExp(editora, "i");
  if (editora) busca.editora = regex;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autorRegex = new RegExp(nomeAutor, "i");
    const autorEncontrado = await autor.find({ nome: autorRegex });
    if (autorEncontrado !== null) {
      busca.autor = autorEncontrado;
    } else {
      busca = null;
    }

    return busca;
  }
}

export default LivroController;
