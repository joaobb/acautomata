import { Button } from "flowbite-react";
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
      <div className={"flex gap-4"}>
        <Link to={"/"}>
          <Button>Ir para sandbox</Button>
        </Link>
        <Link to={"/exercises"}>
          <Button>Ir para exercícios</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
