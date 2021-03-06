const postcss = require('postcss');
const less = require('postcss-less-engine');

function LessTransformer({source, filename}) {
    return postcss([less({})])
        .process(source, {parser: less.parser, from: filename})
        .then(({css, map}) => ({source: css, map: map}));
}

LessTransformer.parser = true;
LessTransformer.extensions = ['.less'];
LessTransformer.compatible = '.css';

module.exports = LessTransformer;
