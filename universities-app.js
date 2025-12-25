// Complete app.js for Universities Page with same CSS
const body = document.body;
body.style.margin = '0';
body.style.padding = '0';
body.style.fontFamily = 'Inter, sans-serif';
body.style.minHeight = '100vh';
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.overflowX = 'hidden';

// Add CSS Variables and Styles
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

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .content-section {
    animation: fadeIn 0.8s ease-out;
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .search-icon { left: 1.2rem !important; }
    #universitySearch { padding: 1rem 1.5rem 1rem 3.5rem !important; font-size: 1rem !important; }
  }

  @media (max-width: 480px) {
    .header-title { font-size: 1.4rem !important; }
    .logo-img { width: 45px !important; height: 45px !important; }
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
headerContent.className = 'header-content';
headerContent.style.display = 'flex';
headerContent.style.alignItems = 'center';
headerContent.style.justifyContent = 'space-between';
headerContent.style.padding = '1rem 2rem';
headerContent.style.position = 'relative';
headerContent.style.zIndex = '100';

// Logo Area
const logoArea = document.createElement('a');
logoArea.href = 'index.html';
logoArea.className = 'logo-area';
logoArea.style.display = 'flex';
logoArea.style.alignItems = 'center';
logoArea.style.cursor = 'pointer';
logoArea.style.padding = '0.5rem 0';
logoArea.style.transition = 'all 0.3s ease';
logoArea.style.textDecoration = 'none';

const logoImg = document.createElement('img');
logoImg.src = 'https://examsaarthi.com/logo.png';
logoImg.alt = 'University PYQ Portal Logo';
logoImg.className = 'logo-img';
logoImg.style.width = '60px';
logoImg.style.height = '60px';
logoImg.style.marginRight = '1rem';
logoImg.style.borderRadius = '12px';
logoImg.style.objectFit = 'contain';
logoImg.style.transition = 'transform 0.3s ease';
logoImg.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
logoImg.style.background = 'white';
logoImg.style.padding = '5px';

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

const navList = document.createElement('ul');
navList.style.display = 'flex';
navList.style.listStyle = 'none';
navList.style.padding = '0';
navList.style.margin = '0';
navList.style.gap = '5px';

const navItems = [
  { name: 'Home', href: 'index.html', active: false },
  { name: 'Universities', href: 'University.html', active: true },
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
    navLink.className = 'active-nav-link';
    navLink.style.backgroundColor = 'rgba(255,255,255,0.15)';
    navLink.style.color = 'var(--accent-yellow)';
    navLink.style.border = '1px solid var(--accent-yellow)';
    navLink.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.3)';
  }
  
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
    mobileNavLink.className = 'active-nav-link';
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
marqueeContent.innerHTML = '<i class="fas fa-bullhorn mr-2"></i> Browse universities and find previous year question papers for all courses! Search instantly by university name.';
marquee.appendChild(marqueeContent);

header.appendChild(marquee);
body.appendChild(header);

// ============ MAIN CONTENT ============
const main = document.createElement('main');
main.style.maxWidth = '1200px';
main.style.margin = '0 auto';
main.style.padding = '1rem';
main.style.flex = '1';
main.style.width = '100%';

// Back to Home Button
const backHomeDiv = document.createElement('div');
backHomeDiv.style.maxWidth = '6xl';
backHomeDiv.style.width = '100%';
backHomeDiv.style.marginBottom = '1.5rem';
backHomeDiv.style.textAlign = 'left';

const backHomeBtn = document.createElement('a');
backHomeBtn.href = 'index.html';
backHomeBtn.className = 'back-home-btn';
backHomeBtn.style.display = 'inline-block';
backHomeBtn.style.background = 'var(--gradient-accent)';
backHomeBtn.style.color = 'var(--primary-dark-navy)';
backHomeBtn.style.padding = '0.8rem 2.2rem';
backHomeBtn.style.borderRadius = '10px';
backHomeBtn.style.fontWeight = '700';
backHomeBtn.style.transition = 'all 0.3s ease';
backHomeBtn.style.marginBottom = '2rem';
backHomeBtn.style.cursor = 'pointer';
backHomeBtn.style.boxShadow = '0 4px 10px rgba(255, 193, 7, 0.3)';
backHomeBtn.style.border = 'none';
backHomeBtn.style.position = 'relative';
backHomeBtn.style.overflow = 'hidden';
backHomeBtn.style.textDecoration = 'none';

