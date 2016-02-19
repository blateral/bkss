# bkss - A Template for kss-node
Use the template files located in `dist/template`. For more details on kss-node, check out [github.com/kss-node](https://github.com/kss-node/kss-node)

## Installation via NPM
`npm install --save-dev bkss`

## Settings
You can override some of the template's default settings by providing a json file with the config object.


```json
{
    "source": "src/css",
    "destination": "dist/docs",
    "template": "node_modules/bkss/dist/template",
    "css": [
        "path/to/some-3rd-party.css", "http://some-fancy-webfonts.com/comic-serif-sans"
    ],
    "js": [
        "some-3rd-party-lib", "http://lolcdn.corn/jquerybootstrapmoottols.js"
    ],
    "title": "My awesome project"
}
```

## Using the CLI for KSS
[Here you can find more information about this topic](https://github.com/kss-node/kss-node#using-the-command-line-tool).

Let's say that you have your own configuration file `my-custom-bkss-config.json` located in your project's root directory.

Run this from the command line:<br>
```bash
kss --config my-custom-bkss-config.json
```
**Note**: This example assumes, that you have installed kss-node as a global dependency.
