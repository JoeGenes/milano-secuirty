export const COMPANY_INFO = {
  brelaName: "MILANO SECURITY SERVICE LIMITED",
  brandName: "MILANO SECURITY",
  tradingName: "MILANO SECURITY SERVICES LIMITED",
  slogan: "Reliable Security. Trusted Protection.",
  secondarySlogan: "Securing People, Property and Peace of Mind",
  incorporationDate: "21 January 2022",
  companyNumber: "154815619",
  tin: "154-815-619",
  vrn: "40-324475-H",
  nssf: "1045350",
  wcf: "042953",
  pdpc: "0-000-010-187",
  pdpcValidity: "20 May 2031",
  policeAuthorisation: "18 January 2022",
  businessLicence: "Dodoma City Council (Issued 25 Feb 2026, Expires 24 Feb 2027)",
  postalAddress: "P.O. Box 1249, Dodoma, Tanzania",
  headquarters: "Hazina Ward, Kinyambwa Road, Dodoma, Tanzania",
  branches: [
    { city: "Dodoma (HQ)", address: "Hazina Ward, Kinyambwa Road / Kizota-Bwawani, Dodoma" },
    { city: "Bariadi (Simiyu)", address: "Sima Juu, Bariadi, Simiyu Region" },
    { city: "Dar es Salaam", address: "Commercial Service Hub, Dar es Salaam" },
    { city: "Mwanza", address: "Lake Zone Operational Hub, Mwanza" }
  ],
  telephones: ["+255 685 302 141", "+255 758 556 355", "+255 713 963 520"],
  whatsApp: "+255 758 556 355",
  emails: ["info@milanosecurity.co.tz", "sales@milanosecurity.co.tz"],
  dpoEmail: "dpo@milanosecurity.co.tz",
  emergencyHotline: "+255 758 556 355",
  
  vision: "To be a trusted and reliable security service provider in every community we serve.",
  mission: "To provide professional, responsive and technology-enabled security services that consistently exceed customer expectations.",
  
  coreValues: [
    { title: "Integrity", desc: "We conduct our work honestly and ethically." },
    { title: "Vigilance", desc: "We remain observant, prepared and responsive." },
    { title: "Professionalism", desc: "We maintain high standards of conduct and service." },
    { title: "Reliability", desc: "Customers can depend on us to fulfil agreed responsibilities." },
    { title: "Confidentiality", desc: "We protect customer information and security arrangements." },
    { title: "Accountability", desc: "We take responsibility for our actions and performance." },
    { title: "Customer Focus", desc: "We design solutions around each customer’s risks and needs." },
    { title: "Teamwork", desc: "We work together to provide coordinated protection." }
  ],

  profileText: `Milano Security Service Limited is a wholly Tanzanian-owned private security company incorporated in January 2022. The company provides professional guarding and integrated electronic security solutions to residential, commercial and industrial customers. Its services include manned guarding, mobile patrols, CCTV systems, access-control systems, anti-intruder alarms, fire-safety systems, electric fencing, metal detection, vehicle-search equipment and trained security dogs with qualified handlers. With its principal operations in Dodoma and reported coverage across twelve regions of Tanzania, Milano Security is committed to protecting people, property and organisations through trained personnel, responsive service and modern security technology.`
};

