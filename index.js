// This is the main JavaScript file for the calculator app.

var number_div = document.querySelector('#numbers-container');

for (var num=0; num<10; num++) {
    let button = document.createElement('button');
    button.classList.add('digits-button');
    button.textContent = num;
    number_div.appendChild(button);
}