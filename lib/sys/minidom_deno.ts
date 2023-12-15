/**
 * Parsing module for HTML — Deno version using Deno DOM
 * 
 * @packageDocumentation
 */

import { DOMParser, HTMLDocument, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
export { Element };


/**
 * A thin layer on top of the regular DOM Document. Necessary to "hide" the differences between
 * the JSDOM and Deno's DOM WASM implementations; higher layers should not depend on these.
 * 
 * This version is on top of the Deno implementation.
 * 
 */
export class MiniDOM {
    private _document: HTMLDocument;

    constructor(html_text: string) {
        const doc = (new DOMParser()).parseFromString(html_text, 'text/html');
        if (doc) {
            this._document = doc;
        } else {
            throw new Error("Problem with parsing the template text");
        }
    }

    get document(): HTMLDocument {
        return this._document;
    }

    /**
     * Add a new HTML Element to a parent, and return the new element.
     * 
     * @param parent - The parent HTML Element
     * @param element - The new element's name
     * @param content - The new element's (HTML) content
     * @returns the new element
     * 
     */
    addChild(parent: Element, element: string, content: string | undefined = undefined): Element {
        const new_element = this._document.createElement(element);
        parent.appendChild(new_element);
        if (content !== undefined) new_element.innerHTML = content;
        return new_element;
    }

    /**
     * Add some text to an element, including the obligatory checks that Typescript imposes
     * 
     * @param content - text to add
     * @param element HTML Element to add it to
     * @returns 
     * 
     * @internal
     */
    addText(content: string, element: Element | null): Element | null {
        if (element) {
            element.textContent = content;
        }
        return element;
    }

    /**
     * Just the mirroring of the official DOM call.
     * 
     * @param id 
     * @returns 
     */
    getElementById(id: string): Element | null {
        return this._document.getElementById(id);
    }

    /**
      * Just the mirroring of the official DOM call.
      * 
      * @param tag 
      * @returns 
      */
    getElementsByTagName(tag: string): Element[] {
        return this._document.getElementsByTagName(tag);
    }

    /**
     * Just the mirroring of the official DOM call.
     * 
     * @returns 
     */
    innerHTML(): string {
        const retval = this._document.documentElement?.innerHTML;
        return retval ? retval : "";
    }

}
