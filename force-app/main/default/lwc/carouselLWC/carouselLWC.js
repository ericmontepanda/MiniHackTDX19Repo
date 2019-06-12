import {
    LightningElement,
    //track,
    wire,
    api
} from 'lwc';

/*import {
    getRecord
} from 'lightning/uiRecordApi';*/

import getAnimals from '@salesforce/apex/CarouselClass.fetchAnimals';

export default class CarouselLWC extends LightningElement {
    @api recordId;

    
    /*@wire(getAnimals, {
        recId: '$recordId'
    }) animals({errors, data}){
        if (data){
            this.animals = data; this.errors = undefined;
        } else if (errors){
            this.animals = undefined; this.errors = errors;
        }
    }*/
    @wire(getAnimals, {
        recId : '$recordId'
    }) animals;


}