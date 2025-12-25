// Complete app.js for About Page with same CSS
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

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .about-section { padding: 1.5rem !important; margin-top: 1rem !important; }
    .section-title { font-size: 1.8rem !important; }
    footer { padding: 1.5rem !important; font-size: 0.9rem !important; }
  }

  @media (max-width: 480px) {
    .header-title { font-size: 1.4rem !important; }
    .logo-img { width: 45px !important; height: 45px !important; }
    .about-section { padding: 1.2rem !important; }
    .section-title { font-size: 1.6rem !important; }
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
logoArea.href = '/';
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
  { name: 'Home', href: 'index.html', active: false },
  { name: 'Universities', href: 'University.html', active: false },
  { name: 'About', href: 'About.html', active: true },
  { name: 'Contact', href: 'Contact.html', active: false }
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
marqueeContent.innerHTML = '<i class="fas fa-bullhorn mr-2"></i> Welcome to the University PYQ Portal - Your Gateway to Academic Excellence for All Universities!';
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
main.style.display = 'flex';
main.style.flexDirection = 'column';
main.style.alignItems = 'center';

// Back to Home Button
const backHomeDiv = document.createElement('div');
backHomeDiv.style.maxWidth = '6xl';
backHomeDiv.style.width = '100%';
backHomeDiv.style.marginBottom = '1.5rem';
backHomeDiv.style.textAlign = 'left';

const backHomeBtn = document.createElement('a');
backHomeBtn.href = 'University.html';
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

// ============ ABOUT CONTENT ============
// About Section 1
const aboutSection1 = document.createElement('section');
aboutSection1.className = 'about-section content-section';
aboutSection1.style.maxWidth = '4xl';
aboutSection1.style.textAlign = 'center';
aboutSection1.style.background = 'var(--gradient-card)';
aboutSection1.style.borderRadius = '20px';
aboutSection1.style.padding = '2.5rem';
aboutSection1.style.boxShadow = 'var(--shadow-soft)';
aboutSection1.style.marginTop = '2rem';
aboutSection1.style.border = '1px solid rgba(255, 255, 255, 0.8)';
aboutSection1.style.transition = 'all 0.4s ease';
aboutSection1.style.position = 'relative';
aboutSection1.style.overflow = 'hidden';

const sectionTitle1 = document.createElement('h1');
sectionTitle1.className = 'section-title';
sectionTitle1.textContent = 'About University PYQ Portal';
sectionTitle1.style.fontSize = '2.2rem';
sectionTitle1.style.fontWeight = '800';
sectionTitle1.style.color = 'var(--primary-dark-navy)';
sectionTitle1.style.marginBottom = '1.5rem';
sectionTitle1.style.textAlign = 'center';

const para1 = document.createElement('p');
para1.className = 'text-gray-700 leading-relaxed text-lg';
para1.innerHTML = '<span class="highlight">University PYQ Portal</span> is a student-driven initiative created to help university students access previous year question papers (PYQs) for all programs — undergraduate, postgraduate, and research — in one organized place.';
para1.style.color = '#4a5568';
para1.style.lineHeight = '1.8';

const para2 = document.createElement('p');
para2.className = 'text-gray-700 leading-relaxed text-lg mt-4';
para2.textContent = 'We aim to simplify the process of finding study materials and provide a digital space for academic preparation that\'s fast, free, and reliable.';
para2.style.color = '#4a5568';
para2.style.lineHeight = '1.8';
para2.style.marginTop = '1rem';

aboutSection1.appendChild(sectionTitle1);
aboutSection1.appendChild(para1);
aboutSection1.appendChild(para2);
main.appendChild(aboutSection1);

// Mission Section
const missionSection = document.createElement('section');
missionSection.className = 'about-section content-section';
missionSection.style.maxWidth = '4xl';
missionSection.style.marginTop = '2rem';

const missionTitle = document.createElement('h2');
missionTitle.className = 'section-title';
missionTitle.innerHTML = '🎯 Our Vision & Mission';
missionTitle.style.fontSize = '2rem';

const missionGrid = document.createElement('div');
missionGrid.style.display = 'grid';
missionGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
missionGrid.style.gap = '1.5rem';
missionGrid.style.marginTop = '1.5rem';

// Vision Card
const visionCard = document.createElement('div');
visionCard.className = 'team-member';
visionCard.style.textAlign = 'center';
visionCard.style.padding = '1.5rem';
visionCard.style.background = 'white';
visionCard.style.borderRadius = '16px';
visionCard.style.boxShadow = 'var(--shadow-soft)';
visionCard.style.transition = 'all 0.3s ease';

const visionIcon = document.createElement('i');
visionIcon.className = 'fas fa-bullseye feature-icon';
visionIcon.style.fontSize = '3rem';
visionIcon.style.marginBottom = '1.5rem';
visionIcon.style.background = 'var(--gradient-primary)';
visionIcon.style.WebkitBackgroundClip = 'text';
visionIcon.style.WebkitTextFillColor = 'transparent';
visionIcon.style.display = 'inline-block';

const visionHeading = document.createElement('h3');
visionHeading.textContent = 'Our Vision';
visionHeading.style.fontSize = '1.25rem';
visionHeading.style.fontWeight = 'bold';
visionHeading.style.color = '#2d3748';
visionHeading.style.marginBottom = '0.75rem';

const visionText = document.createElement('p');
visionText.textContent = 'To become the most trusted platform for university students to access academic resources and enhance their learning experience.';
visionText.style.color = '#718096';

visionCard.appendChild(visionIcon);
visionCard.appendChild(visionHeading);
visionCard.appendChild(visionText);

// Mission Card
const missionCard = document.createElement('div');
missionCard.className = 'team-member';
missionCard.style.textAlign = 'center';
missionCard.style.padding = '1.5rem';
missionCard.style.background = 'white';
missionCard.style.borderRadius = '16px';
missionCard.style.boxShadow = 'var(--shadow-soft)';
missionCard.style.transition = 'all 0.3s ease';

const missionIcon = document.createElement('i');
missionIcon.className = 'fas fa-flag feature-icon';
missionIcon.style.fontSize = '3rem';
missionIcon.style.marginBottom = '1.5rem';

const missionHeading = document.createElement('h3');
missionHeading.textContent = 'Our Mission';
missionHeading.style.fontSize = '1.25rem';
missionHeading.style.fontWeight = 'bold';
missionHeading.style.color = '#2d3748';
missionHeading.style.marginBottom = '0.75rem';

const missionTextPara = document.createElement('p');
missionTextPara.textContent = 'To empower students with easy access to quality study materials and promote smart digital learning across all universities.';
missionTextPara.style.color = '#718096';

missionCard.appendChild(missionIcon);
missionCard.appendChild(missionHeading);
missionCard.appendChild(missionTextPara);

missionGrid.appendChild(visionCard);
missionGrid.appendChild(missionCard);

// Mission List
const missionList = document.createElement('div');
missionList.style.marginTop = '2rem';

const missionItems = [
  'To make university students\' learning experience more efficient and accessible',
  'To create a centralized platform for all course-related PYQs and resources',
  'To promote smart and digital learning within the university community',
  'To ensure that every student can access the right materials without any cost'
];

const list = document.createElement('ul');
list.style.listStyle = 'none';
list.style.padding = '0';

missionItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.style.display = 'flex';
  listItem.style.alignItems = 'flex-start';
  listItem.style.marginBottom = '0.75rem';
  
  const checkIcon = document.createElement('i');
  checkIcon.className = 'fas fa-check-circle';
  checkIcon.style.color = '#10b981';
  checkIcon.style.marginTop = '0.25rem';
  checkIcon.style.marginRight = '0.75rem';
  
  const itemText = document.createElement('span');
  itemText.textContent = item;
  itemText.style.color = '#4a5568';
  
  listItem.appendChild(checkIcon);
  listItem.appendChild(itemText);
  list.appendChild(listItem);
});

