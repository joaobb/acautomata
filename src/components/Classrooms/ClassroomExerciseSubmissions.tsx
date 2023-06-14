import {
  CheckCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Table } from "flowbite-react";
import { useQuery } from "react-query";
import { TestsService } from "../../service/tests.service";
import { formatDateTime } from "../../utils/formatDate";
import React from "react";
import { ExerciseSubmission } from "../../interfaces/exercise";

interface ClassroomExerciseSubmissionsProps {
  exerciseId: number;
  hasSubmissions: boolean;
}

export const ClassroomExerciseSubmissions: React.FC<
  ClassroomExerciseSubmissionsProps
> = ({ exerciseId, hasSubmissions }) => {
  const gradeIcon: { [grade: number | string]: React.ReactNode } = {
    0: <XCircleIcon className="w-8 h-8 inline text-red-400" title="Falhou" />,
    10: (
      <CheckCircleIcon
        className="w-8 h-8 inline text-green-400"
        title="Correto"
      />
    ),
    null: (
      <MinusCircleIcon
        className="w-8 h-8 inline text-gray-300"
        title="Por fazer"
      />
    ),
  };

  const { data } = useQuery({
    enabled: hasSubmissions,
    queryKey: ["exerciseSubmissions", exerciseId],
    queryFn: () =>
      TestsService.fetchTestSubmissions({
        exerciseId,
        pageSize: Infinity,
      }),
    refetchOnWindowFocus: false,
  });

  const submissions = data?.submissions || [];

  return hasSubmissions ? (
    submissions.map((submission: ExerciseSubmission) => (
      <Table.Row
        key={submission.id}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell></Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <p>
            <span className={"block"}>{submission.taker.name}</span>
            <span className={"block text-xs text-gray-700 dark:text-gray-400"}>
              {submission.taker.email}
            </span>
          </p>
        </Table.Cell>
        <Table.Cell className={"text-center"}>
          <p>
            <span className={"block"}>
              {formatDateTime(new Date(submission.createdAt)).date}
            </span>
            <span className={"block text-xs text-gray-700 dark:text-gray-400"}>
              {formatDateTime(new Date(submission.createdAt)).time}
            </span>
          </p>
        </Table.Cell>
        <Table.Cell className={"text-center"}>
          {gradeIcon[Number(submission.grade)]}
        </Table.Cell>
      </Table.Row>
    ))
  ) : (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan={4} className={"text-center"}>
        Nenhuma submissão realizada para este exercício
      </Table.Cell>
    </Table.Row>
  );
};
