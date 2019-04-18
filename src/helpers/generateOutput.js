import cheerio from "cheerio";

const addKeysToSet = (object, set) => {
  Object.keys(object).forEach(e => set.add(e));
};

const dataArrayFromDOMCollection = ($domCollection, callback) => {
  return Array.from($domCollection).reduce((accum, elem) => {
    return accum.concat(callback(elem));
  }, []);
};

const generateOutput = (code, query) => {
  const $ = cheerio.load(code, { xmlMode: true, withStartIndices: true });
  const $elements = $(query);

  const attrSet = new Set();
  const data = dataArrayFromDOMCollection($elements, elem => {
    const elemData = {
      tag: elem.name,
      startIndex: elem.startIndex,
      line: code.substr(0, elem.startIndex).split("\n").length,
      ...elem.attribs
    };
    addKeysToSet(elemData, attrSet);
    return elemData;
  });
  const fields = [...attrSet];

  return { fields, data };
};

export { generateOutput, dataArrayFromDOMCollection, addKeysToSet };
