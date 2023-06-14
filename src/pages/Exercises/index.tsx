import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BasePageContent } from "../../components/Base/PageContent";
import { ClassroomSelector } from "../../components/Exercises/ClassroomSelector";
import { ExercisesNavList } from "../../components/Exercises/NavList";
import { ExerciseRow } from "../../components/Exercises/Row";
import { LoadingEllipsis } from "../../components/Loading/Ellipsis";
import { SearchBar } from "../../components/SearchBar";
import { PAGINATION_PAGE_SIZE } from "../../enums/Pagination";
import { Roles, RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";
import { useSearchParamsFormatter } from "../../hooks/useSearchParamsFormatter";
import { TestsService } from "../../service/tests.service";
import "./index.css";

const ExercisesPage = () => {
  const [formatSearchParams] = useSearchParamsFormatter();
  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState("");

  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get("filter");
  const classroomFilterQuery = searchParams.get("classroom");

  const filter = {
    all: !filterQuery,
    solved: filterQuery === "solved",
    unsolved: filterQuery === "unsolved",
    authored: filterQuery === "authored",
    classroom: classroomFilterQuery ? Number(classroomFilterQuery) : undefined,
  };

  const auth = useAuth();

  const solved = filter.solved ? true : filter.unsolved ? false : undefined;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      "exercises",
      solved,
      filter.authored ? "authored" : null,
      nameFilter,
      filter.classroom,
    ],
    queryFn: ({ pageParam }) =>
      TestsService.fetchTests({
        solved,
        name: nameFilter,
        authored: filter.authored,
        classroom: filter.classroom,
        offset: pageParam,
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
  ].includes(Number(auth?.user?.role));

  function handleSelectClassroomFilter(classroomId: number) {
    navigate({
      // @ts-ignore
      search: formatSearchParams("classroom", classroomId, ["filter"]),
    });
  }

  const noItemsFound = !isLoading && !data?.pages[0]?.totalItems;

  return (
    <div className="exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="flex flex-col gap-6 p-6 bg-gray-400 rounded-lg">
          <header className={"flex gap-4"}>
            <ExercisesNavList
              filters={filter}
              canCreateExercise={canCreateExercise}
            />

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

            <div className={"flex gap-4 ml-auto"}>
              <ClassroomSelector
                defaultPlaceholder={
                  filter.classroom ? "Todas" : "Filtrar por turma"
                }
                classroom={filter.classroom || null}
                onSelectClassroom={handleSelectClassroomFilter}
                className={"w-64"}
              />
              <SearchBar onSearch={setNameFilter} />
            </div>
          </header>

          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className={"w-0"}>ID</Table.HeadCell>
              <Table.HeadCell>Nome</Table.HeadCell>
              <Table.HeadCell>Autor</Table.HeadCell>
              <Table.HeadCell className={"text-center"}>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!isLoading ? (
                !noItemsFound ? (
                  dataPages.map((page) =>
                    page.tests.map((test: any) => (
                      <ExerciseRow
                        key={test.id}
                        testId={test.id}
                        name={test.name}
                        author={test.authorName}
                        grade={test.grade}
                      />
                    ))
                  )
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell colSpan={5} className={"text-center"}>
                      Nenhum exercício encontrado
                    </Table.Cell>
                  </Table.Row>
                )
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell colSpan={5} className={"text-center"}>
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
            onClick={() => fetchNextPage()}
          >
            Carregar mais exercícios
          </Button>
        </main>
      </BasePageContent>
    </div>
  );
};

export default ExercisesPage;
