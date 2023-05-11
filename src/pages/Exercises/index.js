import { Table } from "flowbite-react";
import { useQuery } from "react-query";
import { BasePageContent } from "../../components/Base/PageContent";
import { ExerciseRow } from "../../components/Exercises/Row";
import "./index.css";
import { TestsService } from "../../service/tests.service";

const ExercisesPage = () => {
  const { data, isLoading } = useQuery("exercises", TestsService.fetchTests);
  const tests = data?.tests || [];

  return (
    <div className="exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="p-6 bg-gray-400 rounded-lg">
          <Table>
            <Table.Head>
              <Table.HeadCell className="sr-only"> </Table.HeadCell>
              <Table.HeadCell>Nome</Table.HeadCell>
              <Table.HeadCell>Descrição</Table.HeadCell>
              <Table.HeadCell>Autor</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!isLoading
                ? tests.map((test) => (
                    <ExerciseRow
                      key={test.id}
                      name={test.name}
                      description={test.description}
                      author="ji"
                      solved
                    />
                  ))
                : null}
            </Table.Body>
          </Table>
        </main>
      </BasePageContent>
    </div>
  );
};

export default ExercisesPage;
