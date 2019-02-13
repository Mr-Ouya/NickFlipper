
$(document).ready(function () {


  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");
  var $makeDropdown = $("#makeSelect1");
  var $modelDropdown = $("#modelSelect1");
  
  //Empty arrays that the dropdowns will use 
  var makes = [];
  var models = [];
  
  //Have specific values for make and model for the API to reference in order to perform queries
  var selectedMake = "";
  var selectedModel = "";
  
  
  popularVehicle = ["BMW", "Chevrolet", "Dodge", "Ford", "GMC", "Hyundai", "Jeep", "Toyoto", "Honda", "Nissan", "Ram", "KIA", "Subaru", "Mazada", "Mercedes_Benz", "Volksvagen"];
  years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/vehicle",
        data: JSON.stringify(example)
      });
    },
    getVehicles: function() {
      return $.ajax({
        url: "api/vehicle",
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/vehicle/" + id,
        type: "DELETE"
      });
    }
  };
  
  
  
  //used to be popItems function 
  function populateMakeDropdown(select, data) {
    // dropdownEnable()
    var firstdropdown = select;
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newSelect = $("<option></option").text(data[i]);
  
      newSelect.val(data[i]);
  
      newSelect.addClass("newoptions");
  
      newSelect.data(data[i]);
  //popnewItems Not defined ***
      //newSelect.onclick = popItems;
      firstdropdown.append(newSelect);
      //console.log(newSelect);
    }
  
  }
  
  //used to be popItems function 
  function populateMakeDropdown(select, data) {
    // dropdownEnable()
    var firstdropdown = select;
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newSelect = $("<option></option>").text(data[i]);
  
      newSelect.val(data[i]);
  
      newSelect.addClass("newoptions");
  
      newSelect.data(data[i]);
  //popnewItems Not defined ***
      //newSelect.onclick = popItems;
      firstdropdown.append(newSelect);
      //console.log(newSelect);
    }
  
  }
  
  
  //populate make dropdown on launch
  populateMakeDropdown($makeDropdown, popularVehicle);
  
  function populateModelDropDown(make, modelsFromFunction) {
    
      $.ajax({
        url: "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json",
        success: function (result) {
          console.log('result from API', result)
    
          for (var i = 0; i < result.Results.length; i++) {
    
            // console.log(result.Results[i].Model_Name);
    
            
            
            model = result.Results[i].Model_Name;
            models.push(model);
          
           
  
          }
            //Here push values of models array into !$modelDropDown!
            for (var i = 0; i < models.length; i++) {
  
  
              //console.log(data);
              var newSelect = $("<option></option").text(models[i]);      
              $modelDropdown.append(newSelect);
              console.log("Info that's attempted to re-append the !$modelDropDown! " + newSelect)
            }
        }
      })
    
    }
  
  
  
  
  
  //run function to populate the make dropdown on ready so we have something to select
  
  console.log("populate make function ")
  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function() {
    API.getVehicles().then(function(data) {
    });
  };
  refreshExamples();
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };
  
    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }
  
    API.saveExample(example).then(function() {
      refreshExamples();
    });
  
    $exampleText.val("");
    $exampleDescription.val("");
  };
  
  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
  
    API.deleteExample(idToDelete).then(function() {
      refreshExamples();
    });
  };
  
  var makeDropdownChanged = function() {
  
    //console.log($makeDropdown.val())
    var stringValueOfMake = $makeDropdown.val()
    ////console.log(stringValueOfMake)
    if (stringValueOfMake == 'Make') {
      $modelDropdown.prop("disabled", true);
    } else {
      //Trying to clear the !$modeldropdown and need to empty the !model array or it will repopulate on it's own
      models = [];
      $($modelDropdown.empty());

      
      var modelText = $("<option></option").text("Models");
      $modelDropdown.append(modelText);
      //Populate with the value of Model after empty so after the select of the model the other choices appear
      $modelDropdown.prop("disabled", false);
      selectedMake = stringValueOfMake;
      populateModelDropDown(selectedMake);
  
    }
    
  
  }
  
  
  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
  $makeDropdown.on("change", makeDropdownChanged);
  //console.log($(this).val())
  })