import React from "react";
import { motion } from "framer-motion";
import { styles } from "../../constants/styles";
import { fadeIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";

const About = () => {
  const personalInfo = [
    { label: 'Name', value: 'Denvil (Harsh)' },
    { label: 'Age', value: '20' },
    { label: 'Location', value: 'Delhi' },
    { label: 'Experience', value: '4+ years coding' },
  ];

  const skills = [
    'Python',
    'Telethon',
    'HTML',
    'CSS',
    'React',
    'Three.js',
    'SQL',
    'Logo Design',
  ];

  const teamMembers = [
    'Ğhóšț',
    '『DENVIL』',
    '么SpїÐɣ๛',
    '「MYLO」',
    'ÚTKÂRSH卐',
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Developer, Designer, and Esports Competitor. With over 4 years of coding experience, 
        I've evolved from a curious developer to a multifaceted creator who bridges the gap 
        between technology and competition.
      </motion.p>

      {/* Content Grid */}
      <div className="mt-20 grid lg:grid-cols-3 gap-8">
        {/* Personal Info Card */}
        <motion.div 
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="bg-tertiary p-6 rounded-2xl"
        >
          <h3 className="text-white text-[20px] font-bold mb-6">Personal Info</h3>
          <div className="space-y-4">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-secondary font-medium">{info.label}</span>
                <span className="text-white font-semibold">{info.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div 
          variants={fadeIn("up", "spring", 1, 0.75)}
          className="bg-tertiary p-6 rounded-2xl"
        >
          <h3 className="text-white text-[20px] font-bold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-[#915EFF]/20 border border-[#915EFF]/30 rounded-lg text-[#915EFF] text-sm font-medium hover:bg-[#915EFF]/30 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Esports Team Card */}
        <motion.div 
          variants={fadeIn("up", "spring", 1.5, 0.75)}
          className="bg-tertiary p-6 rounded-2xl"
        >
          <h3 className="text-white text-[20px] font-bold mb-2">
            Esports: 𝐓𝐄𝐀𝐌 𝐊𝐑𝐘𝐎
          </h3>
          <p className="text-secondary mb-6">Professional Esports Team</p>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-secondary/20 border border-secondary/30 rounded-lg text-secondary text-sm font-medium text-center hover:bg-secondary/30 transition-all duration-200"
              >
                {member}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Description */}
      <motion.div 
        variants={fadeIn("up", "spring", 2, 0.75)}
        className="mt-20"
      >
        <div className="bg-tertiary p-8 rounded-2xl">
          <h3 className="text-white text-[24px] font-bold mb-6 text-center">My Journey</h3>
          <p className="text-secondary leading-relaxed text-[17px] text-center max-w-4xl mx-auto">
            My passion lies in crafting innovative digital solutions while dominating the esports arena with 
            Team KRYO. Whether it's building advanced Telegram bots, designing stunning user 
            interfaces, or strategizing in competitive gaming, I bring the same level of dedication 
            and precision to everything I do.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#915EFF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold text-[#915EFF] mb-2">Development</h4>
              <p className="text-sm text-secondary">Building innovative solutions with modern technologies</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-secondary mb-2">Design</h4>
              <p className="text-sm text-secondary">Creating visually stunning and user-friendly interfaces</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Esports</h4>
              <p className="text-sm text-secondary">Competing professionally with Team KRYO</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");