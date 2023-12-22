import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "Nome do livro é obrigatório."],
    },
    editora: {
      type: String,
      required: [true, "Necessário informar a editora."],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido.",
      },
    },
    preco: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 1.0 && valor <= 1000.0;
        },
        message:
          "O valor do livro deve estar entre R$1,00 e R$1000,00. Valor fornecido: {VALUE}",
      },
    },
    paginas: {
      type: Number,
      min: [
        10,
        "O número de páginas deve ser maior que 10. Valor informado: {VALUE}",
      ],
      max: [
        5000,
        "O número paginas deve ser menor que 5000. Valor informado: {VALUE}",
      ],
    },
    autor: autorSchema,
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
