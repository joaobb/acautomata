import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Table } from "flowbite-react";
import React from "react";

interface ClassroomExerciseRowProps {
  name: string;
  exerciseId: number;
  showSubmissions: boolean;
  submissions?: number;
  rightnessRate?: number;
  onShowSubmissions(exerciseId: number, showSubmissions: boolean): void;
}

export const ClassroomExerciseRow: React.FC<ClassroomExerciseRowProps> = ({
  showSubmissions,
  exerciseId,
  name,
  submissions = 0,
  rightnessRate = 0,
  onShowSubmissions,
}) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className={"w-0"}>
        <Button
          onClick={() => onShowSubmissions(exerciseId, !showSubmissions)}
          color={"gray"}
        >
          <ChevronDownIcon
            className={`w-5 h-5 inline text-gray-300 ${
              showSubmissions ? " rotate-180" : ""
            }`}
          />
        </Button>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </Table.Cell>
      <Table.Cell className={"text-center"}>{submissions || 0}</Table.Cell>
      <Table.Cell className={"text-center"}>
        {submissions ? <>{rightnessRate * 10}%</> : "-"}
      </Table.Cell>
    </Table.Row>
  );
};
