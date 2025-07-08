function switchSchedule(section) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active-tab'));

    // Update sections
    const sections = document.querySelectorAll('.timing-section');
    sections.forEach(sec => sec.classList.remove('section-active'));

    let activeSection;
    if (section === 'gents') {
        tabButtons[0].classList.add('active-tab');
        activeSection = document.getElementById('gents-schedule');
    } else {
        tabButtons[1].classList.add('active-tab');
        activeSection = document.getElementById('ladies-schedule');
    }

    activeSection.classList.add('section-active');

    // Reset and apply animations only to visible cards
    const cards = activeSection.querySelectorAll('.daily-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `cardSlideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
        }, 50);
    });
}
