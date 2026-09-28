import React, { useState, useEffect } from 'react';
import {
  Globe,
  CheckCircle2,
  Mail,
  Phone,
  Copy,
  Check,
  Lock,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Coins,
  MapPin,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { SitesView } from './components/SitesView';
import { SUBDOMAINS_DATA } from './data/subdomains';
import { MyanmarDevEmblem, MyanmarDevLogo } from './components/MyanmarDevLogo';

type Language = 'en' | 'mm';
type PaymentMethodType = 'binance_pay' | 'myanmar_banks' | 'f2f_yangon';

interface InquiryFormState {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: 'firm_offer' | 'price_range' | 'f2f_meeting' | 'general_question';
  offerAmount: string;
  currency: 'USD' | 'MMK';
  paymentPreference: PaymentMethodType;
  intendedUse: string;
  message: string;
}

const INITIAL_FORM: InquiryFormState = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  inquiryType: 'firm_offer',
  offerAmount: '2000',
  currency: 'USD',
  paymentPreference: 'binance_pay',
  intendedUse: 'Software Company / Agency',
  message: '',
};

// Myanmar Flag SVG
function MyanmarFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={`rounded-[2px] shadow-xs overflow-hidden shrink-0 inline-block ${className}`}
      aria-hidden="true"
    >
      <rect width="48" height="10.66" y="0" fill="#FECB00" />
      <rect width="48" height="10.66" y="10.66" fill="#34B233" />
      <rect width="48" height="10.68" y="21.32" fill="#EA2839" />
      <polygon
        points="24,6 26.6,13.8 34.8,13.8 28.2,18.7 30.7,26.4 24,21.6 17.3,26.4 19.8,18.7 13.2,13.8 21.4,13.8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// United States Flag SVG
function UsFlagIcon({ className = 'w-4 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={`rounded-[2px] shadow-xs overflow-hidden shrink-0 inline-block ${className}`}
      aria-hidden="true"
    >
      <rect width="48" height="32" fill="#B22234" />
      <rect y="2.46" width="48" height="2.46" fill="#FFFFFF" />
      <rect y="7.38" width="48" height="2.46" fill="#FFFFFF" />
      <rect y="12.3" width="48" height="2.46" fill="#FFFFFF" />
      <rect y="17.22" width="48" height="2.46" fill="#FFFFFF" />
      <rect y="22.14" width="48" height="2.46" fill="#FFFFFF" />
      <rect y="27.06" width="48" height="2.46" fill="#FFFFFF" />
      <rect width="19.2" height="17.22" fill="#3C3B6E" />
      <g fill="#FFFFFF" transform="scale(0.8) translate(2, 2)">
        <circle cx="3" cy="3" r="0.9" />
        <circle cx="9" cy="3" r="0.9" />
        <circle cx="15" cy="3" r="0.9" />
        <circle cx="6" cy="6.5" r="0.9" />
        <circle cx="12" cy="6.5" r="0.9" />
        <circle cx="18" cy="6.5" r="0.9" />
        <circle cx="3" cy="10" r="0.9" />
        <circle cx="9" cy="10" r="0.9" />
        <circle cx="15" cy="10" r="0.9" />
        <circle cx="6" cy="13.5" r="0.9" />
        <circle cx="12" cy="13.5" r="0.9" />
        <circle cx="18" cy="13.5" r="0.9" />
        <circle cx="3" cy="17" r="0.9" />
        <circle cx="9" cy="17" r="0.9" />
        <circle cx="15" cy="17" r="0.9" />
      </g>
    </svg>
  );
}

// Tech Logo Symbol SVG - Official Myanmar Developers (<MD>) Emblem
function TechLogoSymbol({ className = 'w-5 h-5' }: { className?: string }) {
  return <MyanmarDevEmblem className={className} />;
}

export default function App() {
  // User Requirement: Default is Burmese ('mm')
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mmdev_lang');
      if (saved === 'en' || saved === 'mm') return saved;
    }
    return 'mm';
  });

  // User Requirement: Default is Light theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mmdev_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('mmdev_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mmdev_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const isLight = theme === 'light';
  const [currentPage, setCurrentPage] = useState<'sale' | 'sites'>('sale');
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_FORM);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'dns' | 'transfer'>('specs');

  const ownerInfo = {
    name: 'Htet Aung Hlaing',
    nameMm: 'ထက်အောင်လှိုင်',
    email: 'myanmardevadmin@gmail.com',
    phone: '+959786579514',
    phoneFormatted: '+95 9 786 579 514',
    locationMm: 'မရမ်းကုန်းမြို့နယ်၊ ရန်ကုန်မြို့',
    locationEn: 'Mayangone Township, Yangon, Myanmar',
    domain: 'myanmardev.com',
    whatsappUrl:
      'https://wa.me/959786579514?text=Hello%20Htet%20Aung%20Hlaing,%20I%20am%20inquiring%20about%20acquiring%20the%20domain%20myanmardev.com.',
    viberUrl: 'viber://chat?number=%2B959786579514',
    telegramUrl: 'https://t.me/+959786579514',
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationError) setValidationError(null);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `[Domain Offer] myanmardev.com - ${formData.fullName || 'Prospective Buyer'}`
    );
    const bodyContent = `Hello Htet Aung Hlaing,

I am interested in acquiring the domain myanmardev.com:

- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone/Contact: ${formData.phone || 'N/A'}
- Organization: ${formData.organization || 'Individual'}
- Inquiry Type: ${formData.inquiryType.toUpperCase()}
- Proposed Budget: ${formData.currency} ${formData.offerAmount || 'Negotiable'}
- Payment Preference: ${formData.paymentPreference}
- Intended Use: ${formData.intendedUse}

Note / Message:
${formData.message || 'Please let me know your transfer requirements and price expectations.'}

Best regards,
${formData.fullName}`;

    return `mailto:${ownerInfo.email}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
  };

  const generateWhatsAppInquiryUrl = () => {
    const text = `Hello Htet Aung Hlaing,
