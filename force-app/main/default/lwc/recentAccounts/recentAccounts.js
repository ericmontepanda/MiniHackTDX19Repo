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
export default class RecentAccounts extends LightningElement {
    @track error;
    @wire(getRecentAcc) recAcc;
    cloudInit = false;
    
    list = [
        ['foo', 12],
        ['bar', 6],
        ['foo', 20],
        ['bar', 18]
    ];


    renderedCallback() {
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
        var mycanvas = this.template.querySelector("canvas.my_canvas");
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