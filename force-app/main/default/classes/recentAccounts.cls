public with sharing class recentAccounts {
    
    @AuraEnabled (cacheable=true)
    public static List <RecentlyViewed> recAcc(){
        return [Select Id, Name from RecentlyViewed
        where type IN ('Account') Order by LastViewedDate DESC LIMIT 20 ];
       
    }

}
