// Complete app.js with same CSS as HTML
const body = document.body;
body.style.margin = '0';
body.style.padding = '0';
body.style.fontFamily = 'Inter, sans-serif';
body.style.minHeight = '100vh';
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.overflowX = 'hidden';

// CSS Variables
const style = document.createElement('style');
style.textContent = `
  :root {
    --primary-dark-navy: #1a237e;
    --primary-medium-blue: #283593;
    --accent-yellow: #ffc107;
    --accent-gold: #ffb300;
    --gradient-primary: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%);
    --gradient-accent: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
    --gradient-card: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    --text-main: #2d3748;
    --text-light: #718096;
    --background-light: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.08);
    --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
    --shadow-strong: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  html {
    scroll-behavior: smooth;
  }

  /* Animation Styles */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  .content-section {
    animation: fadeIn 0.8s ease-out;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .feature-grid { grid-template-columns: 1fr !important; }
    .team-images-container { gap: 1.5rem !important; }
    .team-image-card { max-width: 90% !important; padding: 1.5rem 1rem !important; }
    .team-image { width: 130px !important; height: 130px !important; }
    .stats-container { gap: 1rem !important; }
    .stat-card { min-width: 140px !important; padding: 1.5rem 1rem !important; }
    .welcome-section { padding: 2rem 1.5rem !important; }
  }

  @media (max-width: 480px) {
    .team-images-container { flex-direction: column !important; align-items: center !important; }
    .team-image-card { max-width: 100% !important; }
  }
`;
document.head.appendChild(style);

// ============ HEADER & NAVIGATION ============
const header = document.createElement('header');
header.style.background = 'var(--gradient-primary)';
header.style.color = 'white';
header.style.boxShadow = 'var(--shadow-medium)';
header.style.position = 'sticky';
header.style.top = '0';
header.style.zIndex = '1000';
header.style.backdropFilter = 'blur(10px)';

const headerContent = document.createElement('div');
headerContent.style.display = 'flex';
headerContent.style.alignItems = 'center';
headerContent.style.justifyContent = 'space-between';
headerContent.style.padding = '1rem 2rem';
headerContent.style.position = 'relative';
headerContent.style.zIndex = '100';

// Logo Area
const logoArea = document.createElement('a');
logoArea.href = 'https://www.examsaarthi.com/';
logoArea.style.display = 'flex';
logoArea.style.alignItems = 'center';
logoArea.style.cursor = 'pointer';
logoArea.style.padding = '0.5rem 0';
logoArea.style.transition = 'all 0.3s ease';
logoArea.style.textDecoration = 'none';

// Logo Image
const logoImg = document.createElement('img');
logoImg.src = 'https://www.examsaarthi.com/logo.png';
logoImg.alt = 'University PYQ Portal Logo';
logoImg.style.width = '60px';
logoImg.style.height = '60px';
logoImg.style.marginRight = '1rem';
logoImg.style.borderRadius = '12px';
logoImg.style.objectFit = 'contain';
logoImg.style.transition = 'transform 0.3s ease';
logoImg.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
logoImg.style.background = 'white';
logoImg.style.padding = '5px';

// Logo Title
const headerTitle = document.createElement('h1');
headerTitle.className = 'header-title';
headerTitle.textContent = 'Exam Saarthi';
headerTitle.style.fontSize = '2.2rem';
headerTitle.style.fontWeight = '900';
headerTitle.style.letterSpacing = '0.5px';
headerTitle.style.background = 'linear-gradient(135deg, #ffffff 0%, #ffeb3b 100%)';
headerTitle.style.WebkitBackgroundClip = 'text';
headerTitle.style.WebkitTextFillColor = 'transparent';
headerTitle.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

logoArea.appendChild(logoImg);
logoArea.appendChild(headerTitle);

// Desktop Navigation
const desktopNav = document.createElement('nav');
desktopNav.className = 'desktop-nav';
desktopNav.style.display = 'flex';

const navList = document.createElement('ul');
navList.style.display = 'flex';
navList.style.listStyle = 'none';
navList.style.padding = '0';
navList.style.margin = '0';
navList.style.gap = '5px';

