// display controller
var uiController = (function () {})();

// sanhuugiin ajillah controller
var financeController = (function () {})();

// programm connection controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. oruulah ogogdoliig delgetsnees olj awah
    console.log("Delgetsnees ogogdloo avah heseg");
    // 2. olj awsan ogogdluudee sanhuugiin controller d damjuulj tend hadgalna
    // 3. olj awsan ogogluudee web deeree tohiroh hesegt n gargana
    // 4. toswiig tootsooloh
    // 5. etssiin uldegdel tootsoog delgetsend gargana
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
