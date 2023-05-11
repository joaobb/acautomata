import { Link } from "react-router-dom";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

function ExerciseListItem({ id, title, author, done }) {
  return (
    <li className="exercise-list__item bg-gray-200 my-4 rounded-lg py-2 px-4">
      <Link
        to={`/exercises/${id}`}
        className="flex items-center justify-between"
      >
        <p>
          <span className="block font-bold text-xl">{title}</span>
          <span className="block text-sm flex">{author}</span>
        </p>

        <span className="flex gap-2 items-center">
          {!done ? (
            <>
              <span className="text-gray-800 text-sm">Feito em: {new Date().toDateString()}</span>
              <CheckCircleIcon className="w-8 h-8 inline text-green-700" />
            </>
          ) : (
            <MinusCircleIcon className="w-8 h-8 text-yellow-600" />
          )}
        </span>
      </Link>
    </li>
  );
}

export { ExerciseListItem };
