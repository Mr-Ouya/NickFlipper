
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
        
            newSelect.val(models[i]);
        
        
            newSelect.addClass("newoptions");
        
            newSelect.data(models[i]);
        //**Must replace this with a function that only pops up the new models */
            //newSelect.onclick = popnewItems;
            
            
            $modelDropdown.append(newSelect);
            console.log("Info that's attempted to re-append the !$modelDropDown! " + newSelect)
          }
      }
    })
  
  }

/*
function addSpecificMakes(select, data) {
  var make = $makeDropdown.val();
  callmake(make, function (makes) {

  })
  console.log(make)
}

var popnewItems = function () {
  
  var make = $(this).val();
//console.log(make)

  
  callmake(make, function (modelNames) {

    //var modelCount = popularVehicle[0]; <--Whatever I put here gets put into different dropdown menu items as individual letters
    //console.log(make)
    //testing if changing "modelNames" to a string to see if i should modify it here
    popItems($modelDropdown, modelNames);
    
    
    //popItems(selectMin, price);
    //popItems(selectMax, price);
    //popItems(selectMaxY, years);
    //popItems(selectMinY, years);
  });
}
  function callmake(make, cb) {
    $.ajax({
      url: "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json",
      success: function (result) {
        console.log('result from API', result)
  
        for (var i = 0; i < result.Results.length; i++) {
  
          // console.log(result.Results[i].Model_Name);
  
          
          
          model = result.Results[i].Model_Name;
          modelNames.push(model);
        }
  
        console.log("Model Names",modelNames);
        console.log("callmake function");
        cb(modelNames);
  
        //Make a count with a ajax call to database then trim off the count when doing the search query
  
  
      }
    })
  }

*/



//run function to populate the make dropdown on ready so we have something to select

console.log("populate make function ")
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getVehicles().then(function(data) {
    //console.log(data);
     /*
    data.map(function(example) {
      
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    $exampleList.empty();
    $exampleList.append($examples);
     
    });
      */
    
    
  });
};
refreshExamples();
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  /*
  function callmake(make, cb) {
    $.ajax({
      url: "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json",
      success: function (result) {
        
  
        for (var i = 0; i < result.Results.length; i++) {
  
          // console.log(result.Results[i].Model_Name);
  
          
          
          model = result.Results[i].Model_Name;
          modelNames.push(model);
        }
  
        //console.log(modelNames);
        console.log("callmake function");
        cb(modelNames);
  
        //Make a count with a ajax call to database then trim off the count when doing the search query
  
  
      }
    })
  }
  */
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
    $modelDropdown.prop("disabled", false);
    selectedMake = stringValueOfMake;
    populateModelDropDown(selectedMake);

  }
  /*if ($makeDropdown.val() == 'make') {
    console.log("Success")
  } else {
    console.log("Dropdown not on make")
    console.log($makeDropdown.val())
  }
  

  /*
  if ($makeDropdown.val() = "make") {
    $modelDropdown.prop("disabled", true);
    
  } else {
  $modelDropdown.prop("disabled", false);
  var make = $(this).val();
  console.log(make);
  }
  */
  

}


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$makeDropdown.on("change", makeDropdownChanged);
//console.log($(this).val())
})
