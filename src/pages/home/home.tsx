import React, { useEffect } from "react";
import { useGetPokemon } from "../../hooks/home/useGetPokemon";
import { Result } from "../../service/home/type";
import Card from "../../components/card/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import audio from "../../assets/Pokemon (A Button) - Sound Effect (HD) (128).mp3";

const Home: React.FC = () => {
  const { pokemon, pagination, setPagination } = useGetPokemon();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const offsetFromUrl = searchParams.get("after");
    if (offsetFromUrl) {
      setPagination((prev) => ({
        ...prev,
        offset: parseInt(offsetFromUrl, 10),
      }));
    }
  }, []);

  useEffect(() => {
    setSearchParams({ after: pagination.offset.toString() });
  }, [pagination.offset]);

  const handlePrevButton = () => {
    if (pagination.offset >= 10) {
      setPagination({
        offset: pagination.offset - 10,
      });
    }
  };

  const handleNextButton = () => {
    if (pagination.offset >= 0) {
      setPagination({
        offset: pagination.offset + 10,
      });
    }
  };

  const handleClick = (name: string) => {
    navigate(`/detail/${name}`);
  };

  return (
    <div className="flex flex-col w-full mt-10 md:mt-16 mb-15">
      <section className="flex flex-col md:flex-row mt-15">
        <button
          onClick={handlePrevButton}
          className="hidden sm:block border border-white text-white p-4 rounded-lg hover:bg-white hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 place-items-center scrollbar-thin w-full px-10">
          {pokemon?.map((item: Result) => (
            <div
              key={item.name}
              onClick={() => {
                const audioPlay = new Audio(audio);
                audioPlay.volume = 0.5;
                audioPlay.play();
                handleClick(item.name);
              }}
            >
              <Card
                data={item}
                isDetailPic={false}
                isDetailStat={false}
                isDetailProfile={false}
                isDetailAbility={false}
                isDetailMove={false}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleNextButton}
          className="hidden sm:block border border-white text-white p-4 rounded-lg hover:bg-white hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>

        <div className="flex flex-row justify-center gap-x-20 my-10 md:hidden">
          <button
            onClick={handlePrevButton}
            className="border border-white text-white p-4 rounded-lg hover:bg-white hover:text-black"
          >
            Prev
          </button>
          <button
            onClick={handleNextButton}
            className="border border-white text-white p-4 rounded-lg hover:bg-white hover:text-black"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
