// Complete app.js for Contact Page with same CSS
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

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  main {
    animation: fadeIn 0.8s ease-out;
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .contact-section { padding: 2rem 1.5rem !important; margin-top: 1.5rem !important; border-radius: 16px !important; }
    .section-title { font-size: 2rem !important; }
    .form-container { padding: 2rem 1.5rem !important; margin: 1rem !important; }
    footer { padding: 1.5rem !important; font-size: 0.9rem !important; }
  }

  @media (max-width: 480px) {
    .header-title { font-size: 1.4rem !important; }
    .logo-img { width: 45px !important; height: 45px !important; }
    .section-title { font-size: 1.8rem !important; }
    .contact-section { padding: 1.5rem 1rem !important; }
    .form-container { padding: 1.5rem 1rem !important; }
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
logoImg.alt = 'Exam Saarthi Logo';
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
  { name: 'About', href: 'About.html', active: false },
  { name: 'Contact', href: 'Contact.html', active: true }
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
marqueeContent.innerHTML = '<i class="fas fa-bullhorn mr-2"></i> Get in touch with us — We\'d love to hear from you! | Exam Saarthi - Your Complete PYQ Solution';
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

// ============ CONTACT SECTIONS ============
// Query Button Section
const contactSection1 = document.createElement('section');
contactSection1.className = 'contact-section';
contactSection1.style.maxWidth = '3xl';
contactSection1.style.width = '100%';
contactSection1.style.textAlign = 'center';
contactSection1.style.background = 'var(--gradient-card)';
contactSection1.style.borderRadius = '20px';
contactSection1.style.padding = '2.5rem';
contactSection1.style.boxShadow = 'var(--shadow-soft)';
contactSection1.style.marginTop = '2rem';
contactSection1.style.border = '1px solid rgba(255, 255, 255, 0.8)';
contactSection1.style.transition = 'all 0.4s ease';
contactSection1.style.position = 'relative';
contactSection1.style.overflow = 'hidden';

const sectionTitle1 = document.createElement('h1');
sectionTitle1.className = 'section-title';
sectionTitle1.innerHTML = '📬 Contact Us - Exam Saarthi';
sectionTitle1.style.fontSize = '2.5rem';
sectionTitle1.style.fontWeight = '900';
sectionTitle1.style.background = 'linear-gradient(135deg, var(--primary-dark-navy) 0%, var(--primary-medium-blue) 100%)';
sectionTitle1.style.WebkitBackgroundClip = 'text';
sectionTitle1.style.WebkitTextFillColor = 'transparent';
sectionTitle1.style.textAlign = 'center';
sectionTitle1.style.marginBottom = '2rem';
sectionTitle1.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

const description1 = document.createElement('p');
description1.textContent = 'Have questions, feedback, or suggestions? Click the button below to reach out to the ';
description1.style.color = '#4a5568';
description1.style.textAlign = 'center';
description1.style.marginBottom = '0.5rem';
description1.style.fontSize = '1.125rem';

const highlightSpan = document.createElement('span');
highlightSpan.textContent = 'Exam Saarthi';
highlightSpan.style.fontWeight = 'bold';
highlightSpan.style.color = '#1d4ed8';

const description2 = document.createElement('span');
description2.textContent = ' team. We\'ll get back to you as soon as possible.';

const lineBreak = document.createElement('br');

const secondLine = document.createElement('span');
secondLine.textContent = 'We\'ll get back to you as soon as possible.';
secondLine.style.display = 'block';
secondLine.style.marginTop = '0.5rem';

description1.appendChild(highlightSpan);
description1.appendChild(description2);
description1.appendChild(lineBreak);
description1.appendChild(secondLine);

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.flexDirection = 'column';
buttonContainer.style.alignItems = 'center';
buttonContainer.style.gap = '1.5rem';

const queryBtn = document.createElement('button');
queryBtn.className = 'query-btn';
queryBtn.id = 'queryBtn';
queryBtn.style.background = 'var(--gradient-accent)';
queryBtn.style.color = 'var(--primary-dark-navy)';
queryBtn.style.border = 'none';
queryBtn.style.padding = '1.2rem 2.5rem';
queryBtn.style.borderRadius = '12px';
queryBtn.style.fontWeight = '800';
queryBtn.style.fontSize = '1.2rem';
queryBtn.style.cursor = 'pointer';
queryBtn.style.transition = 'all 0.3s ease';
queryBtn.style.boxShadow = '0 8px 20px rgba(255, 193, 7, 0.4)';
queryBtn.style.display = 'flex';
queryBtn.style.alignItems = 'center';
queryBtn.style.justifyContent = 'center';
queryBtn.style.gap = '12px';
queryBtn.style.margin = '2rem auto';
queryBtn.style.position = 'relative';
queryBtn.style.overflow = 'hidden';

const queryIcon = document.createElement('i');
queryIcon.className = 'fas fa-question-circle';
const queryText = document.createTextNode(' Submit Your Query');
queryBtn.appendChild(queryIcon);
queryBtn.appendChild(queryText);

const additionalInfo = document.createElement('div');
additionalInfo.style.color = '#6b7280';
additionalInfo.style.textAlign = 'center';

const infoTitle = document.createElement('p');
infoTitle.textContent = 'Need help with PYQs?';
infoTitle.style.fontWeight = '600';
infoTitle.style.marginBottom = '0.25rem';

const infoDesc = document.createElement('p');
infoDesc.textContent = 'Tell us which university and course you need help with';

additionalInfo.appendChild(infoTitle);
additionalInfo.appendChild(infoDesc);

buttonContainer.appendChild(queryBtn);
buttonContainer.appendChild(additionalInfo);

contactSection1.appendChild(sectionTitle1);
contactSection1.appendChild(description1);
contactSection1.appendChild(buttonContainer);
main.appendChild(contactSection1);

// About Section
const aboutSection = document.createElement('section');
aboutSection.className = 'contact-section';
aboutSection.style.maxWidth = '3xl';
aboutSection.style.width = '100%';
aboutSection.style.marginTop = '2rem';
aboutSection.style.textAlign = 'center';

const sectionTitle2 = document.createElement('h2');
sectionTitle2.className = 'section-title';
sectionTitle2.innerHTML = '📍 About Exam Saarthi';
sectionTitle2.style.fontSize = '2.5rem';

const aboutText = document.createElement('p');
aboutText.innerHTML = '<strong>Exam Saarthi</strong> is your one-stop solution for all university previous year question papers (PYQs). We provide comprehensive PYQs for multiple universities to help students excel in their exams.';
aboutText.style.color = '#4a5568';
aboutText.style.marginBottom = '1.5rem';
aboutText.style.fontSize = '1.125rem';

const contactInfo = document.createElement('div');
contactInfo.className = 'contact-info';
contactInfo.style.textAlign = 'center';
contactInfo.style.margin = '1.5rem 0';

const email1 = document.createElement('p');
email1.innerHTML = '<strong>Official Email:</strong> ';
const email1Link = document.createElement('a');
email1Link.href = 'mailto:igupyq@gmail.com';
email1Link.textContent = 'igupyq@gmail.com';
email1Link.className = 'contact-link';
email1Link.style.color = 'var(--primary-medium-blue)';
email1Link.style.textDecoration = 'none';
email1Link.style.fontWeight = '700';
email1Link.style.transition = 'all 0.3s ease';
email1Link.style.display = 'inline-flex';
email1Link.style.alignItems = 'center';
email1Link.style.gap = '8px';
email1Link.style.padding = '5px 10px';
email1Link.style.borderRadius = '8px';
email1.appendChild(email1Link);

const email2 = document.createElement('p');
email2.innerHTML = '<strong>Support Email:</strong> ';
const email2Link = document.createElement('a');
email2Link.href = 'mailto:igupyq@gmail.com';
email2Link.textContent = 'igupyq.support@gmail.com';
email2Link.className = 'contact-link';
email2Link.style.color = 'var(--primary-medium-blue)';
email2Link.style.textDecoration = 'none';
email2Link.style.fontWeight = '700';
email2Link.style.transition = 'all 0.3s ease';
email2Link.style.display = 'inline-flex';
email2Link.style.alignItems = 'center';
email2Link.style.gap = '8px';
email2Link.style.padding = '5px 10px';
email2Link.style.borderRadius = '8px';
email2.appendChild(email2Link);

const socialText = document.createElement('p');
socialText.innerHTML = '<strong>Follow us:</strong> ';
const socialLink = document.createElement('a');
socialLink.href = 'https://instagram.com/velogourav';
socialLink.target = '_blank';
socialLink.textContent = '@velogourav';
socialLink.className = 'contact-link';
socialLink.style.color = 'var(--primary-medium-blue)';
socialText.appendChild(socialLink);

contactInfo.appendChild(email1);
contactInfo.appendChild(email2);
contactInfo.appendChild(socialText);

const socialLinks = document.createElement('div');
socialLinks.className = 'social-links';
socialLinks.style.display = 'flex';
socialLinks.style.justifyContent = 'center';
socialLinks.style.gap = '2rem';
socialLinks.style.marginTop = '2rem';

const socialIcons = [
  { icon: 'fas fa-envelope', href: 'mailto:igupyq@gmail.com' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com/velogourav' },
  { icon: 'fab fa-github', href: 'https://github.com/pandit777' }
];

socialIcons.forEach(social => {
  const socialAnchor = document.createElement('a');
  socialAnchor.href = social.href;
  if (social.href.startsWith('http')) socialAnchor.target = '_blank';
  socialAnchor.className = 'social-link';
  socialAnchor.style.color = 'var(--primary-medium-blue)';
  socialAnchor.style.fontSize = '2rem';
  socialAnchor.style.transition = 'all 0.3s ease';
  socialAnchor.style.background = 'var(--gradient-card)';
  socialAnchor.style.width = '60px';
  socialAnchor.style.height = '60px';
  socialAnchor.style.borderRadius = '50%';
  socialAnchor.style.display = 'flex';
  socialAnchor.style.alignItems = 'center';
  socialAnchor.style.justifyContent = 'center';
  socialAnchor.style.boxShadow = 'var(--shadow-soft)';
  
  const icon = document.createElement('i');
  icon.className = social.icon;
  socialAnchor.appendChild(icon);
  socialLinks.appendChild(socialAnchor);
});

aboutSection.appendChild(sectionTitle2);
aboutSection.appendChild(aboutText);
aboutSection.appendChild(contactInfo);
aboutSection.appendChild(socialLinks);
main.appendChild(aboutSection);

// Mobile Contact Info Section
const mobileSection = document.createElement('section');
mobileSection.className = 'contact-section floating';
mobileSection.style.maxWidth = '3xl';
mobileSection.style.width = '100%';
mobileSection.style.marginTop = '2rem';
mobileSection.style.textAlign = 'center';
mobileSection.style.display = 'none'; // Hidden on desktop, shown via media query

const sectionTitle3 = document.createElement('h2');
sectionTitle3.className = 'section-title';
sectionTitle3.innerHTML = '📱 Quick Contact';
sectionTitle3.style.fontSize = '2rem';

const quickLinks = document.createElement('div');
quickLinks.style.display = 'flex';
quickLinks.style.justifyContent = 'center';
quickLinks.style.gap = '1.5rem';
quickLinks.style.marginTop = '1.5rem';

const quickContacts = [
  { icon: 'fas fa-envelope', label: 'Email', href: 'mailto:igupyq@gmail.com', color: '#3b82f6' },
  { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://instagram.com/velogourav', color: '#ec4899' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/pandit777', color: '#6b7280' }
];

quickContacts.forEach(contact => {
  const linkContainer = document.createElement('a');
  linkContainer.href = contact.href;
  if (contact.href.startsWith('http')) linkContainer.target = '_blank';
  linkContainer.style.textAlign = 'center';
  linkContainer.style.textDecoration = 'none';
  
  const linkIcon = document.createElement('i');
  linkIcon.className = contact.icon;
  linkIcon.style.fontSize = '2.25rem';
  linkIcon.style.color = contact.color;
  linkIcon.style.marginBottom = '0.75rem';
  
  const linkLabel = document.createElement('p');
  linkLabel.textContent = contact.label;
  linkLabel.style.fontSize = '0.875rem';
  linkLabel.style.fontWeight = '600';
  linkLabel.style.color = '#4b5563';
  
  linkContainer.appendChild(linkIcon);
  linkContainer.appendChild(linkLabel);
  quickLinks.appendChild(linkContainer);
});

mobileSection.appendChild(sectionTitle3);
mobileSection.appendChild(quickLinks);
main.appendChild(mobileSection);

body.appendChild(main);

// ============ FORM OVERLAY ============
const formOverlay = document.createElement('div');
formOverlay.className = 'form-overlay';
formOverlay.id = 'formOverlay';
formOverlay.style.display = 'none';
formOverlay.style.position = 'fixed';
formOverlay.style.top = '0';
formOverlay.style.left = '0';
formOverlay.style.width = '100%';
formOverlay.style.height = '100%';
formOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
formOverlay.style.zIndex = '1000';
formOverlay.style.justifyContent = 'center';
formOverlay.style.alignItems = 'center';
formOverlay.style.backdropFilter = 'blur(5px)';

const formContainer = document.createElement('div');
formContainer.className = 'form-container';
formContainer.style.background = 'var(--gradient-card)';
formContainer.style.borderRadius = '20px';
formContainer.style.padding = '2.5rem';
formContainer.style.boxShadow = 'var(--shadow-strong)';
formContainer.style.maxWidth = '600px';
formContainer.style.width = '90%';
formContainer.style.maxHeight = '90vh';
formContainer.style.overflowY = 'auto';
formContainer.style.position = 'relative';
formContainer.style.border = '1px solid rgba(255, 255, 255, 0.8)';
formContainer.style.animation = 'modalFadeIn 0.5s ease-out';

const closeBtn = document.createElement('button');
closeBtn.className = 'close-btn';
closeBtn.id = 'closeForm';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '20px';
closeBtn.style.right = '20px';
closeBtn.style.background = 'none';
closeBtn.style.border = 'none';
closeBtn.style.fontSize = '1.8rem';
closeBtn.style.color = 'var(--text-light)';
closeBtn.style.cursor = 'pointer';
closeBtn.style.transition = 'all 0.3s ease';
closeBtn.style.background = 'rgba(0,0,0,0.1)';
closeBtn.style.width = '40px';
closeBtn.style.height = '40px';
closeBtn.style.borderRadius = '50%';
closeBtn.style.display = 'flex';
closeBtn.style.alignItems = 'center';
closeBtn.style.justifyContent = 'center';

const closeIcon = document.createElement('i');
closeIcon.className = 'fas fa-times';
closeBtn.appendChild(closeIcon);

const formTitle = document.createElement('h2');
formTitle.className = 'section-title';
formTitle.innerHTML = '📝 Contact Form';
formTitle.style.fontSize = '2rem';
formTitle.style.marginBottom = '1rem';

const formDescription = document.createElement('p');
formDescription.textContent = 'Fill out the form below and we\'ll get back to you as soon as possible.';
formDescription.style.color = '#4a5568';
formDescription.style.textAlign = 'center';
formDescription.style.marginBottom = '1.5rem';
formDescription.style.fontSize = '1.125rem';

// Contact Form
const contactForm = document.createElement('form');
contactForm.id = 'contactForm';
contactForm.style.display = 'flex';
contactForm.style.flexDirection = 'column';
contactForm.style.gap = '1.5rem';

// Name Field
const nameGroup = document.createElement('div');
const nameLabel = document.createElement('label');
nameLabel.htmlFor = 'name';
nameLabel.textContent = 'Full Name *';
nameLabel.style.display = 'block';
nameLabel.style.fontWeight = 'bold';
nameLabel.style.color = '#2d3748';
nameLabel.style.marginBottom = '0.5rem';
nameLabel.style.fontSize = '1.125rem';

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'name';
nameInput.name = 'name';
nameInput.required = true;
nameInput.style.width = '100%';
nameInput.style.border = '2px solid #d1d5db';
nameInput.style.borderRadius = '12px';
nameInput.style.padding = '1rem';
nameInput.style.outline = 'none';
nameInput.style.transition = 'all 0.3s ease';
nameInput.placeholder = 'Enter your full name';

nameGroup.appendChild(nameLabel);
nameGroup.appendChild(nameInput);

// Email Field
const emailGroup = document.createElement('div');
const emailLabel = document.createElement('label');
emailLabel.htmlFor = 'email';
emailLabel.textContent = 'Email Address *';
emailLabel.style.display = 'block';
emailLabel.style.fontWeight = 'bold';
emailLabel.style.color = '#2d3748';
emailLabel.style.marginBottom = '0.5rem';
emailLabel.style.fontSize = '1.125rem';

const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.id = 'email';
emailInput.name = 'email';
emailInput.required = true;
emailInput.style.width = '100%';
emailInput.style.border = '2px solid #d1d5db';
emailInput.style.borderRadius = '12px';
emailInput.style.padding = '1rem';
emailInput.style.outline = 'none';
emailInput.style.transition = 'all 0.3s ease';
emailInput.placeholder = 'Enter your email address';

emailGroup.appendChild(emailLabel);
emailGroup.appendChild(emailInput);

// University Field
const universityGroup = document.createElement('div');
const universityLabel = document.createElement('label');
universityLabel.htmlFor = 'university';
universityLabel.textContent = 'University *';
universityLabel.style.display = 'block';
universityLabel.style.fontWeight = 'bold';
universityLabel.style.color = '#2d3748';
universityLabel.style.marginBottom = '0.5rem';
universityLabel.style.fontSize = '1.125rem';

const universitySelect = document.createElement('select');
universitySelect.id = 'university';
universitySelect.name = 'university';
universitySelect.required = true;
universitySelect.style.width = '100%';
universitySelect.style.border = '2px solid #d1d5db';
universitySelect.style.borderRadius = '12px';
universitySelect.style.padding = '1rem';
universitySelect.style.outline = 'none';
universitySelect.style.transition = 'all 0.3s ease';
universitySelect.style.background = 'white';
universitySelect.style.appearance = 'none';
universitySelect.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%231a237e%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22%3E%3C/path%3E%3C/svg%3E")';
universitySelect.style.backgroundRepeat = 'no-repeat';
universitySelect.style.backgroundPosition = 'right 1rem center';
universitySelect.style.backgroundSize = '1.5em 1.5em';
universitySelect.style.paddingRight = '3rem';

const universityOptions = [
  { value: '', text: 'Select your university', disabled: true, selected: true },
  { value: 'IGU', text: 'Indira Gandhi University (IGU)' },
  { value: 'DU', text: 'Delhi University (DU)' },
  { value: 'PU', text: 'Punjab University (PU)' },
  { value: 'MU', text: 'Mumbai University (MU)' },
  { value: 'CU', text: 'Calcutta University (CU)' },
  { value: 'BU', text: 'Bangalore University (BU)' },
  { value: 'AU', text: 'Anna University (AU)' },
  { value: 'Other', text: 'Other University' }
];

universityOptions.forEach(option => {
  const optionElement = document.createElement('option');
  optionElement.value = option.value;
  optionElement.textContent = option.text;
  if (option.disabled) optionElement.disabled = true;
  if (option.selected) optionElement.selected = true;
  universitySelect.appendChild(optionElement);
});

universityGroup.appendChild(universityLabel);
universityGroup.appendChild(universitySelect);

// Course Field
const courseGroup = document.createElement('div');
const courseLabel = document.createElement('label');
courseLabel.htmlFor = 'course';
courseLabel.textContent = 'Course/Subject';
courseLabel.style.display = 'block';
courseLabel.style.fontWeight = 'bold';
courseLabel.style.color = '#2d3748';
courseLabel.style.marginBottom = '0.5rem';
courseLabel.style.fontSize = '1.125rem';

const courseInput = document.createElement('input');
courseInput.type = 'text';
courseInput.id = 'course';
courseInput.name = 'course';
courseInput.style.width = '100%';
courseInput.style.border = '2px solid #d1d5db';
courseInput.style.borderRadius = '12px';
courseInput.style.padding = '1rem';
courseInput.style.outline = 'none';
courseInput.style.transition = 'all 0.3s ease';
courseInput.placeholder = 'e.g., B.Tech CSE, B.Com, M.A. English, etc.';

courseGroup.appendChild(courseLabel);
courseGroup.appendChild(courseInput);

// Message Field
const messageGroup = document.createElement('div');
const messageLabel = document.createElement('label');
messageLabel.htmlFor = 'message';
messageLabel.textContent = 'Your Message *';
messageLabel.style.display = 'block';
messageLabel.style.fontWeight = 'bold';
messageLabel.style.color = '#2d3748';
messageLabel.style.marginBottom = '0.5rem';
messageLabel.style.fontSize = '1.125rem';

const messageTextarea = document.createElement('textarea');
messageTextarea.id = 'message';
messageTextarea.name = 'message';
messageTextarea.rows = 6;
messageTextarea.required = true;
messageTextarea.style.width = '100%';
messageTextarea.style.border = '2px solid #d1d5db';
messageTextarea.style.borderRadius = '12px';
messageTextarea.style.padding = '1rem';
messageTextarea.style.outline = 'none';
messageTextarea.style.transition = 'all 0.3s ease';
messageTextarea.style.resize = 'vertical';
messageTextarea.placeholder = 'Please describe your query in detail...';

messageGroup.appendChild(messageLabel);
messageGroup.appendChild(messageTextarea);

// Required Fields Note
const requiredNote = document.createElement('div');
requiredNote.style.fontSize = '0.875rem';
requiredNote.style.color = '#6b7280';
const requiredText = document.createElement('p');
requiredText.innerHTML = '<span style="color: #ef4444;">*</span> Required fields';
requiredNote.appendChild(requiredText);

// Submit Button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.style.width = '100%';
submitButton.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
submitButton.style.color = 'white';
submitButton.style.fontWeight = 'bold';
submitButton.style.padding = '1rem';
submitButton.style.borderRadius = '12px';
submitButton.style.border = 'none';
submitButton.style.cursor = 'pointer';
submitButton.style.transition = 'all 0.3s ease';
submitButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
submitButton.textContent = 'Send Message';

// Assemble Form
contactForm.appendChild(nameGroup);
contactForm.appendChild(emailGroup);
contactForm.appendChild(universityGroup);
contactForm.appendChild(courseGroup);
contactForm.appendChild(messageGroup);
contactForm.appendChild(requiredNote);
contactForm.appendChild(submitButton);

// Assemble Form Container
formContainer.appendChild(closeBtn);
formContainer.appendChild(formTitle);
formContainer.appendChild(formDescription);
formContainer.appendChild(contactForm);
formOverlay.appendChild(formContainer);
body.appendChild(formOverlay);

// ============ SUCCESS MODAL ============
const successModal = document.createElement('div');
successModal.className = 'success-modal';
successModal.id = 'successModal';
successModal.style.display = 'none';
successModal.style.position = 'fixed';
successModal.style.top = '0';
successModal.style.left = '0';
successModal.style.width = '100%';
successModal.style.height = '100%';
successModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
successModal.style.zIndex = '1000';
successModal.style.justifyContent = 'center';
successModal.style.alignItems = 'center';
successModal.style.backdropFilter = 'blur(5px)';

const successContent = document.createElement('div');
successContent.className = 'success-content';
successContent.style.background = 'var(--gradient-card)';
successContent.style.padding = '3rem';
successContent.style.borderRadius = '16px';
successContent.style.textAlign = 'center';
successContent.style.maxWidth = '400px';
successContent.style.width = '90%';
successContent.style.boxShadow = 'var(--shadow-strong)';
successContent.style.animation = 'modalFadeIn 0.5s ease-out';
successContent.style.border = '1px solid rgba(255, 255, 255, 0.8)';

const successIcon = document.createElement('div');
successIcon.className = 'success-icon';
successIcon.style.fontSize = '4rem';
successIcon.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
successIcon.style.WebkitBackgroundClip = 'text';
successIcon.style.WebkitTextFillColor = 'transparent';
successIcon.style.marginBottom = '1.5rem';

const successIconInner = document.createElement('i');
successIconInner.className = 'fas fa-check-circle';
successIcon.appendChild(successIconInner);

const successTitle = document.createElement('h2');
successTitle.textContent = 'Message Sent!';
successTitle.style.fontSize = '1.875rem';
successTitle.style.fontWeight = 'bold';
successTitle.style.color = '#2d3748';
successTitle.style.marginBottom = '0.75rem';

const successMessage = document.createElement('p');
successMessage.textContent = 'Thank you for contacting Exam Saarthi. We\'ll get back to you soon.';
successMessage.style.color = '#6b7280';
successMessage.style.marginBottom = '1.5rem';
successMessage.style.fontSize = '1.125rem';

const continueBtn = document.createElement('button');
continueBtn.className = 'continue-btn';
continueBtn.id = 'continueBtn';
continueBtn.style.background = 'var(--gradient-accent)';
continueBtn.style.color = 'var(--primary-dark-navy)';
continueBtn.style.border = 'none';
continueBtn.style.padding = '1rem 2rem';
continueBtn.style.borderRadius = '12px';
continueBtn.style.fontWeight = '800';
continueBtn.style.cursor = 'pointer';
continueBtn.style.marginTop = '1.5rem';
continueBtn.style.transition = 'all 0.3s ease';
continueBtn.style.boxShadow = '0 6px 15px rgba(255, 193, 7, 0.4)';
continueBtn.style.position = 'relative';
continueBtn.style.overflow = 'hidden';
continueBtn.textContent = 'Continue...';

successContent.appendChild(successIcon);
successContent.appendChild(successTitle);
successContent.appendChild(successMessage);
successContent.appendChild(continueBtn);
successModal.appendChild(successContent);
body.appendChild(successModal);

// ============ FOOTER ============
const footer = document.createElement('footer');
footer.innerHTML = '&copy; 2025 Exam Saarthi | Designed by Gourav Sharma';
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
// API configuration
const API_CONFIG = {
  accessKey: '26135714-726d-4de7-8d51-e9900e9f1f5d',
  endpoint: 'https://api.web3forms.com/submit'
};

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
    mobileSection.style.display = 'block';
  } else {
    mobileMenuBtn.style.display = 'none';
    desktopNav.style.display = 'flex';
    mobileNav.style.display = 'none';
    mobileSection.style.display = 'none';
    menuIcon.className = 'fas fa-bars';
  }
}

// Initial check
checkMobileViewport();
window.addEventListener('resize', checkMobileViewport);

// Query Button - Open Form Overlay
queryBtn.addEventListener('click', function() {
  formOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Close Form Overlay
closeBtn.addEventListener('click', function() {
  formOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close overlay when clicking outside the form
formOverlay.addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form submission handling
contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Basic validation
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const university = universitySelect.value;
  const message = messageTextarea.value.trim();
  
  if (!name || !email || !university || !message) {
    showError('Please fill all required fields');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }
  
  const formData = new FormData(this);
  formData.append('access_key', API_CONFIG.accessKey);
  formData.append('subject', `Exam Saarthi Query - ${universitySelect.options[universitySelect.selectedIndex].text}`);
  
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  try {
    const response = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      formOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
      successModal.style.display = 'flex';
      contactForm.reset();
    } else {
      showError('There was an error sending your message. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('There was an error sending your message. Please try again.');
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});

// Email validation function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Error display function
function showError(message) {
  // Remove any existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.background = '#fee2e2';
  errorDiv.style.color = '#b91c1c';
  errorDiv.style.padding = '1rem';
  errorDiv.style.borderRadius = '0.5rem';
  errorDiv.style.marginBottom = '1rem';
  errorDiv.style.borderLeft = '4px solid #dc2626';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
  
  // Insert after form title
  const formContainer = document.querySelector('.form-container');
  const formTitle = document.querySelector('.form-container .section-title');
  formContainer.insertBefore(errorDiv, formTitle.nextElementSibling);
  
  // Scroll to error
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Remove after 5 seconds
  setTimeout(() => errorDiv.remove(), 5000);
}

// Continue button functionality
continueBtn.addEventListener('click', function() {
  successModal.style.display = 'none';
  window.location.href = 'index.html';
});

// Close modal when clicking outside
successModal.addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Add animation to elements on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const sections = document.querySelectorAll('.contact-section');
    sections.forEach((section, index) => {
      section.style.animationDelay = `${index * 0.2}s`;
    });
  }, 300);
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