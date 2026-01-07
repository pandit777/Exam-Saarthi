// Complete app.js for Courses Page with same CSS
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

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .content-section {
    animation: fadeIn 0.8s ease-out;
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .courses-grid { grid-template-columns: 1fr !important; }
    .category-title { font-size: 1.3rem !important; margin-top: 1.5rem !important; }
    .course-button { padding: 15px 20px !important; font-size: 1rem !important; }
  }

  @media (max-width: 480px) {
    .header-title { font-size: 1.4rem !important; }
    .logo-img { width: 45px !important; height: 45px !important; }
    .category-title { font-size: 1.2rem !important; }
    .course-button { padding: 12px 16px !important; font-size: 0.9rem !important; }
    footer { padding: 1rem !important; font-size: 0.9rem !important; }
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
logoArea.href = 'https://examsaarthi.com/';
logoArea.className = 'logo-area';
logoArea.style.display = 'flex';
logoArea.style.alignItems = 'center';
logoArea.style.cursor = 'pointer';
logoArea.style.padding = '0.5rem 0';
logoArea.style.transition = 'all 0.3s ease';
logoArea.style.textDecoration = 'none';

const logoImg = document.createElement('img');
logoImg.src = 'https://pandit777.github.io/pyq/logo.png';
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
  { name: 'Home', href: '/index.html', active: false },
  { name: 'Universities', href: '/University.html', active: false },
  { name: 'About', href: '/About.html', active: false },
  { name: 'Contact', href: '/Contact.html', active: false },
  { name: 'Syllabus', href: 'https://mdu.ac.in/admin/EventPage.aspx?id=3', active: false, target: '_blank' }
];

