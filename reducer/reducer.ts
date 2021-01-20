const defaultState = {
  index: 0,
  color: randomColor(0),
};

const reducer = (quoteState, action) => {
  if (action.type === "getQuote") {
    const max = action.payload;
    let nextIndex = quoteState.index;
    while (nextIndex === quoteState.index) {
      nextIndex = Math.floor(Math.random() * Math.floor(max));
    }
    return {
      ...quoteState,
      index: nextIndex,
      color: randomColor(0),
    };
  }
};

function randomColor(brightness) {
  function randomChannel(brightness) {
    var r = 255 - brightness;
    var n = 0 | (Math.random() * r + brightness);
    var s = n.toString(16);
    return s.length === 1 ? "0" + s : s;
  }
  return (
    "#" +
    randomChannel(brightness) +
    randomChannel(brightness) +
    randomChannel(brightness)
  );
}

export { reducer, defaultState };
