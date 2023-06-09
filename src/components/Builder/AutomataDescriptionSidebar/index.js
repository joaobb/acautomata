function AutomataDescriptionSidebar({ description, authorName }) {
  return (
    <div className={"text-gray-100 flex flex-col gap-6 h-full"}>
      <div>
        <span className={"text-xl font-bold"}>Descrição</span>
        <pre className={'text-sm whitespace-pre-wrap'}>{description}</pre>
      </div>

      <hr className={"mt-auto"} />

      <div>
        <span className={"text-lg font-bold"}>Autor</span>
        <p>{authorName}</p>
      </div>
    </div>
  );
}

export { AutomataDescriptionSidebar };
