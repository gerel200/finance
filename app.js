// display controller
var uiController = (function () {

  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  }

  return {
    getInput: function(){
      return{
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {return DOMstrings;}
  };
})();

// sanhuugiin ajillah controller
var financeController = (function () {
})();

// programm connection controller
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
    // 1. oruulah ogogdoliig delgetsnees olj awah
    console.log(uiController.getInput());
    // 2. olj awsan ogogdluudee sanhuugiin controller d damjuulj tend hadgalna
    // 3. olj awsan ogogluudee web deeree tohiroh hesegt n gargana
    // 4. toswiig tootsooloh
    // 5. etssiin uldegdel tootsoog delgetsend gargana
  };

  var setUpEventListeners = function(){
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
  }
  return{
      init: function(){
        console.log("Application started...");
        setUpEventListeners();
      }
    }
})(uiController, financeController);

appController.init();
