const links = document.querySelectorAll('.link');

links.forEach(link => {
    link.addEventListener('click', function() {
        // Menghapus kelas 'active' dari semua tautan
        links.forEach(l => l.classList.remove('active'));

        // Menambahkan kelas 'active' ke tautan yang diklik
        link.classList.add('active');
    });
});