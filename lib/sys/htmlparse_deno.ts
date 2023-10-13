/**
 * Parsing module for HTML — Deno version using Deno DOM
 * 
 * @packageDocumentation
 */

import { DOMParser, HTMLDocument, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

interface MinimalDocument {
    getElementById: (id: string) => Element | null;
    innerHTML: () => string;

    document: HTMLDocument
}

export class FakeDocument implements MinimalDocument {
    private _document: HTMLDocument;

    constructor(content: string) {
        const doc = (new DOMParser()).parseFromString(content, 'text/html');
        if (doc === null) {
            throw new Error("Error in parsing");
        } else {
            this._document = doc;
        }
    }

    getElementById = (id: string): Element | null => {
        return this._document.getElementById(id);
    }

    innerHTML = (): string => {
        const retval = this._document.documentElement?.innerHTML;
        return retval ? retval : "";
    }

    get document(): HTMLDocument { return this._document }

}


// ======== testing ========

const html = `
<html lang="en">
  <head>
    <meta charset='utf-8'/>
    <title></title>
    <script class="remove" src="https://www.w3.org/Tools/respec/respec-w3c"></script>
    <script>
      function remove_status_remark() {
          const sotd = document.getElementById("sotd");
          const p = sotd.getElementsByTagName('p')[0];
          sotd.removeChild(p);
      }
    </script>
  </head>
  <body>
    <section>
      <h2>Namespaces</h2>
      <p>This specification makes use of the following namespaces:</p>
      <dl class="terms" id="namespaces">
      </dl>
    </section>
  </body>
</html>
`


const addChild = (document: HTMLDocument, parent: Element, element: string, content: string | undefined = undefined): Element => {
    const new_element = document.createElement(element);
    parent.appendChild(new_element);
    if (content !== undefined) new_element.innerHTML = content;
    return new_element;
}


const doc: MinimalDocument = new FakeDocument('html');
const ns_dl = doc.getElementById('namespaces');
if (ns_dl) {
    for (const ns of ["https://example.org/", "https://example.com"]) {
        const dt = addChild(doc.document, ns_dl, 'dt');
        addChild(doc.document, dt, 'code', ns);
        const dd = addChild(doc.document, ns_dl, 'dd');
        addChild(doc.document, dd, 'code', `url=${ns}`);
    }
}
console.log(doc.innerHTML());


