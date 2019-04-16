const test = require("ava");
const { upperCase, addAHundred } = require("./../functions");

test("Given a string, return the upper case version of it", t => {
  const string = "this is an example string";
  const upperCaseString = "THIS IS AN EXAMPLE STRING";
  t.assert(upperCase(string) === upperCaseString);
});

test("bar", async t => {
  const number = 123;
  t.assert(addAHundred(123) === 223);
});
