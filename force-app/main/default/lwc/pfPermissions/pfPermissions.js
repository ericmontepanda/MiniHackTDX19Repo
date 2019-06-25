import { LightningElement, wire } from 'lwc';
import getProfiles from '@salesforce/apex/PF_Permission_Tracker.getProfiles';
import getPermSet from '@salesforce/apex/PF_Permission_Tracker.getPermissionSet';
import getRT from '@salesforce/apex/PF_Permission_Tracker.getRecordType';

export default class PfPermissions extends LightningElement {
    @wire(getProfiles) profiles;
    @wire(getPermSet) permSet;
    @wire(getRT) recordTypes;

}