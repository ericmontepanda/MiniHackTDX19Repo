public with sharing class PF_Permission_Tracker {
     @AuraEnabled (cacheable=true)
     public static List <Profile> getProfiles(){
         return [SELECT Id, Name, UserType FROM Profile ORDER BY NAME ASC];
     }

     @AuraEnabled (cacheable=true)
     public static List  <PermissionSet> getPermissionSet(){
         return [SELECT Id, Name, Label, Description, IsCustom, IsOwnedByProfile FROM PermissionSet where IsOwnedByProfile = false ORDER BY NAME ASC];
         
     }

     @AuraEnabled (cacheable=true)
     public static List <RecordType> getRecordType(){
         return [SELECT Description, DeveloperName, Id, IsActive, Name, NamespacePrefix, SobjectType FROM RecordType];
         
     }


    public class PF_PermissionSetTracker {
    public List <ObjectPermissions> myObjectPS {get;set;}
    
    public void retObjPermSet(){
        
        List <PermissionSet> PSList = [SELECT Id,Label FROM PermissionSet WHERE IsCustom = true and  (NOT Name like '%X00%' )];
        system.debug('what is my PS LIst ' +PSLISt.size());
        Set <Id> pSetId = new Set <Id>();
        Set <Id> profId = new Set <Id>();
        for(PermissionSet p: [SELECT Id,Label FROM PermissionSet WHERE IsCustom = true and  (NOT Name like '%X00%' )]){ 
            system.debug(p.id);
            pSetId.add(p.Id);
        }
        system.debug('what is my pSet Id ' +pSetId);
        
        for(Profile pr : [SELECT Id, Name, UserType FROM Profile where UserType ='Guest']){
        	profId.add(pr.id);
        }

        
        
        myObjectPS = [SELECT Parent.Name, Parent.Label, Parent.Profile.Name, ParentId, PermissionsCreate,PermissionsDelete,PermissionsEdit,
                                            PermissionsModifyAllRecords,PermissionsRead,PermissionsViewAllRecords,SobjectType 
                                            FROM ObjectPermissions where ParentId IN: pSetId OR Parent.Profile.id  IN: profId ];
        
        system.debug('what is my objPerm ' +myObjectPS);
        
       // myObjectPS.add(objPerm);
    }

}
}
