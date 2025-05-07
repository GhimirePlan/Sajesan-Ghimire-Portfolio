import { motion } from "framer-motion";
import { styles } from "../constants/styles";
import { useEffect, useState } from "react";

interface Props {
  Component: React.ComponentType;
  idName: string;
}

const SectionWrapper = (
  Component: Props["Component"],
  idName: Props["idName"]
) =>
  function HOC() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
      return null;
    }

    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
