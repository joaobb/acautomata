import { Label, Select } from "flowbite-react";
import { useQuery } from "react-query";
import { ClassroomsService } from "../../service/classrooms.service";

function ClassroomSelector({
  mentoredOnly,
  classroom,
  onSelectClassroom,
  ...props
}) {
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["classrooms", mentoredOnly ? "mentored" : undefined],
    queryFn: () =>
      ClassroomsService.fetchClasses({
        mentoredOnly: mentoredOnly || undefined,
      }),
  });

  const classrooms = data?.classrooms || [];

  function handleChange(ev) {
    onSelectClassroom(ev.target.value);
  }

  return (
    <div
      className={"flex flex-col"}
      onClick={(ev) => ev.stopPropagation()}
      {...props}
    >
      <Label htmlFor={"classrooms"}>Turma</Label>
      <Select id="classrooms" value={classroom} onChange={handleChange}>
        <option value={0}>Todas</option>

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
