import { parse, render, walkSync, ELEMENT_NODE, transform, html } from "ultrahtml";
import swap from "ultrahtml/transformers/swap";
import sanitize from "ultrahtml/transformers/sanitize";

const ast = parse(`<h1>Hello world!</h1>`);

const c = walkSync(ast, (node) => {
  //if (node.type === ELEMENT_NODE && node.name === "script")

  if (node.name === 'h1') {
    node.name = 'p'
    // throw new Error('element p', node)
  }
})

console.log(await render(ast))

//

const output = await transform(`<h1>Hello world!</h1>`, [
  sanitize({ allowElements: ['p'] }),
]);

console.log(output)