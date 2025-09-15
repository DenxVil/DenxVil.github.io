import React from "react";
import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28 flex flex-col items-center justify-center" key={technology.name}>
          <div className="w-20 h-20 rounded-full bg-tertiary flex items-center justify-center mb-2">
            <img 
              src={technology.icon} 
              alt={technology.name}
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-secondary text-center text-sm">{technology.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");