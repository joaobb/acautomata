import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function ExercisesNavList({ filters, canCreateExercise }) {
  return (
    <div className={"flex"}>
      <Link to="/exercises">
        <Button
          className="rounded-r-none min-h-full"
          color={filters.all ? undefined : "dark"}
        >
          Todos
        </Button>
      </Link>
      <Link to="/exercises?filter=unsolved">
        <Button
          className="rounded-none min-h-full"
          color={filters.unsolved ? undefined : "dark"}
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
          color={filters.solved ? undefined : "dark"}
        >
          Resolvidos
        </Button>
      </Link>
      {canCreateExercise ? (
        <Link to="/exercises?filter=authored">
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
}

export { ExercisesNavList };
