# spdx-license-satisfies

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
