import React from "react";
import logo from "../../assets/icons8-pokemon-ball-64.png";

const Header: React.FC = () => {
  return (
    <div className="flex justify-center fixed top-0 w-full bg-red-600 rounded-b-2xl z-20">
      <img src={logo} alt="Pokemon Logo" className="py-1" />
    </div>
  );
};

export default Header;
