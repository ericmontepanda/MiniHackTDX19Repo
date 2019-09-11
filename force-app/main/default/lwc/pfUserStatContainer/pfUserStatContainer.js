import {
    LightningElement,
    track,
    wire
} from 'lwc';
import {
    registerListener
} from 'c/pubsub';
import {
    CurrentPageReference
} from 'lightning/navigation';

export default class PfUserStatContainer extends LightningElement {
    @track profileName = 'No Profile Selected';
    @track profileId = '';
    @track profileCount = '';
    @wire(CurrentPageReference) pageRef;

    profileSelected(event) {
        debugger;
        console.log('startging');
        alert('hello worlds' +this.event);
        debugger;
        //console.log('stringify ' + JSON.stringify(event));
        //this.objectAPIName = event.detail.objectAPIName;
    }

    

}