navItems.forEach(item => {
  const listItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.href = item.href;
  if (item.target) navLink.target = item.target;
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
  if (item.target) mobileNavLink.target = item.target;
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
marqueeContent.innerHTML = '<i class="fas fa-bullhorn mr-2"></i> Welcome to the MDU PYQ Portal - Your Gateway to Academic Excellence! Explore courses and previous year papers.';
marquee.appendChild(marqueeContent);

header.appendChild(marquee);
body.appendChild(header);

// ============ MAIN CONTENT ============
const main = document.createElement('main');
main.className = 'container mx-auto p-4 md:p-6 flex flex-col items-center';
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
backHomeBtn.href = '/University.html';
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

// ============ COURSES SECTION ============
const coursesSection = document.createElement('section');
coursesSection.style.marginTop = '2.5rem';
coursesSection.style.width = '100%';
coursesSection.style.maxWidth = '6xl';

// Main Title
const mainTitle = document.createElement('h2');
mainTitle.textContent = 'Explore MDU Courses';
mainTitle.style.fontSize = '2.25rem';
mainTitle.style.fontWeight = 'bold';
mainTitle.style.color = '#2d3748';
mainTitle.style.marginBottom = '2rem';
mainTitle.style.textAlign = 'center';

coursesSection.appendChild(mainTitle);

// ============ UNDERGRADUATE COURSES ============
const ugTitle = document.createElement('h3');
ugTitle.className = 'category-title';
ugTitle.textContent = 'Undergraduate Programs';
ugTitle.style.fontSize = '1.5rem';
ugTitle.style.fontWeight = '700';
ugTitle.style.marginTop = '2rem';
ugTitle.style.marginBottom = '1rem';
ugTitle.style.paddingBottom = '0.5rem';
ugTitle.style.borderBottom = '2px solid var(--primary-medium-blue)';
ugTitle.style.color = 'var(--primary-dark-navy)';

const ugGrid = document.createElement('div');
ugGrid.id = 'course-selection';
ugGrid.style.display = 'grid';
ugGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
ugGrid.style.gap = '1.25rem';

// Undergraduate Courses Data
const ugCourses = [
  { name: '📚 B.Tech', color: '#2563eb', function: 'btech()' },
  { name: '💻 BCA', color: '#059669', function: 'bca()' },
  { name: '📊 B.Com', color: '#7c3aed', function: 'bcom()' },
  { name: '🏢 BBA', color: '#dc2626', function: 'bba()' },
  { name: '🔬 BSc', color: '#d97706', function: 'bsc()' },
  { name: '🎓 BA', color: '#0d9488', function: 'ba()' },
  { name: '💊 B.Pharmacy', color: '#0891b2', function: 'bpharmacy()' },
  { name: '⚖️ BALLB', color: '#4f46e5', function: 'ballb()' },
  { name: '📰 BJMC', color: '#db2777', function: 'bjmc()' },
  { name: '🏨 BHMCT', color: '#e11d48', function: 'bhmct()' },
  { name: '👨‍🏫 B.Ed', color: '#65a30d', function: 'bed()' },
  { name: '🏃‍♂️ BPED', color: '#059669', function: 'bped()' },
  { name: '🤝 MSW', color: '#c026d3', function: 'msw()' }
];

ugCourses.forEach(course => {
  const courseButton = document.createElement('button');
  courseButton.className = 'course-button';
  courseButton.onclick = new Function(course.function);
  courseButton.style.background = course.color;
  courseButton.style.color = 'white';
  courseButton.style.padding = '1.25rem 1.5rem';
  courseButton.style.borderRadius = '12px';
  courseButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  courseButton.style.border = 'none';
  courseButton.style.cursor = 'pointer';
  courseButton.style.transition = 'all 0.3s ease';
  courseButton.style.fontSize = '1.125rem';
  courseButton.style.fontWeight = '600';
  courseButton.style.display = 'flex';
  courseButton.style.alignItems = 'center';
  courseButton.style.justifyContent = 'center';
  courseButton.style.gap = '8px';
  courseButton.style.position = 'relative';
  courseButton.style.overflow = 'hidden';
  courseButton.textContent = course.name;

  ugGrid.appendChild(courseButton);
});

coursesSection.appendChild(ugTitle);
coursesSection.appendChild(ugGrid);

// ============ POSTGRADUATE COURSES ============
const pgTitle = document.createElement('h3');
pgTitle.className = 'category-title';
pgTitle.textContent = 'Postgraduate Programs';
pgTitle.style.fontSize = '1.5rem';
pgTitle.style.fontWeight = '700';
pgTitle.style.marginTop = '2rem';
pgTitle.style.marginBottom = '1rem';
pgTitle.style.paddingBottom = '0.5rem';
pgTitle.style.borderBottom = '2px solid var(--primary-medium-blue)';
pgTitle.style.color = 'var(--primary-dark-navy)';

const pgGrid = document.createElement('div');
pgGrid.style.display = 'grid';
pgGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
pgGrid.style.gap = '1.25rem';

// Postgraduate Courses Data
const pgCourses = [
  { name: '🔧 M.Tech', color: '#1d4ed8', function: 'mtech()' },
  { name: '🎓 MA', color: '#0d9488', function: 'ma()' },
  { name: '📊 M.Com', color: '#7c3aed', function: 'mcom()' },
  { name: '🧪 MSc', color: '#b45309', function: 'msc()' },
  { name: '📈 MBA', color: '#b91c1c', function: 'mba()' },
  { name: '💾 MCA', color: '#047857', function: 'mca()' },
  { name: '🧬 M.Pharma', color: '#0e7490', function: 'mpharma()' },
  { name: '📜 LLB', color: '#4338ca', function: 'llb()' }
];

pgCourses.forEach(course => {
  const courseButton = document.createElement('button');
  courseButton.className = 'course-button';
  courseButton.onclick = new Function(course.function);
  courseButton.style.background = course.color;
  courseButton.style.color = 'white';
  courseButton.style.padding = '1.25rem 1.5rem';
  courseButton.style.borderRadius = '12px';
  courseButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  courseButton.style.border = 'none';
  courseButton.style.cursor = 'pointer';
  courseButton.style.transition = 'all 0.3s ease';
  courseButton.style.fontSize = '1.125rem';
  courseButton.style.fontWeight = '600';
  courseButton.style.display = 'flex';
  courseButton.style.alignItems = 'center';
  courseButton.style.justifyContent = 'center';
  courseButton.style.gap = '8px';
  courseButton.style.position = 'relative';
  courseButton.style.overflow = 'hidden';
  courseButton.textContent = course.name;

  pgGrid.appendChild(courseButton);
});

coursesSection.appendChild(pgTitle);
coursesSection.appendChild(pgGrid);

// ============ RESEARCH COURSES ============
const researchTitle = document.createElement('h3');
researchTitle.className = 'category-title';
researchTitle.textContent = 'Research Programs';
researchTitle.style.fontSize = '1.5rem';
researchTitle.style.fontWeight = '700';
researchTitle.style.marginTop = '2rem';
researchTitle.style.marginBottom = '1rem';
researchTitle.style.paddingBottom = '0.5rem';
researchTitle.style.borderBottom = '2px solid var(--primary-medium-blue)';
researchTitle.style.color = 'var(--primary-dark-navy)';

const researchGrid = document.createElement('div');
researchGrid.style.display = 'grid';
researchGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
researchGrid.style.gap = '1.25rem';

// Research Courses Data
const researchCourses = [
  { name: '🔍 Ph.D', color: '#6d28d9', function: 'phd()' },
  { name: '📖 M.Phil', color: '#0f766e', function: 'mphil()' },
  { name: '🏅 DPED', color: '#047857', function: 'dped()' }
];

researchCourses.forEach(course => {
  const courseButton = document.createElement('button');
  courseButton.className = 'course-button';
  courseButton.onclick = new Function(course.function);
  courseButton.style.background = course.color;
  courseButton.style.color = 'white';
  courseButton.style.padding = '1.25rem 1.5rem';
  courseButton.style.borderRadius = '12px';
  courseButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  courseButton.style.border = 'none';
  courseButton.style.cursor = 'pointer';
  courseButton.style.transition = 'all 0.3s ease';
  courseButton.style.fontSize = '1.125rem';
  courseButton.style.fontWeight = '600';
  courseButton.style.display = 'flex';
  courseButton.style.alignItems = 'center';
  courseButton.style.justifyContent = 'center';
  courseButton.style.gap = '8px';
  courseButton.style.position = 'relative';
  courseButton.style.overflow = 'hidden';
  courseButton.textContent = course.name;

  researchGrid.appendChild(courseButton);
});

coursesSection.appendChild(researchTitle);
coursesSection.appendChild(researchGrid);

// ============ QUICK INFO SECTION ============
const infoSection = document.createElement('div');
infoSection.style.marginTop = '3rem';
infoSection.style.padding = '1.5rem';
infoSection.style.background = 'white';
infoSection.style.borderRadius = '12px';
infoSection.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
infoSection.style.border = '1px solid #f3f4f6';

const infoTitle = document.createElement('h3');
infoTitle.textContent = '📋 Course Information';
infoTitle.style.fontSize = '1.25rem';
infoTitle.style.fontWeight = 'bold';
infoTitle.style.color = '#2d3748';
infoTitle.style.marginBottom = '1rem';

const infoGrid = document.createElement('div');
infoGrid.style.display = 'grid';
infoGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
infoGrid.style.gap = '1.5rem';

// How to Use Section
const howToUse = document.createElement('div');
const howTitle = document.createElement('h4');
howTitle.textContent = 'How to Use:';
howTitle.style.fontWeight = '600';
howTitle.style.color = '#4b5563';
howTitle.style.marginBottom = '0.5rem';

const howList = document.createElement('ul');
howList.style.color = '#6b7280';
howList.style.listStyle = 'none';
howList.style.padding = '0';
howList.style.margin = '0';

const howItems = [
  '• Click on any course button to view papers',
  '• Select year and semester for papers',
  '• Download PDFs for offline study',
  '• Search within papers for specific topics'
];

howItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  listItem.style.marginBottom = '0.25rem';
  howList.appendChild(listItem);
});

