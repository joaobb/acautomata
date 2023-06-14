import { Button, Tabs } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AutomataBuilder from "../../components/Builder";
import { AutomataDescriptionSidebar } from "../../components/Builder/AutomataDescriptionSidebar";
import { SubmissionResultModal } from "../../components/Exercises/SubmissionResultModal";
import { SubmissionStatus } from "../../enums/ExerciseSubmission";
import { TestsService } from "../../service/tests.service";
import "./index.css";
import { AntvG6Utils } from "../../utils/AntvG6";
import { Graph, GraphData } from "@antv/g6";

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const parsedExerciseId = Number(exerciseId);

  const { data, isLoading } = useQuery(["exercise", exerciseId], {
    queryFn: () => TestsService.fetchTestById({ exerciseId: parsedExerciseId }),
    refetchOnWindowFocus: false,
  });

  // For MVP propuses, we're going to take exercises as single automatas
  const automataData = !isLoading ? data.automatas?.[0] : undefined;

  async function handleSubmitTestAnswer() {
    try {
      setSubmissionStatus(SubmissionStatus.loading);

      const automataPayload = graph?.save() as GraphData;
      if (!automataPayload) throw new Error("Erro ao salvar automato");
      const automata = AntvG6Utils.parseSave(automataPayload);
      const response = await TestsService.submitAnswer({
        exerciseId: parsedExerciseId,
        answer: { [automataData.id]: automata },
      });
      const feedback = response.feedback[automataData.id];

      if (feedback) setSubmissionStatus(SubmissionStatus.correct);
      else setSubmissionStatus(SubmissionStatus.incorrect);
    } catch (error) {
      setSubmissionStatus(null);
      toast.error("Ops! Ocorreu um erro ao submeter exercício!");
    }
  }

  function clearAutomata() {
    graph?.data({ nodes: [], edges: [] });
    graph?.render();
  }

  return (
    <div className="exercise__container bg-gray-600">
      <div className={"py-6 px-10 rounded-lg"}>
        <header className={"bg-gray-300 py-2 rounded-t-lg"}>
          <div className={"main flex justify-between items-center mx-auto"}>
            <div className={"sandbox-header__right"}>
              <span className={"text-lg font-bold"}>{automataData?.name}</span>
            </div>

            <div className={"sandbox-header__right flex gap-4"}>
              <Button
                color={"failure"}
                className={"font-bold"}
                onClick={clearAutomata}
              >
                Limpar autômato
              </Button>
              <Button className={"font-bold"} onClick={handleSubmitTestAnswer}>
                Enviar resposta
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
          {!isLoading ? (
            <Tabs.Item title="Automato">
              <AutomataDescriptionSidebar
                description={automataData?.description}
                authorName={automataData?.authorName}
              />
            </Tabs.Item>
          ) : (
            <></>
          )}
        </AutomataBuilder>
      </div>

      <SubmissionResultModal
        status={submissionStatus}
        show={Boolean(submissionStatus)}
        isRetryable={automataData?.isRetryable ?? true}
        onClose={() => setSubmissionStatus(null)}
      />
    </div>
  );
};

export default ExercisePage;
