import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import BaseInput from "../../components/Base/Input";
import BaseLogo from "../../components/Base/Logo";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      auth.login({ email, password }, () => {
        toast.success("Entrando...");
        navigate(from, { replace: true });
      });
    } catch (err) {
      toast.error("Falha ao realizar login");
      console.error(err);
    }
  }

  return (
    <div className="flex-grow bg-gray-600 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-gray-700 p-10 rounded-lg">
        <div>
          <div className={"flex justify-center"}>
            <BaseLogo className={'text-amber-100 border-amber-100'}/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
            Bem vindo de volta
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>

              <BaseInput
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
              <BaseInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          {/*<div className="flex items-center justify-end">*/}
          {/*  <div className="text-sm">*/}
          {/*    <a*/}
          {/*      href="#"*/}
          {/*      className="font-medium text-indigo-600 hover:text-indigo-500"*/}
          {/*    >*/}
          {/*      Esqueceu sua senha?*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/*<LockClosedIcon*/}
                {/*  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"*/}
                {/*  aria-hidden="true"*/}
                {/*/>*/}
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
