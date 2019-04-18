import { expect } from "chai";
import { generateOutput } from "../../src/helpers/generateOutput";

describe("generateOutput", () => {
  let code = null;
  let query = null;

  beforeEach(done => {
    code = `<a href="/foo/bar"><a href="/foo/baz">`;
    query = "a";
    done();
  });

  afterEach(done => {
    code = null;
    query = null;
    done();
  });

  it("returns Object with `data` and `attrList` properties", () => {
    expect(generateOutput(code, query))
      .to.be.an("Object")
      .and.include.keys("data", "fields");
  });

  it("`fields` is an Array of attributes", () => {
    const { fields } = generateOutput(code, query);
    expect(fields)
      .to.be.an("Array")
      .and.to.have.members(["tag", "startIndex", "line", "href"]);
  });

  it("`data` is an Array of Objects that have expected props", () => {
    const { data } = generateOutput(code, query);
    expect(data)
      .to.be.an("Array")
      .and.to.have.length(2);
    expect(data[0]).to.be.an("Object");
    expect(data[0]).to.have.property("tag", "a");
    expect(data[0]).to.have.property("startIndex", 0);
    expect(data[0]).to.have.property("href", "/foo/bar");
    expect(data[0]).to.have.property("line", 1);
  });
});
