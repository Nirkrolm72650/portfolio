// Données des expériences
const experiences = [
    {
        date: "2023 - 2025",
        title: "Alternance - Technicien Informatique",
        company: "Via Formation",
        description: "Support utilisateur Niv. 1 et Niv. 2 sur place ou à distance, maintenance de postes, gestion du parc informatique, organisation et préparation pour les déplacements",
        category: "it"
    },
    {
        date: "Nov. 2022 - Oct. 2023",
        title: "Employé commercial rayon frais",
        company: "Leclerc",
        description: "Tenue du rayon frais (mise en rayon des produits, entretien, vérification de l'état de conservation des produits), conseil et orientation client",
        category: "retail"
    },
    {
        date: "Déc. 2016 - Oct. 2022",
        title: "Préparateur de commandes",
        company: "Leclerc Drive",
        description: "Préparation des commandes et livraison des clients, réapprovisionnement et entretien des rayons",
        category: "retail"
    },
    {
        date: "2012 - 2015",
        title: "Stage - Technicien Informatique",
        company: "Via Formation",
        description: "Support utilisateur Niveau 1, maintenance des postes de travails, déploiement de postes avec CloneZilla",
        category: "it"
    }
];

// Données des projets
const projects = [
    {
        title: "Infrastructure épreuve E6 - BTS ",
        description: "Mise en place d'une infrastructure virtualisée complète pour répondre au référentiel du BTS SIO SISR.",
        category: "sysadmin",
        image: "./img/Infra_E5.png",
        details: [
            "Configuration des firewall",
            "Mise en place de la haute disponibilité",
            "Supervision avec Zabbix",
        ]
    },
    {
        title: "Infrastructure Umbrella Corporation ",
        description: "Mise en place d'une infrastructure virtualisée complète et sécurisée (En cours)",
        category: "security",
        image: "https://placehold.co/600x400/2563eb/ffffff?text=Umbrella+Corporation",
        details: [
            "Mise en place d'un SOC",
            "Mise en place du réseau LAN",
            "Mise en place d'une DMZ",
        ]
    },
    {
        title: "Application météo",
        description: "Développement d'une application météo en python.",
        category: "web",
        image: "./img/app_weather.png",
        details: [
            "Python 🐍 : Langage de programmation utilisé pour le backend de l'application.",
            "Flask 🌎 : Framework web Python utilisé pour construire l'application.",
            "Requests 🌐 : Bibliothèque Python pour effectuer des requêtes HTTP.",
            "Python-Dotenv 🔑 : Bibliothèque pour charger les variables d'environnement depuis un fichier .env."
        ]
    },
    {
        title: "Application gestion d'étudiant",
        description: "Développement d'une application de gestion d'étudiant.",
        category: "web",
        image: "./img/app_student.png",
        details: [
            "✏️ Ajouter un étudiant",
            "🔍 Rechercher un étudiant par nom",
            "🗑️ Supprimer un étudiant",
            "📥 Importer et exporter des données en JSON/CSV",
            "🎨 Interface utilisateur en ligne de commande stylisée avec Rich",
        ]
    },
    {
        title: "Portfolio",
        description: "Création d'un portfolio",
        category: "web",
        image: "./img/portfolio.png",
        details: [
            "HTML / CSS",
            "Javascript",
            "Création futur du même portfolio en utilisant React / Next.Js"
        ]
    }
];

// Fonction pour créer la timeline
function createTimeline() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';

    experiences.forEach((exp, index) => {
        const element = document.createElement('div');
        element.className = `timeline-item ${exp.category}`;
        element.innerHTML = `
            <div class="timeline-content ${index % 2 === 0 ? 'left' : 'right'}">
                <div class="date">${exp.date}</div>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(element);
    });
}

// Fonction pour créer la grille de projets
function createProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const element = document.createElement('div');
        element.className = `project-card ${project.category}`;
        element.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        element.addEventListener('click', () => showProjectPreview(project));
        projectsGrid.appendChild(element);
    });
}

// Fonction pour afficher la prévisualisation du projet
function showProjectPreview(project) {
    const preview = document.querySelector('.project-preview');
    const overlay = document.querySelector('.overlay');
    
    // Mise à jour du contenu
    preview.querySelector('img').src = project.image;
    preview.querySelector('img').alt = project.title;
    preview.querySelector('h3').textContent = project.title;
    preview.querySelector('p').textContent = project.description;
    
    // Ajout des détails
    const detailsContainer = preview.querySelector('.project-details');
    detailsContainer.innerHTML = '<ul>' + 
        project.details.map(detail => `<li>${detail}</li>`).join('') + 
        '</ul>';
    
    // Affichage de la prévisualisation
    preview.classList.add('active');
    overlay.classList.add('active');
}

// Fermeture de la prévisualisation
document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.project-preview').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
});

document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.project-preview').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
});

// Gestion des filtres pour la timeline
document.querySelectorAll('.timeline-filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Mise à jour des boutons actifs
        document.querySelectorAll('.timeline-filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filtrage des expériences
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gestion des filtres pour les projets
document.querySelectorAll('.project-filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Mise à jour des boutons actifs
        document.querySelectorAll('.project-filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filtrage des projets
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createTimeline();
    createProjects();
});
