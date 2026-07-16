[![CI status](https://badgen.net/github/checks/maxmilton/adblock-rules?label=ci)](https://github.com/maxmilton/adblock-rules/actions)
[![Licence](https://badgen.net/github/license/maxmilton/adblock-rules)](./LICENSE)

# Custom Adblock Rules

My custom, highly restrictive adblock rules. Designed to be used with the Brave web browser.

## Usage

1. Open Brave adblock UI (paste into URL bar):
   ```
   about:adblock
   ```

2. Choose either `mm-mobile` or `mm-workstation` list and add to the "Add custom filter lists":
   ```
   https://raw.githubusercontent.com/maxmilton/adblock-rules/master/lists/mm-mobile.txt
   ```
   ```
   https://raw.githubusercontent.com/maxmilton/adblock-rules/master/lists/mm-workstation.txt
   ```

3. Also add `mm-development` on dev machines
   ```
   https://raw.githubusercontent.com/maxmilton/adblock-rules/master/lists/mm-development.txt
   ```

4. Optionally, pick and choose filter rules from the [optional filters list](./lists/optional.txt) and paste into "Create custom filters".
5. If a filter you use references a user script (e.g., filter rule contains `redirect=user-*.js`), copy the script content from [`lists/scriptlets/*.js`](./lists/scriptlets) into "Custom scriptlets".

### Development & Testing

TODO: Write instructions.

## Browser support

Recent versions of Brave browser.

## Bugs

Report any bugs you encounter on the [GitHub issue tracker](https://github.com/maxmilton/adblock-rules/issues).

## References

- <https://gist.github.com/maxmilton/8f352d731a40e6deacda043ec84b8be3> my original gist
- <https://github.com/gorhill/uBlock/wiki/Static-filter-syntax>
- <https://help.adblockplus.org/hc/articles/360062733293-How-to-write-filters>
- <https://github.com/brave/adblock-lists>
- <https://github.com/brave/adblock-rust>
- <https://github.com/brave/adblock-resources>
- <https://github.com/AdguardTeam/AGLint>
- <https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree/src/compatibility-tables>

## License

MIT license. See [LICENSE](./LICENSE).

---

© [Max Milton](https://maxmilton.com)
