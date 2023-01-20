class FormValidator {
  constructor (settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _toggleSubmitButton() {
    const isFormValid = this._inputsList.every(input => input.validity.valid);
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = '';
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _removeInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _addInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
      if (input.validity.valid) {
        this._removeInputError(input);
      } else {
        this._addInputError(input);
      }
    }

  resetValidation() {
    this._inputsList.forEach(input => {
      this._removeInputError(input);
    });
  }

  enableValidation() {
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleSubmitButton(this._inputsList, this._submitButton);
      }, 0);
    });

    this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputsList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

}
