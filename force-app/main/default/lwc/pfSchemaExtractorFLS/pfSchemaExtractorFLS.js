import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class PfSchemaExtractorFLS extends LightningElement {
    @api fieldList = [];
    @track sortedBy = 'labelName';
    @track sortedDirection = 'asc';
    @track columns = [{
            label: 'Label',
            fieldName: 'labelName',
            type: 'text',
            sortable: true
        },
        {
            label: 'API Name',
            fieldName: 'apiName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Type',
            fieldName: 'fieldType',
            type: 'text',
            sortable: true
        },
        {
            label: 'Reference',
            fieldName: 'relationshipName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Field Length',
            fieldName: 'fieldLength',
            type: 'number',
            sortable: true
        },
        {
            label: 'Help Text',
            fieldName: 'inlineHelpText',
            type: 'text',
            sortable: true
        },
        {
            label: 'Required',
            fieldName: 'requiredField',
            type: 'text',
            sortable: true
        },
        {
            label: 'Custom Field',
            fieldName: 'customField',
            type: 'text',
            sortable: true
        },
        {
            label: 'Editable',
            fieldName: 'editableField',
            type: 'boolean',
            sortable: true
        },
        {
            label: 'External Field',
            fieldName: 'externalField',
            type: 'boolean',
            sortable: true
        }
    ];

    updateColumnSorting(event) {
        let fieldName = event.detail.fieldName;
        let sortDirection = event.detail.sortDirection;
        // assign the latest attribute with the sorted column fieldName and sorted direction
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        console.log('Sort fieldName: ' + fieldName);
        console.log('sort direction: ' + sortDirection);

        let reverse = sortDirection !== 'asc';

        let data_clone = JSON.parse(JSON.stringify(this.fieldList));

        console.log('BEFORE data_clone:' + JSON.stringify(data_clone));

        this.fieldList = data_clone.sort(this.sortBy(fieldName, reverse));

        console.log('AFTER data_clone:' + JSON.stringify(data_clone));

    }

    sortBy(field, reverse, primer) {

        console.log('Sort by:reverse:' + reverse);

        var key = function (x) {
            return primer ? primer(x[field]) : x[field]
        };

        return function (a, b) {
            var A = key(a),
                B = key(b);

            if (A === undefined) A = '';
            if (B === undefined) B = '';

            return (A < B ? -1 : (A > B ? 1 : 0)) * [1, -1][+!!reverse];
        }
    }


}