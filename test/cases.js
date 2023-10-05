const satisfies = [
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
]

module.exports = {
  satisfies,
}
