(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewTicketController', ViewTicketController);

    ViewTicketController.$inject = [ '$scope', '$http','dateFilter','$uibModal','ngNotify' , '$mdDialog'];
	function ViewTicketController( $scope, $http, dateFilter, $modal ,ngNotify, $mdDialog)
	{
        var vm = this;
        vm.ticketList = []; // For safe copy filtering.sorting etc..
		vm.ticketCollection = []; //to show the data
		var currentDate = new Date();
		vm._dateFilter = currentDate;
		vm.loading = false;
		var modalInstance = null;

		vm.editingRow = [];
		vm.selectedRow = [];

			
		vm.search = function(currentDate)
		{   
			  var date = dateFilter(currentDate, 'yyyy-MM-dd');
			  $http({
					 url: "/ServicePortal/GetTickets", 
					 method: "GET",
					 params: {dateFilter: date}
					  })
					  .then(function(response) {
						//First function handles success
						vm.ticketCollection = JsonParse(response.data)
						vm.ticketList = vm.ticketCollection;
					}, function(response) {
						  //Second function handles error
						  ngNotify.set(response.data.message, 'error');
					  });
		}; 
		
		//To show the list of items at the start up.
		vm.search(currentDate);
		
		//To modify column value	
		function JsonParse(JsonData)
		{
				angular.forEach(JsonData,function(value, key) {
					value.TicketStatus = value.TicketStatus.toString().replace(/true/g,'Open');
					value.TicketStatus = value.TicketStatus.toString().replace(/false/g,'Closed');			
					},{});
				return JsonData;
		}
		 
		//Export to excel
		vm.getHeader = function () {return ["TicketInfoID", "UserName","RequestorName","AppOrServiceName","Description","Impact","Urgency","Priority","TicketStatus","CreatedDate","CreatedBy"]};
		vm.getExcelList = function () { return vm.ticketList; };
		

		// Update Ticket modal....WORKING !!!
		vm.editTicket = function(selectedRow) 
		{
			vm.selectedRow = selectedRow; // Later, this can be used to extend
			angular.copy(vm.selectedRow,vm.editingRow);
			modalInstance = $modal.open({
							animation: false,
							templateUrl: 'views/edit-ticket-modal.html',
							scope: $scope
							});
		}


		// when submitting the add form, send the form data to the node API
        vm.updateTicket = function() {
			var formDataParam = {
							TicketInfoID : vm.editingRow.TicketInfoID, 
							FixedDescription : vm.editingRow.FixedDescription ,
							TicketStatus : vm.editingRow.TicketStatus 
						   }
			$http.post("/ServicePortal/UpdateTicket", formDataParam)
				  .then(function(response) {
					ngNotify.set(response.data.message, 'success');
					//this will keep the same reference so the table will be updated !
					angular.extend(vm.selectedRow, vm.editingRow);
					vm.cancelModal();
					 
				  }, function(response) {
					  //Second function handles error
					  ngNotify.set(response.data.message, 'error');
				  });	
	   	};
	   

		vm.cancelModal = function(){
			vm.editingRow = [];
			vm.selectedRow = [];
			modalInstance.dismiss('cancel');
			ngNotify.set('Editing is cancelled...', 'info');
		   }

		vm.showDeleteConfirm = function(ev, rowIndex) {
			var confirm = $mdDialog.confirm()
				  .title('Would you like to delete the ticket?')
				  .textContent('This ticket will be disabled.You can still view in database')
				  .ariaLabel('Lucky day')
				  .targetEvent(ev)
				  .cancel('No!')
				  .ok('Yes delete it!');
		
			$mdDialog.show(confirm).then(function() {
				vm.deleteTicket(rowIndex);
			}, function() {
				ngNotify.set('Deleting is cancelled...', 'info');
			});
		  };

	   // to delete ticket--  will disable the record from database
		vm.deleteTicket = function(index) {
			var ticketID = vm.ticketList[index].TicketInfoID;
			$http({
				url: "/ServicePortal/DeleteTicket", 
				method: "GET",
				params: {TicketInfoID: ticketID}
				 })
				 .then(function(response) {
				   //First function handles success
				   vm.ticketList.splice(index,1);
				   ngNotify.set(response.data.message, 'success');					

			   }, function(response) {
					//Second function handles error
				    ngNotify.set(response.data.message, 'error');
				 });
		}

    }

})();