const navItems = [
  { name: 'Home', href: 'index.html', active: true },
  { name: 'Universities', href: 'University.html' },
  { name: 'About', href: 'About.html' },
  { name: 'Contact', href: 'Contact.html' }
];

navItems.forEach(item => {
  const listItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.href = item.href;
  navLink.textContent = item.name;
  navLink.style.color = 'white';
  navLink.style.textDecoration = 'none';
  navLink.style.fontWeight = '600';
  navLink.style.padding = '10px 18px';
  navLink.style.borderRadius = '8px';
  navLink.style.transition = 'all 0.3s ease';
  navLink.style.marginLeft = '5px';
  navLink.style.cursor = 'pointer';
  navLink.style.border = '1px solid transparent';
  navLink.style.position = 'relative';
  navLink.style.overflow = 'hidden';
  
  if (item.active) {
    navLink.style.backgroundColor = 'rgba(255,255,255,0.15)';
    navLink.style.color = 'var(--accent-yellow)';
    navLink.style.border = '1px solid var(--accent-yellow)';
    navLink.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.3)';
  }
  
  // Hover effect
  navLink.onmouseover = () => {
    if (!item.active) {
      navLink.style.backgroundColor = 'rgba(255,255,255,0.1)';
      navLink.style.color = 'var(--accent-yellow)';
      navLink.style.transform = 'translateY(-2px)';
      navLink.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    }
  };
  
  navLink.onmouseout = () => {
    if (!item.active) {
      navLink.style.backgroundColor = 'transparent';
      navLink.style.color = 'white';
      navLink.style.transform = 'translateY(0)';
      navLink.style.boxShadow = 'none';
    }
  };
  
  listItem.appendChild(navLink);
  navList.appendChild(listItem);
});

desktopNav.appendChild(navList);

// Mobile Menu Button
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.id = 'mobileMenuBtn';
mobileMenuBtn.style.display = 'none';
mobileMenuBtn.style.background = 'none';
mobileMenuBtn.style.border = 'none';
mobileMenuBtn.style.color = 'white';
mobileMenuBtn.style.fontSize = '1.5rem';
mobileMenuBtn.style.cursor = 'pointer';
mobileMenuBtn.style.zIndex = '100';
mobileMenuBtn.style.backgroundColor = 'rgba(255,255,255,0.1)';
mobileMenuBtn.style.borderRadius = '8px';
mobileMenuBtn.style.padding = '8px 12px';
mobileMenuBtn.style.transition = 'all 0.3s ease';

const menuIcon = document.createElement('i');
menuIcon.className = 'fas fa-bars';
mobileMenuBtn.appendChild(menuIcon);

// Mobile Navigation
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.id = 'mobileNav';
mobileNav.style.display = 'none';
mobileNav.style.background = 'var(--gradient-primary)';
mobileNav.style.padding = '1.5rem';
mobileNav.style.boxShadow = 'var(--shadow-strong)';
mobileNav.style.width = '100%';
mobileNav.style.position = 'absolute';
mobileNav.style.top = '100%';
mobileNav.style.left = '0';
mobileNav.style.zIndex = '99';

const mobileNavList = document.createElement('ul');
mobileNavList.style.listStyle = 'none';
mobileNavList.style.padding = '0';

navItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.style.margin = '12px 0';
  
  const mobileNavLink = document.createElement('a');
  mobileNavLink.href = item.href;
  mobileNavLink.textContent = item.name;
  mobileNavLink.style.color = 'white';
  mobileNavLink.style.textDecoration = 'none';
  mobileNavLink.style.display = 'block';
  mobileNavLink.style.padding = '12px 16px';
  mobileNavLink.style.borderRadius = '8px';
  mobileNavLink.style.transition = 'all 0.3s ease';
  mobileNavLink.style.border = '1px solid transparent';
  mobileNavLink.style.fontWeight = '600';
  
  if (item.active) {
    mobileNavLink.style.backgroundColor = 'rgba(255,255,255,0.15)';
    mobileNavLink.style.color = 'var(--accent-yellow)';
    mobileNavLink.style.border = '1px solid var(--accent-yellow)';
  }
  
  mobileNavLink.onmouseover = () => {
    mobileNavLink.style.backgroundColor = 'rgba(255,255,255,0.1)';
    mobileNavLink.style.transform = 'translateX(5px)';
  };
  
  mobileNavLink.onmouseout = () => {
    mobileNavLink.style.backgroundColor = item.active ? 'rgba(255,255,255,0.15)' : 'transparent';
    mobileNavLink.style.transform = 'translateX(0)';
  };
  
  listItem.appendChild(mobileNavLink);
  mobileNavList.appendChild(listItem);
});

