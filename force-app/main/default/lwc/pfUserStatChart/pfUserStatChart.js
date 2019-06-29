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


    connectedCallback() {
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
    }

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
                /*onClick: chartClickEvent /*function (evt) {
                    this.notifyParent;
                    var activePoints = this.chart.getElementsAtEvent(evt);
                    if (activePoints[0]) {
                        var chartData = activePoints[0]['_chart'].config.data;
                        var idx = activePoints[0]['_index'];

                        this.selectedProf = chartData.labels[idx];
                        this.selectedProfVal = chartData.datasets[0].data[idx];
                        this.selectedProfId = chartData.datasets[0].id[idx];
                        //var url = "http://example.com/?label=" + this.selectedProf + "&value=" + this.selectedProfVal + "id " + this.selectedProfId;

                        console.log('itemName is ' + this.selectedProfId);
                        console.log('what is this??? ', this);
                        return notifyParent();
                    }
                   
                }*/

            }
        };

        const ctx = this.template
            .querySelector('canvas.donut')
            .getContext('2d');
        this.chart = new window.Chart(ctx, this.config);
    };

    notifyParent(evt) {
        console.log('notify parent');

        var activePoints = this.chart.getElementsAtEvent(evt);
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
        const selectedEvent = new CustomEvent('selected', {
            detail: {
                profileName: chartData.labels[idx],
                profileCount: chartData.datasets[0].data[idx],
                pofileId: chartData.datasets[0].id[idx]
            }
        });
        console.log('selected events... ' +selectedEvent);
        this.dispatchEvent(selectedEvent);
    }

}