var input = document.getElementById('input');
var operator = document.querySelectorAll('.operator div');
var number = document.querySelectorAll('.number div');

var result = document.getElementById('result');
var clear = document.getElementById('clear');

var resultDisplayed = false; /* cờ để theo dõi đầu ra nào được hiển thị */

// Thêm 1 hàm click để xử lý number
for (var i = 0; i < number.length; ++i) {
    number[i].addEventListener('click', function (e) {
        // storing current input string and its last character in variables - used later 
        var currentString = input.innerHTML;
        console.log(currentString);
        var lastChar = currentString[currentString.length - 1];
        // if result is not displayed, just keep adding
        if(resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;

        } else if(resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷')
        {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;

        } else {
            resultDisplayed = false;
            input.innerHTML = '';
            input.innerHTML += e.target.innerHTML;
        }
    });
}
// Thêm một hàm click để xử lý operator
for (var i = 0; i < operator.length; ++i) {
    operator[i].addEventListener('click', function(e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // Nếu như kí tự cuối cùng là 1 toán tử hãy thay thế nó bằng kí tự được nhấn.
        if (lastChar === '+' || lastChar === '-' ||  lastChar === '×' || lastChar === '÷') {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if(currentString.length === 0) {
            // Nếu phím đầu tiên được nhấn là 1 toán tử, đừng làm bất cứ điều gì
            console.log('Enter the number first');
        } else {
            // Nếu không, chỉ cần thêm toán tử được nhấn vào đầu vào
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// onclick nút bằng
result.addEventListener('click', function(e) {
    var inputString = input.innerHTML;

    // Tạo thành một mảng số
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    // Thay thế tất cả các số và dấu chấm bằng chuỗi trống sau đó tách
    var operator = inputString.replace(/[0-9]|\./g, '').split('');
    console.log(inputString);
    console.log(numbers);
    console.log(operator);
    console.log('---------------------------------');

    // Bây giờ lặp qua mảng và thực hiện 1 thao tác tại 1 thời điểm
    // Đầu tiên chia, sau đó nhân, sau đó -, sau đó +
    //  2 * 3 + 4 - 2 / 2
    var divide = operator.indexOf('÷');
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operator.splice(divide, 1);
        divide = operator.indexOf('÷');
    }

    var multiply = operator.indexOf('×');
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operator.splice(multiply, 1);
        multiply = operator.indexOf('×');
    }

    var subtract = operator.indexOf('-');
    while(subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operator.splice(subtract, 1);
        subtract = operator.indexOf('-');
    }

    var add = operator.indexOf('+');
    while(add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operator.splice(add, 1);
        add = operator.indexOf('+');
    }

    input.innerHTML = numbers[0]; // hiển thị ra output

    resultDisplayed = true; // chuyển cờ nếu kết quả được hiển thị

    // xoá input khi nhấn vào button C
    clear.addEventListener('click', function(e) {
        input.innerHTML = '';
    })

}) 

