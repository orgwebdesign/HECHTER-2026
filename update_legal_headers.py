import re

new_header = """    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container top-bar-container">
            <div class="top-bar-left">
                <span class="top-bar-item"><i class="icon">🏆</i> Qualité Premium</span>
                <span class="top-bar-item"><i class="icon">⚙️</i> Notre parc machines</span>
                <span class="top-bar-item"><i class="icon">🌱</i> Engagement Éco-responsable</span>
            </div>
            <div class="top-bar-right">
                <a href="contact.html" class="top-bar-btn">Demande de devis</a>
                <a href="contact.html" class="top-bar-item transfer-link"><i class="icon">🔄</i> Transfert de fichiers</a>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="header" id="header" data-header-theme="dark">
        <div class="container header-container">
            <a href="index.html" class="logo">
                <img src="assets/images/logo.svg" alt="HECHTER Logo" onerror="this.src='assets/images/logo.png'">
            </a>
            
            <div class="header-actions">
                <button class="header-icon-btn" aria-label="Recherche">🔍</button>
                <a href="contact.html" class="header-icon-btn" aria-label="Contact">✉️</a>
                <button class="menu-toggle" id="mega-menu-btn" aria-label="Ouvrir le menu">
                    <span class="hamburger">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </span>
                    <span class="menu-text">MENU</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Mega Menu -->
    <div class="mega-menu" id="mega-menu">
        <div class="mega-menu-header container">
            <a href="index.html" class="logo">
                <img src="assets/images/logo.svg" alt="HECHTER Logo" onerror="this.src='assets/images/logo.png'">
            </a>
            <div class="header-actions">
                <button class="header-icon-btn" aria-label="Recherche">🔍</button>
                <a href="contact.html" class="header-icon-btn" aria-label="Contact">✉️</a>
                <button class="menu-close-btn" id="mega-menu-close" aria-label="Fermer le menu">
                    <span class="close-icon"></span>
                    <span class="menu-text">FERMER</span>
                </button>
            </div>
        </div>

        <div class="container mega-menu-content">
            <div class="grid grid-4 mega-menu-grid">
                
                <!-- Column 1 -->
                <div class="menu-col">
                    <h3>L'entreprise</h3>
                    <ul>
                        <li><a href="about.html">Présentation</a></li>
                        <li><a href="about.html">L'histoire</a></li>
                        <li><a href="about.html#carrieres">Notre équipe</a></li>
                        <li><a href="about.html">Nos valeurs</a></li>
                    </ul>
                </div>

                <!-- Column 2 -->
                <div class="menu-col">
                    <h3>Nos métiers</h3>
                    <ul>
                        <li><a href="materiel.html">Savoir-faire</a></li>
                        <li><a href="machines.html">Prépresse</a></li>
                        <li><a href="machines.html">Impression</a></li>
                        <li><a href="machines.html">Façonnage</a></li>
                    </ul>
                </div>

                <!-- Column 3 -->
                <div class="menu-col">
                    <h3>Nos produits</h3>
                    <ul>
                        <li><a href="materiel.html#edition">Édition & Beaux Livres</a></li>
                        <li><a href="materiel.html#packaging">Packaging Premium</a></li>
                        <li><a href="materiel.html">Communication Corporate</a></li>
                        <li><a href="materiel.html">Grand Format</a></li>
                    </ul>
                </div>

                <!-- Column 4 -->
                <div class="menu-col">
                    <h3>Contact & Devis</h3>
                    <ul>
                        <li><a href="contact.html">Nous contacter</a></li>
                        <li><a href="portfolio.html">Nos Réalisations</a></li>
                        <li><a href="mentions-legales.html">Mentions Légales</a></li>
                        <li><a href="politique-confidentialite.html">Confidentialité</a></li>
                    </ul>
                </div>

            </div>

            <div class="mega-menu-bottom">
                <div class="menu-image-box">
                    <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=600&auto=format&fit=crop" alt="Site de production">
                    <h4>Site de production</h4>
                </div>
                
                <div class="menu-bottom-links">
                    <a href="contact.html">📍 Nos implantations</a>
                    <a href="#">🛠 Support technique</a>
                </div>
            </div>
        </div>
    </div>"""

files = ['mentions-legales.html', 'politique-confidentialite.html']

for filename in files:
    with open(filename, 'r') as f:
        content = f.read()
    
    # We find <!-- Header --> down to </header>
    pattern = re.compile(r'<!-- Header -->\s*<header class="header" id="header".*?</header>', re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(new_header, content)
        with open(filename, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"Could not find header in {filename}")

