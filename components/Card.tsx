'use client';

type PokemonCardProps = {
  name: string;
  image: string;
  types?: string[]; // ✅ Ahora puede ser opcional
  id: number;
};

export default function Card({ name, image, types = [], id }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
      <img src={image} alt={name} width={120} height={120} />
      <h3 className="font-bold capitalize">{name}</h3>
      <p className="text-sm text-gray-500">#{id}</p>
      {types.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {types.map((type) => (
            <span 
              key={type} 
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