mobileNav.appendChild(mobileNavList);

// Assemble Header
headerContent.appendChild(logoArea);
headerContent.appendChild(desktopNav);
headerContent.appendChild(mobileMenuBtn);
header.appendChild(headerContent);
header.appendChild(mobileNav);

// Marquee Bar
const marquee = document.createElement('marquee');
marquee.behavior = 'scroll';
marquee.direction = 'left';
marquee.scrollAmount = '6';
marquee.style.background = 'var(--gradient-accent)';
marquee.style.color = 'var(--primary-dark-navy)';
marquee.style.padding = '12px 0';
marquee.style.fontWeight = '700';
marquee.style.fontSize = '1rem';
marquee.style.width = '100%';
marquee.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
marquee.style.lineHeight = '1';

const marqueeContent = document.createElement('span');
marqueeContent.innerHTML = '<i class="fas fa-bullhorn mr-2"></i> Welcome to the University PYQ Portal - Your Gateway to Academic Excellence for All Universities!';
marquee.appendChild(marqueeContent);

header.appendChild(marquee);
body.appendChild(header);

// ============ MAIN CONTENT ============
const main = document.createElement('main');
main.className = 'main-content';
main.style.maxWidth = '1200px';
main.style.margin = '0 auto';
main.style.padding = '1rem';
main.style.flex = '1';

// Welcome Section
const contentSection = document.createElement('div');
contentSection.className = 'content-section';
contentSection.style.maxWidth = '5xl';
contentSection.style.width = '100%';

const welcomeSection = document.createElement('div');
welcomeSection.className = 'welcome-section';
welcomeSection.style.background = 'var(--gradient-card)';
welcomeSection.style.borderRadius = '20px';
welcomeSection.style.padding = '3rem';
welcomeSection.style.boxShadow = 'var(--shadow-soft)';
welcomeSection.style.marginTop = '2rem';
welcomeSection.style.border = '1px solid rgba(255, 255, 255, 0.8)';
welcomeSection.style.transition = 'all 0.4s ease';
welcomeSection.style.textAlign = 'center';
welcomeSection.style.position = 'relative';
welcomeSection.style.overflow = 'hidden';
welcomeSection.style.maxWidth = '4xl';
welcomeSection.style.margin = '0 auto';

const heroTitle = document.createElement('h1');
heroTitle.className = 'hero-title';
heroTitle.textContent = 'Welcome to University PYQ Portal 🏆';
heroTitle.style.fontSize = '3rem';
heroTitle.style.fontWeight = '900';
heroTitle.style.background = 'linear-gradient(135deg, var(--primary-dark-navy) 0%, var(--primary-medium-blue) 100%)';
heroTitle.style.WebkitBackgroundClip = 'text';
heroTitle.style.WebkitTextFillColor = 'transparent';
heroTitle.style.marginBottom = '1.5rem';
heroTitle.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

const heroSubtitle = document.createElement('p');
heroSubtitle.className = 'hero-subtitle';
heroSubtitle.innerHTML = '<strong>Explore previous year question papers (PYQs) for all universities and their courses.</strong> Our goal is to make your exam preparation simple, organized, and effective.';
heroSubtitle.style.fontSize = '1.3rem';
heroSubtitle.style.lineHeight = '1.6';
heroSubtitle.style.marginBottom = '2rem';
heroSubtitle.style.color = '#4a5568';

