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

    // Auto slidea
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
const events = {
    '2024-07-04': 'Sai baba Birthday Celebration',
    '2024-07-14': 'Sai baba Arthi',
    '2024-07-22': 'Sai baba parayanam'
};

const daysContainerRam = document.querySelector('.calendar-ram .days-ram');
const eventDateRam = document.getElementById('event-date-ram');
const eventDescriptionRam = document.getElementById('event-description-ram');
const currentMonthRam = document.getElementById('current-month-ram');
const prevMonthBtn = document.getElementById('prev-month-ram');
const nextMonthBtn = document.getElementById('next-month-ram');

let currentDate = new Date(2024, 6, 1); // July 2024

function renderCalendar() {
    daysContainerRam.innerHTML = `
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
    `;

    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    currentMonthRam.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        daysContainerRam.appendChild(emptyDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => {
            const selectedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            eventDateRam.textContent = selectedDate;
            eventDescriptionRam.textContent = events[selectedDate] || 'No events';
        });
        daysContainerRam.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();