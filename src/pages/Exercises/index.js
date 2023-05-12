import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, Table, TextInput } from "flowbite-react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { BasePageContent } from "../../components/Base/PageContent";
import { ExerciseRow } from "../../components/Exercises/Row";
import { TestsService } from "../../service/tests.service";
import "./index.css";

const ExercisesPage = () => {
  const [searchParams] = useSearchParams();
  const solvedFilterQuery = searchParams.get("filter");
  const filter = {
    all: !solvedFilterQuery,
    solved: solvedFilterQuery === "solved",
    unsolved: solvedFilterQuery === "unsolved",
  };

  const solved = filter.solved ? true : filter.unsolved ? false : undefined;

  const { data, isLoading } = useQuery(["exercises", solved], () =>
    TestsService.fetchTests({ solved })
  );
  const tests = data?.tests || [];

  return (
    <div className="exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="p-6 bg-gray-400 rounded-lg">
          <header className={"flex justify-between mb-6"}>
            <Button.Group>
              <Button color={filter.all ? undefined : "gray"}>
                <Link to="/exercises">Todos</Link>
              </Button>
              <Button color={filter.solved ? undefined : "gray"}>
                <Link to="/exercises?filter=solved">Não resolvidos</Link>
              </Button>
              <Button color={filter.unsolved ? undefined : "gray"}>
                <Link to="/exercises?filter=unsolved">Resolvidos</Link>
              </Button>
            </Button.Group>

            <form className={"flex"}>
              <TextInput id="search" type="search" placeholder="Buscar" />
              <Button color="gray">
                <MagnifyingGlassIcon
                  className={"w-5 h-5 inline text-gray-700"}
                />
              </Button>
            </form>
          </header>

          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Nome</Table.HeadCell>
              <Table.HeadCell>Autor</Table.HeadCell>
              <Table.HeadCell className="sr-only"> </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!isLoading
                ? tests.map((test) => (
                    <ExerciseRow
                      key={test.id}
                      testId={test.id}
                      name={test.name}
                      description={test.description}
                      author={test.author}
                      grade={test.grade}
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
