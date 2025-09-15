import React from "react";
import { motion } from "framer-motion";
import { styles } from "../../constants/styles";
import DenvilLogo3DLazy from "../DenvilLogo3DLazy";
import StarFieldLazy from "../StarFieldLazy";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      {/* 3D Star Field Background */}
      <StarFieldLazy />
      
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#915EFF] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-tertiary rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Denvil</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            I develop 3D visuals, user <br className="hidden sm:block" />
            interfaces and web applications
          </p>
        </div>
      </div>

      {/* 3D DENVIL Logo */}
      <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
        <motion.div 
          className="h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <DenvilLogo3DLazy className="h-full w-full" />
        </motion.div>
      </div>

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;