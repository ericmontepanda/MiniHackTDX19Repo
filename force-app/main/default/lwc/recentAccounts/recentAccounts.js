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
        ['foo', 1],
        ['bar', 5]
    ];

    renderedCallback() {
        //console.log('FIRST DIV' +this.template.querySelector('div'));
        //console.log('my canvas' + this.template.querySelector('canvas.my_canvas')); 
        if (this.cloudInit) {
            return;
        }
        this.cloudInit = true;
      Promise.all([
                loadScript(this, wordcloud)
            ])
            .then(() => {
                //this.initializeWordCloud();
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

    initializeWordCloud(){
        //console.log('>>> my list' + this.list);
        WordCloud(this.template.querySelector('canvas.my_canvas'), {
            list: this.list 
        });
    } 
    
}
