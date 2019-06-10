public class CarouselClass {
    @AuraEnabled 
    public static List <Park_Sightings__c> fetchAnimals(String recId){
        system.debug('what is my recId');
        return [Select Id, Park__r.Name, Animal__r.Name, Animal__r.Description__c, Animal__r.URL__c from Park_Sightings__c  where Park__c =: recid];
       
    }


}