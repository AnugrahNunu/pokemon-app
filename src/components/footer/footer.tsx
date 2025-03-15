import React from "react";
import arsenal from "../../assets/icons8-pokemon-go-96.png";
import home from "../../assets/icons8-home-50.png";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleClickArsenal = () => {
    navigate("/arsenal");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-center fixed bottom-0 w-full gap-25 bg-blue-600 rounded-t-2xl">
      <div
        onClick={handleClickHome}
        className="flex flex-col text-white items-center text-xs py-1.5"
      >
        <img src={home} alt="Home" className="w-[50px] h-[50px] py-1" />
        <p className="text-[10px]">Home</p>
      </div>
      <div
        onClick={handleClickArsenal}
        className="flex flex-col text-white items-center text-xs py-1.5"
      >
        <img
          src={arsenal}
          alt="My Pokemon"
          className="w-[50px] h-[50px] py-1"
        />
        <p className="text-[10px]">Arsenal</p>
      </div>
    </div>
  );
};

export default Footer;
