import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSearchParamsFormatter } from "../../hooks/useSearchParamsFormatter";
import React from "react";

interface ExercisesNavListProps {
  filters: any;
  canCreateExercise?: boolean;
}

const ExercisesNavList: React.FC<ExercisesNavListProps> = ({
  filters,
  canCreateExercise,
}) => {
  const [formatSearchParams] = useSearchParamsFormatter();
  function formatFilterSearchParams(key: string, value?: string) {
    // @ts-ignore
    return formatSearchParams(key, value, ["classroom"]);
  }
  return (
    <div className={"flex"}>
      <Link
        to={{
          pathname: "/exercises",
          search: formatFilterSearchParams("filter", undefined),
        }}
      >
        <Button
          className="rounded-r-none min-h-full"
          color={filters.all ? undefined : "dark"}
        >
          Todos
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/exercises",
          search: formatFilterSearchParams("filter", "unsolved"),
        }}
      >
        <Button
          className="rounded-none min-h-full"
          color={filters.unsolved ? undefined : "dark"}
        >
          Não resolvidos
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/exercises",
          search: formatFilterSearchParams("filter", "solved"),
        }}
      >
        <Button
          className={twMerge(
            ["rounded-none  min-h-full"],
            [!canCreateExercise ? "rounded-r-lg" : null]
          )}
          color={filters.solved ? undefined : "dark"}
        >
          Resolvidos
        </Button>
      </Link>
      {canCreateExercise ? (
        <Link
          to={{
            pathname: "/exercises",
            search: formatFilterSearchParams("filter", "authored"),
          }}
        >
          <Button
            className="rounded-l-none  min-h-full"
            color={filters.authored ? undefined : "dark"}
          >
            Minhas criações
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export { ExercisesNavList };
