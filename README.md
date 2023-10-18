# spdx-license-satisfies

<p align="center">
  <a href="https://www.npmjs.com/package/@onebeyond/spdx-license-satisfies" target="_blank"><img src="https://img.shields.io/npm/v/@onebeyond/spdx-license-satisfies.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@onebeyond/spdx-license-satisfies" target="_blank"><img src="https://img.shields.io/npm/dm/@onebeyond/spdx-license-satisfies.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/onebeyond/spdx-license-satisfies/actions/workflows/ci.yml" target="_blank"><img src="https://github.com/onebeyond/spdx-license-satisfies/actions/workflows/ci.yml/badge.svg" alt="ci workflow" /></a>
  <a href="https://github.com/onebeyond/spdx-license-satisfies/actions/workflows/publish.yml" target="_blank"><img src="https://github.com/onebeyond/spdx-license-satisfies/actions/workflows/publish.yml/badge.svg" alt="publish workflow" /></a>
  <a href="https://codeclimate.com/github/onebeyond/spdx-license-satisfies/maintainability"><img src="https://api.codeclimate.com/v1/badges/b82d888950f7f1b3f6a7/maintainability" /></a>
  <a href="https://codeclimate.com/github/onebeyond/spdx-license-satisfies/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b82d888950f7f1b3f6a7/test_coverage" /></a>
  <a href="https://socket.dev/npm/package/@onebeyond/spdx-license-satisfies" target="_blank"><img src="https://socket.dev/api/badge/npm/package/@onebeyond/spdx-license-satisfies" alt="socket.dev" /></a>
  <a href="https://img.shields.io/github/all-contributors/onebeyond/spdx-license-satisfies?color=ee8449&style=flat-square" target="_blank"><img src="https://img.shields.io/github/all-contributors/onebeyond/spdx-license-satisfies?color=ee8449&style=flat-square" alt="all-contributors" /></a>
</p>

This project is a fork from [jslicense/spdx-satisfies.js](https://github.com/jslicense/spdx-satisfies.js). Please, note that the interface is slightly different.

## `satisfies(first, second)`

Checks if `first` satisfies `second`. Both arguments must be a string with a simple license or a [SPDX expressions](https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/). Disjunctive `OR` operator, conjunctive `AND` operator and exception `WITH` operator are allowed.

```js
const { satisfies } = require('spdx-license-satisfies');

satisfies('MIT AND (Apache-2.0 OR GPL-1.0)', 'MIT AND Apache-2.0') // true
satisfies('MIT AND Apache-2.0', 'Apache-2.0') // false
```

## `satisfiesAny(first, second)`

Checks if `first` satisfies any license in `second`.

- `first` must be a string with a license or a [SPDX expression](https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/). Disjunctive `OR` operator, conjunctive `AND` operator and exception `WITH` operator are allowed.
- `second` must be an array of licenses. Disjunctive `OR` operator and conjunctive `AND`operator are **not** allowed.

```js
const { satisfiesAny } = require('spdx-license-satisfies');

satisfiesAny('(MIT AND GPL-1.0) OR Apache-2.0', ['Apache-2.0']) // true
satisfiesAny('MIT OR GPL-1.0', ['Apache-2.0']) // false
```

## `satisfiesAll(first, second)`

Checks if `first` satisfies all the licenses in `second`.

- `first` must be a string with a license or a [SPDX expression](https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/). Disjunctive `OR` operator, conjunctive `AND` operator and exception `WITH` operator are allowed.
- `second` must be an array of licenses. Disjunctive `OR` operator and conjunctive `AND`operator are **not** allowed.

```js
const { satisfiesAll } = require('spdx-license-satisfies');

satisfiesAll('MIT AND GPL-1.0 OR Apache-2.0', ['Apache-2.0']) // true
satisfiesAll('MIT OR GPL-1.0', ['MIT','GPL-1.0']) // false
```

## Examples

See a list with more [examples](./test/cases.js).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/neodmy"><img src="https://avatars.githubusercontent.com/u/36865163?v=4?s=100" width="100px;" alt="David Miguel Yusta"/><br /><sub><b>David Miguel Yusta</b></sub></a><br /><a href="https://github.com/onebeyond/spdx-license-satisfies/commits?author=neodmy" title="Code">💻</a> <a href="https://github.com/onebeyond/spdx-license-satisfies/commits?author=neodmy" title="Documentation">📖</a> <a href="https://github.com/onebeyond/spdx-license-satisfies/commits?author=neodmy" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.one-beyond.com/"><img src="https://avatars.githubusercontent.com/u/50929081?v=4?s=100" width="100px;" alt="Fernando de la Torre"/><br /><sub><b>Fernando de la Torre</b></sub></a><br /><a href="https://github.com/onebeyond/spdx-license-satisfies/pulls?q=is%3Apr+reviewed-by%3Ananotower" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/inigomarquinez"><img src="https://avatars.githubusercontent.com/u/25435858?v=4?s=100" width="100px;" alt="Íñigo Marquínez Prado"/><br /><sub><b>Íñigo Marquínez Prado</b></sub></a><br /><a href="https://github.com/onebeyond/spdx-license-satisfies/pulls?q=is%3Apr+reviewed-by%3Ainigomarquinez" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
