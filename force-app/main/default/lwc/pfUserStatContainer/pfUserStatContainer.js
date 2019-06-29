import {
    LightningElement, track, wire
} from 'lwc';


export default class PfUserStatContainer extends LightningElement {
    @track profileName = 'No Profile Selected';
    @track selectedProfId = '';
    @track selectedProfVal = '';

    objSelected(event) {
        console.log('stringify ' + JSON.stringify(event));
        this.selectedProf = event.detail.profileName;
        this.selectedProfId = event.detail.profileCount;
        this.selectedProfVal = event.detail.pofileId;
    }

}