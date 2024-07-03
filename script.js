document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav ul li a');
    
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
// 2nd page
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn-next');
    const prevButton = document.querySelector('.carousel-btn-prev');
    const dotsNav = document.querySelector('.carousel-dots');

    let currentIndex = 0;

    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsNav.appendChild(dot);
    });

    const updateDots = () => {
        dotsNav.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    };

    // Next button
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Previous button
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Auto slide
    let slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds

    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
});

//3rd page<>
    const saiEvents = {
        "2024-07-01": { 
            title: "Guru Purnima",
            description: "Guru Purnima is a spiritual tradition in Hindu culture, dedicated to spiritual and academic teachers. This day is celebrated as a festival in honor of Sai Baba."
        },
        "2024-07-15": {
            title: "Sai Satcharitra Parayana",
            description: "A week-long reading of the Sai Satcharitra, a devotional text that narrates the life, teachings, and miracles of Sai Baba."
        },
        "2024-08-05": {
            title: "Sai Baba Punyatithi",
            description: "This day marks the death anniversary of Sai Baba. Devotees gather to offer prayers and remember the teachings of Sai Baba."
        }
    };

    let saiCurrentDate = new Date();

    function showSaiEvent(date) {
        const eventDisplay = document.querySelector('.sai-event-display');
        const formattedDate = date.toISOString().split('T')[0];
        if (saiEvents[formattedDate]) {
            eventDisplay.innerHTML = `
                <h2 class="sai-event-title">${saiEvents[formattedDate].title}</h2>
                <p class="sai-event-description">${saiEvents[formattedDate].description}</p>
            `;
        } else {
            eventDisplay.innerHTML = `
                <h2 class="sai-event-title">No Event</h2>
                <p class="sai-event-description">There are no events scheduled for this date.</p>
            `;
        }
    }

    function generateSaiCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        document.getElementById('sai-current-month').textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const calendarBody = document.getElementById('sai-calendar-body');
        calendarBody.innerHTML = '';

        let date_ = new Date(firstDay);
        date_.setDate(date_.getDate() - date_.getDay());

        while (date_ <= lastDay || date_.getDay() !== 0) {
            const row = document.createElement('tr');
            
            for (let i = 0; i < 7; i++) {
                const cell = document.createElement('td');
                cell.textContent = date_.getDate();
                
                if (date_.getMonth() === month) {
                    const formattedDate = date_.toISOString().split('T')[0];
                    if (saiEvents[formattedDate]) {
                        cell.classList.add('sai-event-date');
                    }
                    cell.addEventListener('click', () => showSaiEvent(new Date(date_)));
                } else {
                    cell.style.color = '#ccc';
                }
                
                row.appendChild(cell);
                date_.setDate(date_.getDate() + 1);
            }
            
            calendarBody.appendChild(row);
        }

        // Show event for the first day of the month if it exists
        showSaiEvent(firstDay);
    }

    document.getElementById('sai-prev-month').addEventListener('click', () => {
        saiCurrentDate.setMonth(saiCurrentDate.getMonth() - 1);
        generateSaiCalendar(saiCurrentDate);
    });

    document.getElementById('sai-next-month').addEventListener('click', () => {
        saiCurrentDate.setMonth(saiCurrentDate.getMonth() + 1);
        generateSaiCalendar(saiCurrentDate);
    });

    generateSaiCalendar(saiCurrentDate);