export const SERVICES = [
  {
    id: "manned-guarding",
    title: "Manned Guarding",
    icon: "ShieldCheck",
    shortDesc: "Vetted, trained, and uniformed physical security guards tailored to site risks.",
    fullDesc: "Provision of vetted, trained and uniformed security guards for residential, commercial and industrial premises. Services are custom-designed around an approved site risk assessment and specific customer requirements.",
    features: ["Background-vetted guards", "24/7 Supervisor monitoring", "Strict access protocols", "Incident logging"],
    category: "Physical Security"
  },
  {
    id: "mobile-patrol",
    title: "Mobile Patrol & Response",
    icon: "Car",
    shortDesc: "Scheduled and unscheduled mobile inspections and rapid response support.",
    fullDesc: "Scheduled and unscheduled patrols, property inspections and emergency response support using dedicated branded patrol vehicles. Continuous GPS tracking and prompt local dispatch.",
    features: ["Branded patrol vehicles", "Rapid emergency response", "Check-in log reporting", "Random night sweeps"],
    category: "Physical Security"
  },
  {
    id: "cctv-systems",
    title: "CCTV Systems",
    icon: "Camera",
    shortDesc: "Supply, installation, remote viewing, and maintenance of high-definition surveillance.",
    fullDesc: "Site assessment, supply, installation, configuration and maintenance of CCTV systems, including authorized mobile and desktop remote viewing solutions. Available for outright purchase or long-term rental.",
    features: ["Night vision & AI detection", "Authorized remote mobile viewing", "Cloud & NVR storage", "System maintenance"],
    category: "Electronic Security"
  },
  {
    id: "access-control",
    title: "Access-Control Systems",
    icon: "KeyRound",
    shortDesc: "Biometric, card, keypad, and smart gate access management.",
    fullDesc: "Installation and servicing of fingerprint, card, RFID, keypad, and password-based access-control systems for managing entry into sensitive or restricted premises.",
    features: ["Biometric & RFID access", "Time & attendance logs", "Turnstiles & boom barriers", "Visitor management"],
    category: "Electronic Security"
  },
  {
    id: "intruder-alarms",
    title: "Intruder Alarm Systems",
    icon: "BellRing",
    shortDesc: "GSM-enabled intruder detection, motion sensors, and instant alert systems.",
    fullDesc: "Installation of control panels, motion sensors, magnetic door contacts, panic buttons and GSM-enabled alert systems for homes, retail stores, and offices.",
    features: ["Instant GSM SMS/Call alerts", "Dual-tech motion sensors", "Wireless panic buttons", "24/7 central monitoring linkage"],
    category: "Electronic Security"
  },
  {
    id: "electric-fencing",
    title: "Electric Fencing",
    icon: "Zap",
    shortDesc: "High-voltage perimeter energizers, alarm integration, and physical barriers.",
    fullDesc: "Supply, installation and maintenance of heavy-duty electric fence systems for controlled perimeter protection with integrated audio-visual siren alerts.",
    features: ["Multi-strand high-tensile wire", "Perimeter zone alarm integration", "Solar & battery backup", "Anti-tamper sensors"],
    category: "Perimeter Protection"
  },
  {
    id: "fire-safety",
    title: "Fire Alarms & Extinguishers",
    icon: "Flame",
    shortDesc: "Fire alarm supply, smoke detectors, and certified extinguisher servicing.",
    fullDesc: "Supply, installation and routine servicing of smoke detectors, fire alarm panels, heat sensors, and portable fire extinguishers for residential, commercial and industrial customers.",
    features: ["Certified fire extinguishers", "Automatic smoke detectors", "Routine pressure testing", "Compliance inspection"],
    category: "Fire & Safety"
  },
  {
    id: "fire-training",
    title: "Fire-Safety Training",
    icon: "GraduationCap",
    shortDesc: "Staff fire awareness, emergency evacuation drills, and extinguisher usage.",
    fullDesc: "Basic fire-awareness, emergency evacuation planning, and practical extinguisher-use training delivered to corporate and industrial staff teams.",
    features: ["Practical extinguisher use", "Evacuation plan design", "Fire risk awareness", "Certificates of completion"],
    category: "Fire & Safety"
  },
  {
    id: "k9-services",
    title: "K9 Security Services",
    icon: "Dog",
    shortDesc: "Trained security dogs with certified handlers for high-security environments.",
    fullDesc: "Provision of highly trained security dogs (German Shepherds, Malinois) with qualified handlers for perimeter patrols, warehouses, event protection, and high-risk facilities.",
    features: ["Certified dog handlers", "Night perimeter patrols", "Deterrence & tracking", "Regular veterinary checks"],
    category: "Specialized Security"
  },
  {
    id: "dog-training",
    title: "Dog Training Services",
    icon: "Award",
    shortDesc: "Professional obedience and protection dog training programs.",
    fullDesc: "Professional dog training delivered by experienced instructors for private owners, corporate security dogs, and working breeds.",
    features: ["Obedience training", "Guard & protection training", "Handler instruction", "Behavioral assessment"],
    category: "Specialized Security"
  },
  {
    id: "metal-detection",
    title: "Metal Detection Screening",
    icon: "Scan",
    shortDesc: "Walk-through screening portals and hand-held metal detectors.",
    fullDesc: "Supply and deployment of walk-through metal detection gates and ergonomic hand-held scanners for entry screening at corporate headquarters, events, and airports.",
    features: ["Walk-through archways", "Hand-held scanners", "Calibrated sensitivity", "Flow rate management"],
    category: "Screening Equipment"
  },
  {
    id: "vehicle-search",
    title: "Vehicle Search Mirrors",
    icon: "Search",
    shortDesc: "Underbody vehicle inspection mirrors and screening tools.",
    fullDesc: "Provision of high-clarity underbody vehicle search mirrors with LED lighting and under-carriage inspection solutions for checkpoint access control.",
    features: ["Convex inspection mirrors", "Built-in LED illumination", "Telescopic handles", "Heavy-duty durability"],
    category: "Screening Equipment"
  },
  {
    id: "guard-patrol",
    title: "Guard Patrol Systems",
    icon: "Clock",
    shortDesc: "Electronic RFID checkpoint logging for verified guard rounds.",
    fullDesc: "Electronic patrol-monitoring systems utilizing RFID wands and GPS logging to record guard inspection rounds in real-time, ensuring maximum guard accountability.",
    features: ["RFID checkpoint tags", "Tamper-proof guard wands", "Automated patrol logs", "Real-time supervisor reporting"],
    category: "Accountability Tools"
  }
];