const exploreBtn = document.createElement('a');
exploreBtn.href = 'University.html';
exploreBtn.className = 'explore-btn';
exploreBtn.textContent = 'Explore Universities';
exploreBtn.style.background = 'var(--gradient-accent)';
exploreBtn.style.color = 'var(--primary-dark-navy)';
exploreBtn.style.padding = '1rem 2.5rem';
exploreBtn.style.borderRadius = '12px';
exploreBtn.style.fontWeight = '800';
exploreBtn.style.fontSize = '1.1rem';
exploreBtn.style.transition = 'all 0.3s ease';
exploreBtn.style.boxShadow = '0 6px 15px rgba(255, 193, 7, 0.4)';
exploreBtn.style.cursor = 'pointer';
exploreBtn.style.border = 'none';
exploreBtn.style.position = 'relative';
exploreBtn.style.overflow = 'hidden';
exploreBtn.style.display = 'inline-block';
exploreBtn.style.textDecoration = 'none';

welcomeSection.appendChild(heroTitle);
welcomeSection.appendChild(heroSubtitle);
welcomeSection.appendChild(exploreBtn);
contentSection.appendChild(welcomeSection);

// Stats Section
const statsContainer = document.createElement('div');
statsContainer.className = 'stats-container';
statsContainer.style.display = 'flex';
statsContainer.style.justifyContent = 'center';
statsContainer.style.gap = '2rem';
statsContainer.style.margin = '3rem 0';
statsContainer.style.flexWrap = 'wrap';

const stats = [
  { number: '50+', label: 'Universities' },
  { number: '5000+', label: 'PYQs' },
  { number: '100+', label: 'Courses' },
  { number: '24/7', label: 'Access' }
];

stats.forEach(stat => {
  const statCard = document.createElement('div');
  statCard.className = 'stat-card';
  statCard.style.background = 'var(--gradient-card)';
  statCard.style.borderRadius = '16px';
  statCard.style.padding = '2rem';
  statCard.style.textAlign = 'center';
  statCard.style.boxShadow = 'var(--shadow-soft)';
  statCard.style.transition = 'all 0.3s ease';
  statCard.style.minWidth = '180px';
  
  const statNumber = document.createElement('span');
  statNumber.className = 'stat-number';
  statNumber.textContent = stat.number;
  statNumber.style.fontSize = '2.5rem';
  statNumber.style.fontWeight = '800';
  statNumber.style.background = 'linear-gradient(135deg, var(--primary-dark-navy) 0%, var(--primary-medium-blue) 100%)';
  statNumber.style.WebkitBackgroundClip = 'text';
  statNumber.style.WebkitTextFillColor = 'transparent';
  statNumber.style.display = 'block';
  statNumber.style.marginBottom = '0.5rem';
  
  const statLabel = document.createElement('span');
  statLabel.className = 'stat-label';
  statLabel.textContent = stat.label;
  statLabel.style.fontSize = '1rem';
  statLabel.style.color = 'var(--text-light)';
  statLabel.style.fontWeight = '600';
  
  statCard.appendChild(statNumber);
  statCard.appendChild(statLabel);
  statsContainer.appendChild(statCard);
});

contentSection.appendChild(statsContainer);

// Features Section
const featuresSection = document.createElement('div');
featuresSection.className = 'welcome-section';
featuresSection.style.maxWidth = '5xl';
featuresSection.style.marginTop = '2.5rem';

const featuresTitle = document.createElement('h2');
featuresTitle.textContent = '✅ What You\'ll Find Here';
featuresTitle.style.fontSize = '2rem';
featuresTitle.style.fontWeight = 'bold';
featuresTitle.style.marginBottom = '2rem';
featuresTitle.style.textAlign = 'center';
featuresTitle.style.color = '#2d3748';

const featureGrid = document.createElement('div');
featureGrid.className = 'feature-grid';
featureGrid.style.display = 'grid';
featureGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
featureGrid.style.gap = '2rem';

const features = [
  { icon: 'fas fa-book-open', title: 'Comprehensive PYQs', desc: 'All UG and PG Courses PYQs in one place from multiple universities.' },
  { icon: 'fas fa-mobile-alt', title: 'Mobile Friendly', desc: 'Easy navigation and modern responsive design for all devices.' },
  { icon: 'fas fa-check-circle', title: 'Verified Content', desc: 'Accurate papers collected from verified university sources.' },
  { icon: 'fas fa-graduation-cap', title: 'Free Access', desc: 'Completely free and accessible for every student.' }
];

