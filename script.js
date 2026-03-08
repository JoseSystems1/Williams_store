// ============================================================
//  WILLIAMS STORE — script.js — VERSIÓN LIMPIA Y FUNCIONAL
// ============================================================

/* ---------- STORAGE ---------- */
const getUsuarios = () => JSON.parse(localStorage.getItem('ws_usuarios') || '[]');
const getSesion   = () => null;
const guardarSesion = u => {};

/* ---------- PASSWORD STRENGTH ---------- */
function _calcFuerza(val, barId, lblId) {
    const bar = document.getElementById(barId), lbl = document.getElementById(lblId);
    if (!bar || !lbl) return;
    let s = 0;
    if (val.length >= 6) s++; if (val.length >= 10) s++;
    if (/[A-Z]/.test(val)) s++; if (/[0-9]/.test(val)) s++; if (/[^A-Za-z0-9]/.test(val)) s++;
    const n = [{p:'0%',c:'transparent',t:''},{p:'25%',c:'#ef4444',t:'🔴 Muy débil'},{p:'50%',c:'#f59e0b',t:'🟡 Débil'},{p:'70%',c:'#3b82f6',t:'🔵 Regular'},{p:'90%',c:'#10b981',t:'🟢 Fuerte'},{p:'100%',c:'#059669',t:'✅ Muy fuerte'}][Math.min(s,5)];
    bar.style.width = val.length===0?'0%':n.p; bar.style.background = n.c;
    lbl.textContent = val.length===0?'':n.t; lbl.style.color = n.c;
}
const evalFuerza  = val => _calcFuerza(val, 'passBar',  'passLabel');
const evalFuerza2 = val => _calcFuerza(val, 'passBar2', 'passLabel2');

