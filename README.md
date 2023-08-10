# Amplenote Github Plugin

Right now this plugin has one purpose: to create some text that includes a Github issue title and a link to the issue. This is primarily meant to be used to set up Tasks in Amplenote that link to the corresponding issue in Github.

## Usage

1. Install the plugin from the [Amplenote Plugin Directory](https://www.amplenote.com/plugins)
2. On the page where you want the link, add text defining the owner and repo with a label of `Github Project:`
   1. e.g. `Github Project: darthmachina/amplenote-github`
3. Wherever you want the title and link, type the issue number
4. Select the issue number
5. From the toolbar select `Github Issue Link` from the right most button menu
6. Sit back and watch the magic

# Development

Written in plain Javascript, residing in the `lib/plugin.js` file.
## Testing

Run `NODE_OPTIONS=--experimental-vm-modules npm test` to run the tests.

If it complains about jsdom being absent, run `npm install -D jest-environment-jsdom` and try again.

### Run tests continuously as modifying the plugin

```bash
NODE_OPTIONS=--experimental-vm-modules npm run test -- --watch
```

## Technologies used to help with this project

* https://esbuild.github.io/getting-started/#your-first-bundle
* https://jestjs.io/
* https://www.gitclear.com
