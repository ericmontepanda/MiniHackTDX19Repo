public with sharing class PF_Schema_Extractor_LWC {
/****************************************
* Class Name : PF_SchemaExtractor * 
* Description: Allows System Admin to quickly pull Object schema
* Application: Schema Extractor
* Created By : Eric Montelibano
* Last Modified Date: 09/21/2016
* ****************************************/
    @AuraEnabled (cacheable=true)
    public static list <FieldResults> getObjFLS(string obj){
        if(!String.isBlank(obj)) {
        List <FieldResults> fr = new List <FieldResults>();
        system.debug('object name??? ' +obj);
        SObjectType objectType = Schema.getGlobalDescribe().get(obj);
        Map<String,Schema.SObjectField> mfields = objectType.getDescribe().fields.getMap();
        system.debug(mfields);
        
        for(Schema.SObjectField fieldVal : mfields.Values()){
            
            Boolean isBooleanType;
            
            FieldResults f = new FieldResults();
            f.labelName = fieldVal.getDescribe().getLabel();
            f.APIName = fieldVal.getDescribe().getName();
            if(string.valueof(fieldVal.getDescribe().getType()) == 'REFERENCE'){
                f.FieldType = string.valueof(fieldVal.getDescribe().getType())+string.valueOf(fieldVal.getDescribe().getReferenceTo());
            } else {
                f.FieldType = string.valueof(fieldVal.getDescribe().getType());
            }
            
            f.RelationshipName = fieldVal.getDescribe().getRelationshipName();
            f.fieldLength =  fieldVal.getDescribe().getLength();
            f.inlineHelpText = fieldVal.getDescribe().getInlineHelpText();
            
            if(string.valueof(fieldVal.getDescribe().getType()) == 'BOOLEAN'){
                f.required = 'N/A';
            } else{
                if(fieldVal.getDescribe().isNillable() == true) {
                    f.required = 'No';
                } else {
                    f.required = 'Yes';
                }
            }
            
            if(fieldVal.getDescribe().isCustom() == true){
                f.isCustom = 'Yes';
            } else {
                f.isCustom = 'No';
            }
           
            
            
            //f.required = string.valueof(fieldVal.getDescribe().isNillable());
            schema.describefieldresult dfield = fieldVal.getDescribe();
            Schema.DisplayType FldType = fieldVal.getDescribe().getType();
            
            system.debug(fieldVal.getDescribe());
            fr.add(f);
            
        }
            return fr;
        } else {
            return null;
        }
    }
    
    //public list <FieldResults> FieldResultList {get;set;}
    
    public class FieldResults{
        @AuraEnabled
        public String LabelName {get;set;}
        @AuraEnabled
        public string APIName {get;set;}
        @AuraEnabled
        public string FieldType {get;set;}
        @AuraEnabled
        public string RelationshipName {get;set;}
        @AuraEnabled
        public integer fieldlength {get;set;}
        @AuraEnabled
        public string inlineHelpText {get;set;}
        @AuraEnabled
        public string required {get;set;}
        @AuraEnabled
        public string isCustom {get;set;}
    }

     /* 
    Method Name: ret list of all Objects
    Description: Retrieve a list of all Custom Objects in the Org
    */
    @AuraEnabled (cacheable=true)
    public static List<objList> getSFDCObjectList()
    {
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();     
        List<objList> objL = new List<objList>();
        for(Schema.SObjectType f : ProcessInstance.TargetObjectId.getDescribe().getReferenceTo())
        {
            objList o = new objList();
            o.LabelName = f.getDescribe().getName();
            o.APIName = f.getDescribe().getName();
            objL.add(o);
        }
        return objL;
    }

    /* 
    Method Name: retObject
    Description: Retrieve a list of all Custom Objects in the Org
    */
    
    @AuraEnabled (cacheable=true)
    public static List <objectName> getSFDCObject(){
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();     
        List<SelectOption> options = new List<SelectOption>();
        List <objectName> objNameList = new List <objectName>();
        
        for(Schema.SObjectType f : ProcessInstance.TargetObjectId.getDescribe().getReferenceTo())
        {
            objectName o = new objectName();
            o.LabelName = f.getDescribe().getLabel();
            o.APIName = f.getDescribe().getName();
            o.isCustomObject = f.getDescribe().isCustom();
            objNameList.add(o);
        }

        return objNameList;
    }

    
    public class objectName{
        @AuraEnabled
        public String LabelName {get;set;}
        @AuraEnabled
        public string APIName {get;set;}
        @AuraEnabled
        public boolean isCustomObject{get;set;}
    }

     public class objList{
        @AuraEnabled
        public String LabelName {get;set;}
        @AuraEnabled
        public string APIName {get;set;}
    }
}