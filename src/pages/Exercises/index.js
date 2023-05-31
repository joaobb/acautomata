import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { BasePageContent } from "../../components/Base/PageContent";
import { ExerciseRow } from "../../components/Exercises/Row";
import { LoadingEllipsis } from "../../components/Loading/Ellipsis";
import { PAGINATION_PAGE_SIZE } from "../../enums/Pagination";
import { Roles, RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";
import { TestsService } from "../../service/tests.service";
import "./index.css";

const ExercisesPage = () => {
  const [nameFilter, setNameFilter] = useState("");

  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get("filter");

  const filter = {
    all: !filterQuery,
    solved: filterQuery === "solved",
    unsolved: filterQuery === "unsolved",
    authored: filterQuery === "authored",
  };

  const auth = useAuth();

  const solved = filter.solved ? true : filter.unsolved ? false : undefined;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      "exercises",
      solved,
      filter.authored ? "authored" : null,
      nameFilter,
    ],
    queryFn: ({ pageParam }) =>
      TestsService.fetchTests({
        solved,
        authored: filter.authored || undefined,
        offset: pageParam,
        name: nameFilter,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * PAGINATION_PAGE_SIZE >= lastPage.totalItems)
        return false;

      return pages.length * PAGINATION_PAGE_SIZE;
    },
  });

  const dataPages = data?.pages || [];

  const canCreateExercise = [
    RolesId[Roles.admin],
    RolesId[Roles.teacher],
  ].includes(auth.user.role);

  function onFilterByName(ev) {
    ev.preventDefault();
    setNameFilter(ev.target.elements?.searchQuery?.value);
  }

  return (
    <div className="exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="flex flex-col gap-6 p-6 bg-gray-400 rounded-lg">
          <header className={"flex gap-4"}>
            <div className={"flex"}>
              <Link to="/exercises">
                <Button
                  className="rounded-r-none min-h-full"
                  color={filter.all ? undefined : "dark"}
                >
                  Todos
                </Button>
              </Link>
              <Link to="/exercises?filter=unsolved">
                <Button
                  className="rounded-none min-h-full"
                  color={filter.unsolved ? undefined : "dark"}
                >
                  Não resolvidos
                </Button>
              </Link>
              <Link to="/exercises?filter=solved">
                <Button
                  className={twMerge(
                    ["rounded-none  min-h-full"],
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
                    className="rounded-l-none  min-h-full"
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

            <form className={"flex ml-auto"} onSubmit={onFilterByName}>
              <TextInput
                id="search"
                type="search"
                name={"searchQuery"}
                placeholder="Buscar"
              />
              <Button color="dark" type={"submit"}>
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
              {!isLoading ? (
                dataPages.length ? (
                  dataPages.map((page) =>
                    page.tests.map((test) => (
                      <ExerciseRow
                        key={test.id}
                        testId={test.id}
                        name={test.name}
                        description={test.description}
                        author={test.author}
                        grade={test.grade}
                      />
                    ))
                  )
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell colSpan={4} className={"text-center"}>
                      Nenhum exercício encontrado
                    </Table.Cell>
                  </Table.Row>
                )
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell colSpan={4} className={"text-center"}>
                    <LoadingEllipsis />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>

          <Button
            color={"light"}
            className={"mx-auto"}
            disabled={!hasNextPage}
            onClick={fetchNextPage}
          >
            Carregar mais exercícios
          </Button>
        </main>
      </BasePageContent>
    </div>
  );
};

export default ExercisesPage;
