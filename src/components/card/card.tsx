import React from "react";
import { Result } from "../../service/home/type";
import { Root } from "../../service/detaill/type";
import catchLogo from "../../assets/icons8-pokemon-ball-64.png";

interface CardProps {
  data:
    | Result
    | Root
    | { name: string; nickname: string; sprite: string; cries: string };
  isDetailPic?: boolean;
  isDetailStat?: boolean;
  isDetailProfile?: boolean;
  isDetailAbility?: boolean;
  isDetailMove?: boolean;
  isDetailCatch?: boolean;
  onClick?: () => void;
  onRemove?: (nickname: string) => void;
}

const Card: React.FC<CardProps> = ({
  data,
  isDetailPic = false,
  isDetailStat = false,
  isDetailProfile = false,
  isDetailAbility = false,
  isDetailMove = false,
  isDetailCatch = false,
  onClick,
  onRemove,
}) => {
  const {
    sprites,
    name,
    weight = "N/A",
    height = "N/A",
    types = [],
    stats = [],
    moves = [],
    abilities = [],
    cries,
  } = data as Root;

  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-500",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-500",
    bug: "bg-lime-500",
    rock: "bg-gray-600",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
  };

  if ("nickname" in data) {
    return (
      <div
        onClick={() => {
          const audio = new Audio(data.cries);
          audio.volume = 0.3;
          audio
            .play()
            .catch((error) => console.error("Error playing audio:", error));
        }}
        className="relative flex flex-col justify-between items-center shadow-md rounded-lg p-4 text-center border border-white"
      >
        <button
          onClick={() => onRemove?.(data.nickname)}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          X
        </button>
        <img
          src={data.sprite}
          alt=""
          className="md:min-w-[75px] md:min-h-[75px]"
        />
        <div className="mt-2">
          <p className="text-sm md:text-xl font-bold text-white">
            {data.nickname}
          </p>
          <p className="text-gray-500">({data.name})</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-center min-w-[150px] rounded-xl shadow-xl border border-amber-50 text-white p-2 ${
        !isDetailPic &&
        !isDetailStat &&
        !isDetailProfile &&
        !isDetailAbility &&
        !isDetailMove &&
        !isDetailCatch
          ? "max-h-[150px] min-h-[150px] hover:bg-amber-50 active:bg-amber-50 hover:text-black active:text-black hover:cursor-pointer"
          : ""
      } ${
        isDetailCatch
          ? "hover:border-4 active:border-4 hover:border-blue-500 active:border-blue-700 hover:cursor-pointer hover:text-red-600 active:text-red-600"
          : ""
      }`}
    >
      {!isDetailPic &&
        !isDetailStat &&
        !isDetailProfile &&
        !isDetailAbility &&
        !isDetailMove &&
        !isDetailCatch && (
          <div className="flex flex-col items-center">
            <img
              src={
                sprites.versions["generation-v"]["black-white"].animated
                  .front_default
              }
              alt={name}
              className="min-w-[75px] min-h-[75px] object-contain"
            />
            <h1 className="text-xs font-semibold text-center mt-2 mb-3">
              {name}
            </h1>
          </div>
        )}
      {isDetailPic && (
        <div
          onClick={() => {
            const audio = new Audio(cries.legacy);
            audio.volume = 0.3;
            audio
              .play()
              .catch((error) => console.error("Error playing audio:", error));
          }}
          className="flex flex-col gap-4 items-center"
        >
          <img
            src={
              sprites.versions["generation-v"]["black-white"].animated
                .front_default
            }
            alt={name}
            className="min-w-[100px] max-h-[100px] min-h-[100px] object-contain"
          />
          {types.slice(0, 1).map(({ type }, index) => (
            <div
              key={index}
              className={`rounded-2xl px-2 py-1 border-white border-2 text-white ${
                typeColors[type.name] || "bg-gray-500"
              }`}
            >
              <p>{type.name}</p>
            </div>
          ))}
        </div>
      )}
      {isDetailStat && (
        <div className="text-sm w-full p-2">
          <h2 className="text-[10px] font-semibold text-center">Stats</h2>
          <ul className="text-[7.5px] mt-2">
            {stats.slice(0, 6).map(({ stat, base_stat }, index) => (
              <li key={index} className="mb-2">
                <p className="capitalize">
                  {stat.name}: {base_stat}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-0.5">
                  <div
                    className="bg-amber-500 h-0.5 rounded-full"
                    style={{ width: `${(base_stat / 200) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isDetailProfile && (
        <div className="flex flex-col w-full text-xs pl-4">
          <h1 className="text-[10px] font-semibold text-center pt-1 pb-2">
            Profile
          </h1>
          {["Name", "Height", "Weight"].map((label, index) => (
            <h1 key={index} className="text-[10px] pt-2">
              {label}: {[name, height, weight][index]}
            </h1>
          ))}
        </div>
      )}
      {isDetailCatch && (
        <div
          onClick={() => {
            if (isDetailCatch && cries.latest) {
              const audio = new Audio(cries.latest);
              audio.volume = 0.3;
              audio
                .play()
                .catch((error) => console.error("Error playing audio:", error));
            }
            onClick?.();
          }}
          className="flex flex-col items-center text-center w-full text-xs font-semibold gap-2 "
        >
          <audio src={cries.latest}></audio>
          <img
            src={catchLogo}
            alt="Catch"
            className="max-w-[50px] max-h-[50px]"
          />
          <h1>Catch!!!</h1>
        </div>
      )}
      {isDetailAbility && (
        <div className="grow pt-1">
          <h2 className="text-[10px] font-semibold text-center pb-5">
            Abilities
          </h2>
          <ul className="text-[7.5px] mt-2">
            {abilities.slice(0, 2).map(({ ability }, index) => (
              <li key={index} className="mb-2 text-center capitalize">
                {ability.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isDetailMove && (
        <div>
          <h2 className="text-[10px] font-semibold text-center pt-1">Moves</h2>
          <ul className="text-[7.5px] py-1">
            {moves.slice(0, 4).map(({ move }, index) => (
              <li key={index} className="pt-2 text-center capitalize">
                {move.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
