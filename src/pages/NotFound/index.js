import BaseButton from "../../components/Base/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex items-center gap-6"}>
        <span
          className={
            "text-8xl font-black text-indigo-700 border-r border-gray-500 pr-6"
          }
        >
          404
        </span>
        <div>
          <h1 className={"text-4xl font-black text-gray-700"}>
            Ops! Estado lixo
          </h1>
          <p>
            Página não encontrada. Verifique a barra de endereço e tente
            novamente
          </p>
        </div>
      </div>
      <div>
        <BaseButton as={Link} to={"/"} className={"mr-4"}>
          Ir para sandbox
        </BaseButton>
        <BaseButton as={Link} to={"/exercises"}>
          Ir para exercícios
        </BaseButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