export const COVERAGE_REGIONS = [
  { name: "Dodoma", status: "Headquarters & Central Hub", details: "Principal operations base, control center, and main administrative offices in Hazina Ward." },
  { name: "Dar es Salaam", status: "Commercial Service Hub", details: "Dedicated commercial guarding, maritime, corporate offices, and warehouse security operations." },
  { name: "Mwanza", status: "Lake Zone Regional Office", details: "Serving commercial, industrial, mining support, and residential sectors in the Lake Zone." },
  { name: "Arusha", status: "Northern Zone Hub", details: "Hospitality, safari lodge, NGO, and corporate security deployments." },
  { name: "Kilimanjaro", status: "Operational Region", details: "Tourism, agricultural estates, and educational institution protection." },
  { name: "Tanga", status: "Operational Region", details: "Port logistics, manufacturing facilities, and coastal property protection." },
  { name: "Singida", status: "Operational Region", details: "Central corridor transit guarding and infrastructure protection." },
  { name: "Simiyu", status: "Historical Branch / Operational Region", details: "Established presence in Bariadi (Sima Juu) serving agricultural and commercial clients." },
  { name: "Mara", status: "Operational Region", details: "Cross-border logistics, mining support, and estate security." },
  { name: "Shinyanga", status: "Operational Region", details: "Industrial processing, mining, and commercial facility security." },
  { name: "Morogoro", status: "Operational Region", details: "Agricultural processing plants, transport hubs, and residential estates." },
  { name: "Pwani", status: "Operational Region", details: "Industrial parks, manufacturing plants, and coastal commercial developments." }
];

export const INDUSTRIES = [
  { title: "Residential Homes & Estates", desc: "Private perimeter defence, manned entry gates, and intruder alarm installations.", icon: "Home" },
  { title: "Commercial Offices", desc: "Access control, visitor management, and professional lobby security.", icon: "Building2" },
  { title: "Retail & Shopping Facilities", desc: "Loss prevention, CCTV surveillance, customer flow control, and asset protection.", icon: "ShoppingBag" },
  { title: "Factories & Manufacturing", desc: "Perimeter electric fencing, scale security, metal detection screening, and K9 patrols.", icon: "Factory" },
  { title: "Energy & Infrastructure", desc: "High-level access restrictions, critical asset guarding, and rapid mobile response.", icon: "Zap" },
  { title: "Construction & Engineering", desc: "Equipment theft prevention, night patrol sweeps, and site access logging.", icon: "HardHat" },
  { title: "Agricultural Businesses", desc: "Large perimeter estate patrols, K9 teams, crop & livestock loss prevention.", icon: "Wheat" },
  { title: "Warehouses & Logistics", desc: "Gate control, vehicle search screening, guard patrol wand verification.", icon: "Truck" },
  { title: "Hotels & Hospitality", desc: "Discrete guest protection, parking area security, and emergency evacuation management.", icon: "Hotel" },
  { title: "Schools & Institutions", desc: "Child protection gate security, perimeter safety, and staff access monitoring.", icon: "GraduationCap" },
  { title: "Hospitals & Health Facilities", desc: "Orderly access control, asset protection, emergency triage area safety.", icon: "Stethoscope" },
  { title: "NGOs & Organisations", desc: "Office security, VIP escort, field team safety coordination.", icon: "Globe" },
  { title: "Government Institutions", desc: "Vetted guards, strict entry verification, official protocol alignment.", icon: "Landmark" },
  { title: "Events & Public Gatherings", desc: "Crowd control, entry screening, emergency response, and K9 screening.", icon: "Users" }
];

