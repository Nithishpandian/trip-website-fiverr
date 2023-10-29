import { React } from "react";
import "./../assets/styles/hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="hero-wrapper">
      <div className=" hero-container">
        {/* Hero left-section */}

        <div className=" hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              <h1 className="heading">
                <div>Explore</div>
                <div>the Best</div>
                <div>Place Now</div>
              </h1>
            </motion.h1>
          </div>

          {/* Connect Button */}

          <div className="contactus">
            <button className="button">Customize Now</button>
          </div>

          <div className=" stats">
            <div className="stat ">
              <span>
                <CountUp start={600} end={1200} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Successful Tours</span>
            </div>

            <div className="stat flexColCenter">
              <span>
                <CountUp start={2571} end={3500} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Travellers</span>
            </div>

            <div className="stat flexColCenter">
              <span>
                <CountUp end={30} />
                <span>+</span>
              </span>
              <span className="secondaryText">Countries Certified</span>
            </div>
          </div>
        </div>

        {/* Hero Right-section*/}

        <div className=" hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="image-container"
          >
            <img src="" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