missionList.appendChild(list);

missionSection.appendChild(missionTitle);
missionSection.appendChild(missionGrid);
missionSection.appendChild(missionList);
main.appendChild(missionSection);

// Team Section
const teamSection = document.createElement('section');
teamSection.className = 'about-section content-section';
teamSection.style.maxWidth = '4xl';
teamSection.style.marginTop = '2rem';
teamSection.style.textAlign = 'center';

const teamTitle = document.createElement('h2');
teamTitle.className = 'section-title';
teamTitle.innerHTML = '💻 Our Team';
teamTitle.style.fontSize = '2rem';

const teamIntro = document.createElement('p');
teamIntro.className = 'text-gray-700 text-lg mb-8';
teamIntro.innerHTML = 'The <span class="highlight">University PYQ Portal</span> is developed and maintained by passionate students and tech enthusiasts who believe in open access to education.';
teamIntro.style.color = '#4a5568';
teamIntro.style.fontSize = '1.125rem';
teamIntro.style.marginBottom = '2rem';

const teamGrid = document.createElement('div');
teamGrid.style.display = 'grid';
teamGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
teamGrid.style.gap = '2rem';
teamGrid.style.marginTop = '1.5rem';

// Team Member 1
const teamMember1 = document.createElement('div');
teamMember1.className = 'team-member';