I am inquiring about acquiring myanmardev.com.
Name: ${formData.fullName || 'Buyer'}
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Offer Amount: ${formData.currency} ${formData.offerAmount || 'Negotiable'}
Preferred Payment: ${formData.paymentPreference}
Face-to-face in Mayangone, Yangon: ${formData.paymentPreference === 'f2f_yangon' ? 'Yes' : 'No'}`;
    return `https://wa.me/959786579514?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setValidationError(
        lang === 'en' ? 'Please enter your full name.' : 'ကျေးဇူးပြု၍ သင်၏ အမည်အပြည့်အစုံ ထည့်သွင်းပေးပါ။'
      );
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError(
        lang === 'en' ? 'Please enter a valid email address.' : 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပေးပါ။'
      );
      return;
    }

    const refId = `MMDEV-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(refId);
    setIsSubmitted(true);
    setValidationError(null);

    const mailto = generateMailtoLink();
    window.location.href = mailto;
  };

  const t = {
    en: {
      statusActive: 'Status: Available for Direct Acquisition',
      subNotice: 'Direct from Registrant Owner · Zero Broker Fees · Transfer < 24 Hours',
      navDomainSale: 'Domain For Sale',
      navSubdomainSites: 'Subdomain Sites',
      subHeaderOverview: 'Overview',
      subHeaderPayments: 'Payment Methods',
      subHeaderContact: 'Registrant Contact',
      subHeaderOffer: 'Make Offer',
      subHeaderValue: 'Commercial Value',
      subHeaderFaq: 'FAQ',
      navOverview: 'Domain Overview',
      navPayments: 'Payment Methods',
      navOwner: 'Registrant Contact',
      navValue: 'Commercial Value',
      navFaq: 'FAQ',
      makeOffer: 'Make an Offer',
      heroTag: 'Direct Registrant Title',
      heroTitle1: 'Premium Tech Domain',
      heroTitle2: 'myanmardev.com',
      heroSubtitle:
        'The definitive .COM digital asset for Myanmar software engineers, agencies, and enterprise tech. Available immediately from sole title holder Htet Aung Hlaing.',
      btnOffer: 'Submit Price Inquiry',
      btnOwner: 'Contact Owner Directly',
      panelTitle: 'Registrar Asset Manifest',
      tabSpecs: 'Asset Metadata',
      tabDns: 'DNS & Nameserver Status',
      tabTransfer: 'Handover Protocol',
      domainName: 'Domain Name',
      registrarStatus: 'Registry Status',
      statusValue: 'ClientTransferProhibited: Off (Unlocked)',
      tldType: 'TLD Classification',
      tldValue: 'Top-Level .COM (Verisign)',
      charLength: 'Character Count',
      charValue: '10 Characters (Exact Match)',
      handoverLocation: 'Physical Handover',
      handoverVal: 'Mayangone Township, Yangon',
      paymentHeading: 'Direct Settlement Methods (No Escrow Fee)',
      paymentSub:
        '3 official settlement channels accepted directly by sole registrant Htet Aung Hlaing. Zero broker commission, zero platform surcharge.',
      ownerHeading: 'Domain Title & Technical Ownership',
      ownerSub: 'All negotiations, authorizations, and registry transfer operations are executed directly by the verified registrant.',
      ownerTitle: 'Sole Legal Registrant',
      emailTitle: 'Official Contact Email',
      phoneTitle: 'Direct Voice / Phone',
      locationTitle: 'In-Person Handover Location',
      chatTitle: 'Direct Messaging Channels',
      formHeading: 'Acquisition & Price Inquiry Form',
      formSub:
        'Submit a firm offer, schedule an in-person meeting in Mayangone, or request price guidance directly from owner Htet Aung Hlaing.',
      contactDetails: 'Buyer Contact Details',
      fullName: 'Full Name / Representative',
      emailAddress: 'Email Address',
      phoneContact: 'Phone / Telegram / WhatsApp',
      company: 'Organization / Studio (Optional)',
      offerDetails: 'Proposal Details',
      firmOffer: 'Firm Offer',
      priceGuide: 'Price Range Inquiry',
      f2fDiscuss: 'Mayangone In-Person Meeting',
      generalInq: 'General Inquiry',
      offerAmt: 'Proposed Offer Amount',
      paymentDetails: 'Settlement & Purpose',
      paymentPref: 'Preferred Payment Channel',
      useCase: 'Intended Use Case',
      notes: 'Additional Notes / Message',
      submitBtn: 'Transmit Official Inquiry',
      directNotice: 'Direct transmission to owner. EPP authorization ready.',
      successHeading: 'Inquiry Recorded Successfully',
      successSub: 'A copy of your proposal manifest has been prepared with reference code',
      openMail: 'Open Default Email Client',
      openWa: 'Send via WhatsApp',
      copySummary: 'Copy Proposal Summary',
      editProposal: '← Edit Proposal Details',
      whyHeading: 'Why Acquire myanmardev.com',
      whySub: 'Strategic market advantages of establishing primary digital sovereignty in Myanmar’s tech sector.',
      val1Title: 'High Category Brand Authority',
      val1Desc:
        'Combines "Myanmar" with the international developer suffix "Dev". Unrivaled natural recall for enterprise software, dev talent, and tech communities.',
      val2Title: 'Global .COM Commercial Liquidity',
      val2Desc:
        'Unlike restricted local ccTLDs, the sovereign .COM TLD ensures worldwide recognition, universal trust, and superior long-term asset value.',
      val3Title: 'Instant Developer Credibility',
      val3Desc:
        'Passes the radio test effortlessly. Zero hyphens, zero numbers, and instant authority with international investors and clients.',
    },
    mm: {
      statusActive: 'အခြေအနေ - တိုက်ရိုက်ပိုင်ရှင်ထံမှ ဝယ်ယူရန် အသင့်ရှိသည်',
      subNotice: 'ပိုင်ရှင် တိုက်ရိုက်ရောင်းချခြင်း · အကျိုးဆောင်ခမရှိ · ၂၄ နာရီအတွင်း လွှဲပြောင်းနိုင်သည်',
      navDomainSale: 'ဒိုမိန်းအရောင်း',
      navSubdomainSites: 'ဒိုမိန်းခွဲ ဝဘ်ဆိုက်များ',
      subHeaderOverview: 'အကျဉ်းချုပ်',
      subHeaderPayments: 'ငွေပေးချေမှု',
      subHeaderContact: 'ဆက်သွယ်ရန်',
      subHeaderOffer: 'ကမ်းလှမ်းလွှာ',
      subHeaderValue: 'အားသာချက်',
      subHeaderFaq: 'မေးလေ့ရှိသည်များ',
      navOverview: 'ဒိုမိန်းအကျဉ်းချုပ်',
      navPayments: 'ငွေပေးချေမှုစနစ်',
      navOwner: 'ပိုင်ရှင်အချက်အလက်',
      navValue: 'အားသာချက်များ',
      navFaq: 'မေးလေ့ရှိသည်များ',
      makeOffer: 'ကမ်းလှမ်းလွှာပို့မည်',
      heroTag: 'တိုက်ရိုက်မူပိုင်ရှင် အချက်အလက်',
      heroTitle1: 'မြန်မာ့နည်းပညာအတွက် ထိပ်တန်းဒိုမိန်း',
      heroTitle2: 'myanmardev.com',
      heroSubtitle:
        'မြန်မာနိုင်ငံရှိ Software အင်ဂျင်နီယာများ၊ နည်းပညာအေဂျင်စီများနှင့် စီးပွားရေးလုပ်ငန်းများအတွက် အခိုင်မာဆုံး .COM ဒစ်ဂျစ်တယ်လိပ်စာ။ တိုက်ရိုက်မူပိုင်ရှင် ထက်အောင်လှိုင်ထံမှ ချက်ချင်းဝယ်ယူနိုင်ပါသည်။',
      btnOffer: 'ဈေးနှုန်းစုံစမ်းမည် / ကမ်းလှမ်းမည်',
      btnOwner: 'ပိုင်ရှင်ထံ တိုက်ရိုက်ဆက်သွယ်မည်',
      panelTitle: 'ဒိုမိန်းဆိုင်ရာ မှတ်တမ်းအချက်အလက်',
      tabSpecs: 'အထွေထွေ အချက်အလက်',
      tabDns: 'DNS နှင့် Nameserver အခြေအနေ',
      tabTransfer: 'လွှဲပြောင်းမှု လုပ်ငန်းစဉ်',
      domainName: 'ဒိုမိန်းအမည်',
      registrarStatus: 'မှတ်ပုံတင်အခြေအနေ',
      statusValue: 'Transfer Lock မရှိပါ (လွှဲပြောင်းရန် အသင့်ဖြစ်သည်)',
      tldType: 'ဒိုမိန်းအမျိုးအစား',
      tldValue: 'ကမ္ဘာ့အဆင့် .COM (Verisign)',
      charLength: 'စာလုံးရေတွက်မှု',
      charValue: '၁၀ လုံး (အတိုကောက် အတိအကျ)',
      handoverLocation: 'လူချင်းတွေ့ဆုံလွှဲပြောင်းနိုင်သည့်နေရာ',
      handoverVal: 'မရမ်းကုန်းမြို့နယ်၊ ရန်ကုန်မြို့',
      paymentHeading: 'ငွေပေးချေမှု စနစ်များ (အကျိုးဆောင်ခ လုံးဝမရှိပါ)',
      paymentSub:
        'တိုက်ရိုက်မူပိုင်ရှင် ထက်အောင်လှိုင် ကိုယ်တိုင် လက်ခံသော တရားဝင် ငွေပေးချေမှုစနစ် ၃ မျိုး။ ကြားခံခနှင့် အပိုဆောင်းကုန်ကျစရိတ် ကင်းရှင်းပါသည်။',
      ownerHeading: 'ဒိုမိန်း မူပိုင်ရှင်နှင့် ဆက်သွယ်ရန်',
      ownerSub: 'ညှိနှိုင်းမှု၊ စစ်ဆေးမှုနှင့် လွှဲပြောင်းမှု လုပ်ငန်းစဉ်အားလုံးကို မူပိုင်ရှင်နှင့် တိုက်ရိုက် ဆောင်ရွက်ရမည် ဖြစ်ပါသည်။',
      ownerTitle: 'တိုက်ရိုက် တရားဝင် ပိုင်ရှင်',
      emailTitle: 'တရားဝင် ဆက်သွယ်ရန် အီးမေးလ်',
      phoneTitle: 'တိုက်ရိုက် ဖုန်းခေါ်ဆိုရန်',
      locationTitle: 'လူချင်းတွေ့ဆုံနိုင်သည့် နေရာ',
      chatTitle: 'ချက်ချင်း စကားပြောဆိုနိုင်သော နည်းလမ်းများ',
      formHeading: 'ဒိုမိန်း ဝယ်ယူမှုနှင့် ဈေးနှုန်း စုံစမ်းရန် ဖောင်',
      formSub:
        'သင့်တင့်သော ဈေးနှုန်းကမ်းလှမ်းခြင်း၊ မရမ်းကုန်းတွင် လူချင်းတွေ့ဆုံရန် ရက်ချိန်းယူခြင်း သို့မဟုတ် ဈေးနှုန်းစုံစမ်းခြင်းတို့ကို မူပိုင်ရှင် ထက်အောင်လှိုင်ထံ တိုက်ရိုက် ပေးပို့နိုင်ပါသည်။',
      contactDetails: 'ဝယ်ယူသူ ဆက်သွယ်ရန် အချက်အလက်',
      fullName: 'အမည်အပြည့်အစုံ / ကိုယ်စားလှယ်',
      emailAddress: 'အီးမေးလ်လိပ်စာ',
      phoneContact: 'ဖုန်းနံပါတ် / Telegram / WhatsApp',
      company: 'ကုမ္ပဏီ / လုပ်ငန်းအမည် (ရှိပါက)',
      offerDetails: 'ကမ်းလှမ်းမှု အချက်အလက်',
      firmOffer: 'တိကျသော ကမ်းလှမ်းဈေး',
      priceGuide: 'ဈေးနှုန်း မေးမြန်းစုံစမ်းခြင်း',
      f2fDiscuss: 'မရမ်းကုန်းတွင် လူချင်းတွေ့ဆုံဆွေးနွေးခြင်း',
      generalInq: 'အထွေထွေ မေးမြန်းချက်',
      offerAmt: 'ကမ်းလှမ်းလိုသော ပမာဏ',
      paymentDetails: 'ငွေပေးချေမှုနှင့် ရည်ရွယ်ချက်',
      paymentPref: 'ပေးချေလိုသော စနစ်',
      useCase: 'အသုံးပြုမည့် ရည်ရွယ်ချက်',
      notes: 'အခြား အသေးစိတ် မှတ်ချက် / မေးမြန်းချက်',
      submitBtn: 'ကမ်းလှမ်းချက် တိုက်ရိုက် ပေးပို့မည်',
      directNotice: 'ပိုင်ရှင်ထံ တိုက်ရိုက် ရောက်ရှိပါမည်။ EPP Code အသင့်ရှိပါသည်။',
      successHeading: 'ကမ်းလှမ်းချက် ပေးပို့မှု အောင်မြင်ပါသည်',
      successSub: 'လူကြီးမင်း၏ ကမ်းလှမ်းမှု အချက်အလက်များကို မှတ်တမ်းတင်ထားပြီး ဖြစ်ပါသည်။ မှတ်တမ်းအမှတ်စဉ်',
      openMail: 'အီးမေးလ်ဖြင့် ပို့မည်',
      openWa: 'WhatsApp ဖြင့် ပို့မည်',
      copySummary: 'အကျဉ်းချုပ် ကူးယူမည်',
      editProposal: '← အချက်အလက် ပြန်လည်ပြင်ဆင်မည်',
      whyHeading: 'myanmardev.com ကို အဘယ်ကြောင့် ပိုင်ဆိုင်သင့်သနည်း',
      whySub: 'နာမည်တစ်ခုသည် စီးပွားရေးလုပ်ငန်း၏ ပထမဆုံး ယုံကြည်စိတ်ချရမှုနှင့် အဆင့်အတန်းဖြစ်ပါသည်။',
      val1Title: 'နယ်ပယ်တစ်ခုလုံးကို ကိုယ်စားပြုနိုင်ခြင်း',
      val1Desc:
        '"Myanmar" နှင့် "Dev" ပေါင်းစပ်ထားသဖြင့် မြန်မာ့ Software နှင့် IT လောကတစ်ခုလုံးကို သဘာဝကျကျ ကိုယ်စားပြုပါသည်။',
      val2Title: 'ကမ္ဘာလုံးဆိုင်ရာ .COM ၏ ခိုင်မာမှု',
      val2Desc:
        'ပြည်တွင်း ccTLD ကန့်သတ်ချက်များ ကင်းရှင်းပြီး တစ်ကမ္ဘာလုံးမှ အသိအမှတ်ပြုသော .COM တန်ဖိုးကို ရရှိစေပါသည်။',
      val3Title: 'မှတ်မိလွယ်ပြီး အဆင့်အတန်းရှိခြင်း',
      val3Desc:
        'အစက်၊ အစင်း၊ နံပါတ်များ မပါဝင်ဘဲ ရှင်းလင်းတိကျစွာ အသံထွက်နိုင်ပြီး နိုင်ငံတကာ ဖောက်သည်များအတွက် ယုံကြည်မှု ရရှိစေပါသည်။',
    },
  };

  const curr = t[lang];

  const paymentOptions = [
    {
      id: 'binance_pay',
      name: 'Cryptocurrency Binance Pay (USDT / USDC)',
      badge: 'Zero Settlement Delay',
      descEn:
        'Pay instantly via Binance Pay ID, Pay QR, or direct wallet transfer using USDT/USDC (TRC-20, BEP-20, ERC-20). Instant verification for international or local buyers.',
      descMm:
        'Binance Pay ID သို့မဟုတ် USDT/USDC (TRC20, BEP20, ERC20) ဖြင့် စက္ကန့်ပိုင်းအတွင်း လျင်မြန်စွာ ပေးချေနိုင်ပါသည်။ နိုင်ငံတကာနှင့် ပြည်တွင်း ဝယ်ယူသူများအတွက် အဆင်ပြေဆုံးဖြစ်ပါသည်။',
      icon: Coins,
      accent: 'border-[#00B4D8]',
    },
    {
      id: 'myanmar_banks',
      name: 'Myanmar Bank Wire (KBZ, YOMA, AYA)',
      badge: 'Direct Bank Settlement',
      descEn:
        'Official direct wire transfer to verified corporate/personal accounts at KBZ Bank, YOMA Bank, or AYA Bank. Fully supports both MMK and USD settlements.',
      descMm:
        'KBZ Bank, YOMA Bank နှင့် AYA Bank များသို့ တိုက်ရိုက် Bank Transfer / Special Account / iBanking ဖြင့် မြန်မာကျပ်ငွေ သို့မဟုတ် သတ်မှတ်ငွေကြေးဖြင့် လွှဲပြောင်းပေးချေနိုင်ပါသည်။',
      icon: Building2,
      accent: 'border-[#FFB703]',
    },
    {
      id: 'f2f_yangon',
      name: 'Face To Face Discuss in Mayangone, Yangon',
      badge: 'Physical In-Person Handover',
      descEn:
        'Schedule a face-to-face meeting in Mayangone Township, Yangon. Inspect live registrar domain credentials, initiate instant account push, and settle in person.',
      descMm:
        'ရန်ကုန်မြို့၊ မရမ်းကုန်းမြို့နယ်တွင် လူကိုယ်တိုင် လူချင်းတွေ့ဆုံ၍ ဒိုမိန်းလွှဲပြောင်းမှုနှင့် ငွေပေးချေမှုကို မျက်မြင်လက်တွေ့ စိတ်ချလက်ချ ပွင့်လင်းစွာ စစ်ဆေးဆောင်ရွက်နိုင်ပါသည်။',
      icon: MapPin,
      accent: 'border-[#00B4D8]',
    },
  ];

  const faqs = [
    {
      qEn: 'How does the domain transfer work without third-party escrow?',
      qMm: 'Escrow ကြားခံမပါဘဲ ဒိုမိန်းကို မည်သို့လွှဲပြောင်းပေးမည်နည်း။',
      aEn: 'The transfer is handled directly by registrant Htet Aung Hlaing. You can receive the official EPP/Authorization Code to transfer to any registrar of your choice (Cloudflare, Namecheap, GoDaddy), or receive an instant free Account Push if you also use the same registrar. Handover can also be completed live in-person in Mayangone, Yangon.',
      aMm: 'ဒိုမိန်းပိုင်ရှင် ထက်အောင်လှိုင် ကိုယ်တိုင် EPP/Auth Code ပေးပို့ခြင်း သို့မဟုတ် တူညီသော Registrar သို့ Direct Account Push ဖြင့် ချက်ချင်း လွှဲပြောင်းပေးပါမည်။ ရန်ကုန် မရမ်းကုန်းမြို့နယ်တွင်လည်း လူကိုယ်တိုင် တွေ့ဆုံ၍ မျက်မြင်လွှဲပြောင်းနိုင်ပါသည်။',
    },
    {
      qEn: 'Are there any hidden broker fees or commissions?',
      qMm: 'အကျိုးဆောင်ခ သို့မဟုတ် အပိုဆောင်း ကုန်ကျစရိတ်များ ရှိပါသလား။',
      aEn: 'None. You are negotiating and purchasing directly from the verified domain owner. 0% broker commission, 0% platform surcharge.',
      aMm: 'လုံးဝမရှိပါ။ ပိုင်ရှင်ထံမှ တိုက်ရိုက်ဝယ်ယူခြင်းဖြစ်သောကြောင့် အကျိုးဆောင်ခ သို့မဟုတ် ကြားခံအခကြေးငွေ လုံးဝပေးဆောင်ရန် မလိုပါ။',
    },
    {
      qEn: 'Can I pay in Myanmar Kyat (MMK)?',
      qMm: 'မြန်မာကျပ်ငွေ (MMK) ဖြင့် ပေးချေနိုင်ပါသလား။',
      aEn: 'Yes. Local payment via KBZ Bank, YOMA Bank, or AYA Bank is fully supported at the mutually agreed market exchange rate at the time of transaction.',
      aMm: 'လက်ခံပါသည်။ ပြည်တွင်း KBZ, YOMA, AYA ဘဏ်များမှတစ်ဆင့် ပေးချေလိုပါက နှစ်ဦးသဘောတူ ညှိနှိုင်းဈေးနှုန်းဖြင့် မြန်မာကျပ်ငွေဖြင့် လွှဲပြောင်းနိုင်ပါသည်။',
    },
    {
      qEn: 'Where can we meet in Mayangone, Yangon for physical closing?',
      qMm: 'မရမ်းကုန်းမြို့နယ်တွင် မည်သည့်နေရာ၌ တွေ့ဆုံနိုင်ပါသနည်း။',
      aEn: 'We can arrange a convenient and secure meeting at a reputable cafe, bank branch, or commercial office in Mayangone Township, Yangon by contacting +959786579514 in advance.',
      aMm: 'မရမ်းကုန်းမြို့နယ်ရှိ လူကြီးမင်း အဆင်ပြေရာ ကော်ဖီဆိုင်၊ ဘဏ်ရုံးခွဲ သို့မဟုတ် သတ်မှတ်နေရာတွင် ရက်ချိန်းရယူ၍ တွေ့ဆုံနိုင်ပါသည်။ ဖုန်း +959786579514 သို့ ကြိုတင် ဆက်သွယ်နိုင်ပါသည်။',
    },
  ];

  return (
    <div
      className={`min-h-screen tech-grid-bg transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0B132B] text-[#F8F9FA]'
      } ${lang === 'mm' ? 'locale-mm' : ''}`}
    >
      {/* Subtle header status strip */}
      <div
        className={`border-b text-xs py-2 px-4 transition-colors ${
          isLight
            ? 'bg-[#FEF9EE] border-[#E7DFD3] text-stone-700'
            : 'bg-[#1C2541]/90 border-white/10 text-[#94A3B8]'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLight ? 'bg-[#D97706]' : 'bg-[#00B4D8]'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isLight ? 'bg-[#D97706]' : 'bg-[#00B4D8]'
                }`}
              ></span>
            </span>
            <span className={`font-mono font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
              DNS Active
            </span>
            <span className={isLight ? 'text-stone-300' : 'text-white/20'}>|</span>
            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>
              {curr.statusActive}
            </span>
          </div>

          <div className={`flex items-center gap-4 text-[11px] font-mono ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
            <span className="hidden sm:inline">{curr.subNotice}</span>
            <span className={`font-bold text-xs tracking-tight ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
              myanmardev.com
            </span>
          </div>
        </div>
      </div>

      {/* Clean Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors shadow-sm ${
          isLight
            ? 'bg-white/95 border-stone-200'
            : 'bg-[#0B132B]/95 border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div
                className={`w-9 h-9 p-1 rounded-sm border flex items-center justify-center transition-all ${
                  isLight
                    ? 'bg-[#FEF9EE] border-[#FCD34D] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.2)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                    : 'bg-[#1C2541] border-white/15 shadow-[2px_2px_0px_0px_rgba(0,180,216,0.3)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                }`}
              >
                <MyanmarDevEmblem className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-extrabold tracking-wider text-xs uppercase font-sans">
                  <span className={isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}>
                    MYANMAR
                  </span>
                  <span className="bg-gradient-to-r from-[#0066FF] to-[#00D285] bg-clip-text text-transparent">
                    DEVELOPERS
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold tracking-tight ${
                    isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                  }`}
                >
                  myanmardev.com
                </span>
              </div>
            </a>
          </div>

          {/* Clean Primary Navigation Tabs */}
          <div
            className={`flex items-center gap-1 p-1 rounded-sm border shadow-xs ${
              isLight
                ? 'bg-stone-100 border-stone-200'
                : 'bg-[#1C2541] border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setCurrentPage('sale')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all ${
                currentPage === 'sale'
                  ? isLight
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'bg-[#00B4D8] text-[#0B132B] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA]'
              } ${lang === 'mm' ? 'pb-1' : ''}`}
            >
              {curr.navDomainSale}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('sites')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPage === 'sites'
                  ? isLight
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'bg-[#00B4D8] text-[#0B132B] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]'
                  : isLight
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA]'
              } ${lang === 'mm' ? 'pb-1' : ''}`}
            >
              <Layers className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
              <span>{curr.navSubdomainSites}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs font-bold ${
                  currentPage === 'sites'
                    ? isLight ? 'bg-[#78350F] text-amber-100' : 'bg-[#0B132B] text-[#00B4D8]'
                    : isLight ? 'bg-white text-stone-700 border border-stone-300' : 'bg-[#0B132B] text-[#00B4D8] border border-white/10'
                }`}
              >
                {SUBDOMAINS_DATA.length}
              </span>
            </button>
          </div>

          {/* Right Action: Language Switcher + SUN/MOON Theme Switcher + Inquiry button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher with Myanmar Flag and US Flag */}
            <div
              className={`flex items-center rounded-sm p-1 shadow-inner border ${
                isLight
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-[#1C2541] border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-bold rounded-xs flex items-center gap-1 transition-all ${
                  lang === 'en'
                    ? isLight
                      ? 'bg-[#B45309] text-white shadow-xs'
                      : 'bg-[#00B4D8] text-[#0B132B] shadow-xs'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900'
                    : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                }`}
                title="View in English"
                aria-label="Switch to English"
              >
                <UsFlagIcon className="w-3.5 h-2.5" />
                <span>EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('mm')}
                className={`px-2 py-1 text-xs font-bold rounded-xs flex items-center gap-1 transition-all ${
                  lang === 'mm'
                    ? isLight
                      ? 'bg-[#B45309] text-white shadow-xs pb-1'
                      : 'bg-[#00B4D8] text-[#0B132B] shadow-xs pb-1'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900'
                    : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                }`}
                title="မြန်မာစာဖြင့် ကြည့်ရှုမည် (Myanmar Unicode)"
                aria-label="မြန်မာဘာသာသို့ ပြောင်းမည်"
              >
                <MyanmarFlagIcon className="w-3.5 h-2.5" />
                <span>မြန်မာ</span>
              </button>
            </div>

            {/* SUN & MOON Theme Control Switcher */}
            <div
              className={`flex items-center rounded-sm p-1 shadow-inner border transition-colors ${
                isLight
                  ? 'bg-stone-100 border-stone-200'
                  : 'bg-[#1C2541] border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-xs flex items-center justify-center transition-all ${
                  isLight
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Switch to Light Theme (အလင်းစနစ်)"
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-xs flex items-center justify-center transition-all ${
                  !isLight
                    ? 'bg-[#00B4D8] text-[#0B132B] shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Switch to Dark Theme (အမှောင်စနစ်)"
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentPage !== 'sale') {
                  setCurrentPage('sale');
                }
                setTimeout(() => {
                  document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className={`hidden sm:flex px-3.5 sm:px-4 py-2 text-xs font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 whitespace-nowrap ${
                isLight
                  ? 'bg-[#B45309] hover:bg-[#92400E] text-white shadow-[2px_2px_0px_0px_rgba(180,83,9,0.25)]'
                  : 'bg-[#00B4D8] hover:bg-[#38c7e5] text-[#0B132B]'
              } ${lang === 'mm' ? 'pb-1' : ''}`}
            >
              {curr.makeOffer}
            </button>
          </div>
        </div>
      </header>

      {/* Sub Small Header (Compact, Mini, Centered, Frozen/Sticky) */}
      {currentPage === 'sale' ? (
        <nav
          aria-label="Section navigation"
          className={`sticky top-16 z-30 backdrop-blur-md border-b py-2 px-4 shadow-sm transition-colors ${
            isLight
              ? 'bg-white/95 border-stone-200'
              : 'bg-[#0B132B]/95 border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div
              className={`inline-flex items-center gap-1 sm:gap-2 px-3 py-1 rounded-sm border text-[11px] font-mono overflow-x-auto max-w-full transition-colors ${
                isLight
                  ? 'bg-[#FEF9EE] border-amber-200 text-stone-700 shadow-sm'
                  : 'bg-[#1C2541] border-white/10 text-[#F8F9FA] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.2)]'
              }`}
            >
              <a
                href="#overview"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLight
                    ? 'hover:text-[#B45309] hover:bg-white text-stone-700'
                    : 'hover:text-[#00B4D8] hover:bg-[#0B132B] text-[#F8F9FA]'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <Globe className={`w-3 h-3 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                <span>{curr.subHeaderOverview}</span>
              </a>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
              <a
                href="#payments"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLight
                    ? 'hover:text-[#B45309] hover:bg-white text-stone-700'
                    : 'hover:text-[#00B4D8] hover:bg-[#0B132B] text-[#F8F9FA]'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <Coins className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                <span>{curr.subHeaderPayments}</span>
              </a>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
              <a
                href="#owner"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLight
                    ? 'hover:text-[#B45309] hover:bg-white text-stone-700'
                    : 'hover:text-[#00B4D8] hover:bg-[#0B132B] text-[#F8F9FA]'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <Phone className={`w-3 h-3 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                <span>{curr.subHeaderContact}</span>
              </a>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
              <a
                href="#inquiry"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap font-bold border ${
                  isLight
                    ? 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D] hover:bg-[#FEF3C7]'
                    : 'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/40 hover:bg-[#00B4D8]/30 hover:text-white'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <Send className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                <span>{curr.subHeaderOffer}</span>
              </a>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
              <a
                href="#value"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLight
                    ? 'hover:text-[#B45309] hover:bg-white text-stone-700'
                    : 'hover:text-[#00B4D8] hover:bg-[#0B132B] text-[#F8F9FA]'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <ShieldCheck className={`w-3 h-3 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                <span>{curr.subHeaderValue}</span>
              </a>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
              <a
                href="#faq"
                className={`px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLight
                    ? 'hover:text-[#B45309] hover:bg-white text-stone-700'
                    : 'hover:text-[#00B4D8] hover:bg-[#0B132B] text-[#F8F9FA]'
                } ${lang === 'mm' ? 'pb-1' : ''}`}
              >
                <ChevronDown className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                <span>{curr.subHeaderFaq}</span>
              </a>
            </div>
          </div>
        </nav>
      ) : (
        <div
          className={`sticky top-16 z-30 backdrop-blur-md border-b py-2 px-4 shadow-sm text-xs font-mono transition-colors ${
            isLight
              ? 'bg-white/95 border-stone-200'
              : 'bg-[#0B132B]/95 border-white/10'
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className={`flex items-center gap-2 ${isLight ? 'text-stone-700' : 'text-[#94A3B8]'}`}>
              <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>myanmardev.com</span>
              <span className={isLight ? 'text-stone-300' : 'text-white/20'}>/</span>
              <span className={`font-medium ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                {lang === 'en' ? 'Subdomain Sites Directory' : 'ဒိုမိန်းခွဲ ဝဘ်ဆိုက်များ စာရင်း'}
              </span>
              <span className={isLight ? 'text-stone-300 hidden sm:inline' : 'text-white/20 hidden sm:inline'}>·</span>
              <span className={`hidden sm:inline ${isLight ? 'text-stone-600 font-medium' : 'text-[#94A3B8]'}`}>
                {lang === 'en'
                  ? `${SUBDOMAINS_DATA.length} Real Records (${SUBDOMAINS_DATA.filter((s) => s.status === 'online').length} Live Online)`
                  : `မှတ်တမ်းတင်ထားသော ဒိုမိန်းခွဲ ${SUBDOMAINS_DATA.length} ခု (${SUBDOMAINS_DATA.filter((s) => s.status === 'online').length} ခု တိုက်ရိုက်လွှင့်တင်ဆဲ)`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentPage('sale');
                setTimeout(() => {
                  document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className={`flex items-center gap-1 text-[11px] font-bold ${
                isLight ? 'text-[#B45309] hover:text-[#92400E]' : 'text-[#00B4D8] hover:text-[#38c7e5]'
              }`}
            >
              <span>{lang === 'en' ? 'Acquire Main Domain' : 'ပင်မဒိုမိန်း ဝယ်ယူရန်'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <main className="relative">
        {currentPage === 'sale' ? (
          <>
            {/* 1. HERO SECTION */}
            <section id="hero" className="pt-10 pb-14 px-4 sm:px-6 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Domain Identity */}
                <div className="lg:col-span-7">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-mono mb-4 border ${
                      isLight
                        ? 'bg-[#FFFBEB] border-amber-200 text-[#B45309] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.2)]'
                        : 'bg-[#1C2541] border-white/10 text-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.25)]'
                    }`}
                  >
                    <MyanmarDevEmblem className="w-4 h-4 shrink-0" />
                    <span className="font-semibold">{curr.heroTag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                    <span
                      className={`block text-xl sm:text-2xl font-semibold mb-1 ${
                        isLight ? 'text-stone-800' : 'text-[#94A3B8]'
                      } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                    >
                      {curr.heroTitle1}
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        isLight
                          ? 'text-[#B45309] drop-shadow-sm'
                          : 'text-[#00B4D8] drop-shadow-[0_2px_10px_rgba(0,180,216,0.25)]'
                      }`}
                    >
                      myanmardev.com
                    </span>
                  </h1>

                  <p
                    className={`text-sm sm:text-base mb-6 max-w-xl ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-relaxed'}`}
                  >
                    {curr.heroSubtitle}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3.5">
                    <a
                      href="#inquiry"
                      className={`w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-bold rounded-sm transition-all flex items-center justify-center gap-2 ${
                        isLight
                          ? 'text-white bg-[#B45309] hover:bg-[#92400E] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.3)]'
                          : 'text-[#0B132B] bg-[#00B4D8] hover:bg-[#38c7e5] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)]'
                      } hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 ${
                        lang === 'mm' ? 'pb-1' : ''
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>{curr.btnOffer}</span>
                    </a>
                    <a
                      href="#owner"
                      className={`w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center justify-center gap-2 border ${
                        isLight
                          ? 'text-stone-800 bg-white hover:bg-amber-50/50 border-stone-300 shadow-[3px_3px_0px_0px_rgba(180,83,9,0.15)]'
                          : 'text-[#F8F9FA] bg-[#1C2541] hover:bg-[#253257] border-white/15 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.15)]'
                      } hover:-translate-x-0.5 hover:-translate-y-0.5 ${lang === 'mm' ? 'pb-1' : ''}`}
                    >
                      <Phone className={`w-4 h-4 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                      <span>{curr.btnOwner}</span>
                    </a>
                  </div>

                  {/* Verified Trust Badges */}
                  <div
                    className={`mt-8 pt-6 border-t flex flex-wrap items-center gap-6 text-xs ${
                      isLight ? 'border-stone-200 text-stone-700' : 'border-white/10 text-[#94A3B8]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                      <span>No Broker Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                      <span>Zero Escrow Markup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                      <span>Yangon In-Person Closing</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Asset Manifest */}
                <div id="overview" className="lg:col-span-5">
                  <div
                    className={`rounded-sm border overflow-hidden transition-all ${
                      isLight
                        ? 'bg-white border-amber-200/80 shadow-[4px_4px_0px_0px_rgba(180,83,9,0.2)]'
                        : 'bg-[#1C2541] border-white/15 shadow-[4px_4px_0px_0px_rgba(0,180,216,0.25)]'
                    }`}
                  >
                    {/* Panel Header */}
                    <div
                      className={`px-4 py-3 border-b flex items-center justify-between ${
                        isLight ? 'bg-[#FEF9EE] border-amber-200/80' : 'bg-[#1C2541] border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]'}`}></span>
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                            isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                          }`}
                        >
                          {curr.panelTitle}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('myanmardev.com', 'hero_domain')}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-xs flex items-center gap-1.5 transition-colors border ${
                          isLight
                            ? 'text-stone-700 bg-white hover:bg-stone-50 border-stone-300'
                            : 'text-[#F8F9FA] bg-[#0B132B] hover:bg-[#1C2541] border-white/15'
                        }`}
                      >
                        {copiedType === 'hero_domain' ? (
                          <Check className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                        ) : (
                          <Copy className={`w-3 h-3 ${isLight ? 'text-stone-400' : 'text-[#94A3B8]'}`} />
                        )}
                        <span>{copiedType === 'hero_domain' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Sub Tabs */}
                    <div className={`flex border-b text-xs ${isLight ? 'bg-stone-100 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                      <button
                        type="button"
                        onClick={() => setActiveTab('specs')}
                        className={`flex-1 py-2.5 text-center font-bold transition-colors border-b-2 ${
                          activeTab === 'specs'
                            ? isLight
                              ? 'border-[#B45309] text-[#B45309] bg-white'
                              : 'border-[#00B4D8] text-[#00B4D8] bg-[#1C2541]'
                            : isLight
                            ? 'border-transparent text-stone-600 hover:text-stone-900'
                            : 'border-transparent text-[#94A3B8] hover:text-[#F8F9FA]'
                        } ${lang === 'mm' ? 'pb-1' : ''}`}
                      >
                        {curr.tabSpecs}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('dns')}
                        className={`flex-1 py-2.5 text-center font-bold transition-colors border-b-2 ${
                          activeTab === 'dns'
                            ? isLight
                              ? 'border-[#B45309] text-[#B45309] bg-white'
                              : 'border-[#00B4D8] text-[#00B4D8] bg-[#1C2541]'
                            : isLight
                            ? 'border-transparent text-stone-600 hover:text-stone-900'
                            : 'border-transparent text-[#94A3B8] hover:text-[#F8F9FA]'
                        } ${lang === 'mm' ? 'pb-1' : ''}`}
                      >
                        {curr.tabDns}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('transfer')}
                        className={`flex-1 py-2.5 text-center font-bold transition-colors border-b-2 ${
                          activeTab === 'transfer'
                            ? isLight
                              ? 'border-[#B45309] text-[#B45309] bg-white'
                              : 'border-[#00B4D8] text-[#00B4D8] bg-[#1C2541]'
                            : isLight
                            ? 'border-transparent text-stone-600 hover:text-stone-900'
                            : 'border-transparent text-[#94A3B8] hover:text-[#F8F9FA]'
                        } ${lang === 'mm' ? 'pb-1' : ''}`}
                      >
                        {curr.tabTransfer}
                      </button>
                    </div>

                    {/* Panel Tab Content */}
                    <div className="p-4 text-xs font-mono">
                      {activeTab === 'specs' && (
                        <div className="space-y-3">
                          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>{curr.domainName}:</span>
                            <span className={`font-bold ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>myanmardev.com</span>
                          </div>
                          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>{curr.tldType}:</span>
                            <span className={`font-semibold ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>{curr.tldValue}</span>
                          </div>
                          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>{curr.charLength}:</span>
                            <span className={isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}>{curr.charValue}</span>
                          </div>
                          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>{curr.registrarStatus}:</span>
                            <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-[#00B4D8]'}`}>{curr.statusValue}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>{curr.handoverLocation}:</span>
                            <span className={`font-semibold ${isLight ? 'text-amber-700' : 'text-[#FFB703]'}`}>{curr.handoverVal}</span>
                          </div>
                        </div>
                      )}

                      {activeTab === 'dns' && (
                        <div className="space-y-2 text-[11px]">
                          <div className={`p-2.5 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <div className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>DNS Zone Delegation</div>
                            <div className={`font-bold mt-1 ${isLight ? 'text-emerald-700' : 'text-[#00B4D8]'}`}>Configured & Healthy</div>
                          </div>
                          <div className={`p-2.5 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <div className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>DNSSEC & SSL Compatibility</div>
                            <div className={`mt-1 font-semibold ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>Full 256-bit TLS/SSL Ready</div>
                          </div>
                          <div className={`p-2.5 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <div className={isLight ? 'text-stone-600' : 'text-[#94A3B8]'}>Nameserver Switchover</div>
                            <div className={`mt-1 font-semibold ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>Instant propagation upon transfer</div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'transfer' && (
                        <div className="space-y-2 text-[11px]">
                          <div className={`flex gap-2 items-start p-2 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>1.</span>
                            <div className={isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}>
                              <strong>Direct EPP Code:</strong> Sent instantly to buyer upon payment confirmation.
                            </div>
                          </div>
                          <div className={`flex gap-2 items-start p-2 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>2.</span>
                            <div className={isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}>
                              <strong>Account Push:</strong> Zero-downtime internal push to your registrar.
                            </div>
                          </div>
                          <div className={`flex gap-2 items-start p-2 rounded-sm border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0B132B] border-white/10'}`}>
                            <span className={`font-bold ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`}>3.</span>
                            <div className={isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}>
                              <strong>In-Person Closing:</strong> Verify transfer face-to-face in Mayangone, Yangon.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. PAYMENT METHODS */}
            <section
              id="payments"
              className={`py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t transition-colors ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div className="max-w-3xl mx-auto text-center mb-10">
                <div
                  className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
                    isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                  <span>Direct Settlement Only</span>
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                  } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                >
                  {curr.paymentHeading}
                </h2>
                <p
                  className={`text-sm mt-2 max-w-2xl mx-auto ${
                    isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                  } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-relaxed'}`}
                >
                  {curr.paymentSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {paymentOptions.map((opt) => {
                  const IconComp = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      className={`rounded-sm p-5 flex flex-col justify-between transition-all border ${
                        isLight
                          ? formData.paymentPreference === opt.id
                            ? 'bg-white border-[#B45309] shadow-[4px_4px_0px_0px_rgba(180,83,9,0.25)]'
                            : 'bg-white border-stone-200 shadow-[3px_3px_0px_0px_rgba(180,83,9,0.08)] hover:border-amber-300'
                          : formData.paymentPreference === opt.id
                          ? 'bg-[#1C2541] border-[#00B4D8] shadow-[4px_4px_0px_0px_rgba(0,180,216,0.3)]'
                          : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.15)] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-10 h-10 rounded-sm flex items-center justify-center border ${
                              isLight
                                ? 'bg-[#FFFBEB] border-amber-200 text-[#B45309]'
                                : 'bg-[#0B132B] border-white/10 text-[#00B4D8]'
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-xs font-bold border ${
                              isLight
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-[#0B132B] text-[#FFB703] border-white/10'
                            }`}
                          >
                            {opt.badge}
                          </span>
                        </div>

                        <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                          {opt.name}
                        </h3>
                        <p
                          className={`text-xs ${
                            isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                          } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                        >
                          {lang === 'en' ? opt.descEn : opt.descMm}
                        </p>
                      </div>

                      <div className={`mt-6 pt-4 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              paymentPreference: opt.id as PaymentMethodType,
                            }));
                            const el = document.getElementById('inquiry');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full py-2.5 text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 border ${
                            isLight
                              ? 'bg-amber-50/50 hover:bg-amber-50 text-stone-800 border-amber-200 hover:border-[#B45309]'
                              : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#F8F9FA] border-white/15 hover:border-[#00B4D8]'
                          } ${lang === 'mm' ? 'pb-1' : ''}`}
                        >
                          <span>{lang === 'en' ? 'Select for Inquiry' : 'ဤနည်းလမ်းဖြင့် စုံစမ်းမည်'}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. OWNER & TECHNICAL CONTACT */}
            <section
              id="owner"
              className={`py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t transition-colors ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
                      isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                    }`}
                  >
                    <span>Registrant Profile</span>
                    <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
                    <span className={isLight ? 'text-amber-700 font-bold' : 'text-[#FFB703]'}>Verified Sole Owner</span>
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                  >
                    {curr.ownerHeading}
                  </h2>
                  <p
                    className={`text-sm mt-2 ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                  >
                    {curr.ownerSub}
                  </p>
                </div>

                {/* Registrant Identity Box */}
                <div
                  className={`rounded-sm p-6 sm:p-7 border transition-all ${
                    isLight
                      ? 'bg-white border-amber-200/80 shadow-[4px_4px_0px_0px_rgba(180,83,9,0.2)]'
                      : 'bg-[#1C2541] border-white/15 shadow-[4px_4px_0px_0px_rgba(0,180,216,0.25)]'
                  }`}
                >
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-sm flex items-center justify-center font-mono font-bold text-lg border ${
                          isLight
                            ? 'bg-[#FFFBEB] border-amber-300 text-[#B45309] shadow-xs'
                            : 'bg-[#0B132B] border-white/15 text-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.2)]'
                        }`}
                      >
                        HA
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-lg font-bold tracking-tight ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                            {ownerInfo.name}
                          </h3>
                          {lang === 'mm' && (
                            <span className={`text-xs ${isLight ? 'text-stone-600 font-medium' : 'text-[#94A3B8]'}`}>({ownerInfo.nameMm})</span>
                          )}
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-xs font-bold border ${
                              isLight
                                ? 'bg-[#FFFBEB] text-[#B45309] border-amber-300'
                                : 'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/50'
                            }`}
                          >
                            {curr.ownerTitle}
                          </span>
                        </div>
                        <div className={`text-xs font-mono mt-0.5 ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
                          Domain Asset: <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>myanmardev.com</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-stone-600 font-medium' : 'text-[#94A3B8]'}`}>
                      <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-[#FFB703]'}`} />
                      <span>Average Reply: 1–2 hours</span>
                    </div>
                  </div>

                  {/* Direct Communication Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
                    {/* Email Box */}
                    <div
                      className={`p-3.5 rounded-sm flex flex-col justify-between border ${
                        isLight ? 'bg-[#FEF9EE] border-amber-200/70' : 'bg-[#0B132B] border-white/10 shadow-inner'
                      }`}
                    >
                      <div className="mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider block ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
                          {curr.emailTitle}
                        </span>
                        <a
                          href={`mailto:${ownerInfo.email}?subject=Inquiry%20regarding%20myanmardev.com`}
                          className={`text-xs font-mono hover:underline break-all block mt-1 font-bold ${
                            isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                          }`}
                        >
                          {ownerInfo.email}
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 pt-2 border-t ${isLight ? 'border-amber-200/60' : 'border-white/10'}`}>
                        <a
                          href={`mailto:${ownerInfo.email}?subject=Inquiry%20regarding%20myanmardev.com`}
                          className={`flex-1 py-1.5 text-xs text-center font-bold rounded-xs border transition-colors ${
                            isLight
                              ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                              : 'bg-[#1C2541] hover:bg-[#273457] text-[#F8F9FA] border-white/10'
                          }`}
                        >
                          {lang === 'en' ? 'Compose Email' : 'အီးမေးလ် ရေးပို့မည်'}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(ownerInfo.email, 'email')}
                          className={`px-3 py-1.5 text-xs font-mono rounded-xs border transition-colors flex items-center gap-1 ${
                            isLight
                              ? 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                              : 'bg-[#1C2541] hover:bg-[#273457] text-[#94A3B8] hover:text-[#F8F9FA] border-white/10'
                          }`}
                        >
                          {copiedType === 'email' ? (
                            <Check className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                          ) : (
                            <Copy className={`w-3 h-3 ${isLight ? 'text-stone-400' : 'text-[#94A3B8]'}`} />
                          )}
                          <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Phone Box */}
                    <div
                      className={`p-3.5 rounded-sm flex flex-col justify-between border ${
                        isLight ? 'bg-[#FEF9EE] border-amber-200/70' : 'bg-[#0B132B] border-white/10 shadow-inner'
                      }`}
                    >
                      <div className="mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider block ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
                          {curr.phoneTitle}
                        </span>
                        <a
                          href={`tel:${ownerInfo.phone}`}
                          className={`text-xs font-mono hover:underline block mt-1 font-bold ${
                            isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                          }`}
                        >
                          {ownerInfo.phoneFormatted}
                        </a>
                      </div>
                      <div className={`flex items-center gap-2 pt-2 border-t ${isLight ? 'border-amber-200/60' : 'border-white/10'}`}>
                        <a
                          href={`tel:${ownerInfo.phone}`}
                          className={`flex-1 py-1.5 text-xs text-center font-bold rounded-xs border transition-colors ${
                            isLight
                              ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                              : 'bg-[#1C2541] hover:bg-[#273457] text-[#F8F9FA] border-white/10'
                          }`}
                        >
                          {lang === 'en' ? 'Direct Call' : 'ဖုန်းခေါ်ဆိုမည်'}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(ownerInfo.phone, 'phone')}
                          className={`px-3 py-1.5 text-xs font-mono rounded-xs border transition-colors flex items-center gap-1 ${
                            isLight
                              ? 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                              : 'bg-[#1C2541] hover:bg-[#273457] text-[#94A3B8] hover:text-[#F8F9FA] border-white/10'
                          }`}
                        >
                          {copiedType === 'phone' ? (
                            <Check className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                          ) : (
                            <Copy className={`w-3 h-3 ${isLight ? 'text-stone-400' : 'text-[#94A3B8]'}`} />
                          )}
                          <span>{copiedType === 'phone' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Physical Meeting in Mayangone, Yangon */}
                  <div
                    className={`mt-4 p-3.5 rounded-sm flex items-start gap-3 border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B132B] border-white/10'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border ${
                        isLight
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-[#1C2541] border-white/10 text-[#FFB703]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider block ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
                        {curr.locationTitle}
                      </span>
                      <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-[#F8F9FA]'}`}>
                        {lang === 'en' ? ownerInfo.locationEn : ownerInfo.locationMm}
                      </div>
                      <p
                        className={`text-[11px] mt-1 ${
                          isLight ? 'text-slate-700 font-medium' : 'text-[#94A3B8]'
                        } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                      >
                        {lang === 'en'
                          ? 'Local buyers in Yangon can schedule an in-person meeting in Mayangone Township to verify domain ownership and conclude the transfer on the spot.'
                          : 'ရန်ကုန်မြို့တွင်းရှိ ဝယ်ယူလိုသူများအနေဖြင့် မရမ်းကုန်းမြို့နယ်တွင် မျက်နှာချင်းဆိုင် လူကိုယ်တိုင်တွေ့ဆုံ၍ လွှဲပြောင်းမှုကို ချက်ချင်းပြုလုပ်နိုင်ပါသည်။'}
                      </p>
                    </div>
                  </div>

                  {/* Instant Chat Row */}
                  <div className={`mt-4 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                    <span className={isLight ? 'text-stone-600 font-medium' : 'text-[#94A3B8]'}>{curr.chatTitle}</span>
                    <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                      <a
                        href={ownerInfo.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3 py-1.5 rounded-xs border flex items-center gap-1.5 transition-colors ${
                          isLight
                            ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs'
                            : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#F8F9FA] border-white/15'
                        }`}
                      >
                        <MessageSquare className={`w-3.5 h-3.5 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={ownerInfo.telegramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3 py-1.5 rounded-xs border flex items-center gap-1.5 transition-colors ${
                          isLight
                            ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs'
                            : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#F8F9FA] border-white/15'
                        }`}
                      >
                        <Send className={`w-3.5 h-3.5 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                        <span>Telegram</span>
                      </a>
                      <a
                        href={ownerInfo.viberUrl}
                        className={`px-3 py-1.5 rounded-xs border flex items-center gap-1.5 transition-colors ${
                          isLight
                            ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs'
                            : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#F8F9FA] border-white/15'
                        }`}
                      >
                        <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-[#FFB703]'}`} />
                        <span>Viber (+959786579514)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. PRICE INQUIRY FORM */}
            <section
              id="inquiry"
              className={`py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t transition-colors ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 ${
                      isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                    }`}
                  >
                    <span>Formal Inquiries</span>
                    <span className={isLight ? 'text-stone-300' : 'text-white/20'}>·</span>
                    <span className={isLight ? 'text-amber-800 font-bold' : 'text-[#FFB703]'}>Direct to Registrant</span>
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                  >
                    {curr.formHeading}
                  </h2>
                  <p
                    className={`text-sm mt-2 max-w-xl mx-auto ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-relaxed'}`}
                  >
                    {curr.formSub}
                  </p>
                </div>

                {isSubmitted ? (
                  <div
                    className={`rounded-sm p-6 sm:p-8 text-center border transition-all ${
                      isLight
                        ? 'bg-white border-[#E7DFD3] shadow-[4px_4px_0px_0px_rgba(180,83,9,0.22)]'
                        : 'bg-[#1C2541] border-white/15 shadow-[4px_4px_0px_0px_rgba(0,180,216,0.3)]'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-sm flex items-center justify-center mx-auto mb-3 border ${
                        isLight
                          ? 'bg-[#FFFBEB] border-[#FCD34D] text-[#B45309] shadow-xs'
                          : 'bg-[#0B132B] border-[#00B4D8]/50 text-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.2)]'
                      }`}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                      {curr.successHeading}
                    </h3>
                    <p className={`text-xs max-w-md mx-auto mb-5 ${isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'}`}>
                      {curr.successSub}{' '}
                      <span className={`font-mono font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
                        {submissionId}
                      </span>
                    </p>

                    <div
                      className={`rounded-sm p-4 text-left max-w-md mx-auto mb-6 text-xs font-mono space-y-2 border ${
                        isLight
                          ? 'bg-[#FEF9EE] border-stone-200 text-stone-700'
                          : 'bg-[#0B132B] border-white/10 text-[#94A3B8]'
                      }`}
                    >
                      <div className={`flex justify-between pb-1 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                        <span>Reference ID:</span>
                        <span className={`font-bold ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>{submissionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domain:</span>
                        <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>myanmardev.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buyer:</span>
                        <span className={isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}>{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proposed Amount:</span>
                        <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
                          {formData.currency} {formData.offerAmount || 'Negotiable'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className={isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}>
                          {formData.paymentPreference === 'binance_pay'
                            ? 'Binance Pay (USDT/USDC)'
                            : formData.paymentPreference === 'myanmar_banks'
                            ? 'Myanmar Banks (KBZ, YOMA, AYA)'
                            : 'Face-to-Face (Mayangone, Yangon)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={generateMailtoLink()}
                        className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-sm transition-all flex items-center justify-center gap-2 ${
                          isLight
                            ? 'text-white bg-[#B45309] hover:bg-[#92400E] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.3)]'
                            : 'text-[#0B132B] bg-[#00B4D8] hover:bg-[#38c7e5] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        <span>{curr.openMail}</span>
                      </a>
                      <a
                        href={generateWhatsAppInquiryUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-2 border ${
                          isLight
                            ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs'
                            : 'bg-[#1C2541] hover:bg-[#273457] text-[#F8F9FA] border-white/15'
                        }`}
                      >
                        <MessageSquare className={`w-4 h-4 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                        <span>{curr.openWa}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const summary = `Domain Inquiry: myanmardev.com\nRef: ${submissionId}\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nOffer: ${formData.currency} ${formData.offerAmount}\nPayment: ${formData.paymentPreference}\nNote: ${formData.message}`;
                          handleCopy(summary, 'offer_summary');
                        }}
                        className={`w-full sm:w-auto px-4 py-2.5 text-xs font-mono rounded-sm transition-colors flex items-center justify-center gap-1.5 border ${
                          isLight
                            ? 'bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border-stone-300 shadow-xs'
                            : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#94A3B8] hover:text-[#F8F9FA] border-white/15'
                        }`}
                      >
                        {copiedType === 'offer_summary' ? (
                          <Check className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                        ) : (
                          <Copy className={`w-3.5 h-3.5 ${isLight ? 'text-stone-400' : 'text-[#94A3B8]'}`} />
                        )}
                        <span>{copiedType === 'offer_summary' ? 'Copied' : curr.copySummary}</span>
                      </button>
                    </div>

                    <div className={`mt-5 pt-4 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className={`text-xs transition-colors ${
                          isLight ? 'text-stone-600 hover:text-stone-900 font-semibold' : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                        }`}
                      >
                        {curr.editProposal}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={`rounded-sm p-6 sm:p-7 border transition-all ${
                      isLight
                        ? 'bg-white border-[#E7DFD3] shadow-[4px_4px_0px_0px_rgba(180,83,9,0.2)]'
                        : 'bg-[#1C2541] border-white/15 shadow-[4px_4px_0px_0px_rgba(0,180,216,0.25)]'
                    }`}
                  >
                    {validationError && (
                      <div className="mb-5 p-3 rounded-sm bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {validationError}
                      </div>
                    )}

                    {/* Section 1: Contact Details */}
                    <div className="space-y-3.5 mb-6">
                      <h3
                        className={`text-xs uppercase tracking-wider font-mono font-bold ${
                          isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                        }`}
                      >
                        {curr.contactDetails}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.fullName} <span className={isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}>*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            placeholder={lang === 'en' ? 'e.g. Aung Myo, David Chen' : 'ဥပမာ - မောင်မောင်'}
                            required
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.emailAddress} <span className={isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="buyer@example.com"
                            required
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.phoneContact}
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            placeholder="+95... / @username"
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.company}
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleFormChange}
                            placeholder="e.g. Myanmar Software Studio"
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Offer Budget & Type */}
                    <div className={`space-y-3.5 mb-6 pt-5 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-xs uppercase tracking-wider font-mono font-bold ${
                            isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                          }`}
                        >
                          {curr.offerDetails}
                        </h3>
                        <div
                          className={`flex items-center gap-1 p-0.5 rounded-sm border text-xs ${
                            isLight ? 'bg-stone-100 border-stone-300' : 'bg-[#0B132B] border-white/15'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, currency: 'USD' }))}
                            className={`px-2 py-0.5 rounded-xs font-mono font-bold transition-colors ${
                              formData.currency === 'USD'
                                ? isLight
                                  ? 'bg-[#B45309] text-white shadow-xs'
                                  : 'bg-[#00B4D8] text-[#0B132B]'
                                : isLight
                                ? 'text-stone-600 hover:text-stone-900'
                                : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                            }`}
                          >
                            USD ($)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, currency: 'MMK' }))}
                            className={`px-2 py-0.5 rounded-xs font-mono font-bold transition-colors ${
                              formData.currency === 'MMK'
                                ? isLight
                                  ? 'bg-[#B45309] text-white shadow-xs'
                                  : 'bg-[#00B4D8] text-[#0B132B]'
                                : isLight
                                ? 'text-stone-600 hover:text-stone-900'
                                : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                            }`}
                          >
                            MMK (Ks)
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'firm_offer', label: curr.firmOffer },
                          { id: 'price_range', label: curr.priceGuide },
                          { id: 'f2f_meeting', label: curr.f2fDiscuss },
                          { id: 'general_question', label: curr.generalInq },
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setFormData((p) => ({
                                ...p,
                                inquiryType: type.id as InquiryFormState['inquiryType'],
                              }))
                            }
                            className={`p-2.5 rounded-sm text-xs font-bold border text-center transition-all ${
                              formData.inquiryType === type.id
                                ? isLight
                                  ? 'bg-[#FFFBEB] border-[#B45309] text-[#B45309] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.25)]'
                                  : 'bg-[#0B132B] border-[#00B4D8] text-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.3)]'
                                : isLight
                                ? 'bg-white border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                                : 'bg-[#0B132B] border-white/10 text-[#94A3B8] hover:text-[#F8F9FA]'
                            } ${lang === 'mm' ? 'pb-1' : ''}`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>

                      {formData.inquiryType !== 'price_range' && (
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.offerAmt} ({formData.currency})
                          </label>
                          <div className="relative">
                            <span
                              className={`absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold ${
                                isLight ? 'text-stone-500' : 'text-[#94A3B8]'
                              }`}
                            >
                              {formData.currency === 'USD' ? '$' : 'Ks'}
                            </span>
                            <input
                              type="text"
                              name="offerAmount"
                              value={formData.offerAmount}
                              onChange={handleFormChange}
                              placeholder={formData.currency === 'USD' ? '2000' : '6,000,000'}
                              className={`w-full pl-7 pr-3 py-2.5 rounded-sm font-mono text-xs transition-colors shadow-xs focus:outline-none ${
                                isLight
                                  ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                  : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Section 3: Payment & Special Request */}
                    <div className={`space-y-3.5 mb-6 pt-5 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <h3
                        className={`text-xs uppercase tracking-wider font-mono font-bold ${
                          isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                        }`}
                      >
                        {curr.paymentDetails}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.paymentPref}
                          </label>
                          <select
                            name="paymentPreference"
                            value={formData.paymentPreference}
                            onChange={handleFormChange}
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          >
                            <option value="binance_pay">
                              Cryptocurrency Binance Pay (USDT / USDC)
                            </option>
                            <option value="myanmar_banks">
                              Direct Bank Wire to Myanmar BANKS (KBZ, YOMA, AYA)
                            </option>
                            <option value="f2f_yangon">
                              Face To Face Discuss in Mayangone, Yangon
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                            {curr.useCase}
                          </label>
                          <select
                            name="intendedUse"
                            value={formData.intendedUse}
                            onChange={handleFormChange}
                            className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                              isLight
                                ? 'bg-white border border-stone-300 text-stone-900 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                                : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                            }`}
                          >
                            <option value="Software Agency / Tech Company">
                              Software Agency / Tech Company
                            </option>
                            <option value="Developer Community / Tech Media">
                              Developer Community / Tech Media
                            </option>
                            <option value="IT Recruitment / Job Portal">
                              IT Recruitment / Job Portal
                            </option>
                            <option value="Tech Academy / Coding Bootcamp">
                              Tech Academy / Coding Bootcamp
                            </option>
                            <option value="SaaS Platform / Startup">SaaS Platform / Startup</option>
                            <option value="Domain Portfolio Investor">
                              Domain Portfolio Investor
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                          {curr.notes}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          rows={3}
                          placeholder={
                            lang === 'en'
                              ? 'Share any specific requirements, desired closing timeline, or questions for Htet Aung Hlaing...'
                              : 'အသေးစိတ်လိုအပ်ချက် သို့မဟုတ် မေးမြန်းလိုသည်များကို ရေးသားနိုင်ပါသည်...'
                          }
                          className={`w-full px-3 py-2.5 rounded-sm text-xs transition-colors shadow-xs focus:outline-none ${
                            isLight
                              ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                              : 'bg-[#0B132B] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8]/60 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Submit Action */}
                    <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <div className={`text-[11px] flex items-center gap-1.5 font-mono ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
                        <span>{curr.directNotice}</span>
                      </div>

                      <button
                        type="submit"
                        className={`w-full sm:w-auto px-6 py-3 text-xs font-bold rounded-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 flex items-center justify-center gap-2 whitespace-nowrap ${
                          isLight
                            ? 'text-white bg-[#B45309] hover:bg-[#92400E] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.3)]'
                            : 'text-[#0B132B] bg-[#00B4D8] hover:bg-[#38c7e5] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)]'
                        } ${lang === 'mm' ? 'pb-1' : ''}`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{curr.submitBtn}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>

            {/* 5. COMMERCIAL VALUE SECTION */}
            <section
              id="value"
              className={`py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t transition-colors ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                  } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                >
                  {curr.whyHeading}
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-2 ${
                    isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                  } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                >
                  {curr.whySub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                <div
                  className={`rounded-sm p-5 border transition-all ${
                    isLight
                      ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
                      : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold block mb-2 ${
                      isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                    }`}
                  >
                    01 / BRAND EQUITY
                  </span>
                  <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                    {curr.val1Title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                  >
                    {curr.val1Desc}
                  </p>
                </div>

                <div
                  className={`rounded-sm p-5 border transition-all ${
                    isLight
                      ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
                      : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold block mb-2 ${
                      isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                    }`}
                  >
                    02 / .COM TLD PRESTIGE
                  </span>
                  <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                    {curr.val2Title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                  >
                    {curr.val2Desc}
                  </p>
                </div>

                <div
                  className={`rounded-sm p-5 border transition-all ${
                    isLight
                      ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
                      : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold block mb-2 ${
                      isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                    }`}
                  >
                    03 / HIGH RECALL
                  </span>
                  <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                    {curr.val3Title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                  >
                    {curr.val3Desc}
                  </p>
                </div>
              </div>
            </section>

            {/* 6. FAQ */}
            <section
              id="faq"
              className={`py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t transition-colors ${
                isLight ? 'border-stone-200' : 'border-white/10'
              }`}
            >
              <div className="text-center mb-8">
                <h2
                  className={`text-2xl font-extrabold tracking-tight ${
                    isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                  } ${lang === 'mm' ? 'leading-[1.85] pb-1' : ''}`}
                >
                  {curr.navFaq}
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-sm border overflow-hidden transition-all ${
                        isLight
                          ? 'bg-white border-[#E7DFD3] shadow-xs'
                          : 'bg-[#1C2541] border-white/10 shadow-[2px_2px_0px_0px_rgba(0,180,216,0.15)]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className={`w-full p-4 text-left flex items-center justify-between gap-4 ${
                          lang === 'mm' ? 'pb-2' : ''
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                          }`}
                        >
                          {lang === 'en' ? faq.qEn : faq.qMm}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                            isLight ? 'text-stone-500' : 'text-[#94A3B8]'
                          } ${isOpen ? (isLight ? 'rotate-180 text-[#B45309]' : 'rotate-180 text-[#00B4D8]') : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div
                          className={`px-4 pb-4 text-xs border-t pt-3 ${
                            isLight
                              ? 'border-stone-200 text-stone-700 font-medium'
                              : 'border-white/10 text-[#94A3B8]'
                          } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-relaxed'}`}
                        >
                          {lang === 'en' ? faq.aEn : faq.aMm}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <SitesView lang={lang} theme={theme} />
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-8 text-xs transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-600'
            : 'bg-[#0B132B] border-white/10 text-[#94A3B8]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <TechLogoSymbol className="w-4 h-4" />
            <span
              className={`font-bold font-mono text-xs ${
                isLight ? 'text-slate-900' : 'text-[#F8F9FA]'
              }`}
            >
              myanmardev.com
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-white/20'}>·</span>
            <span className={isLight ? 'text-slate-600' : 'text-[#94A3B8]'}>
              {lang === 'en'
                ? 'Owner: Htet Aung Hlaing'
                : 'တိုက်ရိုက်ပိုင်ရှင် - ထက်အောင်လှိုင်'}
            </span>
          </div>

          <div
            className={`flex items-center gap-3 font-mono text-[11px] ${
              isLight ? 'text-slate-600' : 'text-[#94A3B8]'
            }`}
          >
            <span>{ownerInfo.email}</span>
            <span>·</span>
            <span>{ownerInfo.phoneFormatted}</span>
            <span>·</span>
            <span>{lang === 'en' ? 'Mayangone, Yangon' : 'မရမ်းကုန်း၊ ရန်ကုန်'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
