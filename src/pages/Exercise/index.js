import { Button, Tabs } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AutomataBuilder from "../../components/Builder";
import {
  AutomataDescriptionSidebar
} from "../../components/Builder/AutomataDescriptionSidebar";
import {
  SubmissionResultModal
} from "../../components/Exercises/SubmissionResultModal";
import { SubmissionStatus } from "../../enums/ExerciseSubmission";
import { TestsService } from "../../service/tests.service";
import "./index.css";

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const [graph, setGraph] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const { data, isLoading } = useQuery(["exercise", exerciseId], () =>
    TestsService.fetchTestById({ exerciseId })
  );

  // For MVP propuses, we're going to take exercises as single automatas
  const automataData = !isLoading ? data.automatas?.[0] : undefined;

  console.log(data);

  async function handleSubmitTestAnswer() {
    setSubmissionStatus(SubmissionStatus.loading);
    const response = await TestsService.submitAnswer({
      exerciseId,
      answer: { [automataData.id]: {} },
    });
    const feedback = response.feedback[automataData.id];

    if (feedback) setSubmissionStatus(SubmissionStatus.correct);
    else setSubmissionStatus(SubmissionStatus.incorrect);
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
                authorName={automataData?.id}
              />
            </Tabs.Item>
          ) : (
            <></>
          )}
        </AutomataBuilder>
      </div>

      <SubmissionResultModal
        status={submissionStatus}
        show={submissionStatus}
        isRetryable={automataData?.isRetryable}
        onClose={() => setSubmissionStatus(null)}
      />
    </div>
  );
};

export default ExercisePage;
