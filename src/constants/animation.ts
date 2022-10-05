// -----------------------------
// used Home.tsx
// -----------------------------
export const loadVariants = {
  before: {
    rotate: 0,
  },
  start: {
    rotate: 360,
    transition: {
      type: 'tween',
      duration: 1,
      repeat: Infinity,
    }
  }
}


// -----------------------------
// used SliderView.tsx
// -----------------------------
export const slideVariants = {
  hidden: (decreChk: boolean) => ({
    x: decreChk ? -window.innerWidth - 5 : window.innerWidth + 5
  }),
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1
    }
  },
  exit: (decreChk: boolean) => ({
    x: decreChk ? window.innerWidth + 5 : -window.innerWidth - 5,
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

// -----------------------------
// used Header.tsx
// -----------------------------
export const navVariants = {
  top: {
    backgroundColor: "rgba(20, 20, 20, 0)"
  },
  scroll: {
    backgroundColor: "rgba(20, 20, 20, 1)"
  }
};
