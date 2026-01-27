import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AboutPearl.css';

const AboutPearl = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.15, 0.35], ["20%", "0%", "-40%"]);
    const titleScale = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0.8]);

    const ghostX = useTransform(scrollYProgress, [0, 0.15, 0.45], ["-52%", "-50%", "-60%"]);
    const mainTitleX = useTransform(scrollYProgress, [0, 0.15], ["5%", "0%"]);

    const row1Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const row1Y = useTransform(scrollYProgress, [0.35, 0.5], ["80px", "0px"]);

    const lineHeight = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "85%"]);

    const gridY = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "-80%"]);

    const row2Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
    const row2Y = useTransform(scrollYProgress, [0.6, 0.8], ["80px", "0px"]);

    return (
        <section ref={sectionRef} className="about-pearl-section">
            <div className="about-pearl-sticky-container">

                <motion.div
                    className="title-container"
                    style={{
                        opacity: titleOpacity,
                        y: titleY,
                        scale: titleScale
                    }}
                >
                    <motion.div className="ghost-text" style={{ x: ghostX }}>
                        ABOUT PEARL
                    </motion.div>
                    <motion.div className="main-title" style={{ x: mainTitleX }}>
                        <span className="text-white">ABOUT</span>
                        <span className="text-pink">PEARL</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="content-grid"
                    style={{ y: gridY }}
                >

                    <div className="line-container">
                        <motion.div
                            className="center-line"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <motion.div
                        className="content-row"
                        style={{ opacity: row1Opacity, y: row1Y }}
                    >

                        <div className="col-asset align-right">
                            <div className="comic-asset-box">
                                <span>Comic asset</span>
                            </div>
                        </div>
                        <div className="col-text align-left">
                            <h3 className="content-heading">WHAT IS <br />
                                <span className="text-cyan">PEARL ?</span>
                            </h3>
                            <p className="content-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="content-row"
                        style={{ opacity: row2Opacity, y: row2Y }}
                    >
                        <div className="col-text align-right">
                            <h3 className="content-heading"> WHAT IS THE <br />
                                <span className="text-pink">THEME ?</span>
                            </h3>
                            <p className="content-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                            </p>
                        </div>
                        <div className="col-asset align-left">
                            <div className="comic-asset-box">
                                <span>Comic asset</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default AboutPearl;