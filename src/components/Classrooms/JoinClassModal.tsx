import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClassroomsService } from "../../service/classrooms.service";

interface JoinClassModalProps {
  show: boolean;
  onJoinClass(): void;
  onClose(): void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({
  show,
  onJoinClass,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationToken, setInvitationToken] = useState("");

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setIsSubmitting(true);
    const toastId = toast.loading("Entrando na turma...");
    try {
      const classResponse = await ClassroomsService.joinClass({
        invitationToken: invitationToken,
      });

      const classroomName = classResponse.classroomName;
      onJoinClass();
      toast.success(`Você entrou na turma ${classroomName}!`, {
        id: toastId,
        duration: 5000,
      });
      onClose();
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao entrar em turma!\nTente novamente mais tarde",
        {
          id: toastId,
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal show={show} onClose={onClose} popup size="md">
      <Modal.Header>
        <span className={"block px-4 py-2"}>Entrar em turma</span>
      </Modal.Header>
      <Modal.Body className={"py-0"}>
        <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="invitation-token">Token de convite*</Label>
            <TextInput
              id="invitation-token"
              name="invitationToken"
              type="invitationToken"
              required
              placeholder="XPTO42"
              value={invitationToken}
              onChange={(ev) => setInvitationToken(ev.target.value)}
            />
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
              Entrar
            </Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className={"py-3"} />
    </Modal>
  );
};

export { JoinClassModal };
