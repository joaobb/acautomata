import { Label, Textarea, TextInput } from "flowbite-react";

function AutomataDescriptionForm({
  title,
  description,
  onUpdateTitle,
  onUpdateDescription,
}) {
  return (
    <div className={"text-gray-100 flex flex-col gap-6 h-full"}>
      <div>
        <Label htmlFor={"automata-title"} className={"text-lg font-bold"}>
          Título do exercício
        </Label>
        <TextInput
          maxLength={48}
          id={"automata-title"}
          required={true}
          value={title}
          onInput={(ev) => onUpdateTitle(ev.target.value)}
        />
      </div>

      <div className={"flex flex-col h-full"}>
        <Label htmlFor={"automata-description"} className={"text-lg font-bold"}>
          Descrição do automato
        </Label>
        <Textarea
          id="automata-description"
          className={"h-full"}
          required={true}
          value={description}
          onInput={(ev) => onUpdateDescription(ev.target.value)}
        />
      </div>

      <hr className={"mt-auto"} />

      <div>
        <span className={"text-lg font-bold"}>Preferências</span>
        <p>...</p>
      </div>
    </div>
  );
}

export { AutomataDescriptionForm };
