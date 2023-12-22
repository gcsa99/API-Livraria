import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados inseridos estão incorretos", path) {
    if (path === "_id") {
      super("Id do autor não informado.", 400);
    } else {
      super(mensagem, 400);
    }
  }
}
export default RequisicaoIncorreta;
