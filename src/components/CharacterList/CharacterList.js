import { containerVariants } from '../../variants';

import { motion } from 'framer-motion';

const CharacterList = props => (
    <motion.div
        className="flex flex-col items-center my-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        { props.children}
    </motion.div >
);

export default CharacterList;