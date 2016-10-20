var Campsi = require('campsi-core');
var baseComponents = require('../index');

Campsi.create('form', {
    options: {
        fields: [{
            type: 'text',
            name: 'title',
            label: 'title'
        }, {
            type: 'text/area',
            name: 'content',
            label: 'content'
        }]
    }
}, function (comp) {
    console.info(comp.render().html());
});
