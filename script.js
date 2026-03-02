// ========== SISTEMA DE AUTENTICACIÓN ==========
// Los usuarios se guardan en localStorage: clave "ws_usuarios" → array de objetos
// La sesión activa se guarda en "ws_sesion" → objeto del usuario logueado

function getUsuarios() {
    return JSON.parse(localStorage.getItem('ws_usuarios') || '[]');
}

function getSesion() {
    return JSON.parse(localStorage.getItem('ws_sesion') || 'null');
}

function guardarSesion(usuario) {
    localStorage.setItem('ws_sesion', JSON.stringify(usuario));
}

function abrirAuth() {
    mostrarLogin();
    document.getElementById('authOverlay').classList.add('active');
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarAuth() {
    document.getElementById('authOverlay').classList.remove('active');
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = '';
}

function mostrarLogin() {
    document.getElementById('panelLogin').style.display = 'block';
    document.getElementById('panelRegistro').style.display = 'none';
    document.getElementById('panelExito').style.display = 'none';
    limpiarErrores();
}

function mostrarRegistro() {
    document.getElementById('panelLogin').style.display = 'none';
    document.getElementById('panelRegistro').style.display = 'block';
    document.getElementById('panelExito').style.display = 'none';
    limpiarErrores();
}

function limpiarErrores() {
    ['loginError', 'registroError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = ''; el.classList.remove('visible'); }
    });
}

function mostrarError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('visible');
    void el.offsetWidth; // reflow para re-animar
    el.classList.add('visible');
}

function iniciarSesion() {
    const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        mostrarError('loginError', '⚠️ Por favor completa todos los campos.');
        return;
    }

    const usuarios = getUsuarios();
    const usuario  = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        mostrarError('loginError', '❌ Correo o contraseña incorrectos.');
        return;
    }

    guardarSesion(usuario);
    cerrarAuth();
    actualizarUIUsuario(usuario);
    mostrarNotificacion(`¡Bienvenido de vuelta, ${usuario.nombre}! 👋`);
}

function registrarse() {
    const nombre   = document.getElementById('regNombre').value.trim();
    const apellido = document.getElementById('regApellido').value.trim();
    const email    = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirm').value;

    if (!nombre || !apellido) {
        mostrarError('registroError', '⚠️ Por favor ingresa tu nombre y apellido.');
        return;
    }
    if (!email || !email.includes('@')) {
        mostrarError('registroError', '⚠️ Ingresa un correo electrónico válido.');
        return;
    }
    if (password.length < 6) {
        mostrarError('registroError', '⚠️ La contraseña debe tener mínimo 6 caracteres.');
        return;
    }
    if (password !== confirm) {
        mostrarError('registroError', '❌ Las contraseñas no coinciden.');
        return;
    }

    const usuarios = getUsuarios();
    if (usuarios.find(u => u.email === email)) {
        mostrarError('registroError', '❌ Ya existe una cuenta con ese correo.');
        return;
    }

    const nuevoUsuario = { nombre, apellido, email, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('ws_usuarios', JSON.stringify(usuarios));

    // Mostrar panel de éxito
    document.getElementById('panelRegistro').style.display = 'none';
    document.getElementById('panelExito').style.display = 'block';
}

function cerrarSesion() {
    localStorage.removeItem('ws_sesion');
    cerrarUserMenu();
    document.getElementById('userMenuWrap').style.display = 'none';
    document.getElementById('btnLoginNav').style.display = 'flex';
    mostrarNotificacion('Sesión cerrada. ¡Hasta pronto! 👋');
    // Limpiar carrito al cerrar sesión
    carrito = [];
    actualizarCarrito();
}

function actualizarUIUsuario(usuario) {
    const inicial = (usuario.nombre.charAt(0) + (usuario.apellido ? usuario.apellido.charAt(0) : '')).toUpperCase();
    document.getElementById('userAvatar').textContent       = inicial;
    document.getElementById('userDropAvatar').textContent   = inicial;
    document.getElementById('userNameNav').textContent      = usuario.nombre;
    document.getElementById('userDropName').textContent     = `${usuario.nombre} ${usuario.apellido}`;
    document.getElementById('userDropEmail').textContent    = usuario.email;
    document.getElementById('userMenuWrap').style.display   = 'flex';
    document.getElementById('btnLoginNav').style.display    = 'none';
}

function toggleUserMenu() {
    document.getElementById('userDropdown').classList.toggle('open');
}

function cerrarUserMenu() {
    document.getElementById('userDropdown').classList.remove('open');
}

// Cerrar dropdown si se hace click fuera
document.addEventListener('click', function(e) {
    const wrap = document.getElementById('userMenuWrap');
    if (wrap && !wrap.contains(e.target)) cerrarUserMenu();
});

// Fuerza de contraseña
function evalFuerza(val) {
    const bar   = document.getElementById('passBar');
    const label = document.getElementById('passLabel');
    if (!bar || !label) return;

    let score = 0;
    if (val.length >= 6)  score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const niveles = [
        { pct: '0%',   color: 'transparent',  text: '' },
        { pct: '25%',  color: '#ef4444',       text: '🔴 Muy débil' },
        { pct: '50%',  color: '#f59e0b',       text: '🟡 Débil' },
        { pct: '70%',  color: '#3b82f6',       text: '🔵 Regular' },
        { pct: '90%',  color: '#10b981',       text: '🟢 Fuerte' },
        { pct: '100%', color: '#059669',       text: '✅ Muy fuerte' },
    ];

    const n = niveles[Math.min(score, 5)];
    bar.style.width      = val.length === 0 ? '0%' : n.pct;
    bar.style.background = n.color;
    label.textContent    = val.length === 0 ? '' : n.text;
    label.style.color    = n.color;
}

// Mostrar / ocultar contraseña
function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector('i');
    if (input.type === 'password') {
        input.type      = 'text';
        icon.className  = 'fas fa-eye-slash';
    } else {
        input.type      = 'password';
        icon.className  = 'fas fa-eye';
    }
}

