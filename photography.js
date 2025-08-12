document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.nav__menu__btn');
    const navLinks = document.querySelector('.nav__links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav__links') && !e.target.closest('.nav__menu__btn')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when window is resized past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav__links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Portfolio Gallery
    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('load-more');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    let currentFilter = 'all';
    let photosLoaded = 0;
    const photosPerLoad = 15;
    const totalPhotos = 1000; // Simulating 1000 photos
    
    // Sample photo data with categories
    const photoCategories = ['nature', 'portrait', 'urban', 'travel', 'blackwhite'];
    const photoDescriptions = [
        "Sunrise over mountain peaks",
        "Urban architecture symmetry",
        "Studio portrait with dramatic lighting",
        "Wedding ceremony emotional moment",
        "Wildlife in natural environment",
        "Street photography candid shot",
        "Family portrait at golden hour",
        "Music festival performance",
        "Macro photography of dewdrops",
        "Black and white cityscape",
        "Aerial view of coastline",
        "Cultural festival celebrations",
        "Abstract architectural details",
        "Portrait with natural light",
        "Landscape with dramatic clouds"
    ];
    
    // Generate photo data
    function generatePhotoData(count) {
        const photos = [];
        for (let i = 1; i <= count; i++) {
            const category = photoCategories[Math.floor(Math.random() * photoCategories.length)];
            const description = photoDescriptions[Math.floor(Math.random() * photoDescriptions.length)];
            photos.push({
                id: i,
                url: `https://source.unsplash.com/random/800x600/?photography,${category},${i}`,
                category: category,
                description: description,
                title: `Photo ${i}`
            });
        }
        return photos;
    }
    
    const allPhotos = generatePhotoData(totalPhotos);
    
    // Filter photos by category
    function filterPhotos(category) {
        if (category === 'all') {
            return allPhotos;
        }
        return allPhotos.filter(photo => photo.category === category);
    }
    
    // Load photos into gallery
    function loadPhotos(photos, reset = false) {
        if (reset) {
            gallery.innerHTML = '';
            photosLoaded = 0;
        }
        
        const start = photosLoaded;
        const end = Math.min(photosLoaded + photosPerLoad, photos.length);
        
        for (let i = start; i < end; i++) {
            const photo = photos[i];
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${photo.category}`;
            galleryItem.setAttribute('data-category', photo.category);
            galleryItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.description}" loading="lazy">
                <div class="photo-overlay">
                    <p>${photo.description}</p>
                    <span class="photo-category">${photo.category}</span>
                </div>
            `;
            gallery.appendChild(galleryItem);
            
            // Add click event to open modal
            galleryItem.querySelector('img').addEventListener('click', function() {
                modalImg.src = this.src;
                modalCaption.textContent = this.alt;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        }
        
        photosLoaded = end;
        
        // Hide load more button if all photos are loaded
        if (photosLoaded >= photos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Load more photos
    function loadMorePhotos() {
        const filteredPhotos = filterPhotos(currentFilter);
        loadPhotos(filteredPhotos);
    }
    
    // Initialize gallery
    function initGallery() {
        const filteredPhotos = filterPhotos(currentFilter);
        loadPhotos(filteredPhotos, true);
    }
    
    // Filter button click events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filter and reload gallery
            currentFilter = this.getAttribute('data-filter');
            photosLoaded = 0;
            initGallery();
        });
    });
    
    // Load more button event
    loadMoreBtn.addEventListener('click', loadMorePhotos);
    
    // Modal close events
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Initialize the gallery
    initGallery();
});