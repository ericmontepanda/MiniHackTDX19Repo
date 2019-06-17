import { LightningElement, track, wire } from 'lwc';
import wordcloud from '@salesforce/resourceUrl/wordcloud2';
import {loadScript} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRecentAcc from '@salesforce/apex/recentAccounts.recAcc';
import getRecentWrap from '@salesforce/apex/recentAccounts.recentlyViewed';
import { NavigationMixin } from 'lightning/navigation';
export default class RedoAccounts extends NavigationMixin(LightningElement) {
    @track error;
    @track accts;
    @wire(getRecentAcc) recAccounts;
    @track result;

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
                    acc.pos,
                    acc.Id
                ]);
            });

            this.initializeWordCloud();
        } else if (error) {
            this.error = error;
            this.accts = [];
        }
        console.log('wired acccount ' + this.accts);
        
    }
   
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
            /*.then(() => {
                console.log('entering... scripts1');
                this.initializeWordCloud();
            })*/

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

        console.log('starting canvas result:' +this.accts);
        
        window.WordCloud(mycanvas, {
            list: this.accts,
            minFontSize: 200,
            fontFamily: 'Times, serif',
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#FF007F',
            click: function (item) {
                alert(item[0] + ': ' + item[2]);
                /*this.accountHomePageRef = {
                    type: "standard__objectPage",
                    attributes: {
                        "objectApiName": "Account",
                        "actionName": "home"
                    }
                };
                this[NavigationMixin.Navigate](this.accountHomePageRef);*/
                

                window.location.href = '/lightning/r/Account/' + item[2]+'/view';
                
            }
        });
        console.log('ending word cloud');
    }

    navigateToRecordViewPage() {
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0015400000HYqhPAAT',
                objectApiName: 'Account', // objectApiName is optional
                actionName: 'view'
            }
        });
    }
    

}