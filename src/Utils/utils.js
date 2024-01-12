

export function getPeriodOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "afternoon";
    } else {
        return "evening";
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


