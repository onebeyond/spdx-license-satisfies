var compare = require('spdx-compare')
var parse = require('spdx-expression-parse')
var ranges = require('spdx-ranges')

function rangesAreCompatible (first, second) {
  return (
    first.license === second.license ||
    ranges.some(function (range) {
      return (
        licenseInRange(first.license, range) &&
        licenseInRange(second.license, range)
      )
    })
  )
}

function licenseInRange (license, range) {
  return (
    range.indexOf(license) !== -1 ||
    range.some(function (element) {
      return (
        Array.isArray(element) &&
        element.indexOf(license) !== -1
      )
    })
  )
}

function identifierInRange (identifier, range) {
  return (
    identifier.license === range.license ||
    compare.gt(identifier.license, range.license) ||
    compare.eq(identifier.license, range.license)
  )
}

function licensesAreCompatible (first, second) {
  if (first.exception !== second.exception) {
    return false
  } else if (second.hasOwnProperty('license')) {
    if (second.hasOwnProperty('plus')) {
      if (first.hasOwnProperty('plus')) {
        // first+, second+
        return rangesAreCompatible(first, second)
      } else {
        // first, second+
        return identifierInRange(first, second)
      }
    } else {
      if (first.hasOwnProperty('plus')) {
        // first+, second
        return identifierInRange(second, first)
      } else {
        // first, second
        return first.license === second.license
      }
    }
  }
}

function replaceGPLOnlyOrLaterWithRanges (argument) {
  var license = argument.license
  if (license) {
    if (endsWith(license, '-or-later')) {
      argument.license = license.replace('-or-later', '')
      argument.plus = true
    } else if (endsWith(license, '-only')) {
      argument.license = license.replace('-only', '')
      delete argument.plus
    }
  } else if (argument.left && argument.right) {
    argument.left = replaceGPLOnlyOrLaterWithRanges(argument.left)
    argument.right = replaceGPLOnlyOrLaterWithRanges(argument.right)
  }
  return argument
}

function endsWith (string, substring) {
  return string.indexOf(substring) === string.length - substring.length
}

function licenseString (e) {
  if (e.hasOwnProperty('noassertion')) return 'NOASSERTION'
  if (e.license) {
    return (
      e.license +
      (e.plus ? '+' : '') +
      (e.exception ? ('WITH ' + e.exception) : '')
    )
  }
}

// Expand the given expression into an equivalent array where each member is an array of licenses AND'd
// together and the members are OR'd together. For example, `(MIT OR ISC) AND GPL-3.0` expands to
// `[[GPL-3.0 AND MIT], [ISC AND MIT]]`. Note that within each array of licenses, the entries are
// normalized (sorted) by license name.
function expand (expression) {
  return sort(expandInner(expression))
}

function expandInner (expression) {
  if (!expression.conjunction) return [{ [licenseString(expression)]: expression }]
  if (expression.conjunction === 'or') return expandInner(expression.left).concat(expandInner(expression.right))
  if (expression.conjunction === 'and') {
    var left = expandInner(expression.left)
    var right = expandInner(expression.right)
    return left.reduce(function (result, l) {
      right.forEach(function (r) { result.push(Object.assign({}, l, r)) })
      return result
    }, [])
  }
}

function sort (licenseList) {
  var sortedLicenseLists = licenseList
    .filter(function (e) { return Object.keys(e).length })
    .map(function (e) { return Object.keys(e).sort() })
  return sortedLicenseLists.map(function (list, i) {
    return list.map(function (license) { return licenseList[i][license] })
  })
}

/**
 * Checks if all the licenses on the first argument are satisfied by any license on the second argument.
 * @param {object[]} one - Source licenses.
 * @param {object[]} two - Target licenses.
 * @return {boolean} - Whether all the licenses on the first argument are satisfied by the target licenses.
 */
function isExpressionCompatible (one, two) {
  if (one.length !== two.length) return false
  return one.every(function (o) {
    return two.some(function (t) { return licensesAreCompatible(o, t) })
  })
}

/**
 * Checks whether any group of licenses satisfies any target group of licenses.
 * e.g. [[MIT], [GPL-1.0+, Apache-2.0]] checked against
 * [[ISC, GPL-2.0], [GPL-2.0, Apache-2.0]] will return true.
 * @param {(object[])[]} one - Groups of licenses to be checked.
 * @param {(object[])[]} two - Target groups of licenses.
 * @return {boolean} - Whether any group of licenses in "one" satisfies any group of licenses of the "two" (the target).
 */
function anyExpressionCompatible (one, two) {
  return one.some(function (o) {
    return two.some(function (t) {
      return isExpressionCompatible(o, t)
    })
  })
}

function checkArguments (first, second) {
  if (first.type === 'string' && second.type === 'string') {
    if (typeof first.value !== 'string' || typeof second.value !== 'string') throw new Error('Both arguments must be string.')
  } else {
    if (typeof first.value !== 'string') throw new Error('First argument must be string.')
    if (!Array.isArray(second.value)) throw new Error('Second argument must be array.')
  }
}

/**
 * Check if "first" satisfies "second".
 * @param {string} first - A valid SPDX expression to be tested.
 * @param {string} second - A valid SDPX expression to be tested against.
 * @return {boolean} - Whether "first" satisfies "second".
 */
function satisfies (first, second) {
  checkArguments({ value: first, type: 'string' }, { value: second, type: 'string' })
  var one = expand(replaceGPLOnlyOrLaterWithRanges(parse(first)))
  var two = expand(replaceGPLOnlyOrLaterWithRanges(parse(second)))
  return anyExpressionCompatible(one, two)
}

function parseLicensesArray (licenses) {
  var parsed = licenses.map(l => replaceGPLOnlyOrLaterWithRanges(parse(l)))
  if (parsed.some(({ conjunction }) => !!conjunction)) throw new Error('AND and OR operators are not allowed.')
  return parsed
}

/**
 * Check if "first" satisfies any of the licenses in "second".
 * @param {string} first - A valid SPDX expression to be tested.
 * @param {string[]} second - A list of licenses. AND and OR operators are not allowed.
 * @return {boolean} - Whether "first" satisfies any license in "second".
 */
function satisfiesAny (first, second) {
  checkArguments({value: first, type: 'string'}, {value: second, type: 'array'})
  var one = expand(replaceGPLOnlyOrLaterWithRanges(parse(first)))
  var two = parseLicensesArray(second).map(l => expand(l).flat())
  return anyExpressionCompatible(one, two)
}

/**
 * Check if "first" satisfies all the license in "second".
 * @param {string} first - A valid SPDX expression to be tested.
 * @param {string[]} second - A list of licenses. AND and OR operators are not allowed.
 * @return {boolean} - Whether "first" satisfies all licenses in "second".
 */
function satisfiesAll (first, second) {
  checkArguments({value: first, type: 'string'}, {value: second, type: 'array'})
  var one = expand(replaceGPLOnlyOrLaterWithRanges(parse(first)))
  var two = [parseLicensesArray(second)]
  return anyExpressionCompatible(one, two)
}

module.exports = {
  satisfies,
  satisfiesAny,
  satisfiesAll
}
