const satisfies = {
  valid: [
    [true, 'MIT', 'MIT'],
    [true, 'GPL-1.0+', 'GPL-2.0'],
    [true, 'GPL-2.0', 'GPL-1.0+'],
    [true, 'GPL-1.0+', 'GPL-2.0+'],
    [false, 'MIT', 'Apache-2.0'],

    [true, 'MIT AND Apache-2.0', 'MIT AND Apache-2.0'],
    [false, 'MIT AND Apache-2.0', 'MIT'],
    [false, 'MIT AND Apache-2.0', 'Apache-2.0'],
    [false, 'MIT AND Apache-2.0', 'MIT AND GPL-1.0'],
    [false, 'MIT AND Apache-2.0', 'GPL-1.0 AND Apache-2.0'],

    [true, 'MIT OR Apache-2.0', 'MIT'],
    [true, 'MIT OR Apache-2.0', 'Apache-2.0'],
    [true, 'MIT OR Apache-2.0', 'MIT OR GPL-1.0'],
    [true, 'MIT OR Apache-2.0', 'GPL-1.0 OR Apache-2.0'],
    [false, 'MIT OR Apache-2.0', 'GPL-1.0 OR 0BSD'],

    [true, 'MIT AND (Apache-2.0 OR GPL-1.0)', 'MIT AND Apache-2.0'],
    [true, 'MIT AND (Apache-2.0 OR GPL-1.0)', 'MIT AND GPL-1.0'],
    [false, 'MIT AND (Apache-2.0 OR GPL-1.0)', 'MIT AND 0BSD'],
    [false, 'MIT AND (Apache-2.0 OR GPL-1.0)', '0BSD AND Apache-2.0'],
    [false, 'MIT AND (Apache-2.0 OR GPL-1.0)', '0BSD AND GPL-1.0'],

    [true, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', 'MIT AND Apache-2.0'],
    [true, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', '0BSD AND Apache-2.0'],
    [true, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', 'MIT AND GPL-1.0'],
    [true, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', '0BSD AND GPL-1.0'],
    [false, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', 'MIT AND GFDL-1.1'],
    [false, '(MIT OR 0BSD) AND (Apache-2.0 OR GPL-1.0)', 'GFDL-1.1 AND Apache-2.0'],

    [true, 'GPL-2.0+ WITH Bison-exception-2.2', 'GPL-2.0+ WITH Bison-exception-2.2'],
    [false, 'GPL-2.0+ WITH Bison-exception-2.2', 'GPL-2.0+ WITH Bootloader-exception'],
    [false, 'GPL-2.0+', 'GPL-2.0+ WITH Bootloader-exception'],
  ],
  error: [
    ['Both arguments must be string.', ['MIT'], 'Apache-2.0'],
    ['Both arguments must be string.', 'MIT', ['Apache-2.0']],
  ]
}

const satisfiesWithArrayErrors = [
  ['First argument must be string.', ['MIT'], ['Apache-2.0']],
  ['Second argument must be array.', 'MIT', 'Apache-2.0'],
  ['AND and OR operators are not allowed.', 'MIT', ['Apache-2.0', 'MIT AND GPL-1.0']],
  ['AND and OR operators are not allowed.', 'MIT', ['Apache-2.0', 'MIT OR GPL-1.0']],
]

const satisfiesAny = {
  valid: [
    [true, 'MIT', ['MIT']],
    [false, 'MIT', ['GPL-1.0']],

    [true, 'MIT OR GPL-1.0', ['MIT']],
    [true, 'MIT OR GPL-1.0', ['GPL-1.0']],
    [true, 'MIT OR GPL-1.0', ['MIT','GPL-1.0']],
    [false, 'MIT OR GPL-1.0', ['Apache-2.0']],

    [true, '(MIT AND GPL-1.0) OR Apache-2.0', ['Apache-2.0']],
    [false, 'MIT AND GPL-1.0', ['GPL-1.0']],
    [false, 'MIT AND GPL-1.0', ['MIT']],
    [false, 'MIT AND GPL-1.0', ['MIT', 'GPL-1.0']],
    [false, 'MIT AND GPL-1.0', ['Apache-2.0']],
  ],
  error: satisfiesWithArrayErrors
}

const satisfiesAll = {
  valid: [
    [true, 'MIT', ['MIT']],
    [false, 'MIT', ['GPL-1.0']],

    [true, 'MIT AND GPL-1.0', ['GPL-1.0', 'MIT']],
    [true, 'MIT AND GPL-1.0 AND Apache-2.0', ['GPL-1.0', 'MIT', 'Apache-2.0']],
    [true, 'MIT AND GPL-1.0 OR Apache-2.0', ['Apache-2.0']],
    [false, 'MIT AND GPL-1.0', ['GPL-1.0']],
    [false, 'MIT AND GPL-1.0', ['Apache-2.0']],

    [true, 'MIT OR GPL-1.0', ['MIT']],
    [true, 'MIT OR GPL-1.0', ['GPL-1.0']],
    [false, 'MIT OR GPL-1.0', ['MIT','GPL-1.0']],
    [false, 'MIT OR GPL-1.0', ['Apache-2.0']],
  ],
  error: satisfiesWithArrayErrors
}

module.exports = {
  satisfies,
  satisfiesAny,
  satisfiesAll,
}
