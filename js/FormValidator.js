class FormValidator {
  constructor (settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactivateButtonClass = settings.inactivateButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _toggleSubmitButton() {
    const isFormValid = this._inputsList.every(input => input.validity.valid);
    if (isFormValid) {
      this.submitButton.classList.remove(this._inactiveButtonClass);
      this.submitButton.disabled = '';
    } else {
      this.submitButton.classList.add(this._inactiveButtonClass);
      this.submitButton.disabled = 'disabled';
    }
  }

  _removeInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }

  _addInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    const buttonClose = this._form.querySelector('.popup__close');

      if (input.validity.valid) {
        this._removeInputError(input);
      } else {
        this._addInputError(input);
      }

      buttonClose.addEventListener('click', () => {
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
      });
  }

  enableValidation() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        _toggleSubmitButton(this._inputsList, this._submitButton);
      }, 0);
    });

    this._inputsList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputsList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton(this._inputsList, this._submitButton);
      });
    });
  }

  // enableValidation() {
  //   const forms = [...document.querySelectorAll(this._formSelector)];

  //   forms.forEach(form => {
  //     const inputs = [...form.querySelectorAll(this._inputSelector)];
  //     const button = form.querySelector(this._submitButtonSelector);

  //     form.addEventListener('submit', (e) => {
  //       e.preventDefault();
  //     });


      // this._form.addEventListener('reset', () => {
      //   setTimeout(() => {
      //     this._toggleSubmitButton(this._inputs, this._button);
      //   }, 0);
      // });

  //     this._inputList.forEach(input => {
  //       this._inputList = this._form.querySelectorAll(this._inputSelector);
  //       input.addEventListener('input', () => {
  //         this._checkInputValidity(input);
  //         this._toggleSubmitButton(inputs, button);
  //       });
  //     })

  //     // form.addEventListener('reset', () => {
  //     //   setTimeout(() => {
  //     //     _toggleSubmitButton(this._inputs, this._button);
  //     //   }, 0);
  //     // });

  //     // inputs.forEach(input => {
  //     //   input.addEventListener('input', () => {
  //     //     this._checkInputValidity(input);
  //     //     this._toggleSubmitButton(inputs, button);
  //     //   });
  //     // });
  //   });
  // }
}
