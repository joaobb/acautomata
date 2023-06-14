import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoadingEllipsis } from "../Loading/Ellipsis";
import React from "react";

interface SubmissionResultModalProps {
  status: string | null;
  show: boolean;
  isRetryable?: boolean;
  onClose(): void;
}

const SubmissionResultModal: React.FC<SubmissionResultModalProps> = ({
  status,
  show,
  isRetryable,
  onClose,
}) => {
  const statusComponent = {
    confirmSubmission: {
      icon: (
        <ExclamationCircleIcon className={"w-20 h-20 inline text-red-400"} />
      ),
      text: (
        <div className={"text-gray-500 dark:text-gray-100"}>
          <strong className="block text-3xl font-bold">Atenção!</strong>
          <strong className="block text-xl font-semibold mt-2">
            Este exercício permite apenas uma submissão!
          </strong>
        </div>
      ),
      action: (
        <div className={"flex gap-4 w-full"}>
          <Button
            type="button"
            color={"light"}
            className={"flex-grow"}
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button type="button" className={"flex-grow"}>
            Submeter
          </Button>
        </div>
      ),
    },
    loading: {
      icon: (
        <div className={"w-20 h-20 flex"}>
          <LoadingEllipsis className={"my-auto"} />
        </div>
      ),
      text: (
        <div className={"text-gray-500 dark:text-gray-100"}>
          <strong className="block text-xl font-bold">
            Submetendo resposta...
          </strong>
          <small>Aguarde um instante</small>
        </div>
      ),
    },
    correct: {
      icon: <CheckCircleIcon className={"w-20 h-20 inline text-green-400"} />,
      text: (
        <div className={"text-gray-500 dark:text-gray-100"}>
          <strong className="block text-xl font-bold">
            Parabéns! Resposta correta 😁
          </strong>
          <small>O autômato aceita a linguagem requisitada</small>
        </div>
      ),
      action: (
        <Link to={"/exercises"} className={"mx-auto"}>
          <Button type={"button"}>Voltar para exercícios</Button>
        </Link>
      ),
    },
    incorrect: {
      icon: <XCircleIcon className={"w-20 h-20 inline text-red-400"} />,
      text: (
        <div className={"text-gray-500 dark:text-gray-100"}>
          <strong className="block  text-xl font-bold text-gray-300 dark:text-gray-400">
            Ops! Resposta incorreta 🙁
          </strong>
          <small>O autômato não aceita a linguagem requisitada</small>
        </div>
      ),
      action: (
        <>
          <Link to={"/exercises"} className={"mx-auto"}>
            <Button type={"button"} color={"light"}>
              Voltar para exercícios
            </Button>
          </Link>

          <Button
            type={"button"}
            className={"mx-auto"}
            title={
              !isRetryable
                ? "Este exercício não permite retentativas"
                : "Tentar novamente"
            }
            disabled={!isRetryable}
            onClick={isRetryable ? onClose : undefined}
          >
            Tentar novamente
          </Button>
        </>
      ),
    },
  }[status!];

  return (
    <Modal show={show} onClose={onClose} popup size="md">
      <Modal.Header />
      <Modal.Body className={"py-0"}>
        <div className="flex flex-col gap-4 items-center text-center">
          {statusComponent?.icon}
          {statusComponent?.text}
        </div>
      </Modal.Body>

      <Modal.Footer>{statusComponent?.action}</Modal.Footer>
    </Modal>
  );
};

export { SubmissionResultModal };
