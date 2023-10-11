# Generate RDFS vocabulary files from YAML — [Deno](https://deno.land) version


Functionally, but also in terms of the Typescript code, this version is almost identical to its [sister project](https://github.com/w3c/yml2vocab/), except that this version runs on top of [Deno](https://deno.land) instead of [Node.js](https://nodejs.org). One of the reasons to create this version was to make it sure that `yml2vocab` has no dependency on the node.js runtime. (This package makes use of Deno's facility to load npm packages directly from the npm repository.)

At the moment, however, this project is stalled... it seems that the deno runtime for node is incomplete, and makes it impossible to use the jsdom npm package. Looking for alternative possibilities...
