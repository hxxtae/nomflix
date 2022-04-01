// Home.tsx
export const slideVariants = {
  hidden: (chk: boolean) => ({
    x: chk ? -window.innerWidth - 5 : window.innerWidth + 5
  }),
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1
    }
  },
  exit: (chk: boolean) => ({
    x: chk ? window.innerWidth + 5 : -window.innerWidth - 5,
    transition: {
      type: "tween",
      duration: 1
    }
  })
}

export const boxVariants = {
  before: {
    scale: 1
  },
  hover: {
    scale: 1.3,
    y: -50,
    height: "100%",
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
