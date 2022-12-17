const enableValidation = (object) => {
  const forms = [...document.querySelectorAll(object.formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(object.inputSelector)];
    const button = form.querySelector(object.submitButtonSelector);

    toggleSubmitButton(inputs, button, object);

    form.addEventListener('reset', () => {
      setTimeout(() => {
        toggleSubmitButton(inputs, button, object);
      }, 0);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, object);
        toggleSubmitButton(inputs, button, object);
      });
    });
  });
}

const checkInputValidity = (input, object) => {
  const error = document.querySelector(`#${input.id}-error`);
      if (input.validity.valid) {
        error.textContent = '';
        input.classList.remove(object.inputErrorClass);
      } else {
        error.textContent = input.validationMessage;
        input.classList.add(object.inputErrorClass);
      }
}

const toggleSubmitButton = (inputs, button, object) => {
  const isFormValid = inputs.every(input => input.validity.valid);

      if (isFormValid) {
        button.classList.remove(object.inactiveButtonClass);
        button.disabled = '';
      } else {
        button.classList.add(object.inactiveButtonClass);
        button.disabled = 'disabled';
      }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

