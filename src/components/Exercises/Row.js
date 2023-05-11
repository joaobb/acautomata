import { Table } from "flowbite-react";

export const ExerciseRow = ({ name, description, solved, author }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{solved ? "T" : "F"}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{author}</Table.Cell>
      <Table.Cell>
        <a
          href="/tables"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Ver
        </a>
      </Table.Cell>
    </Table.Row>
  );
};
