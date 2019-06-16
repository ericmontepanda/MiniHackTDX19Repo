import {
    LightningElement,
    track,
    wire
} from 'lwc';

import wordcloud from '@salesforce/resourceUrl/wordcloud2';
import {
    loadScript
} from 'lightning/platformResourceLoader';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

import getRecentAcc from '@salesforce/apex/recentAccounts.recAcc';
import getRecentWrap from '@salesforce/apex/recentAccounts.recentlyViewed';
export default class RecentAccounts extends LightningElement {
    @track error;
    @track accts = [];
    @wire(getRecentWrap)
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
                    acc.Id
                ]);
            });
        } else if (error) {
            this.error = error;
            this.accts = [];
        }
        console.log('wired acccount ' + this.accts);
    }

    @wire(getRecentAcc) recAcc;
    /*recAcc({
        error,
        data
    }) {



    }*/

    cloudInit = false;

    list = [
        ['foo', 12],
        ['bar', 6],
        ['foo', 20],
        ['bar', 18]
    ];

    /*connectedCallback() {
        console.log('connected data' + this.accts);
        
        
        loadScript(this, wordcloud)
            .then(() => {
                this.initializeWordCloud();
            })

            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading ERROR',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });

    }*/
    renderedCallback() {
        console.log('connected data' + this.accts);
        console.log('record data... ' + this.recWrap.data);
        if (this.cloudInit) {
            return;
        }
        this.cloudInit = true;
        loadScript(this, wordcloud)
            .then(() => {
                this.initializeWordCloud();
            })

            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading ERROR',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }


    initializeWordCloud() {
        //const accts = this.accts;
        var mycanvas = this.template.querySelector("canvas.my_canvas");
        console.log('word cloud... ' + this.accts);
        window.WordCloud(mycanvas, {
            list: this.list,
            minFontSize: 200,
            fontFamily: 'Times, serif',
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#FF007F',

        });
    }


}