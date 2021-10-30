(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$cookies','$location','AuthenticationService','ngNotify'];
    function LoginController($cookies,$location,AuthenticationService,ngNotify) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            //AuthenticationService.ClearCredentials();
            var obj = $cookies.getObject('globals');
            if(obj != undefined)
            {
                var array = AuthenticationService.GetDecodeEncryptedPassword(obj.currentUser.authdata).split(':');
                vm.employeeid = array[0];
                vm.password =  array[1];
            }
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.employeeid, vm.password)
                .then(function (response) {
                    if (response.success)
                    {
                        if(response.isvalid)
                        {
                            AuthenticationService.SetCredentials(vm.employeeid, vm.password);
                            ngNotify.set(response.message, 'success');
                            $location.path('/home');
                        }
                        else
                            ngNotify.set(response.message, 'info');
                    } else {
                        ngNotify.set(response.message, 'error');       
                    }
                    vm.dataLoading = false;
                });
        };

        // function sendEmail()
        // {
        //     var param = { mailcontent :'Hi Sarbudeen, \n THis is working' };
        //     $http.post("/ServicePortal/SendEmail", param)
		// 			 .then(function(response) {
		// 				ngNotify.set('Working Fine', 'success');	
		// 			}, function(response) {
        //                 console.log(response);
		// 				 //Second function handles error
		// 				 ngNotify.set('Doesnot work as expected', 'error');
		// 			 });
            
        // }
    }

})();
