import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export const ClassRow = ({ isMentor, id, name, mentor, invitationToken }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </Table.Cell>
      <Table.Cell>{mentor || "-"}</Table.Cell>
      <Table.Cell>
        <Link to={{ pathname: "/exercises", search: `classroom=${id}` }}>
          <Button color={"light"} className={"mx-auto"}>
            Ver exercícios
          </Button>
        </Link>
      </Table.Cell>
      {isMentor ? (
        <>
          <Table.Cell className={"text-center"}>
            <div className={"px-2 py-1 bg-gray-900 w-fit mx-auto rounded"}>
              <span className={"select-all font-bold"}>
                {invitationToken || "-"}
              </span>
            </div>
          </Table.Cell>
          <Table.Cell className={"text-center"}>
            <Link to={`/classrooms/${id}/exercises`}>
              <Button color={"light"} className={"mx-auto"}>
                Ver submissões
              </Button>
            </Link>
          </Table.Cell>
        </>
      ) : null}
    </Table.Row>
  );
};
