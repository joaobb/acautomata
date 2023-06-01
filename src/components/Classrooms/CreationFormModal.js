import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClassroomsService } from "../../service/classrooms.service";

function CreationFormModal({ show, onClose }) {
  const [classInvitationToken, setClassInvitationToken] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(ev) {
    ev.preventDefault();

    const toastId = toast.loading("Criando turma...");
    try {
      setIsSubmitting(true);
      const className = ev.target.elements?.className?.value;
      const classDescription = ev.target.elements?.classDescription?.value;

      const classResponse = await ClassroomsService.createClass({
        name: className,
        description: classDescription,
      });

      setClassInvitationToken(classResponse.invitationToken);

      toast.success("Turma criada criado!", { id: toastId, duration: 5000 });
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        "Ocorreu um erro ao criar turma!\nTente novamente mais tarde",
        {
          id: toastId,
          duration: 5000,
        }
      );
    }
  }

  async function copyTokenToClipboard() {
    if (!classInvitationToken) return;
    await navigator.clipboard.writeText(classInvitationToken);

    toast.success("Token copiado!");
  }

  return (
    <Modal show={show} onClose={onClose} popup size="md">
      <Modal.Header>
        <span className={"block px-4 py-2"}>Nova turma</span>
      </Modal.Header>
      <Modal.Body className={"py-0"}>
        {!classInvitationToken ? (
          <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="class-name">Nome da turma*</Label>
              <TextInput
                id="class-name"
                name="className"
                type="className"
                required
                placeholder="Turma 42"
              />
            </div>

            <div>
              <Label htmlFor="classDescription">Descrição</Label>
              <Textarea id="class-description" name="classDescription" />
            </div>

            <div className={"flex gap-4 justify-end"}>
              <Button
                color={"failure"}
                type={"button"}
                disabled={isSubmitting}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button type={"submit"} disabled={isSubmitting}>
                Criar turma
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <span className={"text-gray-200"}>Código de convite:</span>
            <div className={"flex"}>
              <div
                className={
                  "bg-gray-300 py-4 px-6 rounded-l-lg font-semibold select-all flex-grow"
                }
              >
                <span>{classInvitationToken}</span>
              </div>

              <Button
                className={"rounded-l-none"}
                style={{ height: "auto" }}
                onClick={copyTokenToClipboard}
              >
                Copiar
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className={"py-3"} />
    </Modal>
  );
}

export { CreationFormModal };
