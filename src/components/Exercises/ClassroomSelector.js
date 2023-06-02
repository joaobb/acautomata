import { Label, Select } from "flowbite-react";
import { useQuery } from "react-query";
import { ClassroomsService } from "../../service/classrooms.service";

function ClassroomSelector({
  defaultPlaceholder = "Todas",
  labeled,
  mentoredOnly,
  classroom,
  onSelectClassroom,
  ...props
}) {
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["classrooms", mentoredOnly ? "mentored" : undefined],
    queryFn: () =>
      ClassroomsService.fetchClasses({
        mentoredOnly: mentoredOnly || undefined,
      }),
  });

  const classrooms = data?.classrooms || [];

  function handleChange(ev) {
    const classroomId = Number(ev.target.value);
    onSelectClassroom(classroomId || null, classroomId);
  }

  return (
    <div
      className={"flex flex-col"}
      onClick={(ev) => ev.stopPropagation()}
      {...props}
    >
      <Label
        htmlFor={"classrooms"}
        className={!labeled ? "sr-only" : undefined}
      >
        Turma
      </Label>
      <Select id="classrooms" value={classroom || 0} onChange={handleChange}>
        <option value={0}>{defaultPlaceholder}</option>

        {classrooms?.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { ClassroomSelector };
