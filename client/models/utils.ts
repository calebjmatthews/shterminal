class Utils {
  // Returns an array of numbers like range(3, 2) -> [2, 3, 4]
  range(size: number, startAt: number = 0) {
    return [...Array(size).keys()].map((integer) => integer + startAt);
  }

  randomUnicode() {
    let char = String.fromCharCode(0x0021 + Math.random() * (0x007F-0x0021+1))
    if (char.length > 0 && char != " ") {
      return char;
    }
    return this.randomUnicode();
  }

  randomHeavyTailed() {
    let rdm = Math.random();
    if (rdm < 0.5) {
      return rdm * rdm;
    }
    else {
      return 1 - ((1 - rdm) * (1 - rdm));
    }
  }
}

export let utils = new Utils();
