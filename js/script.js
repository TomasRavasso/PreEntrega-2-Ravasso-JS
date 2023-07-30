class Producto {
    constructor(id, nombre, precio, descuento, stock) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.descuento = descuento;
      this.stock = stock;
      this.cantidad = 0;
    }
    obtenerDescuento() {
      return this.precio * this.descuento;
    }
    totalConDescuento() {
      return this.precio - this.obtenerDescuento();
    }
    totalPorCantidad() {
      return this.totalConDescuento() * this.cantidad;
    }
  }

  class Carrito {
    constructor() {
      this.productos = [];
    }
    agregarProducto(producto) {
      if (producto.stock > 0) {
        producto.stock--;
        producto.cantidad++;
        this.productos.push(producto);
        return true;
      }
      return false;
    }
    eliminarProducto(idProducto) {
      const index = this.productos.findIndex(item => item.id === idProducto);
      if (index !== -1) {
        const productoEliminado = this.productos.splice(index, 1)[0];
        productoEliminado.stock += productoEliminado.cantidad;
        productoEliminado.cantidad = 0;
        return productoEliminado;
      }
      return null;
    }
    calcularPrecioTotal() {
      return this.productos.reduce((total, producto) => total + producto.totalPorCantidad(), 0);
    }
    realizarCompra() {
      const precioTotal = this.calcularPrecioTotal();
      console.log("Compra realizada:");
      this.productos.forEach(producto => {
        console.log(`${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Total: $${producto.totalPorCantidad()}`);
      });
      console.log(`Total a pagar: $${precioTotal}`);
      console.log("¡Gracias por tu compra!");
    }
  }

  const listaProductos = [
    new Producto(1, "Heladera", 15000, 0.2, 5),
    new Producto(2, "Lavadora", 12000, 0.15, 3),
    new Producto(3, "Microwave", 8000, 0.1, 4),
    new Producto(4, "Aspiradora", 6000, 0.05, 6),
  ];

  const carrito = new Carrito();

  // Saludar al usuario y pedir su nombre
  const nombreUsuario = prompt("¡Bienvenido! Por favor, ingresa tu nombre:");
  alert(`Hola ${nombreUsuario}! Gracias por visitar nuestro simulador de compra.`);

  function realizarCompra() {
    const totalCompra = carrito.calcularPrecioTotal();
    if (totalCompra === 0) {
      alert("El carrito está vacío. Agrega productos antes de comprar.");
    } else {
      // Mostrar resumen de la compra y agradecimiento
      const listaProductosComprados = carrito.productos.map(producto => `${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`).join('\n');
      alert(`¡Gracias por tu compra, ${nombreUsuario}!\n\nResumen de la compra:\n${listaProductosComprados}\n\nTotal a pagar: $${totalCompra}`);
      
      // Limpiar el carrito después de la compra
      carrito.productos = [];
      actualizarCarrito();
    }
  }

  function agregarAlCarrito(idProducto) {
    const producto = listaProductos.find(item => item.id === idProducto);
    if (producto && carrito.agregarProducto(producto)) {
      alert(`¡Producto ${producto.nombre} agregado al carrito!`);
      actualizarCarrito();
    } else {
      alert("Producto agotado o no encontrado.");
    }
  }

  function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalElement = document.getElementById('total');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.productos.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - Precio: $${producto.precio} - Descuento: $${producto.obtenerDescuento()} - Precio con Descuento: $${producto.totalConDescuento()} - Cantidad: ${producto.cantidad}`;
      listaCarrito.appendChild(li);
      total += producto.totalPorCantidad();
    });

    totalElement.textContent = total.toFixed(2);
  }

  
  function eliminarProducto(idProducto) {
    const productoEliminado = carrito.eliminarProducto(idProducto);
    if (productoEliminado) {
      actualizarCarrito();
      alert(`¡Producto ${productoEliminado.nombre} eliminado del carrito!`);
    } else {
      alert("Producto no encontrado en el carrito.");
    }
  }
  
  function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalElement = document.getElementById('total');
    listaCarrito.innerHTML = '';
    let total = 0;
  
    carrito.productos.forEach(producto => {
      const li = document.createElement('li');
  
      // Contenido del li con información del producto
      li.textContent = `${producto.nombre} - Precio: $${producto.precio} - Descuento: $${producto.obtenerDescuento()} - Precio con Descuento: $${producto.totalConDescuento()} - Cantidad: ${producto.cantidad}`;
  
      // Botón "Eliminar" para eliminar el producto del carrito
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add('eliminar');
      btnEliminar.onclick = () => eliminarProducto(producto.id);
      li.appendChild(btnEliminar);
  
      listaCarrito.appendChild(li);
      total += producto.totalPorCantidad();
    });
  
    totalElement.textContent = total.toFixed(2);
  }