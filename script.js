// Fungsi untuk memuat file HTML ke dalam container
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            element.innerHTML = html;
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