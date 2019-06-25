import { LightningElement, track, wire, api} from 'lwc';
import getObjectList from '@salesforce/apex/PF_Schema_Extractor_LWC.getSFDCObject';


export default class PF_Custom_Object_LWC extends LightningElement {
    @track error;
    @track data;
    @track rowOffset = 0;
    @track loadMoreStatus;
    @api totalNumberOfRows;
    @track sortedDirection = 'asc';
    @track sortedBy = 'LabelName';
    @track columns = [{
            label: 'Label',
            fieldName: 'LabelName',
            type: 'text',
            sortable: true
        },
        {
            label: 'API Name',
            fieldName: 'APIName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Custom Object',
            fieldName: 'isCustomObject',
            type: 'boolean',
            sortable: true
        }

    ];

    @wire(getObjectList) objList({
        error,
        data
    }) {
        if (data) {
            this.data = data;
        } else if (error) {
            this.error = error;
        }
    }

      // The method onsort event handler
    updateColumnSorting(event) {
        let fieldName = event.detail.fieldName;
        let sortDirection = event.detail.sortDirection;
        // assign the latest attribute with the sorted column fieldName and sorted direction
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        console.log('Sort fieldName: ' + fieldName);
        console.log('sort direction: ' + sortDirection);

        let reverse = sortDirection !== 'asc';

        let data_clone = JSON.parse(JSON.stringify(this.data));

        console.log('BEFORE data_clone:' + JSON.stringify(data_clone));

        this.data = data_clone.sort(this.sortBy(fieldName, reverse));

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