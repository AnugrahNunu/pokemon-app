import React, { useState } from "react";
import background from "../../assets/8d58384546f769334348c6011ccee872.jpg";
import { useParams } from "react-router-dom";
import { useDetailPokemon } from "../../hooks/detail/useDetailPokemon";

const Catch: React.FC = () => {
  const { name } = useParams();
  const { pokemonDetail } = useDetailPokemon(name || "");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [, setCatchResult] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleCatchClick = () => {
    const chance = Math.random();
    if (chance < 0.5) {
      setCatchResult(true);
      setIsPopupOpen(true);
    } else {
      alert(`${name} berhasil lolos! Coba lagi!`);
    }
  };

  const savePokemon = () => {
    if (nickname.trim() === "") return;

    const storedPokemons = JSON.parse(
      localStorage.getItem("myPokemons") || "[]"
    );
    const newPokemon = {
      nickname,
      name,
      sprite:
        pokemonDetail?.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      cries: pokemonDetail?.cries.legacy,
    };
    storedPokemons.push(newPokemon);
    localStorage.setItem("myPokemons", JSON.stringify(storedPokemons));

    setIsPopupOpen(false);
    alert(`${nickname} telah ditambahkan ke koleksi!`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen pt-50 md:pt-35 overflow-y-hidden bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {pokemonDetail && (
        <>
          <div className="grow">
            <img
              src={
                pokemonDetail.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
              alt={name}
              className="min-w-[125px] md:min-w-[100px]"
            />
          </div>
          <div className="flex flex-col justify-between w-xs md:w-md pb-30">
            <div className="bg-blue-500 rounded-2xl border-2 border-white">
              <p className="text-xs text-white p-4">What will you do?</p>
            </div>
            <button
              onClick={() => {
                const audio = new Audio(pokemonDetail.cries.latest);
                audio.volume = 0.3;
                audio
                  .play()
                  .catch((error) =>
                    console.error("Error playing audio:", error)
                  );
                handleCatchClick?.();
              }}
              className="mt-4 bg-red-600 rounded-2xl border-2 border-white hover:bg-red-800 active:bg-red-800"
            >
              <p className="text-xs text-white p-4">Catch</p>
            </button>
          </div>
        </>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-4">
              Berhasil Menangkap Pokemon
            </h2>
            <input
              type="text"
              placeholder="Masukkan nama Pokémon"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={savePokemon}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Simpan
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catch;
