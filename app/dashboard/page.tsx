'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";

type FullPokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

const Dashboard = () => {
  const [filter, setFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const { data: pokemons, isLoading, isError } = useQuery<FullPokemon[]>({
    queryKey: ['pokemons'],
    queryFn: async () => {
      const res = await fetch('/api/pokemons');
      if (!res.ok) throw new Error('Error al traer los pokemones');
      return res.json();
    },
  });

  const filteredPokemons = pokemons?.filter((pokemon) => {
    const matchNumber = filter ? pokemon.id === Number(filter) : true;
    const matchType = typeFilter ? pokemon.types.includes(typeFilter) : true;
    return matchNumber && matchType;
  }) || [];

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los pokemones</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Pokémon Dashboard</h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="number"
            placeholder="Filtrar por número"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded border w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded border w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todos los tipos</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="grass">Planta</option>
            <option value="electric">Eléctrico</option>
            <option value="bug">Bicho</option>
            <option value="poison">Veneno</option>
            {/* Agregá más tipos si querés */}
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon) => (
            <Card
              key={pokemon.id || pokemon.name}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
