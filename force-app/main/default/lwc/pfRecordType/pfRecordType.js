import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class PfProfile extends LightningElement {
    @api rtList = [];
    @track sortedBy = 'Name';
    @track sortedDirection = 'asc';
    @track columns = [{
            label: 'Id',
            fieldName: 'Id',
            type: 'text',
            sortable: true
        }, {
            label: 'Name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        }, {
            label: 'Developer Name',
            fieldName: 'DeveloperName',
            type: 'text',
            sortable: true
        }, {
            label: 'Developer Name',
            fieldName: 'DeveloperName',
            type: 'text',
            sortable: true
        }, {
            label: 'Description',
            fieldName: 'Description',
            type: 'text',
            sortable: true
        }, {
            label: 'Object',
            fieldName: 'SobjectType',
            type: 'text',
            sortable: true
        }, {
            label: 'Active',
            fieldName: 'IsActive',
            type: 'text',
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

        let data_clone = JSON.parse(JSON.stringify(this.rtList));

        console.log('BEFORE data_clone:' + JSON.stringify(data_clone));

        this.rtList = data_clone.sort(this.sortBy(fieldName, reverse));

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