var products = [
    { nama: "Buku", harga: 10000 },
    { nama: "Pensil", harga: 3000 },
    { nama: "Pulpen", harga: 5000 },
    { nama: "Penghapus", harga: 2000 },
    { nama: "Spidol", harga: 7000 },
    { nama: "Binder", harga: 45000 },
    { nama: "Penggaris", harga: 5000 },
    { nama: "Lakban", harga: 10000 }, 
    { nama: "Stabilo Warna", harga: 7500 },
    { nama: "Map (Folder)", harga: 5000 }, 
    { nama: "Gunting", harga: 6000 }, 
    { nama: "Papan Tulis", harga: 30000 },
    { nama: "Kertas Folio", harga: 1000 }, 
    { nama: "Kertas HVS", harga: 1000 }, 
    { nama: "Kertas Kambing", harga: 1000 },
    { nama: "Pisau", harga: 10000 }
];

var cart = JSON.parse(localStorage.getItem("cart")) || [];

// SIMPAN
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// LOAD PRODUK
function loadProducts() {
    var table = document.getElementById("productTable");
    table.innerHTML =
        "<tr><th>Barang</th><th>Harga</th><th>Aksi</th></tr>";

    for (var i = 0; i < products.length; i++) {
        table.innerHTML +=
            "<tr>" +
            "<td>" + products[i].nama + "</td>" +
            "<td>Rp " + products[i].harga + "</td>" +
            "<td><button onclick=\"addToCart('" + products[i].nama + "')\">Tambah</button></td>" +
            "</tr>";
    }
}

// SEARCH
function searchItem() {
    var keyword = document.getElementById("search").value.toLowerCase();
    var table = document.getElementById("productTable");

    table.innerHTML =
        "<tr><th>Barang</th><th>Harga</th><th>Aksi</th></tr>";

    for (var i = 0; i < products.length; i++) {
        if (products[i].nama.toLowerCase().indexOf(keyword) !== -1) {
            table.innerHTML +=
                "<tr>" +
                "<td>" + products[i].nama + "</td>" +
                "<td>Rp " + products[i].harga + "</td>" +
                "<td><button onclick=\"addToCart('" + products[i].nama + "')\">Tambah</button></td>" +
                "</tr>";
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
