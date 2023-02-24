export class FormValidator {
  constructor (settingsValidation, formElement) {
    this._inputSelector = settingsValidation.inputSelector;
    this._submitButtonSelector = settingsValidation.submitButtonSelector;
    this._inactiveButtonClass = settingsValidation.inactiveButtonClass;
    this._inputErrorClass = settingsValidation.inputErrorClass;
    this._errorClass = settingsValidation.errorClass;
    this._form = formElement;
    this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
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

    this._inputsList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

}
