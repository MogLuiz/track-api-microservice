"use client";

import { FormEvent } from "react";
import type { FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js";

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

    const [sourcePlaces, destinationPlaces]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()]);

    if (sourcePlaces.status !== "OK") {
      alert("Não foi possível encontrar o local de origem");
      return;
    }

    if (destinationPlaces.status !== "OK") {
      alert("Não foi possível encontrar o local de destino");
      return;
    }

    const sourcePlaceId = sourcePlaces.candidates[0].place_id;
    const destinationPlaceId = destinationPlaces.candidates[0].place_id;

    const directionsResponse = await fetch(
      `http://localhost:3000/directions?originId=${sourcePlaceId}&destinationId=${destinationPlaceId}`
    );
    const directionsData = await directionsResponse.json();

    if (directionsData.status !== "OK") {
      alert("Não foi possível encontrar uma rota");
      return;
    }
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
