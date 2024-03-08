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


  export function useCurrencyDigit(inputOnChange) {
    useEffect(() => {
      const handleCurrencyInput = (event) => {
        const removeString = event.target.value.replace(/[^0-9.]/g, '');
        const convertToDigit = parseFloat(removeString);
        if (!isNaN(convertToDigit) && typeof inputOnChange === 'function') {
          const formattedValue = convertToDigit.toLocaleString('en-US');
          inputOnChange({ target: { name: event.target.name, value: formattedValue } });
        } else if (typeof inputOnChange === 'function') {
          inputOnChange({ target: { name: event.target.name, value: '' } });
        }
      };
  
      document.querySelectorAll('.currencyDigit').forEach((input) => {
        input.addEventListener('input', handleCurrencyInput);
  
        return () => {
          input.removeEventListener('input', handleCurrencyInput);
        };
      });
    }, [inputOnChange]);
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

  export function SearchTable(){
      // Declare variables
      var input, filter, table, tr, td, i, j, txtValue;
      input = document.getElementById("searchInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("dataTable");
      tr = table.getElementsByTagName("tr");
    
      // Start the loop from the second row to exclude the header
      for (i = 1; i < tr.length; i++) {
        let matchFound = false;
    
        // Loop through all table columns in each row
        for (j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
          td = tr[i].getElementsByTagName("td")[j];
          
          if (td) {
            txtValue = td.textContent || td.innerText;
    
            // Check if the search query matches any column
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              matchFound = true;
              break; // Break the inner loop if a match is found
            }
          }
        }
    
        // Set display style based on whether a match was found
        if (matchFound) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
  }
  
  export function filterTable(num) {
    const statusFilter = document.getElementById('statusFilter').value;
    const tableRows = document.getElementById('dataTable').querySelectorAll('tbody tr');
  
    for (const row of tableRows) {
      const statusCell = row.querySelector(`td:nth-child(${num})`);
      const status = statusCell.textContent.trim();
  
      if (statusFilter === 'All' || status === statusFilter) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    }
  }