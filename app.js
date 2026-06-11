// Offizielle McDonald's Produktbilder (Transparente PNGs von offiziellen Assets)
const products = [
    { 
        id: 1, 
        name: "Big Mac®", 
        price: 4.99, 
        category: "burger", 
        img: "https://stickpng.com", // Big Mac transparent
        desc: "Zwei Etagen saftiges Rindfleisch, Schmelzkäse, Essiggurken, Salat und die legendäre Big Mac Sauce." 
    },
    { 
        id: 2, 
        name: "Double Cheeseburger", 
        price: 3.49, 
        category: "burger", 
        img: "https://mcdonalds.com", 
        desc: "Doppeltes Rindfleisch, perfekt kombiniert mit zwei Scheiben zartschmelzendem Cheddar-Käse." 
    },
    { 
        id: 3, 
        name: "Chicken McNuggets® (9 Stück)", 
        price: 4.99, 
        category: "snacks", 
        img: "https://mcdonalds.com", 
        desc: "Außen goldbraun panert und knusprig, innen zartes Hähnchenbrustfleisch. Inklusive zwei Saucen." 
    },
    { 
        id: 4, 
        name: "Pommes Frites (Groß)", 
        price: 2.99, 
        category: "snacks", 
        img: "https://mcdonalds.com", 
        desc: "Die weltberühmten Original McFritten: außen super knackig, innen wunderbar soft gesalzen." 
    },
    { 
        id: 5, 
        name: "Happy Meal® (FIFA Edition)", 
        price: 4.89, 
        category: "kids", 
        img: "https://mcdonalds.com", // Platzhalter-Basis
        desc: "Das Kindermenü mit Hauptspeise, Beilage, Getränk und einem limitierten FIFA Squishmallows Spielzeug!" 
    },
    { 
        id: 6, 
        name: "McFlurry® Original", 
        price: 3.89, 
        category: "snacks", 
        img: "https://mcdonalds.com", 
        desc: "Cremiges Milcheis, intensiv gerührt mit deinen Lieblings-Toppings und leckerer Sauce." 
    }
];

let cart = [];
let selectedOrderType = "";

// Funktion zum Festlegen des Kiosk-Modus (Hier essen / Mitnehmen)
function setOrderType(type) {
    selectedOrderType = type;
    document.getElementById('current-mode-display').innerText = type;
    document.getElementById('order-type-modal').classList.add('hidden');
}

// 1. Produkte im Kiosk-Grid anzeigen (mit Image Fallback, falls URLs blockiert werden)
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    items.forEach(product => {
        grid.innerHTML += `
            <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between p-4">
                <div class="h-44 w-full bg-gradient-to-b from-gray-50 to-white rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                    <img src="${product.img}" alt="${product.name}" class="h-full object-contain transform transition-transform duration-300 hover:scale-110" onerror="this.onerror=null; this.src='https://unsplash.com';">
                    <span class="absolute top-2 right-2 bg-mcd-gold/20 text-yellow-900 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">${product.category}</span>
                </div>
                <div class="mt-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h4 class="font-extrabold text-base text-gray-900 leading-snug mb-1">${product.name}</h4>
                        <p class="text-gray-500 text-xs line-clamp-2 mb-4 font-medium">${product.desc}</p>
                    </div>
                    <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span class="font-black text-lg text-gray-900">${product.price.toFixed(2).replace('.', ',')} €</span>
                        <button onclick="addToCart(${product.id})" class="bg-mcd-gold hover:bg-yellow-500 text-mcd-dark font-extrabold px-3 py-2 rounded-xl transition shadow-sm flex items-center space-x-1 text-xs">
                            <i class="fa-solid fa-plus"></i>
                            <span>Wählen</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// 2. Filterfunktion für Kategorien
function filterCategory(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// 3. Artikel in den Warenkorb legen + Pop-Animation auslösen
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Badge Pop-Effekt aktivieren
    const badge = document.getElementById('cart-badge');
    badge.classList.add('badge-pop');
    setTimeout(() => badge.classList.remove('badge-pop'), 300);
}

// 4. Update der Warenkorb-Oberfläche
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyText = document.getElementById('empty-cart-text');
    const badge = document.getElementById('cart-badge');
    const totalContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.appendChild(emptyText);
        badge.classList.add('hidden');
        totalContainer.innerText = "0,00 €";
        return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
    badge.classList.remove('hidden');

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100 shadow-xs">
                <div class="flex items-center space-x-3">
                    <img src="${item.img}" class="w-12 h-12 object-contain" onerror="this.onerror=null; this.src='https://unsplash.com';">
                    <div>
                        <h5 class="font-bold text-xs text-gray-900 leading-tight">${item.name}</h5>
                        <p class="text-[11px] text-mcd-red font-extrabold mt-0.5">${item.price.toFixed(2).replace('.', ',')} €</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center font-bold text-xs">-</button>
                    <span class="text-xs font-black w-4 text-center">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center font-bold text-xs">+</button>
                </div>
            </div>
        `;
    });

    totalContainer.innerText = totalPrice.toFixed(2).replace('.', ',') + " €";
}

// 5. Mengenänderung
function changeQuantity(id, change) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }
    updateCartUI();
}

// 6. Sidebar toggeln
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

// 7. Kiosk-Checkout-Abschluss
function checkout() {
    if (cart.length === 0) {
        alert("Dein Tablett ist leer! Wähle zuerst ein Produkt aus. 🍔");
        return;
    }
    
    alert(`🎉 Kiosk-Bestellung abgeschlossen (${selectedOrderType || "Hier essen"})!\n\nDeine Quittungs-Nummer lautet: #${Math.floor(100 + Math.random() * 900)}\nBitte gehe zur Kasse oder warte auf deinen Tischservice.`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// App-Initialisierung
renderProducts(products);
