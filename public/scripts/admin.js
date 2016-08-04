console.log("Admin.js");

var myApp = angular.module('myApp', ['ngMaterial', 'xeditable']);

// xeditable Initialize
myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('adminViewController', ['$scope', function($scope){
  console.log("In adminView");

  //View selection
  $scope.tabs = [
    {url: './views/partials/snippit.html'},
    {url: './views/partials/inquiryTable.html'},
    {url: './views/partials/applicationTable.html'},
  ];

  //Initialize with this partial
  $scope.activeTab = $scope.tabs[0];

  $scope.viewControl = function(tab){
    console.log('In tab change');

    $scope.activeTab = $scope.tabs[tab];

  };

}]);//End adminView controller


myApp.controller('snippitController', ['$scope', '$http', function($scope, $http){


  //Initialize by making a call to populate the snippits
  $http({
    method: 'GET',
    url: '/snippitInfo'
  }).
  then(function(snippitData){
    // Bind the returned data

    snippitData = snippitData.data;
    console.log(snippitData);

   $scope.newInquiry = snippitData.inquiry.new;
   $scope.pendingInquiry = snippitData.inquiry.pending;
   $scope.approvedInquiry = snippitData.inquiry.approved;

   $scope.newApplication = snippitData.application.new;
   $scope.pendingApplication = snippitData.application.pending;
   $scope.approvedApplication = snippitData.application.approved;

   $scope.username = snippitData.user;
  });


  $scope.showInquiries = function(){

    //Set the ng-include
    $scope.viewControl(1);

  };//End showInquiries


  $scope.showApplications = function(){

    //Set the ng-include
    $scope.viewControl(2);

  };//End showApplications

}]);//End snippitController


