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
    electronica: {
        titulo: 'Electrónicos',
        descripcion: 'Los mejores dispositivos y accesorios tecnológicos.'
    },
    ropa: {
        titulo: 'Ropa y Moda',
        descripcion: 'Estilo y comodidad para toda la familia.'
    },
    hogar: {
        titulo: 'Hogar y Decoración',
        descripcion: 'Todo para hacer tu casa más acogedora.'
    },
    deportes: {
        titulo: 'Deportes y Fitness',
        descripcion: 'Equipamiento para mantenerte activo y saludable.'
    },
    juguetes: {
        titulo: 'Juguetes y Juegos',
        descripcion: 'Diversión garantizada para los más pequeños.'
    },
    alimentos: {
        titulo: 'Alimentos y Bebidas',
        descripcion: 'Productos frescos y de calidad premium.'
    }
};

// ========== CARRITO DE COMPRAS ==========
let carrito = [];

// ========== FUNCIONES DE NAVEGACIÓN ENTRE SECCIONES ==========
function ocultarTodasLasSecciones() {
    document.getElementById('seccionInicio').style.display = 'none';
    document.getElementById('seccionDepartamentos').style.display = 'none';
    document.getElementById('seccionProductos').style.display = 'none';
    document.getElementById('seccionOfertas').style.display = 'none';
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

// Función para ir directamente a productos con descuento de un departamento
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
        
        // Manejar imagen vacía
        const imagenHTML = producto.imagen 
            ? `<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">`
            : `<div class="sin-imagen"><i class="fas fa-image"></i><p>Imagen próximamente</p></div>`;
        
        // Manejar descuento
        const precioHTML = producto.descuento 
            ? `<div class="producto-precios">
                <span class="precio-original">$${formatearPrecio(producto.precio)}</span>
                <span class="precio-descuento">$${formatearPrecio(producto.descuento)}</span>
                <span class="descuento-badge">-${Math.round((1 - producto.descuento / producto.precio) * 100)}%</span>
               </div>`
            : `<div class="producto-precio">$${formatearPrecio(producto.precio)}</div>`;
        
        card.innerHTML = `
            <div class="producto-imagen">
                ${imagenHTML}
            </div>
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
    const producto = productosPorDepartamento[departamento].find(p => p.id === productoId);
    if (!producto) return;
    
    const productoExistente = carrito.find(item => item.id === productoId);
    // Usar precio con descuento si existe
    const precioFinal = producto.descuento || producto.precio;
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, precio: precioFinal, cantidad: 1 });
    }
    
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito 🛒');
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito 🛒');
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
            </div>
        `;
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
                <div class="cart-item-price">$${formatearPrecio(item.precio)} x ${item.cantidad}</div>
            </div>
            <button class="cart-item-remove" onclick="eliminarDelCarrito(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
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

// ========== NOTIFICACIONES ==========
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notificacion.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje}`;
    document.body.appendChild(notificacion);
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => document.body.removeChild(notificacion), 300);
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
    console.log('📸 Usando imágenes de Unsplash');
    
    document.getElementById('cartOverlay').addEventListener('click', toggleCarrito);
    
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        if (carrito.length === 0) {
            mostrarNotificacion('Tu 🛒 está vacío.');
            return;
        }
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        if (confirm(`¿Confirmar compra por $${formatearPrecio(total)}?`)) {
            mostrarNotificacion('¡Compra realizada con éxito! 🎉');
            carrito = [];
            actualizarCarrito();
            toggleCarrito();
        }
    });
});

// ========== RESPONSIVE ==========
window.addEventListener('resize', function() {
    document.getElementById('cartSidebar').style.width = window.innerWidth <= 768 ? '100%' : '400px';
});