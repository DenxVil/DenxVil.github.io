import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { textVariant, fadeIn } from "../../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      variants={fadeIn("left", "spring", index * 0.5, 0.75)}
      className="bg-black-100 p-6 rounded-2xl xs:w-[320px] w-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: experience.iconBg }}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
        <div>
          <h3 className="text-white text-[20px] font-bold">{experience.title}</h3>
          <p className="text-secondary text-[16px] font-semibold">
            {experience.company_name}
          </p>
          <p className="text-secondary text-[14px]">{experience.date}</p>
        </div>
      </div>

      <ul className="list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");