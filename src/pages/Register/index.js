import { Checkbox, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Base/Input";
import BaseLogo from "../../components/Base/Logo";
import { AuthService } from "../../service/auth.service";

function RegisterPage() {
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
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

      navigate("/login");
    } catch (err) {
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
              <label htmlFor="userName" className="sr-only">
                Nome
              </label>
              <Input
                id="userName"
                name="userName"
                type="userName"
                autoComplete="userName"
                required
                placeholder="Nome de usuário"
              />
            </div>

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>

              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <Input
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
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
