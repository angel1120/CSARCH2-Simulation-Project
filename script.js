window.onload = function () {
document.getElementById("converterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    convert();
});

    function convert() {
    //   get inputted number
        let inputNumber = document.getElementById("inputNumber").value;
        
    //   check if NaN input
        if (inputNumber == " ") {
            document.getElementById("binaryOutput").innerText = "NaN";
            document.getElementById("hexOutput").innerText = "NaN";
            return;
        }

    // get the decimal and base-10 exponent portion
        let index_X = inputNumber.indexOf("x");
        let decimal = inputNumber.slice(0,index_X);
        let index_exp_sign = inputNumber.indexOf("^");
        let base_10_exponent = inputNumber.slice(index_exp_sign+1, inputNumber.length);

    // get expanded decimal (from exponent)
        let float_decimal = parseFloat(decimal) ;

        // get sign bit for binary conversion
        let sign = "";
        if (float_decimal > 0) {
            sign = "0";
        } else if (float_decimal < 0) {
            sign = "1";
            float_decimal = float_decimal * -1
        }

        let expand_exponent = 10 ** parseInt(base_10_exponent);
        let expand_decimal = float_decimal * expand_exponent;

    // get binary conversion of expanded decimal
        let binary = expand_decimal.toString(2);

    // get fraction part of significand
        let fraction_significand = binary.slice(1,binary.length);

    // check if fraction significand is 52 bits
        if (fraction_significand.length < 52) {
            let difference = 52 - binary.length;

            // loop to concatenate "0" until 52
            for (let i=0; i<difference; i++) {
                fraction_significand = fraction_significand.concat("0");
            }
        }

    // get exponent representation
        let number_binary = Number(binary);
        let normalized_binary = number_binary.toExponential(2);
        let index_plus_sign = normalized_binary.indexOf("+");
        let binary_exponent = normalized_binary.slice(index_plus_sign+1, normalized_binary.length);
        let int_binary_exponent = parseInt(binary_exponent);

    // get e_prime
        let e_prime = int_binary_exponent + 1023;
        let binary_e_prime = e_prime.toString(2);
        let final_e_prime = "";

        if (binary_e_prime.length < 11) {
            let e_difference = 11 - binary_e_prime.length;

            // loop to concatenate "0" until 52
            for (let i=0; i<e_difference; i++) {
                final_e_prime = final_e_prime.concat("0");
            }
        }

        final_e_prime = final_e_prime.concat(binary_e_prime);

    // concatenate sign, exponent representation, fraction significand
        let final_binary_form = sign.concat(" ", final_e_prime);
        final_binary_form = final_binary_form.concat(" ", fraction_significand);

    // concatenate for binary to hex
        let bin_to_hex_var = sign.concat(final_e_prime);
        bin_to_hex_var = bin_to_hex_var.concat(fraction_significand);
        let final_hex = "0x"

        let start_range = 0;
        let end_range = 4;

        for (let i = 0; i < 16; i++) {
        let sub_string = bin_to_hex_var.slice(start_range,end_range);
        let num_sub_string = parseInt(sub_string);

        switch(num_sub_string) {
            case 0:
                final_hex = final_hex.concat("0");
                break;
            case 1:
                final_hex = final_hex.concat("1");
                break;
            case 10:
                final_hex = final_hex.concat("2");
                break;
            case 11:
                final_hex = final_hex.concat("3");
                break;
            case 100:
                final_hex = final_hex.concat("4");
                break;
            case 101:
                final_hex = final_hex.concat("5");
                break;
            case 110:
                final_hex = final_hex.concat("6");
                break;
            case 111:
                final_hex = final_hex.concat("7");
                break;
            case 1000:
                final_hex = final_hex.concat("8");
                break;
            case 1001:
                final_hex = final_hex.concat("9");
                break;
            case 1010:
                final_hex = final_hex.concat("A");
                break;
            case 1011:
                final_hex = final_hex.concat("B");
                break;
            case 1100:
                final_hex = final_hex.concat("C");
                break;
            case 1101:
                final_hex = final_hex.concat("D");
                break;
            case 1110:
                final_hex = final_hex.concat("E");
                break;
            case 1111:
                final_hex = final_hex.concat("F");
                break;
        }

        start_range = start_range + 4;
        end_range = end_range + 4;
        }

        document.getElementById("binaryOutput").innerText = "Binary: " + final_binary_form;
        document.getElementById("hexOutput").innerText = "Hex: " + final_hex;

    //   let roundingMethod = document.getElementById("roundingMethod").value;
    //   let float64 = parseFloat(inputNumber);

    //   let roundFunc = Math.round;
    //   if (roundingMethod === "ceil") {
    //     roundFunc = Math.ceil;
    //   } else if (roundingMethod === "floor") {
    //     roundFunc = Math.floor;
    //   }

    //   let binary = float64.toString(2);
    //   let hex = roundFunc(float64).toString(16);
    //   document.getElementById("binaryOutput").innerText = "Binary: " + binary;
    //   document.getElementById("hexOutput").innerText = "Hex: " + hex;
    }

    document.getElementById("saveToFile").addEventListener("click", function() {
        let content = document.getElementById("binaryOutput").innerText + "\n" + document.getElementById("hexOutput").innerText;
        let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "decimal_64_floating_point_conversion.txt";
        a.click();
    });

}
