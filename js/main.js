// Resume verilerini yükle
async function loadResumeData() {
    try {
        const response = await fetch('../resume.json');
        const data = await response.json();
        populateExperience(data.experience);
        populateProjects(data.projects);
        populateSkills(data.skills);
    } catch (error) {
        console.error('Resume verisi yüklenirken hata oluştu:', error);
    }
}

// Deneyim bölümünü doldur
function populateExperience(experiences) {
    const timeline = document.getElementById('experience-timeline');
    experiences.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item fade-in';
        
        // Açıklamayı madde işaretlerine göre böl ve HTML formatına dönüştür
        const formattedDescription = exp.description
            .split('•')
            .filter(item => item.trim() !== '') // Boş öğeleri filtrele
            .map(item => `• ${item.trim()}`)
            .join('<br>');

        timelineItem.innerHTML = `
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="text-muted">${exp.period} | ${exp.location}</p>
            <p class="experience-description">${formattedDescription}</p>
            <div class="skill-tags">
                ${exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Projeler bölümünü doldur
function populateProjects(projects) {
    const container = document.getElementById('projects-container');
    projects.forEach(project => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 fade-in';
        col.innerHTML = `
            <div class="project-card">
                <div class="card-body">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="skill-tags">
                        ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary mt-3">
                        <i class="bi bi-github"></i> GitHub
                    </a>` : ''}
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Yetenekler bölümünü doldur
function populateSkills(skills) {
    // Programlama Dilleri
    const languagesContainer = document.getElementById('programming-languages');
    skills['Programlama Dilleri'].forEach(lang => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = lang;
        languagesContainer.appendChild(span);
    });

    // Frameworks ve Kütüphaneler
    const frameworksContainer = document.getElementById('frameworks');
    skills['Kütüphaneler ve Frameworks'].forEach(framework => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = framework;
        frameworksContainer.appendChild(span);
    });
}

// Sayfa yüklendiğinde verileri yükle
document.addEventListener('DOMContentLoaded', loadResumeData);

// Smooth scroll için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 