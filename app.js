//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
    //Hide results
    document.getElementById("results").style.display = "none";
    //Show loader
    document.getElementById("loading").style.display = "block";

	setTimeout(calculateLoanResults, 3200);
	//Prevents browser from refreshing
        e.preventDefault();
});
	
//calculate Results
function calculateLoanResults() {
	console.log("calculating...");

	const a = document.getElementById("amount"),
	   	i = document.getElementById("interest"),
		y = document.getElementById("years"),
	 	mp = document.getElementById("monthly-payment"),
	 	tp = document.getElementById("total-payment"),
	 	ti = document.getElementById("total-interest");

	//Principal
	//parseFloat turns the value to decimal
	const p = parseFloat(a.value);
	//calculatedInterest
	const ci = parseFloat(i.value) / 100 / 12;
	//calculatePayments
	const cps = parseFloat(y.value) * 12;

	//Compute the monthly payment
	const x = Math.pow(1 + ci, cps),
	//Monthly
	 m = (p * x * ci) / (x - 1);

	if (isFinite(m)) {
		//To fixed make us set the amount of decimal e.g 435.94 
		//if it's set to three....it's going to be e.g 435.943
		mp.value = m.toFixed(2);
		tp.value = (m * cps).toFixed(2);
		ti.value = (m * cps - p).toFixed(2);

		//show results
		document.getElementById("results").style.display = "block";
		//Hide loader
		document.getElementById("loading").style.display = "none";
	} else if (a.value == ("")  ){
		showError("Loan amount cannot be blank !");
	} else if (i.value == ("") ) {
		showError("Interest required !");
	} else if (y.value == ("") ) {
		showError("Insert years of payment");
	} else {
		showError("Please check your numbers");
	};
};

//Show Error
function showError(err) {
	const c = document.querySelector(".card"),
		h = document.querySelector(".heading");
	//Create a div
	const error = document.createElement("div");
	//Add class
	error.className = "alert";
	// Create text Node and append to div
	error.appendChild(document.createTextNode(err));
	//Insert error above heading
	c.insertBefore(error, h);
	//Clear error after 3 seconds
	setTimeout(clearError, 3000);

	//Hide results
	document.getElementById("results").style.display = "none";
	//Hide loader
	document.getElementById("loading").style.display = "none";
}
//Clear error
function clearError() {
	document.querySelector(".alert").remove();
}
