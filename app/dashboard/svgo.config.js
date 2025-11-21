module.exports = {
  multipass: true,
  plugins: [
    'removeDoctype',
    'removeComments',
    'cleanupAttrs',
    'convertStyleToAttrs',
    'inlineStyles',
    'minifyStyles',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'cleanupIDs',
    'removeDimensions'
  ]
};
