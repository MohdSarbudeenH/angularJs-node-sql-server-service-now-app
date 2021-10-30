(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateTicketController', CreateTicketController);

	CreateTicketController.$inject = [ '$http','ngNotify'];
    function CreateTicketController( $http, ngNotify) {
        var vm = this;
			
		vm.impactList = ["Department", "Group", "Individual"];
		
		vm.urgencyList = ["Work Stopped", "Delayed", "Incovenience"];
		   
		vm.priorityList = ["Urgent", "High", "Low"];
		
		vm.appNameList = ["Outlook", "Operating System" , "Software Installation" , "CPU Issue" , "Others"];
		  
		// when submitting the add form, send the form data to the node API
		vm.addTicket = function(ticketFormData) {
			   $http.post("/ServicePortal/AddTicket", ticketFormData)
					 .then(function(response) {
						ngNotify.set(response.data.message, 'success');						 
						vm.clearForm();
					}, function(response) {
						 //Second function handles error
						 ngNotify.set(response.message, 'error');
					 });	
		  };


		// clear the form so our user is ready to enter another
		vm.clearForm = function()
		{
			// Reset the form model.
			vm.formData = {};
			// Set back to pristine.
			vm.ticketForm.$setPristine();
			// Since Angular 1.3, set back to untouched state.
			vm.ticketForm.$setUntouched();
		}

    }

})();

