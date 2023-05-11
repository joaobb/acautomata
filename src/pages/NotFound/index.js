import BaseButton from "../../components/Base/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={"page-container flex justify-center items-center"}>
      <div
        className={
          "flex flex-col justify-center items-center bg-gray-700 py-8 w-full"
        }
      >
        <div className={"flex items-center gap-6"}>
          <span
            className={
              "text-8xl font-black text-primary-700 border-r border-gray-500 pr-6"
            }
          >
            404
          </span>
          <div>
            <h1 className={"text-4xl font-black text-primary-600"}>
              Ops! Estado lixo
            </h1>
            <p className={"text-primary-600"}>
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
    </div>
  );
};

export default NotFoundPage;
