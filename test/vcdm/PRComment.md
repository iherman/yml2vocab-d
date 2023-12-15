This is the first in several steps to clean up the Credentials Vocabulary. The main changes are:

- Anchors have been added to all term definition to allow for an external reference. That is the only change on the spec text itself, no content has been changed. Note that this change takes care of issue #1080
- For all properties, and also for some of the classes, a `defined by` tag has been added in the (YAML) vocabulary definition. This is translated into the `rdfs:isDefinedBy` statement in the formal vocabularies, and a textual translation thereof in the HTML text. Any other text in the property definitions have been removed. Bottom line: the official term definition is the in VCWG specifications, the vocabulary just "refers" to that. Some additional comments:
  - There is one term in the vocabulary, namely `serviceEndpoint` that has ***no*** formal definition. The vocabulary has a comment on this, and this must be solved asap
  - All terms are actually defined in the VCDM spec. The only exception is the `JsonSchema2023` class is defined by the [schema spec](https://www.w3.org/TR/vc-json-schema/#jsonschema2023). 
  - The deprecated terms refer back to the v1.1 of the VCDM specification.
  - Some class have no direct reference in the spec, their roles are, sort of, "scaffolding" in the vocabulary. This is perfectly fine, they are intermediary classes and carry no other role.
  - The definition of deprecated terms is kept to the bare minimum. In particular, no range or domain statement on other elements on the vocabulary are kept. After all, these are mostly placeholder items, to avoid 404-s on their relevant identifiers.
  - This part of the PR takes care of issue #1061


### For reviewers

The PR does not include the visible files, i.e., the vocabulary in HTML/JSON-LD/Turtle. This is because the generation of these files happen automatically by a github action. To make the reviews possible:

- The files have been generated separately, and can be reached from [the relevant index file](https://w3c.github.io/yml2vocab/previews/vcdm/) in the tool repository for review.
- The textual changes are to be made on the `vocab/credentials/v2/vocabulary.yml` and, for the text framework in the generated HTML, on the `vocab/credentials/v2/template.html` files. (These are the vocabulary generation input files.)
