(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location','ngNotify' ];
    function RegisterController(UserService, $location ,ngNotify) {
        var vm = this;
        vm.register = register;
         
        function register(form) {
            vm.dataLoading = true;
            UserService.Create(form)
                .then(function (response) {
                    if (response.success)
                     {
                        if(response.isinsertsuccess)
                        {
                            ngNotify.set(response.message, 'success');
                            $location.path('/home');
                        }
                        else
                            ngNotify.set(response.message, 'info');
                        vm.dataLoading = false;
                    } else {
                        ngNotify.set(response.message, 'error');                        
                        vm.dataLoading = false;
                    }
                });
        }

    }

})();