const backIcon = document.createElement('i');
backIcon.className = 'fas fa-arrow-left';
backIcon.style.marginRight = '0.5rem';

const backText = document.createTextNode(' Back to Home');
backHomeBtn.appendChild(backIcon);
backHomeBtn.appendChild(backText);

backHomeDiv.appendChild(backHomeBtn);
main.appendChild(backHomeDiv);

// Universities Content Section
const contentSection = document.createElement('div');
contentSection.className = 'content-section';
contentSection.style.maxWidth = '6xl';
contentSection.style.width = '100%';

// Main Title
const mainTitle = document.createElement('h1');
mainTitle.textContent = 'Explore Universities';
mainTitle.style.fontSize = '2.5rem';
mainTitle.style.fontWeight = '800';
mainTitle.style.textAlign = 'center';
mainTitle.style.color = '#2d3748';
mainTitle.style.marginBottom = '0.5rem';

const subtitle = document.createElement('p');
subtitle.innerHTML = 'Select your university or <strong>search instantly</strong> to find PYQs.';
subtitle.style.textAlign = 'center';
subtitle.style.fontSize = '1.25rem';
subtitle.style.color = '#718096';
subtitle.style.marginBottom = '2rem';

// Search Container
const searchContainer = document.createElement('div');
searchContainer.className = 'search-container';
searchContainer.style.marginBottom = '3rem';
searchContainer.style.position = 'relative';
searchContainer.style.maxWidth = '700px';
searchContainer.style.marginLeft = 'auto';
searchContainer.style.marginRight = 'auto';

const searchIcon = document.createElement('i');
searchIcon.className = 'fas fa-search search-icon';
searchIcon.style.position = 'absolute';
searchIcon.style.left = '1.5rem';
searchIcon.style.top = '50%';
searchIcon.style.transform = 'translateY(-50%)';
searchIcon.style.color = 'var(--primary-medium-blue)';
searchIcon.style.fontSize = '1.3rem';
searchIcon.style.zIndex = '2';

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'universitySearch';
searchInput.placeholder = 'Search University Name (e.g., IGU, KUK, DU)';
searchInput.style.width = '100%';
searchInput.style.padding = '1.2rem 1.5rem 1.2rem 4rem';
searchInput.style.borderRadius = '50px';
searchInput.style.border = '2px solid var(--primary-medium-blue)';
searchInput.style.boxShadow = 'var(--shadow-soft)';
searchInput.style.fontSize = '1.1rem';
searchInput.style.transition = 'all 0.3s ease';
searchInput.style.background = 'white';
searchInput.style.outline = 'none';

searchContainer.appendChild(searchIcon);
searchContainer.appendChild(searchInput);

// University Grid
const universityGrid = document.createElement('div');
universityGrid.id = 'universityGrid';
universityGrid.style.display = 'grid';
universityGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
universityGrid.style.gap = '2rem';
universityGrid.style.marginTop = '2rem';

// University Data
const universities = [
  { name: 'Indira Gandhi University (IGU)', location: 'Meerpur, Rewari', link: '/igu/course.html', icon: 'fas fa-university' },
  { name: 'Kurukshetra University (KUK)', location: 'Kurukshetra, Haryana', link: '/kuk/course.html', icon: 'fas fa-university' },
  { name: 'Maharshi Dayanand University (MDU)', location: 'Rohtak, Haryana', link: '/mdu/course.html', icon: 'fas fa-university' },
  { name: 'Delhi University (DU)', location: 'New Delhi', link: '/du/course.html', icon: 'fas fa-university' },
  { name: 'Guru Jambheshwar University (GJU)', location: 'Hisar, Haryana', link: '/gju/course.html', icon: 'fas fa-university' },
  { name: 'B.P.S. Mahila University', location: 'Khanpur Kalan, Haryana', link: '/bps/course.html', icon: 'fas fa-university' },
  { name: 'Chaudhary Charan Singh University (CCSU)', location: 'Meerut, Uttar Pradesh', link: '/ccsu/course.html', icon: 'fas fa-university' },
  { name: 'Guru Nanak Dev University (GNDU)', location: 'Amritsar, Punjab', link: '/gndu/course.html', icon: 'fas fa-university' },
  { name: 'Punjab University (PU)', location: 'Chandigarh', link: '/pu/course.html', icon: 'fas fa-university' },
  { name: 'University of Rajasthan (UOR)', location: 'Jaipur, Rajasthan', link: '/uor/course.html', icon: 'fas fa-university' },
  { name: 'Jawaharlal Nehru University (JNU)', location: 'New Delhi', link: '/jnu/course.html', icon: 'fas fa-university' },
  { name: 'Banaras Hindu University (BHU)', location: 'Varanasi, Uttar Pradesh', link: '/bhu/course.html', icon: 'fas fa-university' }
];

