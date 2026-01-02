var products = [
    { nama: "Buku", harga: 10000, gambar: "images/buku.png"},
    { nama: "Pensil", harga: 3000, gambar: "images/pensil.png"},
    { nama: "Pulpen", harga: 5000, gambar: "images/pulpen.png"},
    { nama: "Penghapus", harga: 2000, gambar: "images/penghapus.png"},
    { nama: "Spidol", harga: 7000, gambar: "images/spidol.png"},
    { nama: "Binder", harga: 45000, gambar: "images/binder.png"},
    { nama: "Penggaris", harga: 5000, gambar: "images/penggaris.png"},
    { nama: "Lakban", harga: 10000, gambar: "images/lakban.png"}, 
    { nama: "Stabilo Warna", harga: 7500, gambar: "images/stabilo.png"},
    { nama: "Map (Folder)", harga: 5000, gambar: "images/mapfolder.png"}, 
    { nama: "Gunting", harga: 6000, gambar: "images/gunting.png"}, 
    { nama: "Papan Tulis", harga: 30000, gambar: "images/papantulis.png"},
    { nama: "Kertas Folio", harga: 1000, gambar: "images/kertasfolio.png"}, 
    { nama: "Kertas HVS", harga: 1000, gambar: "images/kertashvs.png"}, 
    { nama: "Kertas Kambing", harga: 1000, gambar: "images/kertaskambing.png"},
    { nama: "Pisau", harga: 10000, gambar: "images/pisau.png"}
];

var cart = JSON.parse(localStorage.getItem("cart")) || [];

// SIMPAN
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// LOAD PRODUK
function loadProducts() {
    var list = document.getElementById("productList");
    list.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        list.innerHTML += `
            <div class="product-card">
                <img src="${products[i].gambar}" class="product-img">
                <h3>${products[i].nama}</h3>
                <p class="price">Rp ${products[i].harga}</p>
                <button onclick="addToCart('${products[i].nama}')">
                    Tambah
                </button>
            </div>
        `;
    }
}


// SEARCH
function searchItem() {
    var keyword = document.getElementById("search").value.toLowerCase();
    var list = document.getElementById("productList");
    list.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        if (products[i].nama.toLowerCase().includes(keyword)) {
            list.innerHTML += `
                <div class="product-card">
                    <img src="${products[i].gambar}" class="product-img">
                    <h3>${products[i].nama}</h3>
                    <p class="price">Rp ${products[i].harga}</p>
                    <button onclick="addToCart('${products[i].nama}')">
                        Tambah
                    </button>
                </div>
            `;
        }
    }
}


// TAMBAH
function addToCart(nama) {
    var ada = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].nama == nama) {
            cart[i].qty++;
            ada = true;
        }
    }

    if (!ada) {
        for (var j = 0; j < products.length; j++) {
            if (products[j].nama == nama) {
                cart.push({
                    nama: nama,
                    harga: products[j].harga,
                    qty: 1
                });
            }
        }
    }

    saveCart();
    updateCart();
    showPopup("Barang ditambahkan");
}

// UPDATE KERANJANG (KANAN)
function updateCart() {
    var table = document.getElementById("cartTable");
    table.innerHTML =
        "<tr><th>Barang</th><th>Qty</th><th>Subtotal</th></tr>";

    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var subtotal = cart[i].qty * cart[i].harga;
        total += subtotal;

        table.innerHTML +=
            "<tr>" +
            "<td>" + cart[i].nama + "</td>" +
            "<td>" +
            "<button class='qty-btn' onclick=\"kurang('" + cart[i].nama + "')\">-</button> " +
            cart[i].qty +
            " <button class='qty-btn' onclick=\"addToCart('" + cart[i].nama + "')\">+</button>" +
            "</td>" +
            "<td>Rp " + subtotal + "</td>" +
            "</tr>";
    }

    document.getElementById("total").innerText = total;
}

// KURANG
function kurang(nama) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].nama == nama) {
            cart[i].qty--;
            if (cart[i].qty <= 0) {
                cart.splice(i, 1);
            }
        }
    }
    saveCart();
    updateCart();
}

// BAYAR
function bayar() {
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].qty * cart[i].harga;
    }

    if (total == 0) {
        alert("Keranjang kosong");
        return;
    }

    var uang = prompt("Total Rp " + total + "\nMasukkan uang:");

    if (uang == null || uang == "") return;

    uang = parseInt(uang);

    if (uang < total) {
        alert("Uang kurang Rp " + (total - uang));
    } else {
        alert("Berhasil!\nKembalian Rp " + (uang - total));
        cart = [];
        saveCart();
        updateCart();
    }
}

// POPUP
function showPopup(text) {
    var popup = document.getElementById("popup");
    popup.innerText = text;
    popup.className = "popup show";

    setTimeout(function () {
        popup.className = "popup";
    }, 2000);
}

function scrollToCart() {
    document.querySelector(".right").scrollIntoView({
        behavior: "smooth"
    });
}
