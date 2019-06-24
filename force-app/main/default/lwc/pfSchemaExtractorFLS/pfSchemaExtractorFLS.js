import { LightningElement, track, api} from 'lwc';

export default class PfSchemaExtractorFLS extends LightningElement {
    @api fieldList = [];
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
            label: 'Field Type',
            fieldName: 'FieldType',
            type: 'text',
            sortable: true
        }

    ];
   

}