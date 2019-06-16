import { LightningElement,track, api } from 'lwc';
import wordcloud from '@salesforce/resourceUrl/wordcloud2';
import {
    loadScript
} from 'lightning/platformResourceLoader';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';



export default class RecentAccountChild extends LightningElement {
    @api accList = [];
    @api accList2 =[];
    @track accts = [];
    @track error;
    list = [
        ['foo', 12],
        ['bar', 6],
        ['foo', 20],
        ['bar', 18]
    ];

    renderedCallback() {
        this.accts = this.accList2;
        console.log('what is my this accts ' +this.accts);
        /*console.log('connected callback ....' + JSON.stringify(this.accList));
        console.log('connected callbacks ....' + JSON.stringify(this.accList2));*/
        

        if (this.cloudInit) {
            return;
        }
        this.cloudInit = true;
        loadScript(this, wordcloud)
            .then(() => {
                console.log('entering... scripts1');
                //this.initializeWordCloud(this.accts);
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


    initializeWordCloud(ls) {
        var mycanvas = this.template.querySelector("canvas.my_canvas");
        console.log('my accouts ' + ls);
        /*this.accList.forEach(acc => {
            this.accts.push([
                acc.Name,
                acc.pos
            ]);
        });*/
        
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