import { LightningElement, track, wire, api } from 'lwc';
import getProductList from '@salesforce/apex/productList.getProductList';

export default class ProductList extends LightningElement {
    @api recordId;
    

    @wire(getProductList, {
        recId: '$recordId'
    }) prodList;

}