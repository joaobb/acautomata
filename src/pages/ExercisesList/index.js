import { useSearchParams } from "react-router-dom";
import BaseInput from "../../components/Base/Input";
import NavList from "../../components/Base/NavList";
import { ExerciseListItem } from "../../components/ExercisesList/ExerciseItem";

import "./index.css";

function ExercisesListPage() {
  const [searchParams] = useSearchParams();

  const solvedFilter = searchParams.get("solved");

  const navList = [
    {
      target: "/exercises",
      label: "Todos",
      active: !solvedFilter,
    },
    {
      target: "/exercises?solved=false",
      label: "Não resolvidos",
      active: solvedFilter === "false",
    },
    {
      target: "/exercises?solved=true",
      label: "Resolvidos",
      active: solvedFilter === "true",
    },
  ];

  const exercises = [
    { id: 1, title: "Title", author: "Author", done: false },
    { id: 2, title: "Title", author: "Author", done: false },
    { id: 3, title: "Title", author: "Author", done: false },
    { id: 4, title: "Title", author: "Author", done: false },
    { id: 5, title: "Title", author: "Author", done: false },
  ];

  return (
    <div className="exercises__container page-container max-w-7xl mx-auto py-8 flex flex-col gap-4">
      <div className="exercises-list__header py-4 px-6 flex justify-between items-center bg-gray-800 rounded-lg">
        <NavList routes={navList} />

        <div className="exercies-list__search">
          <BaseInput type="text" placeholder="Search" />
        </div>
      </div>

      <main className="exercises py-2 px-6 bg-gray-800 rounded-lg h-full">
        <ul className="w-full">
          {exercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              id={exercise.id}
              title={exercise.title}
              author={exercise.author}
              done={exercise.done}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default ExercisesListPage;
