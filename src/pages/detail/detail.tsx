import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDetailPokemon } from "../../hooks/detail/useDetailPokemon";
import Card from "../../components/card/card";

const Detail: React.FC = () => {
  const { name } = useParams();
  const { pokemonDetail } = useDetailPokemon(name || "");
  const navigate = useNavigate();

  const handleCatch = (name: string) => {
    navigate(`/catch/${name}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center pt-25 md:pt-20">
      {pokemonDetail && (
        <>
          <section className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-2">
              <Card data={pokemonDetail} isDetailPic={true} />
              <Card data={pokemonDetail} isDetailStat={true} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Card data={pokemonDetail} isDetailProfile={true} />
              <Card
                data={pokemonDetail}
                isDetailCatch={true}
                onClick={() => handleCatch(pokemonDetail.name)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Card data={pokemonDetail} isDetailAbility={true} />
              <Card data={pokemonDetail} isDetailMove={true} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Detail;
