document.addEventListener('DOMContentLoaded', function() {
    // City Switcher
    const cityButtons = document.querySelectorAll('.city-btn');
    const cityLocations = document.querySelectorAll('.city-locations');

    cityButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and locations
            cityButtons.forEach(btn => btn.classList.remove('active'));
            cityLocations.forEach(loc => loc.classList.remove('active'));

            // Add active class to clicked button and corresponding locations
            this.classList.add('active');
            const city = this.getAttribute('data-city');
            document.querySelector(`.city-locations[data-city="${city}"]`).classList.add('active');
        });
    });

    // Map Modal
    const locationItems = document.querySelectorAll('.location-item');
    const mapModal = document.getElementById('map-modal');
    const mapTitle = document.getElementById('map-title');
    const mapFrame = document.getElementById('map-frame');
    const closeModalBtn = mapModal.querySelector('.modal__close');

    // Map URLs for each location (using Google Maps embed URLs as placeholders)
    const mapUrls = {
        'ZM Ирчи Казак': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Стамбульский': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Буйнакского': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Ростов': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Коркмасова': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Аэропорт': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Каспийск': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Тарки': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Новый Хушет': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999',
        'ZM Таллы': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.123456789!2d47.504123!3d42.975432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzMyLjQiTiA0N8KwMzAnMTUuMCJF!5e0!3m2!1sru!2sru!4v1699999999999'
    };

    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            mapTitle.textContent = title;

            // Load the map
            mapFrame.innerHTML = `<iframe src="${mapUrls[title]}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

            mapModal.style.display = 'block';
            setTimeout(() => {
                mapModal.classList.add('show');
            }, 10);
            document.body.classList.add('no-scroll');
        });
    });

    // Close modal
    function closeMapModal() {
        mapModal.classList.remove('show');
        setTimeout(() => {
            mapModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeMapModal);

    window.addEventListener('click', (e) => {
        if (e.target === mapModal) {
            closeMapModal();
        }
    });
});