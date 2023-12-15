# Generate RDFS vocabulary files from YAML — [Deno](https://deno.land) version


Functionally, but also in terms of the Typescript code, this version is almost identical to the [original `yml2vocab` project](https://github.com/w3c/yml2vocab/), except that this version runs on top of [`Deno`](https://deno.land) instead of [Node.js](https://nodejs.org). One of the reasons to create this version was to make it sure that `yml2vocab` has no dependency on the node.js runtime. (This project makes use of Deno's facility to load npm packages directly from the npm repository.)

## Installation and usage

Obviously, `Deno` must be installed, see the [official installation page](https://docs.deno.com/runtime/manual/getting_started/installation) for the details. Once that is done, the rest is simple:

1. Clone this repository
2. Run 
    
    `deno run --allow-read --allow-write --allow-env $DIRECTORY_TO_THE_CLONE/main.ts`. 
    
    See the [original project](https://github.com/w3c/yml2vocab/) for the possible command line arguments. The flag `-A` can also be used instead of the `--allow-*` flags, although that gives more rights to the code than what is strictly necessary.
3. Alternatively, you can run

    `deno compile --allow-read --allow-write --allow-env main.ts`

    in the clone directory; this will produce an executable file (by default, `yml2vocab-d`) which can be used from that point on.


## Differences in the modules of the two versions

### Code differences

Due to the differences between the `node.js`  and `Deno` environments, there are some differences in the source code. Namely, two typescript modules are fairly different due to the incompatibilities of the underlying packages. At the moment, these are:

- `lib/schema.ts`, the module responsible for running a JSON Schema checker on the YML input. The `node.js` version relies on the [`Ajv validator`](https://www.npmjs.com/package/ajv), whereas the `Deno` version relies on [`@exodus/schemasafe`](https://www.npmjs.com/package/@exodus/schemasafe) validator. I may have missed some tricks, but I was unable to run `Ajv` with `Deno`, due to the peculiar way `Ajv` imports the 2019 validator version (which does not work for `Ajv`). On the other hand, `@exodus/schemasafe` would not work with TS+`node.js` due to some package clash.

- `lib/html.ts`, the module generating the HTML+RDFa version of the vocabulary. The difference in code is one single line: while the `node.js` version imports the `lib/sys/minidom_node.ts` module, the `Deno` version imports `lib/sys/minidom_deno.ts`. These two modules provide a very thin layer on top of HTML DOM implementations, relying on the [`JSDOM`](https://www.npmjs.com/package/jsdom) and the [`Deno DOM`](https://deno.land/x/deno_dom) packages, respectively. I tried to run the npm `JSDOM` package with `Deno`, but there is (still) an incompatibility in the `node.js` runtime implemented in `Deno` which makes it impossible to run it. By separating that thin layer I could reduce the differences between the two versions of `yml2vocab`.

All other TypeScript modules are identical.

### Differences in import statements

There is also a difference in the way TypeScript on `node.js` and `Deno` handles imports. With `Deno` the import statement _must_ explicitly use the `.ts` extension for file names, whereas this is not possible in `node.js`. I.e., the `node.js` version of the statement

```
import * as yml2vocab from './index'
```

becomes

```
import * as yml2vocab from './index.ts'
```

in `Deno`. Although it is possible to run a `Deno` program with the `--unstable-sloppy-imports` flag, it will produce a series of warnings which is ugly. There are also slight differences when importing npm modules.

Luckily, it is possible to reduce the pain by using import maps in the `deno.json` file. By using those, the `node.js` "format" can be used verbatim, and the import map will do the job of mapping the import statements to what `Deno` wants to see. I expect these differences to disappear over time, though.