features.forEach(feature => {
  const featureCard = document.createElement('div');
  featureCard.className = 'feature-card';
  featureCard.style.background = 'var(--gradient-card)';
  featureCard.style.borderRadius = '16px';
  featureCard.style.padding = '2rem';
  featureCard.style.boxShadow = 'var(--shadow-soft)';
  featureCard.style.textAlign = 'center';
  featureCard.style.transition = 'all 0.4s ease';
  featureCard.style.border = '1px solid rgba(255, 255, 255, 0.8)';
  featureCard.style.position = 'relative';
  featureCard.style.overflow = 'hidden';
  
  const featureIcon = document.createElement('i');
  featureIcon.className = feature.icon + ' feature-icon';
  featureIcon.style.fontSize = '3.5rem';
  featureIcon.style.marginBottom = '1.5rem';
  featureIcon.style.background = 'var(--gradient-primary)';
  featureIcon.style.WebkitBackgroundClip = 'text';
  featureIcon.style.WebkitTextFillColor = 'transparent';
  featureIcon.style.display = 'inline-block';
  
  const featureTitle = document.createElement('h3');
  featureTitle.textContent = feature.title;
  featureTitle.style.fontSize = '1.25rem';
  featureTitle.style.fontWeight = 'bold';
  featureTitle.style.marginBottom = '1rem';
  featureTitle.style.color = '#2d3748';
  
  const featureDesc = document.createElement('p');
  featureDesc.textContent = feature.desc;
  featureDesc.style.color = '#718096';
  
  featureCard.appendChild(featureIcon);
  featureCard.appendChild(featureTitle);
  featureCard.appendChild(featureDesc);
  featureGrid.appendChild(featureCard);
});

featuresSection.appendChild(featuresTitle);
featuresSection.appendChild(featureGrid);
contentSection.appendChild(featuresSection);

// Mission Section
const missionSection = document.createElement('div');
missionSection.className = 'welcome-section';
missionSection.style.maxWidth = '5xl';
missionSection.style.marginTop = '2.5rem';
missionSection.style.textAlign = 'center';

const missionTitle = document.createElement('h2');
missionTitle.textContent = '🎯 Our Mission';
missionTitle.style.fontSize = '2rem';
missionTitle.style.fontWeight = 'bold';
missionTitle.style.marginBottom = '1.5rem';
missionTitle.style.color = '#2d3748';

const missionText = document.createElement('p');
missionText.textContent = 'To empower all students with easy access to academic materials and promote smart learning. With our portal, you can focus on understanding and revising instead of searching endlessly for papers.';
missionText.style.color = '#4a5568';
missionText.style.lineHeight = '1.8';
missionText.style.fontSize = '1.125rem';
missionText.style.marginBottom = '2rem';

const teamContainer = document.createElement('div');
teamContainer.className = 'team-images-container';
teamContainer.style.display = 'flex';
teamContainer.style.justifyContent = 'center';
teamContainer.style.gap = '2.5rem';
teamContainer.style.marginTop = '3rem';
teamContainer.style.flexWrap = 'wrap';

const teamMembers = [
  { name: 'Gourav Sharma', role: 'Developer & Founder', image: 'https://www.examsaarthi.com/Dev.jpg' },
  { name: 'Mahesh Verma', role: 'Developer & Founder', image: 'https://www.examsaarthi.com/Edit.jpeg' }
];