myApp.controller('inquiryTableController', ['$scope', '$http', function($scope, $http){

  $scope.applicationTable = false;

  //Make a call to populate inquiryTable
  $http({
    method: 'GET',
    url: 'adminTable/inquiryTable'
  }).
  then(function(tableData){
    //Bind the returned data
    tableData = tableData.data;
    console.log(tableData);
    $scope.inquiryData = tableData;
  });


  $scope.expandView = function(index){

    var statusData = {
      contact_email: $scope.inquiryData[index].contact_email,
      status_id: $scope.inquiryData[index].status_id
    };

    //Check to see if the application/inquiry is new
    if ($scope.inquiryData[index].status_id == 1 || $scope.inquiryData[index].status_id == 4){
      $http({
        method: 'POST',
        url: '/updateStatus',
        data: statusData
      })
      .then(function(data){
        $scope.inquiryData[index].status_id = data.data;
      });


    }

    if (document.getElementById('expand' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expand' + index).style.display = "table-row";
    } else if (document.getElementById('expand' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expand' + index).style.display = "none";
    }

  };

  $scope.sendApproveMail = function (index){
    var mailObject = {
      to: $scope.inquiryData[index].contact_email,
      subject: "Your inquiry has been approved",
      admin: $scope.inquiryData[index].contact_email
    };

    $http({
      method: 'POST',
      url: '/sendMail',
      data: mailObject
    }).then(function(Response) {
  console.log("in sendMail post call success: ", Response);
  }).error(function(Response) {
  console.log(Response);
  });
  };

  $scope.approveInquiry = function(e, index) {


    var firstName = $scope.inquiryData[index].first_name;
    var statusData = {
      contact_email: $scope.inquiryData[index].contact_email,
      status_id: $scope.inquiryData[index].status_id
    };


    if ($scope.inquiryData[index].status_id == 3){
      var r = confirm("Would you like to resend " + firstName + "'s applicationForm?");
      if (r === true) {
        $scope.inquiryData[index].statusAlert = 'Another email has been sent to ' + firstName + ' with instructions for the application process.';
        $scope.alertStatus = "alert alert-success";
        $scope.sendApproveMail(index);
      } else {
        $scope.inquiryData[index].statusAlert = firstName + ' was not send another email.';
        $scope.alertStatus = "alert alert-warning";
      }
    } else {
      var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
      if (r === true) {

        $http({
          method: 'POST',
          url: '/updateStatus',
          data: statusData
        }).then(function(data){
          $scope.inquiryData[index].status_id = data.data;
        });

         $scope.inquiryData[index].statusAlert = firstName + ' has been approved!  An email has been sent to ' + firstName + ' with instructions for the application process.';
         $scope.alertStatus = "alert alert-success";
         $scope.sendApproveMail(index);
       } else {
         $scope.inquiryData[index].statusAlert = firstName + ' has not been approved.';
         $scope.alertStatus = "alert alert-warning";
       }
    }

  };//End approveInquiry


  $scope.deleteInquiry = function(e, index) {

    var deleteUserObject = {
      contact_email: $scope.inquiryData[index].contact_email
    }

    var firstName = $scope.inquiryData[index].first_name;
    var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
    if (r === true){

      $http({
        method: 'POST',
        url: '/deleteUser',
        data: deleteUserObject
      });


      $scope.inquiryData[index].statusAlert = firstName + ' has been deleted from your records!';
      $scope.alertStatus = "alert alert-success";
    } else {
      $scope.inquiryData[index].statusAlert = firstName + ' has not been deleted from your records.';
      $scope.alertStatus = "alert alert-warning";
    }
  };



}]);//End inquiryTableController


myApp.controller('applicationTableController', ['$scope', '$http', function($scope, $http){

  $scope.applicationTable = true;

  //Make a call to populate applicationTable
  $http({
    method: 'GET',
    url: 'adminTable/applicationTable'
  }).
  then(function(tableData){
    //Bind the returned data
    tableData = tableData.data;
    console.log(tableData);
    $scope.applicationData = tableData;
  });


  $scope.expandView = function(index){

    sendUserInfo = {
      user_id: $scope.applicationData[index].id
    };

    //Get Department Dogs
    $http({
      method: 'POST',
      url: 'adminTable/dogTable',
      data: sendUserInfo
    }).then(function(tableData){
      tableData = tableData.data;
      console.log("back from /dogTable with,", tableData);
      $scope.dogData = tableData;
    });

    var statusData = {
      contact_email: $scope.applicationData[index].contact_email,
      status_id: $scope.applicationData[index].status_id
    };

    //Check to see if the application/inquiry is new
    if ($scope.applicationData[index].status_id == 1 || $scope.applicationData[index].status_id == 4){
      $http({
        method: 'POST',
        url: '/updateStatus',
        data: statusData
      })
      .then(function(data){
        $scope.applicationData[index].status_id = data.data;
      });


    }

    if (document.getElementById('expand' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expand' + index).style.display = "table-row";
    } else if (document.getElementById('expand' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expand' + index).style.display = "none";
    }

  };

}]);//End applicationTableController


myApp.controller('adminEditController', ['$scope', '$http', function($scope, $http){


  $scope.saveUser = function(index) {

    //Will need more fields
    var user = {
      id: $scope.inquiryData[index].id,
      primary_phone: $scope.inquiryData[index].primary_phone,
      alt_phone: $scope.inquiryData[index].alt_phone,
      email: $scope.inquiryData[index].email,
      contact_email: $scope.inquiryData[index].contact_email,
      contact_time: $scope.inquiryData[index].contact_time,
      add_street1: $scope.inquiryData[index].dept_add_street1,
      add_street2: $scope.inquiryData[index].dept_add_street2,
      add_city: $scope.inquiryData[index].dept_add_city,
      add_state: $scope.inquiryData[index].dept_add_state,
      add_zip: $scope.inquiryData[index].dept_add_zip
};

    console.log(user);


    // $scope.user already updated!
    return $http.post('/saveUser', user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"}
        $scope.userForm.$setError(err.field, err.msg);
      } else {
        // unknown error
        $scope.userForm.$setError('name', 'Unknown error!');
      }
    });
  };//End saveUser


}]);//End adminEditController


myApp.controller('dogTableController', ['$scope', '$http', function($scope, $http){

  $scope.expandDogView = function(index){

    sendUserInfo = {
      dog_id: $scope.dogData[index].id
    };

    //Get Department Dogs
    $http({
      method: 'POST',
      url: 'adminTable/dogTable',
      data: sendUserInfo
    }).then(function(tableData){
      tableData = tableData.data;
      console.log("back from /dogTableInfo with,", tableData);
      $scope.dogDataTable = tableData;
    });

    // var statusData = {
    //   contact_email: $scope.applicationData[index].contact_email,
    //   status_id: $scope.applicationData[index].status_id
    // };
    //
    // //Check to see if the application/inquiry is new
    // if ($scope.applicationData[index].status_id == 1 || $scope.applicationData[index].status_id == 4){
    //   $http({
    //     method: 'POST',
    //     url: '/updateStatus',
    //     data: statusData
    //   })
    //   .then(function(data){
    //     $scope.applicationData[index].status_id = data.data;
    //   });
    //
    // }

    if (document.getElementById('expandDog' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expandDog' + index).style.display = "table-row";
    } else if (document.getElementById('expandDog' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expandDog' + index).style.display = "none";
    }

  };



}]);//End dogTableController


myApp.controller('dogEditController', ['$scope', '$http', function($scope, $http){


  $scope.saveUser = function(index) {

    //Will need more fields
    var user = {
      id: $scope.dogData[index].id,
      primary_phone: $scope.dogData[index].primary_phone,
      alt_phone: $scope.dogData[index].alt_phone,
      email: $scope.dogData[index].email,
      contact_email: $scope.dogData[index].contact_email,
      contact_time: $scope.dogData[index].contact_time,
      add_street1: $scope.dogData[index].dept_add_street1
};

    console.log(user);


    // $scope.user already updated!
    return $http.post('/saveDog', user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"}
        $scope.userForm.$setError(err.field, err.msg);
      } else {
        // unknown error
        $scope.userForm.$setError('name', 'Unknown error!');
      }
    });
  };//End saveUser


}]);//End adminEditController
