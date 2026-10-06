// ==========================================
// PRODUCTOS
// ==========================================

const products = [

    {
        id: 1,
        name: "Luz trasera recargable",
        category: "accesorios",
        price: 12990,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Botella deportiva",
        category: "accesorios",
        price: 7990,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Guantes de ciclismo",
        category: "indumentaria",
        price: 14990,
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Cámara MTB 29",
        category: "repuestos",
        price: 6990,
        image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Multiherramienta",
        category: "accesorios",
        price: 18990,
        image: "https://images.unsplash.com/photo-1591638672248-9e3a3e7c7e9f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Porta caramañola",
        category: "accesorios",
        price: 9990,
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Cadena 11 velocidades",
        category: "repuestos",
        price: 24990,
        image: "https://images.unsplash.com/photo-1575585269294-7d28dd912db8?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Polera Rodar Sólido",
        category: "indumentaria",
        price: 24990,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
    }

];


// ==========================================
// CARRITO
// ==========================================

let cart = [];


// ==========================================
// FORMATO DE PRECIO
// ==========================================

function formatPrice(price) {

    return "$" + price.toLocaleString("es-CL");

}


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function renderProducts(list = products) {

    const grid =
        document.getElementById("product-grid");

    grid.innerHTML = "";

    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <button
                    class="button primary"
                    onclick="addToCart(${product.id})"
                >
                    Agregar al carrito
                </button>

            </div>
        `;

        grid.appendChild(card);

    });

}


// ==========================================
// FILTROS
// ==========================================

function filterProducts() {

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase();

    const category =
        document
            .getElementById("category")
            .value;

    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch &&
                   matchesCategory;

        });

    renderProducts(filtered);

}


// ==========================================
// AGREGAR AL CARRITO
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    cart.push(product);

    updateCart();

}


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function updateCart() {

    const container =
        document.getElementById("cart-items");

    const count =
        document.getElementById("cart-count");

    const total =
        document.getElementById("cart-total");

    count.textContent = cart.length;

    if (cart.length === 0) {

        container.innerHTML =
            `<p class="empty-cart">
                Tu carrito está vacío.
             </p>`;

        total.textContent = "$0";

        return;
    }


    container.innerHTML = "";

    let cartTotal = 0;


    cart.forEach((product, index) => {

        cartTotal += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <strong>
                ${product.name}
            </strong>

            <p>
                ${formatPrice(product.price)}
            </p>

            <button
                onclick="removeFromCart(${index})"
            >
                Eliminar
            </button>

        `;

        container.appendChild(item);

    });


    total.textContent =
        formatPrice(cartTotal);

}


// ==========================================
// ELIMINAR DEL CARRITO
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// ABRIR / CERRAR CARRITO
// ==========================================

function toggleCart() {

    document
        .getElementById("cart")
        .classList
        .toggle("open");

}


// ==========================================
// COMPRAR POR WHATSAPP
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;
    }


    let message =
        "Hola Rodar Sólido, quiero comprar:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        message +=
            "• " +
            product.name +
            " - " +
            formatPrice(product.price) +
            "%0A";

        total += product.price;

    });


    message +=
        "%0ATotal: " +
        formatPrice(total);


    const phone =
        "56900000000";


    const url =
        `https://wa.me/${phone}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// INICIAR
// ==========================================

renderProducts();
updateCart();