teamMembers.forEach((member, index) => {
  const teamCard = document.createElement('div');
  teamCard.className = 'team-image-card floating';
  teamCard.style.position = 'relative';
  teamCard.style.background = 'var(--gradient-card)';
  teamCard.style.borderRadius = '20px';
  teamCard.style.boxShadow = 'var(--shadow-medium)';
  teamCard.style.transition = 'all 0.4s ease';
  teamCard.style.maxWidth = '300px';
  teamCard.style.width = '100%';
  teamCard.style.textAlign = 'center';
  teamCard.style.padding = '2rem 1.5rem';
  teamCard.style.border = '1px solid rgba(255, 255, 255, 0.8)';
  teamCard.style.display = 'flex';
  teamCard.style.flexDirection = 'column';
  teamCard.style.alignItems = 'center';
  teamCard.style.overflow = 'hidden';
  
  if (index === 1) {
    teamCard.style.animationDelay = '2s';
  }
  
  const teamImage = document.createElement('img');
  teamImage.src = member.image;
  teamImage.alt = member.name + ' Image';
  teamImage.className = 'team-image';
  teamImage.style.width = '160px';
  teamImage.style.height = '160px';
  teamImage.style.objectFit = 'cover';
  teamImage.style.display = 'block';
  teamImage.style.borderRadius = '50%';
  teamImage.style.marginBottom = '1.5rem';
  teamImage.style.border = '5px solid var(--accent-yellow)';
  teamImage.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
  teamImage.style.transition = 'transform 0.3s ease';
  
  const imageTitle = document.createElement('div');
  imageTitle.className = 'image-title';
  imageTitle.textContent = member.name;
  imageTitle.style.fontSize = '1.3rem';
  imageTitle.style.fontWeight = '700';
  imageTitle.style.color = 'var(--primary-dark-navy)';
  imageTitle.style.marginBottom = '0.5rem';
  
  const imageRole = document.createElement('div');
  imageRole.className = 'image-role';
  imageRole.textContent = member.role;
  imageRole.style.fontSize = '1rem';
  imageRole.style.color = 'var(--text-light)';
  imageRole.style.fontWeight = '600';
  imageRole.style.background = 'var(--gradient-primary)';
  imageRole.style.WebkitBackgroundClip = 'text';
  imageRole.style.WebkitTextFillColor = 'transparent';
  
  teamCard.appendChild(teamImage);
  teamCard.appendChild(imageTitle);
  teamCard.appendChild(imageRole);
  teamContainer.appendChild(teamCard);
});

missionSection.appendChild(missionTitle);
missionSection.appendChild(missionText);
missionSection.appendChild(teamContainer);
contentSection.appendChild(missionSection);

main.appendChild(contentSection);
body.appendChild(main);

// ============ FOOTER ============
const footer = document.createElement('footer');
footer.innerHTML = '&copy; 2025 University PYQ Portal | Designed by Gourav Sharma';
footer.style.marginTop = 'auto';
footer.style.background = 'var(--gradient-primary)';
footer.style.color = 'white';
footer.style.textAlign = 'center';
footer.style.padding = '2rem';
footer.style.width = '100%';
footer.style.fontWeight = '500';
footer.style.letterSpacing = '0.5px';
footer.style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.1)';
footer.style.position = 'relative';

body.appendChild(footer);

// ============ JAVASCRIPT FUNCTIONALITY ============
// Mobile menu toggle
mobileMenuBtn.addEventListener('click', function() {
  if (mobileNav.style.display === 'block') {
    mobileNav.style.display = 'none';
    menuIcon.className = 'fas fa-bars';
  } else {
    mobileNav.style.display = 'block';
    menuIcon.className = 'fas fa-times';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (mobileNav.style.display === 'block' && 
      !mobileNav.contains(event.target) && 
      !mobileMenuBtn.contains(event.target)) {
    mobileNav.style.display = 'none';
    menuIcon.className = 'fas fa-bars';
  }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(26, 35, 126, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'var(--gradient-primary)';
    header.style.backdropFilter = 'blur(10px)';
  }
});

// Check mobile viewport
function checkMobileViewport() {
  if (window.innerWidth <= 768) {
    mobileMenuBtn.style.display = 'block';
    desktopNav.style.display = 'none';
  } else {
    mobileMenuBtn.style.display = 'none';
    desktopNav.style.display = 'flex';
    mobileNav.style.display = 'none';
    menuIcon.className = 'fas fa-bars';
  }
}

// Initial check
checkMobileViewport();
window.addEventListener('resize', checkMobileViewport);

// Add Font Awesome
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesome);

// Add Google Fonts
const googleFonts = document.createElement('link');
googleFonts.rel = 'preconnect';
googleFonts.href = 'https://fonts.googleapis.com';
document.head.appendChild(googleFonts);

const googleFonts2 = document.createElement('link');
googleFonts2.rel = 'preconnect';
googleFonts2.href = 'https://fonts.gstatic.com';
googleFonts2.crossOrigin = 'true';
document.head.appendChild(googleFonts2);

const interFont = document.createElement('link');
interFont.rel = 'stylesheet';
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
document.head.appendChild(interFont);