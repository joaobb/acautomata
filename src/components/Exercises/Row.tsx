import { Button, Table } from "flowbite-react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React from "react";

interface ExerciseRowProps {
  testId: number;
  name: string;
  author: string;
  grade: number | null;
}

export const ExerciseRow: React.FC<ExerciseRowProps> = ({
  testId,
  name,
  author,
  grade = null,
}) => {
  const gradeIcon = {
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
  }[String(grade)];

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        <Link to={`/exercises/${testId}`}>
          <span className={"underline"} title={"Resolver"}>
            #{testId}
          </span>
        </Link>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name || "-"}
      </Table.Cell>
      {/*<Table.Cell>{description}</Table.Cell>*/}
      <Table.Cell>{author || "-"}</Table.Cell>
      <Table.Cell className={"text-center"}>{gradeIcon}</Table.Cell>
      <Table.Cell>
        <Link to={`/exercises/${testId}`}>
          <Button color={"light"} className={"mx-auto"}>
            Resolver
          </Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};
