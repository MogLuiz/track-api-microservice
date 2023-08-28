"use client";

import { FormEvent } from "react";

export default function NewRoutePage() {
  async function handleSearchPlaces(event: FormEvent) {
    event.preventDefault();

    const source = (document.getElementById("source") as HTMLInputElement)
      .value;
    const destination = (
      document.getElementById("destination") as HTMLInputElement
    ).value;

    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:3000/places?text=${source}`),
      fetch(`http://localhost:3000/places?text=${destination}`),
    ]);

    const [sourcePlaces, destinationPlaces] = await Promise.all([
      sourceResponse.json(),
      destinationResponse.json(),
    ]);
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