// Interceptar el botón "Agregar al carrito": exige login
// (se sobreescribe la función original más abajo con este wrapper)
function verificarLoginParaComprar() {
    if (!getSesion()) {
        abrirAuth();
        return false;
    }
    return true;
}

// ========== DATOS DE PRODUCTOS CON IMÁGENES UNSPLASH Y DESCUENTOS ==========
const productosPorDepartamento = {
    electronica: [
        { id: 1, nombre: 'Laptop HP 15"', descripcion: 'Intel i5, 8GB RAM, 256GB SSD.', precio: 45999, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80' },
        { id: 2, nombre: 'Samsung Galaxy S23', descripcion: '256GB, Negro.', precio: 52999, descuento: 36999, imagen: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80' },
        { id: 3, nombre: 'MacBook Air M2', descripcion: '13", 8GB RAM, 256GB.', precio: 75999, imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
        { id: 4, nombre: 'AirPods Pro 2', descripcion: 'Cancelación de ruido activa.', precio: 15999, imagen: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&q=80' },
        { id: 5, nombre: 'iPad Air', descripcion: '10.9", 64GB, WiFi.', precio: 38999, imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80' },
        { id: 6, nombre: 'Apple Watch Series 8', descripcion: 'GPS, 41mm.', precio: 25999, imagen: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80' },
        { id: 7, nombre: 'Teclado Mecánico RGB', descripcion: 'Switch Blue, retroiluminado.', precio: 4599, imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80' },
        { id: 46, nombre: 'Smart TV 55"', descripcion: '4K Ultra HD, Smart TV.', precio: 32999, descuento: 24749, imagen: 'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=400&q=80' },
        { id: 47, nombre: 'Auriculares Bluetooth', descripcion: 'Inalámbricos, 20h batería.', precio: 3999, imagen: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80' },
    ],
    ropa: [
        { id: 8, nombre: 'Jeans Levi\'s 501', descripcion: 'Corte clásico, azul índigo.', precio: 2899, imagen: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&q=80' },
        { id: 9, nombre: 'Camisa Oxford', descripcion: 'Algodón 100%, manga larga.', precio: 1499, imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
        { id: 10, nombre: 'Vestido Floral', descripcion: 'Manga corta, varios colores.', precio: 1899, imagen: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
        { id: 11, nombre: 'Chaqueta de Cuero', descripcion: 'Estilo motociclista, genuino.', precio: 4999, imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
        { id: 12, nombre: 'Zapatillas Nike Air', descripcion: 'Running, varios colores.', precio: 3599, descuento: 2159, imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
        { id: 13, nombre: 'Traje Formal', descripcion: 'Corte slim fit, negro.', precio: 6999, imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' },
        { id: 14, nombre: 'Sudadera con Capucha', descripcion: 'Algodón, estilo oversized.', precio: 1699, imagen: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
        { id: 15, nombre: 'Pantalones Deportivos', descripcion: 'Poliéster, cintura ajustable.', precio: 1299, imagen: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80' },
    ],
    hogar: [
        { id: 16, nombre: 'Sofá 3 Plazas', descripcion: 'Tela gris, diseño moderno.', precio: 18999, imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
        { id: 17, nombre: 'Mesa de Comedor', descripcion: 'Madera maciza, 6 personas.', precio: 12999, imagen: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80' },
        { id: 18, nombre: 'Lámpara de Pie', descripcion: 'LED, altura ajustable.', precio: 2499, imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80' },
        { id: 19, nombre: 'Cama King Size', descripcion: 'Con cabecera acolchada.', precio: 22999, imagen: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80' },
        { id: 20, nombre: 'Espejo Decorativo', descripcion: 'Marco dorado, 120cm.', precio: 3499, imagen: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80' },
        { id: 21, nombre: 'Set de Toallas', descripcion: '6 piezas, algodón egipcio.', precio: 1599, imagen: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&q=80' },
        { id: 22, nombre: 'Alfombra Persa', descripcion: '200x300cm, tejida a mano.', precio: 8999, imagen: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80' },
        { id: 23, nombre: 'Cafetera Espresso', descripcion: '15 bares, cappuccino.', precio: 4599, imagen: 'https://images.unsplash.com/photo-1531937465322-9909ce13f8ca?w=500&q=80' },
    ],
    deportes: [
        { id: 24, nombre: 'Raqueta de Tenis', descripcion: 'Grafito, peso medio.', precio: 3599, imagen: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80' },
        { id: 25, nombre: 'Bicicleta de Montaña', descripcion: '21 velocidades, aluminio.', precio: 12999, imagen: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80' },
        { id: 26, nombre: 'Pesas Ajustables', descripcion: '2.5kg a 24kg por mancuerna.', precio: 5999, imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
        { id: 27, nombre: 'Yoga Mat Premium', descripcion: 'Antideslizante, grosor 6mm.', precio: 1299, imagen: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80' },
        { id: 28, nombre: 'Maquinas para correr', descripcion: 'Con contador digital.', precio: 599, imagen: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80' },
        { id: 29, nombre: 'Guantes de Box', descripcion: '12oz, cuero sintético.', precio: 1899, imagen: 'https://images.unsplash.com/photo-1729719762188-960b41c4ec2f?w=400&q=80' },
        { id: 30, nombre: 'Tabla de Surf', descripcion: '6\'2", fibra de vidrio.', precio: 9999, imagen: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&q=80' },
        { id: 48, nombre: 'Balón de Basketball', descripcion: 'Tamaño oficial, cuero sintético.', precio: 1499, imagen: 'https://plus.unsplash.com/premium_photo-1661351817037-6a21919bc9a0?w=400&q=80' },
        { id: 49, nombre: 'Set de Mancuernas', descripcion: '5kg, 10kg y 15kg incluidos.', precio: 4999, imagen: 'https://images.unsplash.com/photo-1734630341082-0fec0e10126c?w=400&q=80' },
    ],
    juguetes: [
        { id: 31, nombre: 'LEGO Star Wars', descripcion: '1000 piezas, Halcón Milenario.', precio: 3999, imagen: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80' },
        { id: 32, nombre: 'Barbie Dreamhouse', descripcion: 'Casa de 3 pisos con accesorios.', precio: 2899, imagen: 'https://images.unsplash.com/photo-1745764625600-3283b04f2046?w=400&q=80' },
        { id: 33, nombre: 'Hot Wheels Set', descripcion: '20 autos coleccionables + pista.', precio: 1599, imagen: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80' },
        { id: 34, nombre: 'Muñeco LOL Surprise', descripcion: 'Edición limitada con accesorios.', precio: 899, imagen: 'https://images.unsplash.com/photo-1585197508786-35c0ae51eb18?w=300&q=80' },
        { id: 35, nombre: 'Nintendo Switch', descripcion: 'Consola + Mario Kart 8.', precio: 18999, imagen: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80' },
        { id: 36, nombre: 'Drone con Cámara', descripcion: 'Para niños, fácil de usar.', precio: 2499, imagen: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80' },
        { id: 37, nombre: 'Peluche Gigante', descripcion: 'Oso de 1 metro, suave.', precio: 1299, imagen: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&q=80' },
        { id: 38, nombre: 'Rompecabezas 3D', descripcion: 'Torre Eiffel, 500 piezas.', precio: 799, imagen: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400&q=80' },
        { id: 50, nombre: 'Cartas Pokemón', descripcion: '10 cartas, totalmente exclusivas.', precio: 2499, imagen: 'https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?w=400&q=80' },
    ],
    alimentos: [
        { id: 39, nombre: 'Aceite de Oliva Extra', descripcion: '1 litro, virgen extra importado.', precio: 349, imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
        { id: 40, nombre: 'Café Premium', descripcion: '500g, grano entero colombiano.', precio: 499, imagen: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80' },
        { id: 41, nombre: 'Vino Tinto', descripcion: 'Reserva española, 750ml.', precio: 599, imagen: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
        { id: 42, nombre: 'Chocolate Belga', descripcion: 'Tableta 200g, 70% cacao.', precio: 249, imagen: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80' },
        { id: 43, nombre: 'Miel Orgánica', descripcion: '500g, 100% natural pura.', precio: 299, imagen: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&q=80' },
        { id: 44, nombre: 'Queso Parmesano', descripcion: '250g, importado de Italia.', precio: 449, imagen: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80' },
        { id: 45, nombre: 'Sobre de Té', descripcion: 'Caja 400g, bien saludables.', precio: 179, imagen: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80' },
        { id: 51, nombre: 'Pasta Premium', descripcion: '1kg, artesanal italiana.', precio: 299, imagen: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=400&q=80' },
        { id: 52, nombre: 'Filete GOLD', descripcion: '120g, carne totalmente fresca.', precio: 399, imagen: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
    ]
};

// ========== INFORMACIÓN DE DEPARTAMENTOS ==========
const infoDepartamentos = {
    electronica: { titulo: 'Electrónicos', descripcion: 'Los mejores dispositivos y accesorios tecnológicos.' },
    ropa: { titulo: 'Ropa y Moda', descripcion: 'Estilo y comodidad para toda la familia.' },
    hogar: { titulo: 'Hogar y Decoración', descripcion: 'Todo para hacer tu casa más acogedora.' },
    deportes: { titulo: 'Deportes y Fitness', descripcion: 'Equipamiento para mantenerte activo y saludable.' },
    juguetes: { titulo: 'Juguetes y Juegos', descripcion: 'Diversión garantizada para los más pequeños.' },
    alimentos: { titulo: 'Alimentos y Bebidas', descripcion: 'Productos frescos y de calidad premium.' }
};

// ========== CARRITO DE COMPRAS ==========
let carrito = [];

// ========== MENÚ HAMBURGUESA (MOBILE) ==========
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const btn = document.getElementById('hamburgerBtn');
    nav.classList.toggle('menu-open');
    btn.classList.toggle('active');
}

function cerrarMenu() {
    const nav = document.getElementById('mainNav');
    const btn = document.getElementById('hamburgerBtn');
    nav.classList.remove('menu-open');
    btn.classList.remove('active');
}

// ========== FUNCIONES DE NAVEGACIÓN ENTRE SECCIONES ==========
function ocultarTodasLasSecciones() {
    document.getElementById('seccionInicio').style.display = 'none';
    document.getElementById('seccionDepartamentos').style.display = 'none';
    document.getElementById('seccionProductos').style.display = 'none';
    document.getElementById('seccionOfertas').style.display = 'none';
    document.getElementById('seccionAcercaDe').style.display = 'none';
    document.getElementById('seccionHelp').style.display = 'none';
}

function irAInicio() {
    ocultarTodasLasSecciones();
    document.getElementById('seccionInicio').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarDepartamentos() {
    ocultarTodasLasSecciones();
    document.getElementById('seccionDepartamentos').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarOfertas() {
    ocultarTodasLasSecciones();
    document.getElementById('seccionOfertas').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarAcercaDe() {
    ocultarTodasLasSecciones();
    document.getElementById('seccionAcercaDe').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarHelp() {
    ocultarTodasLasSecciones();
    document.getElementById('seccionHelp').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irAProductosConDescuento(departamento) {
    ocultarTodasLasSecciones();
    document.getElementById('seccionProductos').style.display = 'block';
    const info = infoDepartamentos[departamento];
    document.getElementById('breadcrumbText').textContent = `Inicio / ${info.titulo} / Ofertas`;
    document.getElementById('departamentoTitulo').textContent = `${info.titulo} - Ofertas Especiales`;
    cargarProductos(departamento);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function abrirDepartamento(departamento) {
    ocultarTodasLasSecciones();
    document.getElementById('seccionProductos').style.display = 'block';
    const info = infoDepartamentos[departamento];
    document.getElementById('breadcrumbText').textContent = `Inicio / ${info.titulo}`;
    document.getElementById('departamentoTitulo').textContent = info.titulo;
    cargarProductos(departamento);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== FUNCIONES DE PRODUCTOS ==========
function cargarProductos(departamento) {
    const productosGrid = document.getElementById('productosGrid');
    const productos = productosPorDepartamento[departamento];
    productosGrid.innerHTML = '';
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        const imagenHTML = producto.imagen
            ? `<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">`
            : `<div class="sin-imagen"><i class="fas fa-image"></i><p>Imagen próximamente</p></div>`;
        const precioHTML = producto.descuento
            ? `<div class="producto-precios">
                <span class="precio-original">$${formatearPrecio(producto.precio)}</span>
                <span class="precio-descuento">$${formatearPrecio(producto.descuento)}</span>
                <span class="descuento-badge">-${Math.round((1 - producto.descuento / producto.precio) * 100)}%</span>
               </div>`
            : `<div class="producto-precio">$${formatearPrecio(producto.precio)}</div>`;
        card.innerHTML = `
            <div class="producto-imagen">${imagenHTML}</div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                ${precioHTML}
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${departamento}')">
                    <i class="fas fa-cart-plus"></i> Agregar al 🛒
                </button>
            </div>
        `;
        productosGrid.appendChild(card);
    });
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ========== FUNCIONES DEL CARRITO ==========
function agregarAlCarrito(productoId, departamento) {
    // Verificar que el usuario esté logueado
    if (!verificarLoginParaComprar()) {
        mostrarNotificacion('⚠️ Inicia sesión para agregar productos al carrito.');
        return;
    }
    const id = parseInt(productoId);
    const producto = productosPorDepartamento[departamento].find(p => parseInt(p.id) === id);
    if (!producto) return;
    const productoExistente = carrito.find(item => parseInt(item.id) === id);
    const precioFinal = producto.descuento || producto.precio;
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, id: id, precio: precioFinal, cantidad: 1 });
    }
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito 🛒');
}

// ========== LÓGICA CARRITO: Disminuir cantidad (-1) o eliminar si llega a 0 ==========
function disminuirCantidad(productoId) {
    const id = parseInt(productoId);
    const index = carrito.findIndex(i => parseInt(i.id) === id);
    if (index === -1) return;
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        mostrarNotificacion('Cantidad actualizada 🛒');
    } else {
        carrito.splice(index, 1);
        mostrarNotificacion('Producto eliminado del carrito 🗑️');
    }
    actualizarCarrito();
}

function aumentarCantidad(productoId) {
    const id = parseInt(productoId);
    const index = carrito.findIndex(i => parseInt(i.id) === id);
    if (index === -1) return;
    carrito[index].cantidad++;
    actualizarCarrito();
    mostrarNotificacion('Cantidad actualizada 🛒');
}

function eliminarDelCarrito(productoId) {
    const id = parseInt(productoId);
    carrito = carrito.filter(item => parseInt(item.id) !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito 🗑️');
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu 🛒 está vacío.</p>
            </div>`;
        cartTotal.textContent = '$0.00';
        return;
    }
    cartItems.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <div class="cart-item-imagen">
                ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : '<div class="sin-imagen-small"><i class="fas fa-image"></i></div>'}
            </div>
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <div class="cart-item-price">$${formatearPrecio(item.precio)}</div>
                <div class="cart-item-qty-controls">
                    <button class="cart-qty-btn minus" onclick="disminuirCantidad(${item.id})" title="Quitar uno">−</button>
                    <span class="cart-qty-display">${item.cantidad}</span>
                    <button class="cart-qty-btn plus" onclick="aumentarCantidad(${item.id})" title="Agregar uno">+</button>
                    <button class="cart-item-remove" onclick="eliminarDelCarrito(${item.id})" title="Eliminar todo" style="margin-left:0.3rem;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-price" style="font-size:0.8rem; opacity:0.7; margin-top:0.3rem;">
                    Subtotal: $${formatearPrecio(item.precio * item.cantidad)}
                </div>
            </div>
        </div>
    `).join('');
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartTotal.textContent = `$${formatearPrecio(total)}`;
}

function toggleCarrito() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// ========== HELP: ENVIAR FORMULARIO ==========
function enviarHelp() {
    const nombre = document.getElementById('helpNombre').value.trim();
    const email = document.getElementById('helpEmail').value.trim();
    const asunto = document.getElementById('helpAsunto').value;
    const mensaje = document.getElementById('helpMensaje').value.trim();

    if (!nombre) { mostrarNotificacion('⚠️ Por favor ingresa tu nombre.'); return; }
    if (!email || !email.includes('@')) { mostrarNotificacion('⚠️ Por favor ingresa un correo válido.'); return; }
    if (!asunto) { mostrarNotificacion('⚠️ Por favor selecciona un asunto.'); return; }
    if (!mensaje) { mostrarNotificacion('⚠️ Por favor describe tu problemática.'); return; }

    // Construir el mailto
    const destinatario = 'williamsjoseeduardo@gmail.com';
    const subjectEncoded = encodeURIComponent(`[Williams Store Help] ${asunto} - De: ${nombre}`);
    const bodyEncoded = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo del usuario: ${email}\nAsunto: ${asunto}\n\nMensaje:\n${mensaje}\n\n---\nEnviado desde Williams Store - Centro de Ayuda`
    );
    const mailtoLink = `mailto:${destinatario}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Abrir cliente de correo
    window.location.href = mailtoLink;

    // Mostrar mensaje de éxito
    setTimeout(() => {
        document.getElementById('helpForm').style.display = 'none';
        document.getElementById('helpSuccess').style.display = 'block';
    }, 600);
}

function nuevoMensajeHelp() {
    document.getElementById('helpNombre').value = '';
    document.getElementById('helpEmail').value = '';
    document.getElementById('helpAsunto').value = '';
    document.getElementById('helpMensaje').value = '';
    document.getElementById('helpSuccess').style.display = 'none';
    document.getElementById('helpForm').style.display = 'block';
}

// ========== NOTIFICACIONES ==========
function mostrarNotificacion(mensaje) {
    // Eliminar notificación existente si la hay
    const existente = document.querySelector('.notificacion-toast');
    if (existente) existente.remove();

    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-toast';
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notificacion.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje}`;
    document.body.appendChild(notificacion);
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => { if (notificacion.parentNode) notificacion.remove(); }, 300);
    }, 3000);
}

// ========== ANIMACIONES CSS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛍️ Williams Store iniciada correctamente');
    console.log('👨‍💻 Desarrollador: José Eduardo Williams');
    console.log('🎓 Matrícula: 23-EISN-2-048');

    // Restaurar sesión si existe
    const sesionActiva = getSesion();
    if (sesionActiva) {
        actualizarUIUsuario(sesionActiva);
    }

    // Mostrar modal de login automáticamente al entrar si no hay sesión
    // (comentar las 3 líneas de abajo si no quieres que aparezca automáticamente)
    if (!sesionActiva) {
        setTimeout(() => abrirAuth(), 600);
    }

    document.getElementById('cartOverlay').addEventListener('click', toggleCarrito);

    // El botón checkout ahora abre el modal de pago via onclick="abrirPago()" en HTML
});

// ========== RESPONSIVE ==========
window.addEventListener('resize', function() {
    document.getElementById('cartSidebar').style.width = window.innerWidth <= 768 ? '100%' : '400px';
});

// ================================================
//  MODAL DE PAGO
// ================================================
let metodoPagoSeleccionado = null;

function abrirPago() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu 🛒 está vacío.');
        return;
    }
    if (!getSesion()) {
        abrirAuth();
        return;
    }
    // Resetear al paso 1
    mostrarPasoUno();
    metodoPagoSeleccionado = null;
    document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('btnSiguiente').disabled = true;

    const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    document.getElementById('pagoTotalDisplay').textContent = '$' + formatearPrecio(total);
    document.getElementById('efectivoTotal').textContent    = '$' + formatearPrecio(total);
    document.getElementById('transTotal').textContent       = '$' + formatearPrecio(total);

    document.getElementById('pagoOverlay').classList.add('active');
    document.getElementById('pagoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarPago() {
    document.getElementById('pagoOverlay').classList.remove('active');
    document.getElementById('pagoModal').classList.remove('active');
    document.body.style.overflow = '';
}

function mostrarPasoUno() {
    ['pagoStep1','pagoStep2Tarjeta','pagoStep2Efectivo','pagoStep2Transferencia','pagoExito']
        .forEach(id => { document.getElementById(id).style.display = 'none'; });
    document.getElementById('pagoStep1').style.display = 'block';
    limpiarPagoErrors();
}

function limpiarPagoErrors() {
    ['tarjetaError','efectivoError','transError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = ''; el.classList.remove('visible'); }
    });
}

function seleccionarMetodo(metodo) {
    metodoPagoSeleccionado = metodo;
    document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selected'));
    const ids = { tarjeta: 'metodoTarjeta', efectivo: 'metodoEfectivo', transferencia: 'metodoTransferencia' };
    document.getElementById(ids[metodo]).classList.add('selected');
    document.getElementById('btnSiguiente').disabled = false;
}

function siguientePaso() {
    if (!metodoPagoSeleccionado) return;
    document.getElementById('pagoStep1').style.display = 'none';
    const mapas = {
        tarjeta:       'pagoStep2Tarjeta',
        efectivo:      'pagoStep2Efectivo',
        transferencia: 'pagoStep2Transferencia'
    };
    document.getElementById(mapas[metodoPagoSeleccionado]).style.display = 'block';
}

function volverPaso1() {
    ['pagoStep2Tarjeta','pagoStep2Efectivo','pagoStep2Transferencia']
        .forEach(id => { document.getElementById(id).style.display = 'none'; });
    document.getElementById('pagoStep1').style.display = 'block';
    limpiarPagoErrors();
}

// --- Tarjeta ---
function formatCardNumber(input) {
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
    let val = input.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2);
    input.value = val;
}

function actualizarTarjetaVisual() {
    const num    = document.getElementById('cardNumero').value || '';
    const tit    = document.getElementById('cardTitular').value || '';
    const vence  = document.getElementById('cardVence').value || '';
    document.getElementById('tvNumero').textContent  = num || '•••• •••• •••• ••••';
    document.getElementById('tvTitular').textContent = tit.toUpperCase() || 'NOMBRE APELLIDO';
    document.getElementById('tvVence').textContent   = vence || 'MM/AA';
}

function mostrarPagoError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.remove('visible');
    void el.offsetWidth;
    el.classList.add('visible');
}

function confirmarPagoTarjeta() {
    const num   = document.getElementById('cardNumero').value.replace(/\s/g,'');
    const tit   = document.getElementById('cardTitular').value.trim();
    const vence = document.getElementById('cardVence').value.trim();
    const cvv   = document.getElementById('cardCvv').value.trim();

    if (num.length < 16)   { mostrarPagoError('tarjetaError','⚠️ Número de tarjeta inválido (16 dígitos).'); return; }
    if (!tit)              { mostrarPagoError('tarjetaError','⚠️ Ingresa el nombre del titular.'); return; }
    if (!/^\d{2}\/\d{2}$/.test(vence)) { mostrarPagoError('tarjetaError','⚠️ Formato de vencimiento inválido (MM/AA).'); return; }
    if (cvv.length < 3)    { mostrarPagoError('tarjetaError','⚠️ CVV inválido.'); return; }

    mostrarExitoPago('💳 Pago con tarjeta procesado exitosamente.');
}

// --- Efectivo ---
function calcularVuelto() {
    const total  = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const monto  = parseFloat(document.getElementById('efectivoMonto').value) || 0;
    const box    = document.getElementById('vueltoBox');

    if (monto <= 0) { box.style.display = 'none'; return; }
    box.style.display = 'flex';
    document.getElementById('vueltoTotal').textContent = '$' + formatearPrecio(total);
    document.getElementById('vueltoMonto').textContent = '$' + formatearPrecio(monto);
    const cambio = monto - total;
    const elCambio = document.getElementById('vueltoCambio');
    if (cambio < 0) {
        elCambio.textContent = '⚠️ Monto insuficiente';
        elCambio.style.color = '#dc2626';
    } else {
        elCambio.textContent = '$' + formatearPrecio(cambio);
        elCambio.style.color = '#059669';
    }
}

function confirmarPagoEfectivo() {
    const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const monto = parseFloat(document.getElementById('efectivoMonto').value) || 0;
    if (!monto || monto <= 0) { mostrarPagoError('efectivoError','⚠️ Ingresa el monto en efectivo.'); return; }
    if (monto < total)        { mostrarPagoError('efectivoError','❌ El monto es menor al total del pedido.'); return; }
    mostrarExitoPago('💵 Pedido confirmado. Paga en caja al retirar.');
}

// --- Transferencia ---
function confirmarPagoTransferencia() {
    const ref = document.getElementById('transReferencia').value.trim();
    if (!ref) { mostrarPagoError('transError','⚠️ Ingresa el número de referencia de la transferencia.'); return; }
    mostrarExitoPago('🏦 Transferencia registrada. Verificaremos el pago en breve.');
}

// --- Éxito ---
function mostrarExitoPago(msg) {
    ['pagoStep2Tarjeta','pagoStep2Efectivo','pagoStep2Transferencia']
        .forEach(id => { document.getElementById(id).style.display = 'none'; });
    document.getElementById('pagoExitoMsg').textContent = msg;
    // Generar número de orden aleatorio
    const orden = '#WS-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('pagoOrden').textContent = orden;
    document.getElementById('pagoExito').style.display = 'block';
}

function finalizarCompra() {
    cerrarPago();
    carrito = [];
    actualizarCarrito();
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        toggleCarrito();
    }
    mostrarNotificacion('¡Compra realizada con éxito! 🎉');
}

// ================================================
//  MODAL DE PERFIL
// ================================================
function abrirPerfil() {
    const sesion = getSesion();
    if (!sesion) return;

    // Cargar datos actuales en los campos
    document.getElementById('perfilNombre').value    = sesion.nombre    || '';
    document.getElementById('perfilApellido').value  = sesion.apellido  || '';
    document.getElementById('perfilEmail').value     = sesion.email     || '';
    document.getElementById('perfilTelefono').value  = sesion.telefono  || '';
    document.getElementById('perfilDireccion').value = sesion.direccion || '';

    // Header
    const nombreCompleto = (sesion.nombre + ' ' + (sesion.apellido||'')).trim();
    document.getElementById('perfilNombreHeader').textContent = nombreCompleto;
    document.getElementById('perfilEmailHeader').textContent  = sesion.email;

    // Avatar: foto o iniciales
    const inicial = ((sesion.nombre||'').charAt(0) + (sesion.apellido||'').charAt(0)).toUpperCase();
    document.getElementById('perfilAvatarBig').textContent = inicial;

    if (sesion.foto) {
        document.getElementById('perfilAvatarBig').style.display     = 'none';
        document.getElementById('perfilAvatarImgWrap').style.display = 'block';
        document.getElementById('perfilAvatarImg').src               = sesion.foto;
    } else {
        document.getElementById('perfilAvatarBig').style.display     = 'flex';
        document.getElementById('perfilAvatarImgWrap').style.display = 'none';
    }

    // Resetear tab a Info
    cambiarTab('info', document.querySelector('.perfil-tab'));
    limpiarPerfilMessages();

    document.getElementById('perfilOverlay').classList.add('active');
    document.getElementById('perfilModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarPerfil() {
    document.getElementById('perfilOverlay').classList.remove('active');
    document.getElementById('perfilModal').classList.remove('active');
    document.body.style.overflow = '';
}

function limpiarPerfilMessages() {
    ['perfilInfoError','perfilPassError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = ''; el.classList.remove('visible'); }
    });
    // Limpiar campos de contraseña
    ['passActual','passNueva','passConfirm2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const bar = document.getElementById('passBar2');
    const lbl = document.getElementById('passLabel2');
    if (bar) { bar.style.width = '0%'; }
    if (lbl) { lbl.textContent = ''; }
}

function cambiarTab(tab, btn) {
    // Actualizar botones
    document.querySelectorAll('.perfil-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    // Mostrar/ocultar contenido
    document.getElementById('tabInfo').style.display      = tab === 'info'      ? 'block' : 'none';
    document.getElementById('tabSeguridad').style.display = tab === 'seguridad' ? 'block' : 'none';
    limpiarPerfilMessages();
}

function mostrarPerfilError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.remove('visible');
    void el.offsetWidth;
    el.classList.add('visible');
}

function mostrarPerfilExito(id, msg) {
    // Reutilizar el div de error con clase success
    const el = document.getElementById(id);
    el.className = 'perfil-success';
    el.textContent = msg;
    el.classList.remove('visible');
    void el.offsetWidth;
    el.classList.add('visible');
    setTimeout(() => { el.className = 'perfil-error'; el.classList.remove('visible'); }, 3000);
}

function guardarInfoPerfil() {
    const nombre    = document.getElementById('perfilNombre').value.trim();
    const apellido  = document.getElementById('perfilApellido').value.trim();
    const email     = document.getElementById('perfilEmail').value.trim().toLowerCase();
    const telefono  = document.getElementById('perfilTelefono').value.trim();
    const direccion = document.getElementById('perfilDireccion').value.trim();

    if (!nombre)            { mostrarPerfilError('perfilInfoError','⚠️ El nombre no puede estar vacío.'); return; }
    if (!email || !email.includes('@')) { mostrarPerfilError('perfilInfoError','⚠️ Correo electrónico inválido.'); return; }

    const sesion    = getSesion();
    const usuarios  = getUsuarios();
    const idx       = usuarios.findIndex(u => u.email === sesion.email);

    // Verificar si el nuevo email ya existe en otra cuenta
    if (email !== sesion.email && usuarios.find(u => u.email === email)) {
        mostrarPerfilError('perfilInfoError','❌ Ese correo ya está registrado en otra cuenta.');
        return;
    }

    const actualizado = { ...sesion, nombre, apellido, email, telefono, direccion };
    if (idx !== -1) { usuarios[idx] = actualizado; }
    localStorage.setItem('ws_usuarios', JSON.stringify(usuarios));
    guardarSesion(actualizado);
    actualizarUIUsuario(actualizado);

    // Actualizar header del perfil
    document.getElementById('perfilNombreHeader').textContent = (nombre + ' ' + apellido).trim();
    document.getElementById('perfilEmailHeader').textContent  = email;

    mostrarPerfilExito('perfilInfoError','✅ Información actualizada correctamente.');
    mostrarNotificacion('Perfil actualizado 👤');
}

function cambiarContrasena() {
    const actual   = document.getElementById('passActual').value;
    const nueva    = document.getElementById('passNueva').value;
    const confirm  = document.getElementById('passConfirm2').value;
    const sesion   = getSesion();

    if (!actual)            { mostrarPerfilError('perfilPassError','⚠️ Ingresa tu contraseña actual.'); return; }
    if (actual !== sesion.password) { mostrarPerfilError('perfilPassError','❌ La contraseña actual es incorrecta.'); return; }
    if (nueva.length < 6)  { mostrarPerfilError('perfilPassError','⚠️ La nueva contraseña debe tener mínimo 6 caracteres.'); return; }
    if (nueva !== confirm)  { mostrarPerfilError('perfilPassError','❌ Las contraseñas nuevas no coinciden.'); return; }

    const usuarios = getUsuarios();
    const idx      = usuarios.findIndex(u => u.email === sesion.email);
    const actualizado = { ...sesion, password: nueva };
    if (idx !== -1) { usuarios[idx] = actualizado; }
    localStorage.setItem('ws_usuarios', JSON.stringify(usuarios));
    guardarSesion(actualizado);

    mostrarPerfilExito('perfilPassError','✅ Contraseña cambiada correctamente.');
    mostrarNotificacion('Contraseña actualizada 🔒');
    document.getElementById('passActual').value   = '';
    document.getElementById('passNueva').value    = '';
    document.getElementById('passConfirm2').value = '';
}

function cargarFotoPerfil(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) { mostrarNotificacion('⚠️ Solo se permiten imágenes.'); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        const sesion   = getSesion();
        const usuarios = getUsuarios();
        const idx      = usuarios.findIndex(u => u.email === sesion.email);
        const actualizado = { ...sesion, foto: base64 };
        if (idx !== -1) { usuarios[idx] = actualizado; }
        localStorage.setItem('ws_usuarios', JSON.stringify(usuarios));
        guardarSesion(actualizado);

        // Mostrar imagen en el modal
        document.getElementById('perfilAvatarBig').style.display     = 'none';
        document.getElementById('perfilAvatarImgWrap').style.display = 'block';
        document.getElementById('perfilAvatarImg').src               = base64;

        // Actualizar todos los avatares en la UI
        actualizarAvatarUI(base64);
        mostrarNotificacion('Foto de perfil actualizada 📸');
    };
    reader.readAsDataURL(file);
}

function actualizarAvatarUI(fotoBase64) {
    // Reemplazar iniciales por imagen en nav y dropdown
    const sesion = getSesion();
    const ids = ['userAvatar','userDropAvatar'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = `<img src="${fotoBase64}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="foto">`;
        el.style.padding = '0';
        el.style.overflow = 'hidden';
    });
}

// Evaluar fuerza de contraseña (tab seguridad perfil)
function evalFuerza2(val) {
    const bar   = document.getElementById('passBar2');
    const label = document.getElementById('passLabel2');
    if (!bar || !label) return;
    let score = 0;
    if (val.length >= 6)  score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const niveles = [
        { pct:'0%',   color:'transparent', text:'' },
        { pct:'25%',  color:'#ef4444',     text:'🔴 Muy débil' },
        { pct:'50%',  color:'#f59e0b',     text:'🟡 Débil' },
        { pct:'70%',  color:'#3b82f6',     text:'🔵 Regular' },
        { pct:'90%',  color:'#10b981',     text:'🟢 Fuerte' },
        { pct:'100%', color:'#059669',     text:'✅ Muy fuerte' },
    ];
    const n = niveles[Math.min(score, 5)];
    bar.style.width      = val.length === 0 ? '0%' : n.pct;
    bar.style.background = n.color;
    label.textContent    = val.length === 0 ? '' : n.text;
    label.style.color    = n.color;
}

// Restaurar foto al cargar sesión
const _origActualizarUI = actualizarUIUsuario;
actualizarUIUsuario = function(usuario) {
    _origActualizarUI(usuario);
    if (usuario.foto) {
        actualizarAvatarUI(usuario.foto);
    }
};