import { Dropdown } from "flowbite-react";
import { ClassroomSelector } from "./ClassroomSelector";

function ExercisesClassroomFilter({ onSelectClassroom }) {
  return (
    <Dropdown label="Filtrar por turma" color={"dark"} placement={"bottom-end"}>
      <Dropdown.Item>
        <ClassroomSelector
          onSelectClassroom={onSelectClassroom}
          className={"w-64"}
        />
      </Dropdown.Item>
    </Dropdown>
  );
}

export { ExercisesClassroomFilter };