universities.forEach(university => {
  const card = document.createElement('div');
  card.className = 'university-card';
  card.style.background = 'var(--gradient-card)';
  card.style.padding = '2rem 1.5rem';
  card.style.borderRadius = '16px';
  card.style.boxShadow = 'var(--shadow-soft)';
  card.style.textAlign = 'center';
  card.style.transition = 'all 0.4s ease-in-out';
  card.style.border = '1px solid rgba(255, 255, 255, 0.8)';
  card.style.height = '100%';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.justifyContent = 'space-between';
  card.style.position = 'relative';
  card.style.overflow = 'hidden';
  
  const universityIcon = document.createElement('i');
  universityIcon.className = university.icon + ' university-icon';
  universityIcon.style.fontSize = '3.5rem';
  universityIcon.style.color = 'var(--accent-yellow)';
  universityIcon.style.marginBottom = '1.5rem';
  universityIcon.style.display = 'inline-block';
  universityIcon.style.transition = 'all 0.3s';
  universityIcon.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  
  const textContainer = document.createElement('div');
  
  const cardTitle = document.createElement('h3');
  cardTitle.className = 'card-title';
  cardTitle.textContent = university.name;
  cardTitle.style.fontSize = '1.4rem';
  cardTitle.style.fontWeight = '700';
  cardTitle.style.color = 'var(--primary-dark-navy)';
  cardTitle.style.marginBottom = '0.5rem';
  
  const cardSubtitle = document.createElement('p');
  cardSubtitle.className = 'card-subtitle';
  cardSubtitle.textContent = university.location;
  cardSubtitle.style.fontSize = '1rem';
  cardSubtitle.style.color = 'var(--text-light)';
  cardSubtitle.style.marginBottom = '1.5rem';
  
  textContainer.appendChild(cardTitle);
  textContainer.appendChild(cardSubtitle);
  
  const viewBtn = document.createElement('a');
  viewBtn.href = university.link;
  viewBtn.className = 'view-btn';
  viewBtn.style.display = 'inline-block';
  viewBtn.style.background = 'var(--gradient-primary)';
  viewBtn.style.color = 'white';
  viewBtn.style.padding = '0.8rem 2.2rem';
  viewBtn.style.borderRadius = '10px';
  viewBtn.style.fontWeight = '700';
  viewBtn.style.transition = 'all 0.3s ease';
  viewBtn.style.marginTop = 'auto';
  viewBtn.style.cursor = 'pointer';
  viewBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
  viewBtn.style.border = 'none';
  viewBtn.style.position = 'relative';
  viewBtn.style.overflow = 'hidden';
  viewBtn.style.textDecoration = 'none';
  viewBtn.textContent = 'View Papers';
  
  card.appendChild(universityIcon);
  card.appendChild(textContainer);
  card.appendChild(viewBtn);
  
  universityGrid.appendChild(card);
});

// Request University Section
const requestSection = document.createElement('div');
requestSection.style.textAlign = 'center';
requestSection.style.marginTop = '3rem';
requestSection.style.padding = '2rem';
requestSection.style.background = 'white';
requestSection.style.borderRadius = '16px';
requestSection.style.boxShadow = 'var(--shadow-medium)';
requestSection.style.border = '1px solid #e2e8f0';

