import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, TextInput } from "flowbite-react";
import React from "react";

interface SearchBarProps {
  onSearch(query: string): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // @ts-ignore
    onSearch((ev.target as HTMLFormElement).elements?.searchQuery?.value);
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
};

export { SearchBar };
