var Campsi = require('campsi-core');
var fs = require('fs');

require('../index');
Campsi.create('form', {
    options: {
        fields: [{
            type: 'form',
            name: 'text',
            label: 'text',
            fields: [{
                type: 'text',
                name: 'textField',
                label: 'text'
            }, {
                type: 'text/area',
                name: 'textArea',
                label: 'text/area'
            }, {
                type: 'text/code',
                name: 'textCode',
                label: 'text/code'
            }, {
                type: 'text/password',
                name: 'textPassword',
                label: 'text/password'
            }]
        },{
            type: 'form',
            name: 'number',
            label: 'number',
            fields: [{
                type: 'number',
                name: 'number',
                label: 'number'
            }, {
                type: 'number/rating',
                name: 'rating',
                label: 'number/rating'
            }]
        },{
            type: 'form',
            name: 'select',
            label: 'select',
            fields: [{
                type: 'select/dropdown',
                name: 'dropdown',
                label: 'select/dropdown',
                options: [{
                    name: 'value 1',
                    label: 'value 1'
                },{
                    name: 'value 2',
                    label: 'value 2'
                }]
            }, {
                type: 'select/radios',
                name: 'radios',
                label: 'select/radios',
                options: [{
                    name: 'value 1',
                    label: 'value 1'
                },{
                    name: 'value 2',
                    label: 'value 2'
                }]
            }, {
                type: 'checkbox/group',
                name: 'checkboxGroup',
                label: 'checkbox/group',
                options: [{
                    name: 'value 1',
                    label: 'value 1'
                },{
                    name: 'value 2',
                    label: 'value 2'
                }]
            }]
        }]
    }
}, function (comp) {
    fs.writeFile('showcase.html', comp.render().html(), function (err) {
        console.info(err)
    });
});

