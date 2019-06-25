import {
    LightningElement,
    track,
    wire
} from 'lwc';
import getActiveUsers from '@salesforce/apex/PF_User_Statistics.getActiveUsers';
import getActiveAdminUsers from '@salesforce/apex/PF_User_Statistics.getActiveAdminUsers';
import getUserProfiles from '@salesforce/apex/PF_User_Statistics.getUserProfile';


export default class PfUserStats extends LightningElement {
    @track countActiveUser;
    @track countActiveAdminUser;
    @track error;

    @wire(getActiveUsers) actUser({
        error,
        data
    }) {
        if(data){
            this.countActiveUser = data;
            this.error = undefined;
        } else if (error){
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

    @wire(getUserProfiles) userProfiles;

}