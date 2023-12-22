import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (e) => {
  console.error("Erro de conexão: ", e);
});

conexao.once("open", () => {
  console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();
app.use(express.json());
routes(app);
app.use(manipulador404);
app.use(manipuladorDeErros);
export default app;
