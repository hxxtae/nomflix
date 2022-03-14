export const slideVariants = {
  hidden: {
    x: window.outerWidth + 5
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1
    }
  },
  exit: {
    x: -window.outerWidth - 5,
    transition: {
      type: "tween",
      duration: 1
    }
  }
}

export const boxVariants = {
  before: {
    scale: 0
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3
    }
  }
}

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3
    }
  },
}
