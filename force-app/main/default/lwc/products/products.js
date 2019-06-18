import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class Products extends LightningElement {
    // @api productList = [];
    @api product = [];
    @track selectedprodId = "";
    @track prodId;

    handleTileClick(event) {
        console.log('what is my event... ' +event.target.title);
        console.log('what is my event... ' + this.product.Name  );
        this.selectedprodId = event.detail;
        console.log('what is my event... ' + this.selectedprodId);
        //this.selectedprodId = event.detail;
    }

}