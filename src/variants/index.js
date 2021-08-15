export const routeVariants = {
    hidden: {
        x: 250,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "easeInOut"
        }
    },
    exit: {
        x: -250,
        opacity: 0,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "easeInOut"
        }
    }
}

export const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.75,
            ease: "easeIn"
        }
    }
}

export const cardVariants = {
    hidden: {
        opacity: 0,
        x: "25%"
    },
    visible: {
        x: 0,
        opacity: 100,
    },
    hover: {
        scale: 1.02,
        y: -5,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "backOut"
        }
    }
}