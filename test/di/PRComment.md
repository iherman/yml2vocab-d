This is the first in several steps to clean up the Security Vocabulary. The main changes are:

- Anchors have been added to all term definition to allow for an external reference. That is the only change on the spec text itself, no content has been changed. Note that this covers the same ground as https://github.com/w3c/vc-data-model/issues/1080 but adapted to the date integrity case
- For all properties, and also for some of the classes, a `defined by` tag has been added in the (YAML) vocabulary definition. This is translated into the `rdfs:isDefinedBy` statement in the formal vocabularies, and a textual translation thereof in the HTML text. Any other text in the property definitions have been removed. Bottom line: the official term definition is the in VCWG specifications, the vocabulary just "refers" to that. Some additional comments:
  - The starting point of the vocabulary was the [CCG text](ttps://w3c-ccg.github.io/security-vocab/) which was pruned significantly, but kept, as deprecated or reserved terms, those that, in our information, are in use out there (but not formally defined by a VCWG spec). Welcome on possibly more to-be-removed or not-to-be-removed terms would be welcome…
  - There are three terms in the vocabulary, namely `proof`, `nonce` and `revoked`, that have ***no*** formal definition, but are used, or to-be-used in our spec as well.. The vocabulary has a comments on this, and these must be solved asap
  - All official terms are actually defined in the DI spec. The only exceptions are the `Ed25519VerificationKey2020` and `Ed25519Signature2020` classes that are defined in a normative Appendix of [eddsa](ttps://www.w3.org/TR/vc-di-eddsa). 
  - The deprecated terms refer back to the ccg specification.
  - Some class have no direct reference in the spec, their roles are, sort of, "scaffolding" in the vocabulary. This is perfectly fine, they are intermediary classes and carry no other role.
  - The definition of deprecated terms is kept to the bare minimum. In particular, no range or domain statement on other elements on the vocabulary are kept. After all, these are mostly placeholder items, to avoid 404-s on their relevant identifiers.
  - This part of the PR is the counterpart of https://github.com/w3c/vc-data-model/issues/1061 for the security vocabulary.
  - The PR is also relevant to #116 see, in particular, https://github.com/w3c/vc-data-integrity/pull/116#discussion_r1266875515


### For reviewers

The PR does not include the visible files, i.e., the vocabulary in HTML/JSON-LD/Turtle. This is because the generation of these files happen automatically by a github action. To make the reviews possible:

- The files have been generated separately, and can be reached from [the relevant index file](https://w3c.github.io/yml2vocab/previews/di/) in the tool repository for review.
- The textual changes are to be made on the `vocab/credentials/v2/vocabulary.yml` and, for the text framework in the generated HTML, on the `vocab/credentials/v2/template.html` files. (These are the vocabulary generation input files.)
