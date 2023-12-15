import * as yaml                                        from 'yaml';
import { RawVocab, ValidationError, ValidationResults } from './common';
import { parser, ValidationError as VError }            from '@exodus/schemasafe';

// const schema = require('./vocab.schema.json');
import schema from "./vocab.schema.json" with { type: "json" };

/**
 * Perform a JSON Schema validation on the YAML content. Done by converting the YAML content into 
 * a Javascript object (using the YAML parser) and checking the object against a schema.
 * 
 * @param yaml_raw_content The raw textual content of the YAML file (i.e, presumably after reading the file itself)
 * @returns 
 */
export function validateWithSchema(yaml_raw_content: string): ValidationResults {
    try {
        // deno-lint-ignore no-explicit-any
        const yaml_content: any = yaml.parse(yaml_raw_content);
        const parse = parser(schema, { 
            mode: "default",
            includeErrors: true, 
            allErrors: true,
            requireStringValidation: false
        });
        const result = parse(JSON.stringify(yaml_content));
        if (result.valid !== true) {
            const errors = result.errors?.map((e: VError): ValidationError => {
                return {
                    message: `Error at "${e.instanceLocation}": ${e.keywordLocation}`,
                }
            })
            return {
                vocab: null,
                error: errors ? errors : [],
            };
        } else {
            return {
                vocab: yaml_content as RawVocab,
                error: []
            }
        }
    } catch (e) {
        // This is the case if the yaml parser throws some errors
        return {
            vocab: null,
            error: [{ message: `${e}` }]
        };
    }
}
