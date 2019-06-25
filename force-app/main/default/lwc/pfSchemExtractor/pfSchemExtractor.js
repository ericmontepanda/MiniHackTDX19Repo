import {
    LightningElement,
    track,
    wire
} from 'lwc';
//import apex class for FLS
import getObjFLS from '@salesforce/apex/PF_Schema_Extractor_LWC.getObjFLS';

export default class PfSchemExtractor extends LightningElement {
    @track objectAPIName = "";
    
    //import data
    @wire(getObjFLS, {
        obj: '$objectAPIName'
    })
    fields;

    objSelected(event) {
        console.log('stringify '+JSON.stringify(event));
        this.objectAPIName = event.detail.objectAPIName;
    }

}