const member1Avatar = document.createElement('div');
member1Avatar.style.width = '6rem';
member1Avatar.style.height = '6rem';
member1Avatar.style.margin = '0 auto 1rem auto';
member1Avatar.style.borderRadius = '50%';
member1Avatar.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
member1Avatar.style.display = 'flex';
member1Avatar.style.alignItems = 'center';
member1Avatar.style.justifyContent = 'center';
member1Avatar.style.color = 'white';
member1Avatar.style.fontSize = '1.875rem';
member1Avatar.style.fontWeight = 'bold';
member1Avatar.textContent = 'GS';

const member1Name = document.createElement('h3');
member1Name.className = 'member-name';
member1Name.textContent = 'Gourav Sharma';
member1Name.style.fontSize = '1.2rem';
member1Name.style.fontWeight = '700';
member1Name.style.color = 'var(--primary-dark-navy)';
member1Name.style.marginTop = '1rem';

const member1Role = document.createElement('p');
member1Role.className = 'member-role';
member1Role.textContent = 'Developer & Founder';
member1Role.style.color = 'var(--text-light)';
member1Role.style.fontSize = '0.9rem';

const member1Desc = document.createElement('p');
member1Desc.textContent = 'Passionate about creating educational tools that make learning accessible to all students.';
member1Desc.style.color = '#718096';
member1Desc.style.fontSize = '0.875rem';
member1Desc.style.marginTop = '0.75rem';

teamMember1.appendChild(member1Avatar);
teamMember1.appendChild(member1Name);
teamMember1.appendChild(member1Role);
teamMember1.appendChild(member1Desc);

// Team Member 2
const teamMember2 = document.createElement('div');
teamMember2.className = 'team-member';

const member2Avatar = document.createElement('div');
member2Avatar.style.width = '6rem';
member2Avatar.style.height = '6rem';
member2Avatar.style.margin = '0 auto 1rem auto';
member2Avatar.style.borderRadius = '50%';
member2Avatar.style.background = 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)';
member2Avatar.style.display = 'flex';
member2Avatar.style.alignItems = 'center';
member2Avatar.style.justifyContent = 'center';
member2Avatar.style.color = 'white';
member2Avatar.style.fontSize = '1.875rem';
member2Avatar.style.fontWeight = 'bold';
member2Avatar.textContent = 'MV';

const member2Name = document.createElement('h3');
member2Name.className = 'member-name';
member2Name.textContent = 'Mahesh Verma';
member2Name.style.fontSize = '1.2rem';
member2Name.style.fontWeight = '700';
member2Name.style.color = 'var(--primary-dark-navy)';
member2Name.style.marginTop = '1rem';

