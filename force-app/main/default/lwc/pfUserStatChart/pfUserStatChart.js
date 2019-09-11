import {
    LightningElement,
    track,
    wire
} from 'lwc';
import getActiveUsers from '@salesforce/apex/PF_User_Statistics.getActiveUsers';
import getActiveAdminUsers from '@salesforce/apex/PF_User_Statistics.getActiveAdminUsers';
import getUserProfiles from '@salesforce/apex/PF_User_Statistics.getUserProfile';
import {
    loadScript
} from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

import {
    fireEvent
} from 'c/pubsub';

import {
    CurrentPageReference
} from 'lightning/navigation';

export default class PfUserStatChart
extends LightningElement {
    @track countActiveUser;
    @track countActiveAdminUser;
    @track error;
    @track profName;
    @track profId;
    @track profCount;
    @track bgColor;

    @track config;
    @track chart;
    chartjsInitialized = false;

    @track selectedProf = 'No Profile Selected';
    @track selectedProfId;
    @track selectedProfVal = '';

    @wire(CurrentPageReference) pageRef;
    @wire(getActiveUsers) actUser({
        error,
        data
    }) {
        if (data) {
            this.countActiveUser = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.countActiveUser = undefined;
        }
    }

    @wire(getActiveAdminUsers) adminUser({
        error,
        data
    }) {
        if (data) {
            this.countActiveAdminUser = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.countActiveAdminUser = undefined;
        }
    }

    @wire(getUserProfiles) userProfiles({
        error,
        data
    }) {
        this.profName = [];
        this.profId = [];
        this.profCount = [];
        this.bgColor = [];

        loadScript(this, chartjs);

        if (data) {
            data.forEach(prof => {
                this.profName.push([prof.profileName]);
                this.profId.push([prof.profileId]);
                this.profCount.push([prof.countUsers]);
                //console.log('random... ' + this.random_rgba());
                this.bgColor.push([this.random_rgba()]);
            });

            this.startChartJS();
        } else if (error) {
            this.error = error;
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    random_rgba() {
        var r = this.getRandomInt(0, 255);
        var g = this.getRandomInt(0, 255);
        var b = this.getRandomInt(0, 255);

        return 'rgb(' + r + "," + g + "," + b + ')';
    }


    /*connectedCallback() {
        loadScript(this, chartjs)
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

    startChartJS() {
        this.config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: this.profCount,
                    backgroundColor: this.bgColor,
                    hoverBackgroundColor: this.bgColor,
                    hoverBorderWidth: 5,
                    id: this.profId
                }],
                labels: this.profName
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                onClick: this.notifyParent
            }
        };

        const ctx = this.template
            .querySelector('canvas.donut')
            .getContext('2d');
        this.chart = new window.Chart(ctx, this.config);

        //ctx.addEventListener('selectprofile', this.callEvent());

    }

    notifyParent(evt) {
        
        console.log('notify parent', this.chart);

        var activePoints = this.chart.getElementsAtEvent(evt);
        console.log('evemmts// ', activePoints);
        if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];

            this.selectedProf = chartData.labels[idx];
            this.selectedProfVal = chartData.datasets[0].data[idx];
            this.selectedProfId = chartData.datasets[0].id[idx];
            var url = "http://example.com/?label=" + this.selectedProf + "&value=" + this.selectedProfVal + "id " + this.selectedProfId;

            console.log('itemName is ' + this.selectedProfId);
            console.log('what is this??? ', this);
            //alert(url);
        }

        var detailjson = {};
        console.log('what is my detail ', detailjson);

        detailjson = {
            profileName: chartData.labels[idx],
            profileCount: chartData.datasets[0].data[idx],
            pofileId: chartData.datasets[0].id[idx]
        };
        console.log('what is my detail2 ', detailjson);
        const selectedEvent = new CustomEvent('selectprofile', {
            detail: detailjson
        });
        console.log('what is my event... ', selectedEvent);
        alert('dispatching... ' + selectedEvent.detail.profileName);
        console.log('this.page reg ', this.detailjson);
        //debugger;

        
        dispatchEvent(selectedEvent);
        console.log('ready to fire ');
        fireEvent('profileSelected', detailjson);
        
        console.log('dispatching '
            + fireEvent('profileSelected', detailjson));
        
        
    }

    callEvent() {
        console.log('calling event');
        //this.dispatchEvent(this.selectedEvent);
    }

    profileSelected(event) {
        debugger;
        alert('hello worlds' + this.event);
        debugger;
        //console.log('stringify ' + JSON.stringify(event));
        //this.objectAPIName = event.detail.objectAPIName;
    }

}