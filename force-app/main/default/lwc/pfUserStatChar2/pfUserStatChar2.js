import { LightningElement, track, wire } from 'lwc';
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


export default class PfUserStatChar2 extends LightningElement {
    @track selectedProfile;
    @track chart;

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
                events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'selectprofile'],
                
                onClick: this.notifyParent
            }
        };
        var donut = this.template.querySelector('canvas.donut');
        console.log('what is my donut', donut);
        const ctx = this.template
            .querySelector('canvas.donut')
            .getContext('2d');
        this.chart = new window.Chart(ctx, this.config);
        console.log('this is my chart', this.chart);
        this.template.querySelector('canvas.donut').addEventListener('click', this.notifySelectEvent);


        //console.log('this selected profile ' );
        //this.template.querySelector('canvas.donut').addEventListener('click', this.notifySelectEvent);
                /*function (evt) {
            console.log('notify parent', evt);

            var activePoints = this.chart.getElementsAtEvent(evt);
            console.l
            if (activePoints[0]) {
                var chartData = activePoints[0]['_chart'].config.data;
                var idx = activePoints[0]['_index'];

                this.selectedProf = chartData.labels[idx];
                this.selectedProfVal = chartData.datasets[0].data[idx];
                this.selectedProfId = chartData.datasets[0].id[idx];
            }
            console.log('ending... ');

            var detailjson = {};
            detailjson = {
                profileName: chartData.labels[idx],
                profileCount: chartData.datasets[0].data[idx],
                pofileId: chartData.datasets[0].id[idx]
            };
            const selectedEvent = new CustomEvent('selectprofile', {
                detail: detailjson
            });
            console.log('starting dispatch');
            this.dispatchEvent(selectedEvent);
            console.log('ending');

        });*/
    }

  

    notifyParent(evt) {
        console.log('notify parent', evt);
       var activePoints = this.chart.getElementsAtEvent(evt);
        console.log('active... ', this.chart.getElementsAtEvent(evt));
        if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];

            this.selectedProf = chartData.labels[idx];
            this.selectedProfVal = chartData.datasets[0].data[idx];
            this.selectedProfId = chartData.datasets[0].id[idx];
        }

        var detailjson = {};
       detailjson = {
            profileName: chartData.labels[idx],
            profileCount: chartData.datasets[0].data[idx],
            pofileId: chartData.datasets[0].id[idx]
        };
        this.selectedProfile = new CustomEvent('selectprofile', {
            detail: detailjson, bubbles : true
        });
        //this.selectedProfile = detailjson;
        console.log('starting dispatch ', this.selectedProfile);
        debugger;
        ///var donut = this.template.querySelector('canvas.donut');
    
        
        dispatchEvent(this.selectedProfile);
        console.log('ending', this);
        debugger;
    }

      notifySelectEvent(evt) {
          //var activePoints = this.chart.getElementAtEvent(evt)[0];
          console.log('dispatch', this);
          console.log('this selected profile ', this.selectedProf );
          alert('hi ', this);
          //alert('HELLO ' +this.chart);
      }


}