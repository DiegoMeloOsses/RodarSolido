// ==========================================
// PRODUCTOS
// ==========================================

const products = [

    {
        id: 1,
        name: "Luz trasera recargable",
        category: "accesorios",
        price: 4990,
        image: "https://i5.walmartimages.cl/asr/c4b4e0bd-421f-4965-947e-9f0a44e9c92e.ecff52fbb34fe78aa3c08361c30edf28.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },

    {
        id: 2,
        name: "Botella deportiva",
        category: "accesorios",
        price: 5990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_963070-MLA100056278247_122025-F.webp"
    },

    {
        id: 3,
        name: "Guantes de ciclismo",
        category: "indumentaria",
        price: 9990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_606550-MLA110081592224_042026-F.webp"
    },

    {
        id: 4,
        name: "Cámara MTB 29",
        category: "repuestos",
        price: 4990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_605529-MLC115138944967_072026-F-camara-bicicleta-mtb-aro-16-ornate.webp"
    },

    {
        id: 5,
        name: "Multiherramienta",
        category: "accesorios",
        price: 10990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_626895-MLA117252236587_092026-F-multiherramienta-bicicleta-inbike-11-en-1-cortacadena-allen.webp"
    },

    {
        id: 6,
        name: "Porta caramañola",
        category: "accesorios",
        price: 4990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_838185-MLC91136294674_092025-F-porta-botella-caramayola-para-bicicleta-ciclismo-blanco.webp"
    },

    {
        id: 7,
        name: "Cadena 11 velocidades",
        category: "repuestos",
        price: 39990,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_718018-MLA99909105639_112025-F.webp"
    },

    {
        id: 8,
        name: "Tricota",
        category: "indumentaria",
        price: 69990,
        image: "https://www.tradeinn.com/f/14184/141840566/santini-maillot-de-manga-corta-uci-world-champion-2025.webp"
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
