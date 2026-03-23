// Fungsi untuk memuat file HTML ke dalam container
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            element.innerHTML = html;

            // --- INI TAMBAHAN BARUNYA ---
            // Jika yang baru saja dimuat adalah sidebar, jalankan fungsi deteksi menu aktif
            if (id === 'sidebar-container') {
                setActiveSidebar();
            }

        } catch (error) {
            console.error('Gagal memuat:', url);
        }
    }
}

// Fungsi toggle sidebar untuk Mobile
function toggleMenu() {
    const sidebar = document.getElementById('sidebar-container');
    sidebar.classList.toggle('active');
}

// Menunggu sampai seluruh halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Karena kamu pakai loadComponent, kita pakai event delegation 
    // agar klik tombol tetap terbaca meskipun navbar dimuat belakangan
    document.addEventListener('click', function(e) {
        
        // Cari apakah yang diklik adalah tombol menu (atau ikon di dalamnya)
        const menuBtn = e.target.closest('#menu-toggle') || e.target.closest('.menu-btn');
        
        if (menuBtn) {
            const sidebar = document.getElementById('sidebar-container');
            
            // Cek lebar layar (Mobile vs Desktop)
            if (window.innerWidth <= 768) {
                // Di HP: Munculkan / Sembunyikan sidebar secara utuh
                sidebar.classList.toggle('active');
            } else {
                // Di Desktop/Laptop: Lipat sidebar jadi mode ikon
                sidebar.classList.toggle('collapsed');
            }
        }
    });

});

// Fungsi untuk ganti tab di halaman Biodata
function switchTab(tabId, btnElement) {
    let buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-tab'));
    
    if(btnElement) btnElement.classList.add('active');
    let targetContent = document.getElementById(tabId);
    if(targetContent) targetContent.classList.add('active-tab');
}

// --- FUNGSI BARU UNTUK MENDETEKSI MENU AKTIF ---
function setActiveSidebar() {
    // Ambil nama file dari URL browser saat ini (contoh: 'biodata.html')
    // Jika kosong (hanya '/'), anggap saja sedang di 'index.html'
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') {
        currentPath = 'index.html';
    }

    // Ambil semua link (tag <a>) yang ada di dalam sidebar
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    menuLinks.forEach(link => {
        // 1. Bersihkan class 'active' dari semua menu biar nggak ada yang dobel
        link.classList.remove('active');

        // 2. Cek apakah isi href menu sama dengan URL saat ini
        const linkHref = link.getAttribute('href');
        
        // 3. Jika cocok, tambahkan class 'active' ke menu tersebut
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}