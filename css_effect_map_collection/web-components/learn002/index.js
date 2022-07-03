const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }
 
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
 
      width: 100%;
      height: 40px;
 
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
 
  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector("button");

    this.$button.addEventListener("click", () => {
      console.log("do something");
    });
  }

  get label() {
    console.log('5 button--get');
    return this.getAttribute("label");
  }

  set label(value) {
    console.log("2 button--set");
    this.setAttribute("label", value);
  }

  static get observedAttributes() {
    console.log("1 button--static--get");
    return ["label"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("3 button--attributeChangedCallback");
    this.render();
  }

  render() {
    console.log("4 button--render");
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define("my-button", Button);