function togglePass(inputId, btn) {
    const inp = document.getElementById(inputId), ico = btn.querySelector('i');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    ico.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

/* ---------- PRODUCTOS DATA ---------- */
const productosPorDepartamento = {
    electronica: [
        {id:1,  nombre:'Laptop HP 15"',        descripcion:'Intel i5, 8GB RAM, 256GB SSD.',      precio:45999, imagen:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'},
        {id:2,  nombre:'Samsung Galaxy S23',   descripcion:'256GB, Negro.',                      precio:52999, descuento:36999, imagen:'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80'},
        {id:3,  nombre:'MacBook Air M2',       descripcion:'13", 8GB RAM, 256GB.',               precio:75999, imagen:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'},
        {id:4,  nombre:'AirPods Pro 2',        descripcion:'Cancelación de ruido activa.',       precio:15999, imagen:'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&q=80'},
        {id:5,  nombre:'iPad Air',             descripcion:'10.9", 64GB, WiFi.',                 precio:38999, imagen:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'},
        {id:6,  nombre:'Apple Watch Series 8', descripcion:'GPS, 41mm.',                         precio:25999, imagen:'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80'},
        {id:7,  nombre:'Teclado Mecánico RGB', descripcion:'Switch Blue, retroiluminado.',       precio:4599,  imagen:'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80'},
        {id:46, nombre:'Smart TV 55"',         descripcion:'4K Ultra HD, Smart TV.',             precio:32999, descuento:24749, imagen:'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=400&q=80'},
        {id:47, nombre:'Auriculares Bluetooth',descripcion:'Inalámbricos, 20h batería.',         precio:3999,  imagen:'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80'},
    ],
    ropa: [
        {id:8,  nombre:"Jeans Levi's 501",    descripcion:'Corte clásico, azul índigo.',         precio:2899, imagen:'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&q=80'},
        {id:9,  nombre:'Camisa Oxford',       descripcion:'Algodón 100%, manga larga.',          precio:1499, imagen:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'},
        {id:10, nombre:'Vestido Floral',      descripcion:'Manga corta, varios colores.',        precio:1899, imagen:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80'},
        {id:11, nombre:'Chaqueta de Cuero',   descripcion:'Estilo motociclista, genuino.',       precio:4999, imagen:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80'},
        {id:12, nombre:'Zapatillas Nike Air', descripcion:'Running, varios colores.',            precio:3599, descuento:2159, imagen:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'},
        {id:13, nombre:'Traje Formal',        descripcion:'Corte slim fit, negro.',              precio:6999, imagen:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80'},
        {id:14, nombre:'Sudadera con Capucha',descripcion:'Algodón, estilo oversized.',          precio:1699, imagen:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'},
        {id:15, nombre:'Pantalones Deportivos',descripcion:'Poliéster, cintura ajustable.',      precio:1299, imagen:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80'},
    ],
    hogar: [
        {id:16, nombre:'Sofá 3 Plazas',      descripcion:'Tela gris, diseño moderno.',           precio:18999, imagen:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'},
        {id:17, nombre:'Mesa de Comedor',    descripcion:'Madera maciza, 6 personas.',           precio:12999, imagen:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80'},
        {id:18, nombre:'Lámpara de Pie',     descripcion:'LED, altura ajustable.',               precio:2499,  imagen:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80'},
        {id:19, nombre:'Cama King Size',     descripcion:'Con cabecera acolchada.',              precio:22999, imagen:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80'},
        {id:20, nombre:'Espejo Decorativo',  descripcion:'Marco dorado, 120cm.',                 precio:3499,  imagen:'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80'},
        {id:21, nombre:'Set de Toallas',     descripcion:'6 piezas, algodón egipcio.',           precio:1599,  imagen:'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&q=80'},
        {id:22, nombre:'Alfombra Persa',     descripcion:'200x300cm, tejida a mano.',            precio:8999,  imagen:'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80'},
        {id:23, nombre:'Cafetera Espresso',  descripcion:'15 bares, cappuccino.',                precio:4599,  imagen:'https://images.unsplash.com/photo-1531937465322-9909ce13f8ca?w=500&q=80'},
    ],
    deportes: [
        {id:24, nombre:'Raqueta de Tenis',    descripcion:'Grafito, peso medio.',                precio:3599,  imagen:'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80'},
        {id:25, nombre:'Bicicleta de Montaña',descripcion:'21 velocidades, aluminio.',           precio:12999, imagen:'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80'},
        {id:26, nombre:'Pesas Ajustables',    descripcion:'2.5kg a 24kg por mancuerna.',         precio:5999,  imagen:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'},
        {id:27, nombre:'Yoga Mat Premium',    descripcion:'Antideslizante, grosor 6mm.',         precio:1299,  imagen:'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80'},
        {id:28, nombre:'Máquina para correr', descripcion:'Con contador digital.',               precio:599,   imagen:'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80'},
        {id:29, nombre:'Guantes de Box',      descripcion:'12oz, cuero sintético.',              precio:1899,  imagen:'https://images.unsplash.com/photo-1729719762188-960b41c4ec2f?w=400&q=80'},
        {id:30, nombre:'Tabla de Surf',       descripcion:"6'2\", fibra de vidrio.",             precio:9999,  imagen:'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&q=80'},
        {id:48, nombre:'Balón de Basketball', descripcion:'Tamaño oficial, cuero sintético.',    precio:1499,  imagen:'https://plus.unsplash.com/premium_photo-1661351817037-6a21919bc9a0?w=400&q=80'},
        {id:49, nombre:'Set de Mancuernas',   descripcion:'5kg, 10kg y 15kg incluidos.',         precio:4999,  imagen:'https://images.unsplash.com/photo-1734630341082-0fec0e10126c?w=400&q=80'},
    ],
    juguetes: [
        {id:31, nombre:'LEGO Star Wars',      descripcion:'1000 piezas, Halcón Milenario.',      precio:3999,  imagen:'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80'},
        {id:32, nombre:'Barbie Dreamhouse',   descripcion:'Casa de 3 pisos con accesorios.',     precio:2899,  imagen:'https://images.unsplash.com/photo-1745764625600-3283b04f2046?w=400&q=80'},
        {id:33, nombre:'Hot Wheels Set',      descripcion:'20 autos coleccionables + pista.',    precio:1599,  imagen:'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80'},
        {id:34, nombre:'Muñeco LOL Surprise', descripcion:'Edición limitada con accesorios.',    precio:899,   imagen:'https://images.unsplash.com/photo-1585197508786-35c0ae51eb18?w=300&q=80'},
        {id:35, nombre:'Nintendo Switch',     descripcion:'Consola + Mario Kart 8.',             precio:18999, imagen:'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80'},
        {id:36, nombre:'Drone con Cámara',    descripcion:'Para niños, fácil de usar.',          precio:2499,  imagen:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80'},
        {id:37, nombre:'Peluche Gigante',     descripcion:'Oso de 1 metro, suave.',              precio:1299,  imagen:'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&q=80'},
        {id:38, nombre:'Rompecabezas 3D',     descripcion:'Torre Eiffel, 500 piezas.',           precio:799,   imagen:'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400&q=80'},
        {id:50, nombre:'Cartas Pokemón',      descripcion:'10 cartas, totalmente exclusivas.',   precio:2499,  imagen:'https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?w=400&q=80'},
    ],
    alimentos: [
        {id:39, nombre:'Aceite de Oliva Extra',descripcion:'1 litro, virgen extra importado.',   precio:349, imagen:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80'},
        {id:40, nombre:'Café Premium',         descripcion:'500g, grano entero colombiano.',     precio:499, imagen:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80'},
        {id:41, nombre:'Vino Tinto',           descripcion:'Reserva española, 750ml.',           precio:599, descuento:399, imagen:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80'},
        {id:42, nombre:'Chocolate Belga',      descripcion:'Tableta 200g, 70% cacao.',           precio:249, imagen:'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80'},
        {id:43, nombre:'Miel Orgánica',        descripcion:'500g, 100% natural pura.',           precio:299, imagen:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&q=80'},
        {id:44, nombre:'Queso Parmesano',      descripcion:'250g, importado de Italia.',         precio:449, imagen:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80'},
        {id:45, nombre:'Sobre de Té',          descripcion:'Caja 400g, bien saludables.',        precio:179, imagen:'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80'},
        {id:51, nombre:'Pasta Premium',        descripcion:'1kg, artesanal italiana.',           precio:299, imagen:'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=400&q=80'},
        {id:52, nombre:'Filete GOLD',          descripcion:'120g, carne totalmente fresca.',     precio:399, imagen:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80'},
    ]
};

const infoDepts = {
    electronica:{titulo:'Electrónicos'}, ropa:{titulo:'Ropa y Moda'}, hogar:{titulo:'Hogar y Decoración'},
    deportes:{titulo:'Deportes y Fitness'}, juguetes:{titulo:'Juguetes y Juegos'}, alimentos:{titulo:'Alimentos y Bebidas'}
};

/* ---------- CARRITO ---------- */
let carrito = [];

/* ---------- MENÚ MÓVIL ---------- */
function toggleMenu() {
    document.getElementById('mainNav').classList.toggle('menu-open');
    document.getElementById('hamburgerBtn').classList.toggle('active');
}
function cerrarMenu() {
    document.getElementById('mainNav').classList.remove('menu-open');
    document.getElementById('hamburgerBtn').classList.remove('active');
}

/* ---------- NAVEGACIÓN ---------- */
const SECCIONES = ['seccionInicio','seccionDepartamentos','seccionProductos','seccionOfertas','seccionAcercaDe','seccionHelp','seccionPago'];
function ocultarTodo() { SECCIONES.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; }); }
function mostrarSeccion(id) { ocultarTodo(); const el = document.getElementById(id); if (el) el.style.display = 'block'; window.scrollTo({top:0,behavior:'smooth'}); }

function irAInicio()          { mostrarSeccion('seccionInicio'); }
function mostrarDepartamentos(){ mostrarSeccion('seccionDepartamentos'); }
function mostrarOfertas()     { mostrarSeccion('seccionOfertas'); }
function mostrarAcercaDe()    { mostrarSeccion('seccionAcercaDe'); }
function mostrarHelp()        { mostrarSeccion('seccionHelp'); }

function abrirDepartamento(dep) {
    ocultarTodo();
    document.getElementById('seccionProductos').style.display = 'block';
    document.getElementById('breadcrumbText').textContent    = 'Inicio / ' + infoDepts[dep].titulo;
    document.getElementById('departamentoTitulo').textContent = infoDepts[dep].titulo;
    cargarProductos(dep);
    window.scrollTo({top:0,behavior:'smooth'});
}
function irAProductosConDescuento(dep) {
    ocultarTodo();
    document.getElementById('seccionProductos').style.display = 'block';
    document.getElementById('breadcrumbText').textContent    = 'Inicio / ' + infoDepts[dep].titulo + ' / Ofertas';
    document.getElementById('departamentoTitulo').textContent = infoDepts[dep].titulo + ' — Ofertas';
    cargarProductos(dep);
    window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- PRODUCTOS ---------- */
const fmtPrecio = p => p.toLocaleString('es-DO',{minimumFractionDigits:2,maximumFractionDigits:2});

function cargarProductos(dep) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';
    productosPorDepartamento[dep].forEach(p => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        const img = p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">` : `<div class="sin-img"><i class="fas fa-image"></i></div>`;
        const precio = p.descuento
            ? `<div class="prod-precios"><span class="p-orig">$${fmtPrecio(p.precio)}</span><span class="p-desc">$${fmtPrecio(p.descuento)}</span><span class="p-badge">-${Math.round((1-p.descuento/p.precio)*100)}%</span></div>`
            : `<div class="prod-precio">$${fmtPrecio(p.precio)}</div>`;
        card.innerHTML = `<div class="prod-img">${img}</div><div class="prod-info"><h3>${p.nombre}</h3><p>${p.descripcion}</p>${precio}<button class="btn-add" onclick="agregarAlCarrito(${p.id},'${dep}')"><i class="fas fa-cart-plus"></i> Agregar al carrito</button></div>`;
        grid.appendChild(card);
    });
}

/* ---------- CARRITO FUNCIONES ---------- */
function agregarAlCarrito(id, dep) {
    id = parseInt(id);
    const p = productosPorDepartamento[dep].find(x => x.id === id);
    if (!p) return;
    const ex = carrito.find(x => x.id === id);
    if (ex) ex.cantidad++;
    else carrito.push({...p, id, precio: p.descuento||p.precio, cantidad:1});
    actualizarCarrito();
    mostrarNotif('Producto agregado al carrito 🛒');
}
function disminuirCantidad(id) {
    id = parseInt(id);
    const i = carrito.findIndex(x => x.id === id);
    if (i === -1) return;
    if (carrito[i].cantidad > 1) { carrito[i].cantidad--; } else { carrito.splice(i,1); }
    actualizarCarrito();
}
function aumentarCantidad(id) {
    id = parseInt(id);
    const i = carrito.findIndex(x => x.id === id);
    if (i !== -1) { carrito[i].cantidad++; actualizarCarrito(); }
}
function eliminarDelCarrito(id) {
    id = parseInt(id);
    carrito = carrito.filter(x => x.id !== id);
    actualizarCarrito();
}
function actualizarCarrito() {
    const items = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    const total = document.getElementById('cartTotal');
    count.textContent = carrito.reduce((s,x) => s + x.cantidad, 0);
    if (!carrito.length) {
        items.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Tu carrito está vacío.</p></div>';
        total.textContent = '$0.00'; return;
    }
    items.innerHTML = carrito.map(x => `
        <div class="cart-item">
            <div class="cart-item-img">${x.imagen?`<img src="${x.imagen}" alt="${x.nombre}">`:''}</div>
            <div class="cart-item-info">
                <h4>${x.nombre}</h4>
                <div class="cart-item-price">$${fmtPrecio(x.precio)}</div>
                <div class="cart-qty">
                    <button onclick="disminuirCantidad(${x.id})">−</button>
                    <span>${x.cantidad}</span>
                    <button onclick="aumentarCantidad(${x.id})">+</button>
                    <button class="cart-del" onclick="eliminarDelCarrito(${x.id})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="cart-sub">Subtotal: $${fmtPrecio(x.precio*x.cantidad)}</div>
            </div>
        </div>`).join('');
    total.textContent = '$' + fmtPrecio(carrito.reduce((s,x) => s + x.precio*x.cantidad, 0));
}
function toggleCarrito() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

/* ---------- HELP ---------- */
function enviarHelp() {
    const nombre = document.getElementById('helpNombre').value.trim();
    const email  = document.getElementById('helpEmail').value.trim();
    const asunto = document.getElementById('helpAsunto').value;
    const msg    = document.getElementById('helpMensaje').value.trim();
    if (!nombre) { mostrarNotif('⚠️ Ingresa tu nombre.'); return; }
    if (!email || !email.includes('@')) { mostrarNotif('⚠️ Correo inválido.'); return; }
    if (!asunto) { mostrarNotif('⚠️ Selecciona un asunto.'); return; }
    if (!msg)    { mostrarNotif('⚠️ Escribe tu mensaje.'); return; }
    window.location.href = `mailto:williamsjoseeduardo@gmail.com?subject=${encodeURIComponent('[WS Help] '+asunto)}&body=${encodeURIComponent('Nombre: '+nombre+'\nEmail: '+email+'\n\n'+msg)}`;
    setTimeout(() => {
        document.getElementById('helpForm').style.display    = 'none';
        document.getElementById('helpSuccess').style.display = 'block';
    }, 600);
}
function nuevoMensajeHelp() {
    ['helpNombre','helpEmail','helpMensaje'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('helpAsunto').value = '';
    document.getElementById('helpSuccess').style.display = 'none';
    document.getElementById('helpForm').style.display    = 'block';
}

/* ---------- NOTIFICACIONES ---------- */
function mostrarNotif(msg) {
    document.querySelectorAll('.notif-toast').forEach(el => el.remove());
    const el = document.createElement('div');
    el.className = 'notif-toast';
    el.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 350); }, 3000);
}

/* ---------- PAGO ---------- */
let metodoPago = null;

function abrirPago() {
    if (!carrito.length) { mostrarNotif('Tu carrito está vacío 🛒'); return; }
    // Reset método
    metodoPago = null;
    document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selected'));
    ['pagoFormTarjeta','pagoFormEfectivo','pagoFormTransferencia','pagoExitoWrap']
        .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    // Totales
    const total = carrito.reduce((s,x) => s + x.precio*x.cantidad, 0);
    ['pagoTotalDisplay','efectivoTotal','transTotal'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '$'+fmtPrecio(total); });
    // Resumen
    const rEl = document.getElementById('pagoResumenItems');
    if (rEl) rEl.innerHTML = carrito.map(x => `
        <div class="resumen-item">
            <div class="resumen-img">${x.imagen?`<img src="${x.imagen}" alt="${x.nombre}">`:''}</div>
            <div class="resumen-info"><span>${x.nombre}</span><small>×${x.cantidad}</small></div>
            <strong>$${fmtPrecio(x.precio*x.cantidad)}</strong>
        </div>`).join('');
    // Cerrar carrito y navegar
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    mostrarSeccion('seccionPago');
}

function seleccionarMetodo(m) {
    metodoPago = m;
    document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selected'));
    // IDs en HTML: metodoTarjeta, metodoEfectivo, metodoTransferencia
    const idMap = {tarjeta:'metodoTarjeta', efectivo:'metodoEfectivo', transferencia:'metodoTransferencia'};
    const card = document.getElementById(idMap[m]);
    if (card) card.classList.add('selected');
    ['pagoFormTarjeta','pagoFormEfectivo','pagoFormTransferencia']
        .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    const formMap = {tarjeta:'pagoFormTarjeta', efectivo:'pagoFormEfectivo', transferencia:'pagoFormTransferencia'};
    const fEl = document.getElementById(formMap[m]);
    if (fEl) { fEl.style.display = 'block'; setTimeout(() => fEl.scrollIntoView({behavior:'smooth',block:'nearest'}), 100); }
}

function formatCardNumber(input) {
    let v = input.value.replace(/\D/g,'').substring(0,16);
    input.value = v.replace(/(.{4})/g,'$1 ').trim();
}
function formatExpiry(input) {
    let v = input.value.replace(/\D/g,'').substring(0,4);
    if (v.length >= 3) v = v.substring(0,2) + '/' + v.substring(2);
    input.value = v;
}
function actualizarTarjetaVisual() {
    const n = document.getElementById('cardNumero').value  || '';
    const t = document.getElementById('cardTitular').value || '';
    const v = document.getElementById('cardVence').value   || '';
    document.getElementById('tvNumero').textContent  = n || '•••• •••• •••• ••••';
    document.getElementById('tvTitular').textContent = t.toUpperCase() || 'NOMBRE APELLIDO';
    document.getElementById('tvVence').textContent   = v || 'MM/AA';
}

function showPagoErr(id, msg) { const el = document.getElementById(id); if (el) { el.textContent = msg; el.style.display = 'block'; } }
function hidePagoErr(id)      { const el = document.getElementById(id); if (el) { el.textContent = ''; el.style.display = 'none'; } }

function confirmarPagoTarjeta() {
    const num   = document.getElementById('cardNumero').value.replace(/\s/g,'');
    const tit   = document.getElementById('cardTitular').value.trim();
    const vence = document.getElementById('cardVence').value.trim();
    const cvv   = document.getElementById('cardCvv').value.trim();
    hidePagoErr('tarjetaError');
    if (num.length < 16)                   { showPagoErr('tarjetaError','⚠️ Número de tarjeta inválido (16 dígitos).'); return; }
    if (!tit)                              { showPagoErr('tarjetaError','⚠️ Ingresa el nombre del titular.'); return; }
    if (!/^\d{2}\/\d{2}$/.test(vence))    { showPagoErr('tarjetaError','⚠️ Formato de vencimiento inválido (MM/AA).'); return; }
    if (cvv.length < 3)                    { showPagoErr('tarjetaError','⚠️ CVV inválido.'); return; }
    mostrarExitoPago('💳 Pago con tarjeta procesado exitosamente.');
}
function calcularVuelto() {
    const total = carrito.reduce((s,x) => s + x.precio*x.cantidad, 0);
    const monto = parseFloat(document.getElementById('efectivoMonto').value) || 0;
    const box   = document.getElementById('vueltoBox');
    if (monto <= 0) { box.style.display = 'none'; return; }
    box.style.display = 'flex';
    document.getElementById('vueltoTotal').textContent = '$'+fmtPrecio(total);
    document.getElementById('vueltoMonto').textContent = '$'+fmtPrecio(monto);
    const cambio = monto - total;
    const ec = document.getElementById('vueltoCambio');
    ec.textContent = cambio < 0 ? '⚠️ Monto insuficiente' : '$'+fmtPrecio(cambio);
    ec.style.color  = cambio < 0 ? '#ef4444' : '#10b981';
}
function confirmarPagoEfectivo() {
    const total = carrito.reduce((s,x) => s + x.precio*x.cantidad, 0);
    const monto = parseFloat(document.getElementById('efectivoMonto').value) || 0;
    hidePagoErr('efectivoError');
    if (!monto || monto <= 0) { showPagoErr('efectivoError','⚠️ Ingresa el monto en efectivo.'); return; }
    if (monto < total)        { showPagoErr('efectivoError','❌ El monto es menor al total.'); return; }
    mostrarExitoPago('💵 Pedido confirmado. Asegurate de pagar el monto establecido.');
}
function confirmarPagoTransferencia() {
    const ref = document.getElementById('transReferencia').value.trim();
    hidePagoErr('transError');
    if (!ref) { showPagoErr('transError','⚠️ Ingresa el número de referencia.'); return; }
    mostrarExitoPago('🏦 Transferencia registrada. Verificaremos el pago en breve.');
}
function mostrarExitoPago(msg) {
    ['pagoFormTarjeta','pagoFormEfectivo','pagoFormTransferencia']
        .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('pagoExitoMsg').textContent = msg;
    document.getElementById('pagoOrden').textContent    = '#WS-' + Math.floor(100000+Math.random()*900000);
    const ex = document.getElementById('pagoExitoWrap');
    if (ex) { ex.style.display = 'block'; ex.scrollIntoView({behavior:'smooth',block:'center'}); }
}
function finalizarCompra() {
    carrito = []; actualizarCarrito(); irAInicio();
    mostrarNotif('¡Compra realizada con éxito! ✅');
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cartOverlay').addEventListener('click', toggleCarrito);
    console.log('🛍️ Williams Store — OK | Dev: José Eduardo Williams | 23-EISN-2-048');
});
window.addEventListener('resize', () => {
    const sb = document.getElementById('cartSidebar');
    if (sb) sb.style.width = window.innerWidth <= 768 ? '100%' : '400px';
});