export const CLIENT_LOGOS = [
  { name: "TotalEnergies", category: "Energy & Petroleum" },
  { name: "Silverlands Tanzania", category: "Agribusiness" },
  { name: "PowerChina", category: "Infrastructure & Energy" },
  { name: "Sinohydro", category: "Engineering & Construction" },
  { name: "Radiant Industries", category: "Manufacturing" },
  { name: "Pinnacle Engineering Solutions", category: "Engineering" },
  { name: "Pinnacle Construction Group", category: "Construction" },
  { name: "Trans Africa", category: "Logistics & Transport" },
  { name: "Jamii Bora Development Initiative", category: "NGO & Community" },
  { name: "Pinnacle Builders", category: "Real Estate & Construction" }
];

export const CASE_STUDIES = [
  {
    id: "cs-1",
    client: "Major Commercial Complex - Dodoma",
    industry: "Commercial Real Estate",
    challenge: "High foot-traffic office complex required strict visitor access monitoring without causing delays for executive staff.",
    solution: "Milano installed biometric access turnstiles integrated with CCTV remote viewing and deployed 6 vetted manned guards.",
    results: "100% unauthorized entry elimination, 0 reported security breaches over 18 months, smooth employee entry flow."
  },
  {
    id: "cs-2",
    client: "Agricultural Processing Estate - Simiyu",
    industry: "Agribusiness & Processing",
    challenge: "Large remote perimeter suffered nighttime crop theft and unmonitored trespassers.",
    solution: "Deployed K9 security teams with night handlers and installed a 3km electric fence with GSM siren alerts.",
    results: "95% reduction in perimeter breaches within the first 30 days and zero property loss reported."
  },
  {
    id: "cs-3",
    client: "Industrial Manufacturing Facility - Dar es Salaam",
    industry: "Manufacturing & Logistics",
    challenge: "Complex needed vehicle underbody search screening and verified guard patrol rounds during overnight shifts.",
    solution: "Implemented electronic guard patrol wand system, underbody search mirrors, and mobile response backup.",
    results: "Full guard accountability verified by automated shift reports; client renewed long-term multi-year contract."
  }
];

export const NEWS_ARTICLES = [
  {
    id: "art-1",
    title: "How to Choose a Professional Security Company in Tanzania",
    date: "July 15, 2026",
    category: "Security Advice",
    summary: "Key criteria every business owner should evaluate: BRELA registration, PDPC compliance, police authorisation, and guard vetting.",
    content: "Selecting a private security provider is one of the most critical decisions for any organization. In Tanzania, it is vital to verify that your security provider holds a valid BRELA Certificate of Incorporation, Police Authorisation, and registration with the Data Protection Personal Commission (PDPC). Additionally, inquire about site-specific risk assessments, guard supervision, and emergency response capabilities."
  },
  {
    id: "art-2",
    title: "CCTV Maintenance Best Practices for Commercial Facilities",
    date: "June 28, 2026",
    category: "Technology",
    summary: "Prevent camera downtime and blurred footage with these routine monthly inspection steps.",
    content: "CCTV cameras are only effective when functioning properly. Routine maintenance should include cleaning lens covers, checking cable connections, testing infrared night vision, verifying hard drive recording retention, and ensuring secure remote access credentials."
  },
  {
    id: "art-3",
    title: "Improving Office Access Control & Visitor Management",
    date: "June 10, 2026",
    category: "Access Control",
    summary: "Transitioning from paper guestbooks to modern RFID and biometric entry logs.",
    content: "Traditional paper visitor logs often lack confidentiality and are easily forged. Modern access control systems use biometric scans, temporary RFID cards, or QR codes to ensure only authorized guests enter designated corporate zones while keeping compliance logs confidential."
  },
  {
    id: "art-4",
    title: "Perimeter Security Planning for Residential Estates",
    date: "May 22, 2026",
    category: "Residential Safety",
    summary: "Layered protection strategies combining electric fencing, beam sensors, and manned guarding.",
    content: "Effective perimeter defence relies on the 'Layered Security' principle: Deterrence at the fence line (electric fence), Detection at the perimeter (motion sensors), and Response at the site (trained guards and panic alarms)."
  },
  {
    id: "art-5",
    title: "Fire-Extinguisher Inspection & Maintenance Guidelines",
    date: "May 04, 2026",
    category: "Fire Safety",
    summary: "Understanding Tanzanian fire safety standards and pressure gauge verification.",
    content: "Fire extinguishers must be inspected monthly by site personnel to check pressure gauges, safety pins, and physical condition. Annual professional servicing by certified technicians is required by Tanzanian safety regulations."
  },
  {
    id: "art-6",
    title: "Protecting Warehouses & Logistics Hubs from Theft",
    date: "April 19, 2026",
    category: "Industrial Security",
    summary: "Vehicle search mirrors, guard patrol wands, and inventory access protocols.",
    content: "Logistics facilities face internal and external loss risks. Deploying underbody search mirrors for all exiting trucks, combined with mandatory guard patrol wand scans every hour, drastically reduces unauthorized stock movement."
  }
];

