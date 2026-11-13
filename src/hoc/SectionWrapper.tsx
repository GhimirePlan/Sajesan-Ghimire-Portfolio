import { motion } from 'framer-motion';
import { styles } from '../constants/styles';
const SectionWrapper = (Component: React.ComponentType, idName: string) =>
  function Section() {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>
        <Component />
      </motion.section>
    );
  };
export default SectionWrapper;
