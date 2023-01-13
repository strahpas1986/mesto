class FormValidator {
  constructor (settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactivateButtonClass = settings.inactivateButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _toggleSubmitButton(inputsList, submitButton) {
    const isFormValid = inputsList.every(input => input.validity.valid);
    if (isFormValid) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = '';
    } else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = 'disabled';
    }
  }

  _checkInputValidity(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    const buttonClose = this._form.querySelector('.popup__close');

      if (input.validity.valid) {
        error.textContent = '';
        input.classList.remove(this._inputErrorClass);
      } else {
        error.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
      }

      buttonClose.addEventListener('click', () => {
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
      });
  }

  enableValidation() {
    const forms = [...document.querySelectorAll(this._formSelector)];

    forms.forEach(form => {
      const inputs = [...form.querySelectorAll(this._inputSelector)];
      const button = form.querySelector(this._submitButtonSelector);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });

      form.addEventListener('reset', () => {
        setTimeout(() => {
          _toggleSubmitButton(this._inputs, this._button);
        }, 0);
      });

      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleSubmitButton(inputs, button);
        });
      });
    });
  }
}
