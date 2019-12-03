let $ = function (id) { return document.getElementById(id); };

function getHistory(){
	return $("history-value").innerText;
}

function printHistory(num){
	$("history-value").innerText=num;
}

function getOutput(){
	return $("output-value").innerText;
}

function printOutput(num){
	if(num==""){
		$("output-value").innerText=num;
	}
	else{
		$("output-value").innerText=getFormattedNumber(num);
	}	
}

function getFormattedNumber(num){
	if(num=="-"){	
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("is-operator");
for(var i = 0;i < operator.length; i++){
	operator[i].addEventListener('click',function() {
		if(this.id == "clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id == "backspace"){
			var output = reverseNumberFormat(getOutput()).toString();
			if(output){
				output = output.substr(0, output.length - 1);
				printOutput(output);
			}
		}
		else{
			var output = getOutput();
			var history = getHistory();
			if(output == "" && history != ""){
				if(isNaN(history[history.length - 1])){
					history = history.substr(0, history.length - 1);
				}
			}
			if(output != "" || history != ""){
				output = output == "" ? output:reverseNumberFormat(output);
				history = history + output;
				if(this.id == "="){
					var result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history += this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
	});
}	


let number = document.getElementsByClassName('is-number');
for(let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
    	let output = reverseNumberFormat(getOutput());
        output += this.innerHTML;
        printOutput(output);
    });
}
