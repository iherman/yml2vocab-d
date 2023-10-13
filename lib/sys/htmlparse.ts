/**
 * Parsing module for HTML — Node.js version using JSDOM
 * 
 * @packageDocumentation
 */
import { JSDOM } from 'jsdom';

/**
 * Return the DOM Document node for the template text
 * @param template_text 
 * @returns 
 */
export function parseTemplate(template_text: string): Document {
    return (new JSDOM(template_text)).window.document;
}
