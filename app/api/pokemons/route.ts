import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Realizar la primera solicitud para obtener la lista de Pokémon
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await res.json();

    // Realizar solicitudes adicionales para obtener los sprites de cada Pokémon
    const pokemonDetailsPromises = data.results.map(async (pokemon) => {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();

      // Extraemos la información que necesitamos: id, nombre, sprite, y tipos
      const pokemonWithSprites = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default, // Obtén el sprite frontal
        types: pokemonData.types.map((t) => t.type.name), // Extraemos los tipos
      };

      return pokemonWithSprites;
    });

    // Esperamos todas las promesas y luego devolvemos los resultados
    const pokemonsWithSprites = await Promise.all(pokemonDetailsPromises);

    return NextResponse.json(pokemonsWithSprites);
  } catch (error) {
    return NextResponse.json({ error: 'Error al traer los pokemones' }, { status: 500 });
  }
}
