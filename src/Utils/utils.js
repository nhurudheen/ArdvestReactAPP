import { useEffect } from "react";


export function getPeriodOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Afternoon";
    } else {
        return "Evening";
    }
}

export function clearOTP() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input) => (input.value = ''));
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}

export function focusNext(currentInput) {
    if (currentInput.value.length === 1) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        }
    }
}

export function handleInput(currentInput) {
    var userInput = "";
    var digitInputs = document.querySelectorAll('.input');
    digitInputs.forEach(function (digitInput) {
        userInput += digitInput.value;
    });
    document.getElementById('userInput').value = userInput;

    focusNext(currentInput);
    return userInput
}


export function openFileInput() {
    document.getElementById('imageInput').click();
}

export function previewImage() {
    var image = document.getElementById("imageInput").files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("imagePreview").style.backgroundImage =
            "url('" + e.target.result + "')";
    };

    reader.readAsDataURL(image);
}

export function currencyFormat(userAmount) {
    const userBalance = parseFloat(userAmount.replace(/,/g, ''));
    const formattedBalance = userBalance.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const [wholeNumber, decimalPart = "00"] = formattedBalance.split('.');
    return { wholeNumber, decimalPart };
}

export async function copyToClipboard(userContent) {
    try {
      await navigator.clipboard.writeText(userContent);
      alert("Copied to Clipboard");
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert("Failed to copy to Clipboard");
    }
  }


  export function useCurrencyDigit() {
    useEffect(() => {
      const handleCurrencyInput = (event) => {
        const removeString = event.target.value.replace(/[^0-9.]/g, '');
        const convertToDigit = parseFloat(removeString);
        if (!isNaN(convertToDigit)) {
          event.target.value = convertToDigit.toLocaleString('en-US');
        } else {
          event.target.value = '';
        }
      };
  
      document.querySelectorAll('.currencyDigit').forEach((input) => {
        input.addEventListener('input', handleCurrencyInput);
  
        return () => {
          input.removeEventListener('input', handleCurrencyInput);
        };
      });
    }, []);
  }

  export function useDigitInput() {
    useEffect(() => {
      const handleDigitInput = (event) => {
        const removeString = event.target.value.replace(/[^0-9.]/g, '');
        const convertToDigit = parseFloat(removeString);
        if (!isNaN(convertToDigit)) {
          event.target.value = convertToDigit;
        } else {
          event.target.value = '';
        }
      };
  
      document.querySelectorAll('.digitFormat').forEach((input) => {
        input.addEventListener('keyup', handleDigitInput);
  
        return () => {
          input.removeEventListener('keyup', handleDigitInput);
        };
      });
    }, []);
  }
  