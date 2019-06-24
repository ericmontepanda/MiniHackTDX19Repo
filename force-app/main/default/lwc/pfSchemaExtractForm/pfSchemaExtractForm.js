import { LightningElement, track, wire } from 'lwc';
import getSFDCObj from '@salesforce/apex/PF_Schema_Extractor_LWC.getSFDCObjectList';

export default class PfSchemaExtractForm extends LightningElement {
    @track objectName = [];
    @track objAPIName = "";
    @track selectedObj = "";
    @track isButtonDisabled = true;
    errors;

    @wire(getSFDCObj)
    sfdclist({
        error,
        data
    }) {
        this.objectName = [];
        if (data) {
            data.forEach(obj => {
                this.objectName.push({
                    value: obj.APIName,
                    label: obj.LabelName
                });
            });

        } else if (error) {
            this.error = error;

        }
    }

    onObjectChange(event) {
        console.log('entering');
        this.selectedObj = "";
        this.selectedObj = event.target.value;
        this.notifyParent();
        console.log('what is my selected object ' + this.selectedObj);
    }

    notifyParent() {
        const selectedEvent = new CustomEvent('selected', {
            detail: {
                objectAPIName: this.selectedObj
            }
        });
        console.log('what is my event ' + this.objectAPIName);
        this.dispatchEvent(selectedEvent);
    }

}