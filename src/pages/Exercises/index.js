import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { BasePageContent } from "../../components/Base/PageContent";
import { ExerciseRow } from "../../components/Exercises/Row";
import { PAGINATION_PAGE_SIZE } from "../../enums/Pagination";
import { Roles, RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";
import { TestsService } from "../../service/tests.service";
import "./index.css";

const ExercisesPage = () => {
  const [page, setPage] = useState(0);

  const [searchParams] = useSearchParams();
  const solvedFilterQuery = searchParams.get("filter");
  const filter = {
    all: !solvedFilterQuery,
    solved: solvedFilterQuery === "solved",
    unsolved: solvedFilterQuery === "unsolved",
    authored: solvedFilterQuery === "authored",
  };

  const auth = useAuth();

  const solved = filter.solved ? true : filter.unsolved ? false : undefined;

  const { data, isLoading } = useQuery({
    keepPreviousData: true,
    queryKey: ["exercises", page, solved, filter.authored ? "authored" : null],
    queryFn: () =>
      TestsService.fetchTests({
        solved,
        authored: filter.authored || undefined,
        pageSize: PAGINATION_PAGE_SIZE,
        page,
      }),
  });

  const tests = data?.tests || [];

  function loadMore() {
    setPage(page + 1);
  }

  const canCreateExercise = [
    RolesId[Roles.admin],
    RolesId[Roles.teacher],
  ].includes(auth.user.role);

  return (
    <div className="exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="flex flex-col gap-6 p-6 bg-gray-400 rounded-lg">
          <header className={"flex gap-4"}>
            <div className={"flex"}>
              <Link to="/exercises">
                <Button
                  className="rounded-r-none"
                  color={filter.all ? undefined : "dark"}
                >
                  Todos
                </Button>
              </Link>
              <Link to="/exercises?filter=unsolved">
                <Button
                  className="rounded-none"
                  color={filter.unsolved ? undefined : "dark"}
                >
                  Não resolvidos
                </Button>
              </Link>
              <Link to="/exercises?filter=solved">
                <Button
                  className={twMerge(
                    ["rounded-none"],
                    [!canCreateExercise ? "rounded-r-lg" : null]
                  )}
                  color={filter.solved ? undefined : "dark"}
                >
                  Resolvidos
                </Button>
              </Link>
              {canCreateExercise ? (
                <Link to="/exercises?filter=authored">
                  <Button
                    className="rounded-l-none"
                    color={filter.authored ? undefined : "dark"}
                  >
                    Minhas criações
                  </Button>
                </Link>
              ) : null}
            </div>
            {canCreateExercise ? (
              <Link to={"/exercises/new"}>
                <Button pill={true} color={"light"} className={"font-bold"}>
                  <PlusIcon
                    className={"w-5 h-5 inline text-gray-100 stroke-2"}
                  />
                  Novo
                </Button>
              </Link>
            ) : null}

            <form className={"flex ml-auto"}>
              <TextInput id="search" type="search" placeholder="Buscar" />
              <Button color="dark">
                <MagnifyingGlassIcon
                  className={"w-5 h-5 inline text-gray-100"}
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

          <Button color={"light"} className={"mx-auto"} onClick={loadMore}>
            Carregar mais exercícios
          </Button>
        </main>
      </BasePageContent>
    </div>
  );
};

export default ExercisesPage;
