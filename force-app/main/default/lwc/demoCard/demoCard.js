import { LightningElement } from "lwc";

export default class DemoCard extends LightningElement {
  formValues = {
    username: "",
    password: ""
  };
  /** @type {NodeListOf<HTMLInputElement>} */
  _inputs;
  /** @type {HTMLFormElement} */
  _formELement;

  renderedCallback() {
    this._formELement = this.template.querySelector("form");
    this._inputs = this.template.querySelectorAll("lightning-input");
  }

  disconnectedCallback() {
    this._formELement = undefined;
    this._inputs = undefined;
  }

  get disabled() {
    const { username, password } = this.formValues;
    return !(username && password);
  }

  get formValuesJson() {
    return JSON.stringify(this.formValues);
  }

  /**
   * @param {Event} event
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.formValues = {
      ...this.formValues,
      [name]: value
    };

    this._inputs.forEach((input) => {
      const inputName = input.name;
      if (inputName === name && value) {
        input.setCustomValidity("");
      } else {
        input.setCustomValidity(`Please enter a ${name}`);
      }
    });
  }

  /**
   * @param {SubmitEvent} event
   */
  handleSubmit(event) {
    event.preventDefault();
    const isFormValid = this._formELement.checkValidity();

    if (!isFormValid) {
      this._inputs.forEach((input) => {
        input.reportValidity();
      });
    } else {
      console.log("view form value::", JSON.stringify(this.formValues));
    }
  }
}
