import { Button, Table } from "flowbite-react";
import { Fragment, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BasePageContent } from "../../../components/Base/PageContent";
import { ClassroomExerciseRow } from "../../../components/Classrooms/ClassroomExerciseRow";
import { ClassroomExerciseSubmissions } from "../../../components/Classrooms/ClassroomExerciseSubmissions";
import { LoadingEllipsis } from "../../../components/Loading/Ellipsis";
import { SearchBar } from "../../../components/SearchBar";
import { PAGINATION_PAGE_SIZE } from "../../../enums/Pagination";
import { TestsService } from "../../../service/tests.service";
import "./index.css";

const ClassroomExercisesPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [visibleSubmissions, setVisibleSubmissions] = useState({});

  const { classroomId } = useParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["exercises", `classroom #${classroomId}`],
    queryFn: ({ pageParam }) =>
      TestsService.fetchTests({
        classroom: Number(classroomId),
        name: nameFilter || undefined,
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

  function handleShowExerciseSubmissions(exerciseId, show) {
    setVisibleSubmissions({ ...visibleSubmissions, [exerciseId]: show });
  }

  return (
    <div className="classroom_exercises__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="flex flex-col gap-6 p-6 bg-gray-400 rounded-lg">
          <header className={"flex gap-4 items-center"}>
            <h1 className={"text-gray-900 font-bold text-2xl"}>
              Exercícios da turma {classroomId}
            </h1>

            <div className={"flex gap-4 ml-auto"}>
              <SearchBar onSearch={setNameFilter} />
            </div>
          </header>

          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="sr-only"> </Table.HeadCell>
              <Table.HeadCell>Exercício</Table.HeadCell>
              <Table.HeadCell className={"text-center"}>
                Submissões
              </Table.HeadCell>
              <Table.HeadCell className={"text-center"}>
                Taxa acerto
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!isLoading ? (
                dataPages.length ? (
                  dataPages.map((page) =>
                    page.tests.map((test) => (
                      <Fragment key={test.id}>
                        <ClassroomExerciseRow
                          exerciseId={test.id}
                          name={test.name}
                          submissions={test.submissionsCount}
                          rightnessRate={test.systemGradeAverage}
                          showSubmissions={visibleSubmissions[test.id]}
                          onShowSubmissions={handleShowExerciseSubmissions}
                        />
                        {visibleSubmissions[test.id] ? (
                          <ClassroomExerciseSubmissions
                            exerciseId={test.id}
                            hasSubmissions={Boolean(test.submissionsCount)}
                          />
                        ) : null}
                      </Fragment>
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

export default ClassroomExercisesPage;
