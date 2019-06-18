public with sharing class productList {
   @AuraEnabled (cacheable=true)
    public static List <Product__c> getProductList(String recId){
        system.debug('what is my recId'+ recId);
        return [Select Id, Picture_URL__c, Name, MSRP__c, Category__c, Description__c from Product__c  where  Product_Family__c =: recid];
    }


}

