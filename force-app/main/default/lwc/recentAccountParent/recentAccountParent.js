import { LightningElement, track, wire } from 'lwc';
import getRecentAcc from '@salesforce/apex/recentAccounts.recAcc';
import getRecentWrap from '@salesforce/apex/recentAccounts.recentlyViewed';

export default class RecentAccountParent extends LightningElement {

    @track error;
    @track accts = [];

    /*@wire(getRecentWrap)
    recWrap({
        error,
        data
    }) {
        this.accts = [];
        console.log('wired data' + JSON.stringify(data));
        if (data) {
            data.forEach(acc => {
                this.accts.push([
                    acc.Name,
                    acc.pos
                ]);
            });
        } else if (error) {
            this.error = error;
            this.accts = [];
        }
        console.log('wired acccount ' + this.accts);
    }*/
    @wire(getRecentWrap) recWrap;
    @wire(getRecentAcc) recAcc;

}