const requestIcon = document.createElement('i');
requestIcon.className = 'fas fa-university';
requestIcon.style.fontSize = '3rem';
requestIcon.style.color = '#f59e0b';
requestIcon.style.marginBottom = '1rem';

const requestTitle = document.createElement('h3');
requestTitle.textContent = "Can't Find Your University?";
requestTitle.style.fontSize = '1.5rem';
requestTitle.style.fontWeight = '600';
requestTitle.style.color = '#374151';
requestTitle.style.marginBottom = '0.5rem';

const requestText = document.createElement('p');
requestText.textContent = "We are constantly adding new universities. Contact us to request papers for your university or course.";
requestText.style.color = '#6b7280';
requestText.style.marginBottom = '1.5rem';

const requestBtn = document.createElement('a');
requestBtn.href = '/contact';
requestBtn.style.display = 'inline-block';
requestBtn.style.background = '#2563eb';
requestBtn.style.color = 'white';
requestBtn.style.fontWeight = 'bold';
requestBtn.style.padding = '0.75rem 1.5rem';
requestBtn.style.borderRadius = '0.5rem';
requestBtn.style.transition = 'background-color 0.3s';
requestBtn.style.textDecoration = 'none';
requestBtn.textContent = 'Request University';

requestSection.appendChild(requestIcon);
requestSection.appendChild(requestTitle);
requestSection.appendChild(requestText);
requestSection.appendChild(requestBtn);

// Quick Stats Section
const statsSection = document.createElement('div');
statsSection.style.marginTop = '3rem';
statsSection.style.display = 'grid';
statsSection.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
statsSection.style.gap = '1.5rem';

const stats = [
  { icon: 'fas fa-graduation-cap', title: 'All UG/PG Courses', desc: 'Complete coverage of undergraduate and postgraduate programs', color: '#3b82f6' },
  { icon: 'fas fa-file-pdf', title: 'Downloadable PDFs', desc: 'Easy download options for all question papers', color: '#ef4444' },
  { icon: 'fas fa-search', title: 'Advanced Search', desc: 'Find papers by year, course, or university', color: '#10b981' }
];

stats.forEach(stat => {
  const statCard = document.createElement('div');
  statCard.style.background = 'white';
  statCard.style.padding = '1.5rem';
  statCard.style.borderRadius = '12px';
  statCard.style.boxShadow = 'var(--shadow-soft)';
  statCard.style.textAlign = 'center';
  
  const statIcon = document.createElement('i');
  statIcon.className = stat.icon;
  statIcon.style.fontSize = '2rem';
  statIcon.style.color = stat.color;
  statIcon.style.marginBottom = '1rem';
  
  const statTitle = document.createElement('h3');
  statTitle.textContent = stat.title;
  statTitle.style.fontSize = '1.25rem';
  statTitle.style.fontWeight = 'bold';
  statTitle.style.color = '#1f2937';
  
  const statDesc = document.createElement('p');
  statDesc.textContent = stat.desc;
  statDesc.style.color = '#6b7280';
  statDesc.style.marginTop = '0.5rem';
  
  statCard.appendChild(statIcon);
  statCard.appendChild(statTitle);
  statCard.appendChild(statDesc);
  statsSection.appendChild(statCard);
});

// Assemble Main Content
contentSection.appendChild(mainTitle);
contentSection.appendChild(subtitle);
contentSection.appendChild(searchContainer);
contentSection.appendChild(universityGrid);
contentSection.appendChild(requestSection);
contentSection.appendChild(statsSection);

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
// University Search Filter
function filterUniversities() {
  const input = document.getElementById('universitySearch');
  if (!input) return;

  const filter = input.value.toUpperCase();
  const cards = document.querySelectorAll('.university-card');

  cards.forEach(card => {
    const title = card.querySelector('.card-title');
    const subtitle = card.querySelector('.card-subtitle');
    const textToSearch = (title.textContent + ' ' + subtitle.textContent).toUpperCase();
    
    if (textToSearch.indexOf(filter) > -1) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

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

// Add search input event listener
searchInput.addEventListener('input', filterUniversities);

// Clear search on page load
window.addEventListener('load', () => {
  searchInput.value = '';
  filterUniversities();
});

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