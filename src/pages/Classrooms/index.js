import { PlusIcon } from "@heroicons/react/20/solid";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { BasePageContent } from "../../components/Base/PageContent";
import { CreationFormModal } from "../../components/Classrooms/CreationFormModal";
import { JoinClassModal } from "../../components/Classrooms/JoinClassModal";
import { ClassRow } from "../../components/Classrooms/Row";
import { LoadingEllipsis } from "../../components/Loading/Ellipsis";
import { SearchBar } from "../../components/SearchBar";
import { Roles, RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";
import { ClassroomsService } from "../../service/classrooms.service";
import "./index.css";

const ClassroomsPage = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);

  const [nameFilter, setNameFilter] = useState("");

  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get("filter");

  const auth = useAuth();
  const userId = auth.user.id;

  const filter = {
    all: !filterQuery,
    mentoredOnly: filterQuery === "mentoredOnly" || undefined,
  };

  const { data, isLoading, refetch } = useQuery({
    keepPreviousData: true,
    queryKey: [
      "classrooms",
      filter.mentoredOnly ? "mentoredOnly" : null,
      nameFilter,
    ],
    queryFn: () =>
      ClassroomsService.fetchClasses({
        mentoredOnly: filter.mentoredOnly,
        name: nameFilter || undefined,
      }),
  });

  const classrooms = data?.classrooms || [];

  const canCreateClass = [
    RolesId[Roles.admin],
    RolesId[Roles.teacher],
  ].includes(auth.user.role);

  const showMentorDataOptions = filter.mentoredOnly && canCreateClass;

  return (
    <div className="classrooms__container py-6 bg-gray-600 flex-grow">
      <BasePageContent>
        <main className="flex flex-col gap-6 p-6 bg-gray-400 rounded-lg">
          <header className={"flex gap-4"}>
            {canCreateClass ? (
              <div className={"flex"}>
                <>
                  <Link to="/classrooms">
                    <Button
                      className="rounded-r-none"
                      color={filter.all ? undefined : "dark"}
                    >
                      Todas
                    </Button>
                  </Link>

                  <Link to="/classrooms?filter=mentoredOnly">
                    <Button
                      className="rounded-l-none"
                      color={filter.mentoredOnly ? undefined : "dark"}
                    >
                      Criadas
                    </Button>
                  </Link>
                </>
              </div>
            ) : null}
            {canCreateClass ? (
              <Button
                pill={true}
                color={"light"}
                className={"font-bold"}
                onClick={() => setShowCreationModal(true)}
              >
                <PlusIcon
                  className={"w-5 h-5 inline mr-2 text-gray-100 stroke-2"}
                />
                Criar turma
              </Button>
            ) : null}

            <Button
              pill={true}
              color={"light"}
              className={"font-bold"}
              onClick={() => setShowJoinClassModal(true)}
            >
              <SquaresPlusIcon
                className={"w-5 h-5 mr-2 inline text-gray-100 stroke-2"}
              />
              Entrar em turma
            </Button>

            <SearchBar onSearch={setNameFilter} />
          </header>

          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Nome</Table.HeadCell>
              <Table.HeadCell>Mentor</Table.HeadCell>
              <Table.HeadCell className={"text-center"}>
                Exercícios
              </Table.HeadCell>
              {showMentorDataOptions ? (
                <>
                  <Table.HeadCell className={"text-center"}>
                    Código de convite
                  </Table.HeadCell>
                  <Table.HeadCell className={"text-center"}>
                    Submissões
                  </Table.HeadCell>
                </>
              ) : null}
            </Table.Head>

            <Table.Body className="divide-y">
              {!isLoading ? (
                classrooms.length ? (
                  classrooms.map((classroom) => (
                    <ClassRow
                      isMentor={showMentorDataOptions}
                      key={classroom.id}
                      id={classroom.id}
                      name={classroom.name}
                      mentor={classroom.mentor.name}
                      invitationToken={classroom.invitationToken}
                    />
                  ))
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell colSpan={100} className={"text-center"}>
                      Nenhuma turma encontrado
                    </Table.Cell>
                  </Table.Row>
                )
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell colSpan={100} className={"text-center"}>
                    <LoadingEllipsis />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </main>
      </BasePageContent>
      <CreationFormModal
        show={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />
      <JoinClassModal
        show={showJoinClassModal}
        onJoinClass={refetch}
        onClose={() => setShowJoinClassModal(false)}
      />
    </div>
  );
};

export default ClassroomsPage;
