import { LightningElement, track, wire } from 'lwc';
import wordcloud from '@salesforce/resourceUrl/wordcloud2';
import {loadScript} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecentAcc from '@salesforce/apex/recentAccounts.recAcc';
import getRecentWrap from '@salesforce/apex/recentAccounts.recentlyViewed';
export default class RedoAccounts extends LightningElement {
    @track error;
    @track accts;
    @wire(getRecentAcc) recAccounts;
    @wire(getRecentWrap) recWrap;
    @track result;
   
    list = [
        ['foo', 12],
        ['bar', 6],
        ['foo', 20],
        ['bar', 18]
    ];

    connectedCallback() {
        if (this.cloudInit) {
            return;
        }
        this.cloudInit = true;
        
        loadScript(this, wordcloud)
            .then(() => {
                console.log('entering... scripts1');
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
        console.log('entering word cloud');
        var mycanvas = this.template.querySelector("canvas.my_canvas");

        getRecentWrap()
             .then(result => {
                 console.log('SUCCESS what is my results ' + this.recAccounts);
                 //this.accts = result.data;
             })
             .catch(error => {
                 console.log('ERROR what is my results ');
                 this.error = error;
             });

        console.log('starting canvas result:' +this.accts);
        
        window.WordCloud(mycanvas, {
            list: this.list,
            minFontSize: 200,
            fontFamily: 'Times, serif',
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#FF007F',

        });
        console.log('ending word cloud');
    }
}