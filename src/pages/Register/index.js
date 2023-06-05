import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import BaseLogo from "../../components/Base/Logo";
import { AuthService } from "../../service/auth.service";

function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const toastId = toast.loading("Aguarde, cadastrando conta...");

    try {
      setIsSubmitting(true);

      const formData = new FormData(event.currentTarget);
      const userName = formData.get("userName");
      const email = formData.get("email");
      const password = formData.get("password");
      const isTeacher = formData.get("teacher");

      await AuthService.signUp({
        name: userName,
        email,
        password,
        role: isTeacher ? "teacher" : "student",
      });

      toast.success("Conta criada!", { id: toastId });
      navigate("/login", { state: { email } });
    } catch (err) {
      setIsSubmitting(false);

      toast.error("Ops! Falha ao criar conta", { id: toastId });

      console.error(err);
    }
  }

  return (
    <div className="flex-grow bg-gray-600 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-gray-700 p-10 rounded-lg">
        <div>
          <div className={"flex justify-center"}>
            <BaseLogo className={"text-amber-100 border-amber-100"} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100 select-none">
            Bem vindo ao{" "}
            <span
              className={"font-black"}
              title={"Finite Automata Validation App"}
            >
              FAVA
            </span>
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div>
              <Label htmlFor="userName" className="sr-only">
                Nome
              </Label>
              <TextInput
                id="userName"
                name="userName"
                type="userName"
                autoComplete="userName"
                required
                placeholder="Nome de usuário"
              />
            </div>

            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email
              </Label>

              <TextInput
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="sr-only">
                Senha
              </Label>
              <TextInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Senha"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="teacher" name="teacher" />
              <Label htmlFor="teacher">Sou professor</Label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={twMerge(
                "w-full",
                isSubmitting ? "animate-pulse" : null
              )}
              disabled={isSubmitting}
            >
              <span className={"relative"}>Cadastrar-se</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
