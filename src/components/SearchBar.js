import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, TextInput } from "flowbite-react";

function SearchBar({ onSearch }) {
  function handleSubmit(ev) {
    ev.preventDefault();

    onSearch(ev.target.elements?.searchQuery?.value);
  }
  return (
    <form className={"flex"} onSubmit={handleSubmit}>
      <TextInput
        id="search"
        type="search"
        name={"searchQuery"}
        placeholder="Buscar"
      />
      <Button color="dark" type={"submit"}>
        <MagnifyingGlassIcon className={"w-5 h-5 inline text-gray-100"} />
      </Button>
    </form>
  );
}

export { SearchBar };