howToUse.appendChild(howTitle);
howToUse.appendChild(howList);

// Features Section
const features = document.createElement('div');
const featuresTitle = document.createElement('h4');
featuresTitle.textContent = 'Features:';
featuresTitle.style.fontWeight = '600';
featuresTitle.style.color = '#4b5563';
featuresTitle.style.marginBottom = '0.5rem';

const featuresList = document.createElement('ul');
featuresList.style.color = '#6b7280';
featuresList.style.listStyle = 'none';
featuresList.style.padding = '0';
featuresList.style.margin = '0';

const featureItems = [
  '• All previous year question papers',
  '• Semester-wise organization',
  '• Mobile-friendly interface',
  '• Regular updates with new papers'
];

featureItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  listItem.style.marginBottom = '0.25rem';
  featuresList.appendChild(listItem);
});

features.appendChild(featuresTitle);
features.appendChild(featuresList);

infoGrid.appendChild(howToUse);
infoGrid.appendChild(features);
infoSection.appendChild(infoTitle);
infoSection.appendChild(infoGrid);

coursesSection.appendChild(infoSection);
main.appendChild(coursesSection);
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

// ============ COURSE FUNCTIONS ============
function btech() {
  window.location.href = "B.Tech.html";
}

function bca() {
  window.location.href = "BCA.html";
}

function bcom() {
  window.location.href = "BCom.html";
}

function bba() {
  window.location.href = "BBA.html";
}

function bsc() {
  window.location.href = "BSC.html";
}

function ba() {
  window.location.href = "BA.html";
}

function mtech() {
  window.location.href = "MTech.html";
}

function ma() {
  window.location.href = "MA.html";
}

function msc() {
  window.location.href = "MSc.html";
}

function mba() {
  window.location.href = "MBA.html";
}

function mca() {
  window.location.href = "MCA.html";
}

function mcom() {
  window.location.href = "MCom.html";
}

function bed() {
  window.location.href = "BEd.html";
}

function bhmct() {
  window.location.href = "BHMCT.html";
}

function ballb() {
  window.location.href = "BALLB.html";
}

function bjmc() {
  window.location.href = "BJMC.html";
}

function bped() {
  window.location.href = "BPED.html";
}

function dped() {
  window.location.href = "DPED.html";
}

function mpharma() {
  window.location.href = "MPharma.html";
}

function bpharmacy() {
  window.location.href = "BPharmacy.html";
}

function llb() {
  window.location.href = "LLB.html";
}

function phd() {
  window.location.href = "PHD.html";
}

function mphil() {
  window.location.href = "MPhil.html";
}

function msw() {
  window.location.href = "MSW.html";
}

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
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';

document.head.appendChild(interFont);
