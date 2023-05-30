import { Button, Tabs } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AutomataBuilder from "../../components/Builder";
import { AutomataDescriptionForm } from "../../components/Builder/AutomataDescriptionSidebar/Form";
import { AutomatasService } from "../../service/automatas.service";
import { TestsService } from "../../service/tests.service";
import { AntvG6Utils } from "../../utilts/AntvG6";
import "./index.css";

const ExerciseFormPage = () => {
  const navigate = useNavigate();
  const [graph, setGraph] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmitCreateExercise() {
    const toastId = toast.loading("Criando exercício...");
    try {
      const automata = AntvG6Utils.parseSave(graph.save());

      console.log(automata, title, description);

      const automataCreationResponse = await AutomatasService.createAutomata({
        title,
        description,
        privacy: "public",
        automata,
      });

      if (!automataCreationResponse.id) throw new Error("Autômato não criado");

      await TestsService.createExercise({
        title,
        description,
        automatas: [automataCreationResponse.id],
        privacy: "public",
      });

      toast.success("Exercício criado!", { id: toastId, duration: 5000 });
      navigate("/exercises?filter=authored");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar exercício!\nTente novamente mais tarde",
        {
          id: toastId,
          duration: 5000,
        }
      );
    }
  }

  function clearAutomata() {
    graph.data({ nodes: [], edges: [] });
    graph.render();
  }

  return (
    <div className="exercise__container bg-gray-600">
      <div className={"py-6 px-10 rounded-lg"}>
        <header className={"bg-gray-300 py-2 rounded-t-lg"}>
          <div className={"main flex justify-between items-center mx-auto"}>
            <div className={"sandbox-header__right"}>
              <span className={"text-lg font-bold"}>Novo exercício</span>
            </div>

            <div className={"sandbox-header__right flex gap-4"}>
              <Button
                color={"failure"}
                className={"font-bold"}
                onClick={clearAutomata}
              >
                Limpar autômato
              </Button>
              <Button
                className={"font-bold"}
                onClick={handleSubmitCreateExercise}
              >
                Criar exercício
              </Button>
            </div>
          </div>
        </header>

        <AutomataBuilder
          graph={graph}
          hasHeader
          heightOffset={60}
          onUpdateGraph={setGraph}
        >
          <Tabs.Item title="Automato">
            <AutomataDescriptionForm
              title={title}
              description={description}
              onUpdateTitle={setTitle}
              onUpdateDescription={setDescription}
            />
          </Tabs.Item>
        </AutomataBuilder>
      </div>
    </div>
  );
};

export default ExerciseFormPage;
