class Modal extends HTMLElement {
    constructor(){
        super()
        // Encapsulacion del componente
        this.attachShadow({mode: 'open'})

        // Event listener
        this.buttonId = this.getAttribute('value')
        this.modalContainer = document.querySelector(this.buttonId)

        // Template del componente
        this.shadowRoot.innerHTML = `
        <style>
        #modal-button{
            display: inline-block;
            padding:1rem 2rem;
            font-size:15px;
            background-color:gray;
            border:1px solid black;
        }
        #modal-button:hover{
            cursor:pointer;
        }
        
        </style>
        <div id="modal-button">
            <slot>open modal</slot>
        </div>`
    }

    connectedCallback(){
        // Button open modal
        const button = this.shadowRoot.querySelector('#modal-button')
        button.addEventListener('click', this._openModal.bind(this))
        this.shadowRoot.appendChild(button)

        // Close modal clicking close icon
        const closeIcon = this.modalContainer.querySelector('.modal-content').querySelector('.close')
        closeIcon.addEventListener('click', this._closeModal.bind(this))

        // Close modal clicking outside
        const parentModalArea = this.modalContainer.closest(this.buttonId)
        parentModalArea.addEventListener('click', this._closeModalOutsideArea.bind(this))
    }

    _openModal(){
        this.modalContainer.style.display = "block"
    }

    _closeModal(){
        this.modalContainer.style.display = "none"
    }

    _closeModalOutsideArea(_event){
        if (_event.target === this.modalContainer) {
            this.modalContainer.style.display = "none"
        }
    }
}

customElements.define('componente-modal', Modal)