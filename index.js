'use strict';
var isBrowser = require('is-browser');
module.exports = {
    'array': require('./lib/array/component'),
    'array/item': require('./lib/array/item/component'),
    'blocks': require('./lib/blocks/component'),
    'blocks/block': require('./lib/blocks/block/component'),
    'button': require('./lib/button/component'),
    'checkbox': require('./lib/checkbox/component'),
    'checkbox/group': require('./lib/checkbox/group/component'),
    'date': require('./lib/date/component'),
    'date/datetime': require('./lib/date/datetime/component'),
    'date/time': require('./lib/date/time/component'),
    'file': require('./lib/file/component'),
    'file/renderer': require('./lib/file/renderer/component'),
    'file/renderer/image': require('./lib/file/renderer/image/component'),
    'file/image': require('./lib/file/image/component'),
    'form': require('./lib/form/component'),
    'form/field': require('./lib/form/field/component'),
    'geo/address': require('./lib/geo/address/component'),
    'handlebars': require('./lib/handlebars/component'),
    'number': require('./lib/number/component'),
    'number/rating': require('./lib/number/rating/component'),
    'payment/credit-card': require('./lib/payment/credit-card/component'),
    'select/dropdown': require('./lib/select/dropdown/component'),
    'select/radios': require('./lib/select/radios/component'),
    'select/ajax': require('./lib/select/ajax/component'),
    'text': require('./lib/text/component'),
    'text/area': require('./lib/text/area/component'),
    'text/code': require('./lib/text/code/component'),
    'uploader': require('./lib/uploader/component'),
    'layout/divider': require('./lib/layout/divider/component'),
    'text/password': require('./lib/text/password/component'),
    'text/rich': require('./lib/text/rich/component'),
    'url': require('./lib/url/component'),
    'tags': require('./lib/tags/component')
};
if (isBrowser && typeof window.onComponentsReady === 'function') {
    window.onComponentsReady();
}