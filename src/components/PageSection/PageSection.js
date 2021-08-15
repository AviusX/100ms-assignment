import { routeVariants } from '../../variants';

import { motion } from 'framer-motion';

const PageSection = props => (
    <motion.section className="w-full flex flex-col"
        variants={routeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {props.children}
    </motion.section>
);

export default PageSection;