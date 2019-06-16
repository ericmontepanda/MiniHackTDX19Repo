public with sharing class recentAccounts {
    
    @AuraEnabled (cacheable=true)
    public static List <RecentlyViewed> recAcc(){
        return [Select Id, Name from RecentlyViewed
        where type IN ('Account') Order by LastViewedDate ASC LIMIT 20 ];
       
    }

    @AuraEnabled (cacheable=true)
    public static List <RecentAccount> recentlyViewed(){
        List <RecentlyViewed> recView = [Select Id, Name from RecentlyViewed
        where type IN ('Account') Order by LastViewedDate ASC LIMIT 20];
        List <RecentAccount> recWrapper = new List <RecentAccount>();
        //wrapper

        integer i = 0;
        Integer listSize = recView.size();
        for (RecentlyViewed rec : recView){
            RecentAccount r = new RecentAccount();
            r.Name = rec.Name;
            r.Id = rec.id;
            if(i == 0){
                r.pos = listSize * 10;
                i = listSize - 1;
            } else {
                r.pos = i * 10;
                i = i - 1;
            }
            recWrapper.add(r);
        }
        system.debug('what is my rec Wrapper list ' + recWrapper);
        return recWrapper;
       
    }

    public list <RecentAccount> recentAcc {get;set;}
    
    public class RecentAccount{
         @AuraEnabled
        public String Name {get;set;}
         @AuraEnabled
        public string Id {get;set;}
         @AuraEnabled
        public Integer pos {get;set;}
    }
}
