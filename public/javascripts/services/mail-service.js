(function () {
    'use strict';

    angular
        .module('app')
        .factory('MailService', MailService);

    MailService.$inject = ['$http'];
    function MailService($http) {
        
        var service = {};
        service.AdminMailList = [];
        service.UserMailList = [];        
        service.SetAdminMailAccounts = SetAdminMailAccounts;
        service.GetAdminMailAccounts = GetAdminMailAccounts;
        service.SetUserMailAccounts = SetUserMailAccounts;
        service.GetUserMailAccounts = GetUserMailAccounts;
        
        // funtion SetAdminMailAccounts(value)
        // {
        //     var mail_info = new user_data_model();            
        //     angular.forEach(values, function(value, key) {
        //         mail_info.EmployeeID = value;
        //         mail_info.UserName = value;
        //         mail_info.Email = value;                
        //         AdminMailList.push(mail_info);
        //       });
        // };

    }

})();