const member2Role = document.createElement('p');
member2Role.className = 'member-role';
member2Role.textContent = 'Developer & Founder';
member2Role.style.color = 'var(--text-light)';
member2Role.style.fontSize = '0.9rem';

const member2Desc = document.createElement('p');
member2Desc.textContent = 'Dedicated to curating and organizing academic content for maximum student benefit.';
member2Desc.style.color = '#718096';
member2Desc.style.fontSize = '0.875rem';
member2Desc.style.marginTop = '0.75rem';

teamMember2.appendChild(member2Avatar);
teamMember2.appendChild(member2Name);
teamMember2.appendChild(member2Role);
teamMember2.appendChild(member2Desc);

teamGrid.appendChild(teamMember1);
teamGrid.appendChild(teamMember2);

// Goal Box
const goalBox = document.createElement('div');
goalBox.style.marginTop = '2rem';
goalBox.style.padding = '1rem';
goalBox.style.backgroundColor = '#dbeafe';
goalBox.style.borderRadius = '0.5rem';
goalBox.style.border = '1px solid #bfdbfe';

const goalText = document.createElement('p');
goalText.innerHTML = '<strong>Goal:</strong> To make quality study materials available to every student in a clean, modern, and user-friendly interface.';
goalText.style.color = '#1e40af';

goalBox.appendChild(goalText);

teamSection.appendChild(teamTitle);
teamSection.appendChild(teamIntro);
teamSection.appendChild(teamGrid);
teamSection.appendChild(goalBox);
main.appendChild(teamSection);

// Features Section
const featuresSection = document.createElement('section');
featuresSection.className = 'about-section content-section';
featuresSection.style.maxWidth = '4xl';
featuresSection.style.marginTop = '2rem';

const featuresTitle = document.createElement('h2');
featuresTitle.className = 'section-title';
featuresTitle.innerHTML = '✨ Why Choose Us?';
featuresTitle.style.fontSize = '2rem';

const featuresGrid = document.createElement('div');
featuresGrid.style.display = 'grid';
featuresGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
featuresGrid.style.gap = '1.5rem';
featuresGrid.style.marginTop = '1.5rem';

const features = [
  { icon: 'fas fa-university', title: 'Multiple Universities', desc: 'PYQs from various universities in one platform', color: '#3b82f6' },
  { icon: 'fas fa-mobile-alt', title: 'Mobile Friendly', desc: 'Access your papers anytime, anywhere', color: '#10b981' },
  { icon: 'fas fa-lock-open', title: 'Completely Free', desc: 'No charges, no subscriptions', color: '#8b5cf6' }
];

features.forEach(feature => {
  const featureCard = document.createElement('div');
  featureCard.style.textAlign = 'center';
  featureCard.style.padding = '1rem';
  
  const featureIcon = document.createElement('i');
  featureIcon.className = feature.icon;
  featureIcon.style.fontSize = '2.5rem';
  featureIcon.style.color = feature.color;
  featureIcon.style.marginBottom = '0.75rem';
  
  const featureTitle = document.createElement('h3');
  featureTitle.textContent = feature.title;
  featureTitle.style.fontSize = '1.125rem';
  featureTitle.style.fontWeight = 'bold';
  featureTitle.style.color = '#2d3748';
  featureTitle.style.marginBottom = '0.5rem';
  
  const featureDesc = document.createElement('p');
  featureDesc.textContent = feature.desc;
  featureDesc.style.color = '#718096';
  
  featureCard.appendChild(featureIcon);
  featureCard.appendChild(featureTitle);
  featureCard.appendChild(featureDesc);
  featuresGrid.appendChild(featureCard);
});

featuresSection.appendChild(featuresTitle);
featuresSection.appendChild(featuresGrid);
main.appendChild(featuresSection);

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
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
document.head.appendChild(interFont);