export const FAQS = [
  {
    q: "What services does Milano Security Service Limited provide?",
    a: "Milano Security provides manned guarding, mobile patrols, CCTV systems, access control, intruder alarms, electric fencing, fire-safety systems & extinguisher servicing, fire-safety training, metal detection screening, vehicle search equipment, K9 security services, and electronic guard patrol monitoring systems."
  },
  {
    q: "Which areas of Tanzania do you serve?",
    a: "Our principal operational headquarters are based in Dodoma, with reported coverage across 12 regions: Dodoma, Dar es Salaam, Mwanza, Arusha, Kilimanjaro, Tanga, Singida, Simiyu, Shinyanga, Mara, Morogoro, and Pwani."
  },
  {
    q: "How can I request a quotation for my premises?",
    a: "You can use our interactive online Request a Quotation form on this website, call our customer line (+255 758 556 355 / +255 685 302 141), or contact us directly via WhatsApp. We will perform a site risk assessment and tailor a proposal to your exact requirements."
  },
  {
    q: "Do you conduct security site assessments?",
    a: "Yes. We arrange professional site security assessments to analyze your property's vulnerability, entry points, and required protection level before recommending physical or electronic security measures."
  },
  {
    q: "Are your security guards vetted and trained?",
    a: "Absolutely. All Milano Security guards undergo comprehensive background checks, physical fitness tests, customer service training, security protocol drills, and continuous supervisor evaluation before assignment."
  },
  {
    q: "Can I purchase or rent CCTV equipment from Milano Security?",
    a: "Yes, we offer both outright equipment purchase and long-term rental/leasing options with included maintenance service contracts."
  },
  {
    q: "Do you provide system maintenance services?",
    a: "Yes. We offer scheduled preventive maintenance and emergency technical support for CCTV systems, access control, intruder alarms, electric fencing, and fire safety systems."
  },
  {
    q: "How can I apply for employment at Milano Security?",
    a: "Available job positions are published on our Careers page. Interested applicants should submit their details through our official online job application portal on this website."
  }
];

export const JOB_POSITIONS = [
  {
    id: "job-1",
    title: "Security Guard / Officer",
    location: "Dodoma / Dar es Salaam / Mwanza",
    type: "Full-Time",
    desc: "Responsible for access control, property guarding, perimeter surveillance, and incident reporting.",
    requirements: [
      "Form IV / Form VI Certificate of Education",
      "Clean criminal record background check",
      "Good physical fitness & discipline",
      "Fluency in Kiswahili and basic English",
      "Prior security or National Service (JKT) experience is an added advantage"
    ]
  },
  {
    id: "job-2",
    title: "Electronic Security Technician (CCTV & Alarms)",
    location: "Dodoma HQ",
    type: "Full-Time",
    desc: "Installation, configuration, and troubleshooting of CCTV cameras, access control, intruder alarms, and electric fences.",
    requirements: [
      "Diploma or VETA Certificate in Electronics / Electrical Engineering / IT",
      "At least 2 years hands-on experience in CCTV & alarm system installation",
      "Knowledge of IP networks & remote surveillance setup",
      "Valid driver's licence"
    ]
  },
  {
    id: "job-3",
    title: "K9 Handler & Security Dog Supervisor",
    location: "Simiyu / Dodoma",
    type: "Full-Time",
    desc: "Care, routine training, and deployment of security dogs for perimeter patrols and facility protection.",
    requirements: [
      "Proven experience in handling and training working dogs (German Shepherd/Malinois)",
      "Knowledge of canine health, feeding, and obedience",
      "Disciplined, patient, and vigilant attitude"
    ]
  }
];
