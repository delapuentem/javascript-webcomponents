const template = `
<link rel="stylesheet" href="media.css">
<link rel="stylesheet" href="mainmenu.css">
<link rel="stylesheet" href="submenu.css">
<link rel="stylesheet" href="icons.css">

<nav>
<!-- Start main menu -->
<div id="mainmenu">
    <div class="logo">
        <img class="empresalogo" src="">
    </div>

    <div class="menu">
        <ul>
            <li id="branding"><a href="#"><b><span class="empresa"></span></b></a></li>
            <li id="panel"><a href="#">Panel de control <span class="icon baseline"><img src="icons/arrow-up.svg"></span></a></li>
            <li><a href="#">Facturación</a></li>                    
            <li><a href="#">Profesionales</a></li>
        </ul>
    </div>
    <div class="login">
        <div class="avatar">
        <img class="usernameimage" src="">
        <span class="username"></span>
    </div>
    </div>
</div>
<!-- End main menu -->

<!-- Start sub menu -->
<div id="submenu">
<div id="panel">
<div class="features">
    <div class="title">Funcionalidades</div>
    <div class="features-grid">
    <div class="item">
        <div class="item-image">
            <img src="https://www.svgrepo.com/show/406888/people-hugging.svg">
        </div>
        <div>
            <p class="item-title">Mis clientes</p>
            <p class="item-description">Gestión de clientes.</p>
        </div>
    </div>

    <div class="item">
        <div class="item-image">
            <img src="https://www.svgrepo.com/show/108495/calendar.svg">
        </div>
        <div>
            <p class="item-title">Calendario</p>
            <p class="item-description">Calendario de reservas.</p>
        </div>
    </div>

    <div class="item">
        <div class="item-image">
            <img src="https://www.svgrepo.com/show/313155/pin.svg">
        </div>
        <div>
            <p class="item-title">Actividades</p>
            <p class="item-description">Próximas actividades.</p>
        </div>
    </div>                    
    
    <div class="item">
        <div class="item-image">
            <img src="https://www.svgrepo.com/show/146075/question.svg">
        </div>
        <div>
            <p class="item-title">Incidencias</p>
            <p class="item-description">Reporte de problemas.</p>
        </div>
    </div> 
               
   
    </div>
</div>
<div class="actions">
    <div class="title">Acciones rápidas</div>
    <p><span class="icon baseline"><img src="icons/useradd.svg"></span> <a href="#">Dar de alta un nuevo usuario</a></p>
    <p><span class="icon baseline"><img src="icons/calendar.svg"></span> <a href="#">Reservar una cita</a></p>
    <p><span class="icon baseline"><img src="icons/meetup.svg"></span> <a href="#">Programar una nueva actividad</a></p>
    <p><span class="icon baseline"><img src="icons/message.svg"></span> <a href="#">Reportar una incidencia</a></p>
</div>      
<div class="wiki">
    <div class="title">Wiki</div>
    <img src="https://www.visme.co/wp-content/uploads/2022/10/Cover-Oct28th-2022-2.jpg">
    <p>¿Tienes dudas? Consulta nuestra Wiki</p>
</div>          
</div>
</div>
<!-- End sub menu -->
</nav>
`

class Menu extends HTMLElement{
    constructor(){
        super()

        // Propiedades
        this.usuarioNombre = 'Default usuario'
        this.usuarioAvatar = 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
        this.empresaNombre = 'Default empresa'
        this.empresaLogo = 'https://directorio.pescadata.org/assets/no-logo.png'

        // Encapsulacion del componente
        this.attachShadow({mode: 'open'})

        // HTML Template
        this.shadowRoot.innerHTML = template

        // Event listener
        this.mainmenu = this.shadowRoot.querySelector('#mainmenu')
        this.panelLink = this.shadowRoot.querySelector('#panel')
        this.submenu = this.shadowRoot.querySelector('#submenu')
        this.submenuPanel = this.submenu.querySelector('#panel')
    }

    connectedCallback(){
        // Setear Propiedades
        this._setPropiedades()

        // Open and Close click Panel
        this.panelLink.addEventListener('click', this._showPanel.bind(this))      
    }

    _setPropiedades(){
        const usuarioNombre = this.usuarioNombre
        const usuarioAvatar = this.usuarioAvatar
        const empresaNombre = this.empresaNombre
        const empresaLogo = this.empresaLogo
        this.shadowRoot.querySelectorAll('.username').forEach(function(item){
            item.innerHTML = usuarioNombre
        })
        this.shadowRoot.querySelectorAll('.usernameimage').forEach(function(item){
            item.src = usuarioAvatar
        })
        this.shadowRoot.querySelectorAll('.empresa').forEach(function(item){
            item.innerHTML = empresaNombre
        })
        this.shadowRoot.querySelectorAll('.empresalogo').forEach(function(item){
            item.src = empresaLogo
        })                        
    }

    _showPanel(_event){
        if (this.submenuPanel.style.display === 'none' || this.submenuPanel.style.display == '') {
            // Display submenu 
            this.submenu.style.display = 'grid'
            // Display submenu panel section
            this.submenuPanel.style.display = 'grid'
            // Change icon arrow to down
            _event.target.querySelector('span').querySelector('img').src = 'icons/arrow-down.svg'
            // Change to class='active' the link was i clicked
            _event.target.classList = 'active'
            // Disable border bottom
            this.mainmenu.style.borderBottom = '1px solid transparent'
        }
        else {
            this.submenu.style.display = 'none'
            this.submenuPanel.style.display = 'none'
            _event.target.querySelector('span').querySelector('img').src = 'icons/arrow-up.svg'
            _event.target.classList = ''
            this.mainmenu.style.borderBottom = '1px solid #DAE4EA'            
        }
    }      
}

customElements.define('componente-menu', Menu)