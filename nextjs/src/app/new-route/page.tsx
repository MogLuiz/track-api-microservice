"use client";

import { FormEvent } from "react";

export default function NewRoutePage() {
  function handleSearchPlaces(event: FormEvent) {
    event.preventDefault();

    const source = (document.getElementById("source") as HTMLInputElement)
      .value;
    const destination = (
      document.getElementById("destination") as HTMLInputElement
    ).value;
  }

  return (
    <main>
      <h1>Nova rota</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSearchPlaces}
      >
        <div>
          <input id="source" type="text" placeholder="origem" />
        </div>
        <div>
          <input id="destination" type="text" placeholder="destino" />
        </div>

        <button type="submit">Pesquisar</button>
      </form>
    </main>
  );
}
