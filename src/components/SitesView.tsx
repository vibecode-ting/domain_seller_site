import React, { useState, useMemo } from 'react';
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  Search,
  Server,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Radio,
  Layers,
  ArrowUpRight,
  Filter,
  Info,
  Zap,
} from 'lucide-react';
import { SUBDOMAINS_DATA, SubdomainSite } from '../data/subdomains';
import { MyanmarDevEmblem } from './MyanmarDevLogo';

interface SitesViewProps {
  lang: 'en' | 'mm';
  theme?: 'dark' | 'light';
}

export function SitesView({ lang, theme = 'dark' }: SitesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // User Requirement: DEFAULT is to show CURRENT online Only
  const [onlyOnline, setOnlyOnline] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'online' | 'portfolio' | 'app' | 'enterprise' | 'infrastructure'>('online');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isLight = theme === 'light';

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const liveCount = SUBDOMAINS_DATA.filter((s) => s.status === 'online').length;

  const filteredSites = useMemo(() => {
    return SUBDOMAINS_DATA.filter((site) => {
      // Toggle for CURRENT online only
      if (onlyOnline && site.status !== 'online') return false;

      // Category filtering
      if (categoryFilter === 'online' && site.status !== 'online') return false;
      if (categoryFilter !== 'all' && categoryFilter !== 'online' && site.category !== categoryFilter) return false;

      // Search query filtering
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        site.subdomain.toLowerCase().includes(query) ||
        site.titleEn.toLowerCase().includes(query) ||
        site.titleMm.toLowerCase().includes(query) ||
        site.ownerName.toLowerCase().includes(query) ||
        (site.ipAddress && site.ipAddress.toLowerCase().includes(query)) ||
        (site.cname && site.cname.toLowerCase().includes(query)) ||
        site.provider.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, categoryFilter, onlyOnline]);

  const t = {
    en: {
      tag: 'Cloudflare Network & DNS Zone',
      title: 'Subdomain Sites Network (*.myanmardev.com)',
      subtitle:
        'Live inventory of running endpoints, web applications, developer portfolios, and Cloudflare Zero Trust proxy tunnels deployed under myanmardev.com.',
      searchPlaceholder: 'Search by subdomain, developer name, IP, or host...',
      statTotal: 'Discovered Records',
      statLive: 'CURRENT Online Only',
      statPrimary: 'Network Registrant',
      statHosts: 'Primary Hosts',
      allTab: 'All Subdomains',
      liveTab: 'Live Online Only (200 OK)',
      portfolioTab: 'Developer Portfolios',
      appsTab: 'Cloud Web Apps',
      enterpriseTab: 'Enterprise Solutions',
      infraTab: 'Infrastructure & Proxy',
      visitSite: 'Visit Site',
      copyUrl: 'Copy URL',
      copyIp: 'Copy IP',
      ownerLabel: 'Person / Team:',
      ipLabel: 'Target IP:',
      cnameLabel: 'Host / CNAME:',
      providerLabel: 'Provider:',
      statusOnline: 'Live Online (200 OK)',
      statusActiveDns: 'Active DNS (Vercel)',
      statusRegistered: 'Registered in CT Logs',
      noResults: 'No subdomains found matching your criteria.',
      ctNotice:
        'Live Verification: Real-time Google Public DNS, Cloudflare 1.1.1.1 API, and Certificate Transparency (crt.sh) logs for *.myanmardev.com.',
    },
    mm: {
      tag: 'Cloudflare ကွန်ရက်နှင့် DNS ဇုန်',
      title: 'myanmardev.com အောက်ရှိ Subdomain ဝဘ်ဆိုက်များ',
      subtitle:
        'myanmardev.com ပင်မဒိုမိန်းအောက်တွင် လက်ရှိလွှင့်တင်ထားသော ဝဘ်ဆိုက်များ၊ Developer ပို့ဖိုလီယိုများ၊ Cloudflare Zero Trust Proxy နှင့် ဆာဗာ အချက်အလက်များ။',
      searchPlaceholder: 'ဒိုမိန်းခွဲအမည်၊ ရေးသားသူအမည် သို့မဟုတ် IP ဖြင့် ရှာဖွေပါ...',
      statTotal: 'မှတ်တမ်းတင်ထားသော စုစုပေါင်း',
      statLive: 'လက်ရှိ အွန်လိုင်းဆိုက်များသာ',
      statPrimary: 'ပင်မမူပိုင်ရှင်',
      statHosts: 'အသုံးပြုထားသော Hosting',
      allTab: 'ဒိုမိန်းခွဲ အားလုံး',
      liveTab: 'လက်ရှိ လွှင့်တင်ဆဲ (Online)',
      portfolioTab: 'Developer ပို့ဖိုလီယိုများ',
      appsTab: 'Cloud ဝဘ်အက်ပ်များ',
      enterpriseTab: 'စီးပွားရေးစနစ်များ',
      infraTab: 'အခြေခံအဆောက်အအုံနှင့် Proxy',
      visitSite: 'ဝဘ်ဆိုက်သို့ သွားမည်',
      copyUrl: 'URL ကူးမည်',
      copyIp: 'IP ကူးမည်',
      ownerLabel: 'ပိုင်ရှင် / တာဝန်ခံ:',
      ipLabel: 'ချိတ်ဆက်ထားသော IP:',
      cnameLabel: 'Host / CNAME:',
      providerLabel: 'ဝန်ဆောင်မှုပေးသူ:',
      statusOnline: 'တိုက်ရိုက်လွှင့်တင်ဆဲ (Live 200 OK)',
      statusActiveDns: 'DNS ချိတ်ဆက်ပြီး (Vercel)',
      statusRegistered: 'CT Logs တွင် မှတ်တမ်းတင်ထားသည်',
      noResults: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော ဒိုမိန်းခွဲ မတွေ့ရှိပါ။',
      ctNotice:
        'တိုက်ရိုက်စစ်ဆေးမှု - Google Public DNS၊ Cloudflare DNS API နှင့် crt.sh မှတ်တမ်းများမှ တိုက်ရိုက် စစ်ဆေးထုတ်ယူထားပါသည်။',
    },
  };

  const curr = t[lang];

  return (
    <div className={`py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto transition-colors ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
      {/* Header Banner */}
      <div className="mb-8">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-mono mb-3 ${
            isLight
              ? 'bg-[#FEF9EE] border border-[#FCD34D] text-[#B45309] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.2)]'
              : 'bg-[#1C2541] border border-white/10 text-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.25)]'
          }`}
        >
          <MyanmarDevEmblem className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{curr.tag}</span>
        </div>

        <h1
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 ${
            isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
          } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-tight'}`}
        >
          {curr.title}
        </h1>
        <p
          className={`text-sm sm:text-base max-w-3xl ${
            isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
          } ${lang === 'mm' ? 'leading-[1.85] pb-1' : 'leading-relaxed'}`}
        >
          {curr.subtitle}
        </p>

        {/* Real-time Discovery Notice */}
        <div
          className={`mt-4 p-3.5 rounded-sm flex items-start gap-2.5 text-xs ${
            isLight
              ? 'bg-white border border-[#E7DFD3] text-stone-700 shadow-[2px_2px_0px_0px_rgba(180,83,9,0.12)]'
              : 'bg-[#1C2541] border border-white/10 text-[#94A3B8] shadow-[2px_2px_0px_0px_rgba(0,180,216,0.15)]'
          }`}
        >
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`} />
          <div className={lang === 'mm' ? 'leading-[1.8] pb-0.5' : 'leading-normal'}>
            <span className={`font-semibold ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
              {curr.ctNotice}
            </span>
          </div>
        </div>
      </div>

      {/* Network Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        {/* Total Records */}
        <div
          className={`p-4 rounded-sm border ${
            isLight
              ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
              : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
          }`}
        >
          <span
            className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
              isLight ? 'text-stone-600 font-semibold' : 'text-[#94A3B8]'
            }`}
          >
            {curr.statTotal}
          </span>
          <div className={`text-2xl font-bold font-mono flex items-center gap-2 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
            <span>{SUBDOMAINS_DATA.length}</span>
            <span className={`text-xs font-normal ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>Sites</span>
          </div>
        </div>

        {/* Live Active */}
        <div
          className={`p-4 rounded-sm border ${
            isLight
              ? 'bg-white border-[#B45309] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.25)]'
              : 'bg-[#1C2541] border-[#00B4D8]/40 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.3)]'
          }`}
        >
          <span
            className={`text-[11px] font-mono uppercase tracking-wider block mb-1 font-bold ${
              isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
            }`}
          >
            {curr.statLive}
          </span>
          <div className={`text-2xl font-bold font-mono flex items-center gap-2 ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]'}`}></span>
            </span>
            <span>{liveCount}</span>
            <span className={`text-xs font-normal ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>HTTP 200</span>
          </div>
        </div>

        {/* Primary Registrant */}
        <div
          className={`p-4 rounded-sm border ${
            isLight
              ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
              : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
          }`}
        >
          <span
            className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
              isLight ? 'text-stone-600 font-semibold' : 'text-[#94A3B8]'
            }`}
          >
            {curr.statPrimary}
          </span>
          <div className={`text-sm font-bold font-mono truncate mt-1 ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
            Htet Aung Hlaing (ting)
          </div>
          <span className={`text-[10px] block truncate ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
            myanmardevadmin@gmail.com
          </span>
        </div>

        {/* Hosts */}
        <div
          className={`p-4 rounded-sm border ${
            isLight
              ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
              : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.2)]'
          }`}
        >
          <span
            className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
              isLight ? 'text-stone-600 font-semibold' : 'text-[#94A3B8]'
            }`}
          >
            {curr.statHosts}
          </span>
          <div className="text-xs font-mono mt-1 flex flex-wrap gap-1">
            <span
              className={`px-1.5 py-0.5 rounded-xs text-[10px] font-bold ${
                isLight ? 'bg-[#FFFBEB] text-[#B45309] border border-[#FCD34D]' : 'bg-[#0B132B] text-[#00B4D8] border border-white/10'
              }`}
            >
              Cloudflare
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-xs text-[10px] ${
                isLight ? 'bg-stone-100 text-stone-700 border border-stone-200' : 'bg-[#0B132B] text-slate-300 border border-white/10'
              }`}
            >
              Vercel
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-xs text-[10px] ${
                isLight ? 'bg-stone-100 text-stone-700 border border-stone-200' : 'bg-[#0B132B] text-slate-300 border border-white/10'
              }`}
            >
              GitHub
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-4">
        {/* Toggle Switch Bar for "CURRENT online : xx only" */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 rounded-sm border ${
            isLight
              ? 'bg-white border-[#E7DFD3] shadow-[3px_3px_0px_0px_rgba(180,83,9,0.2)]'
              : 'bg-[#1C2541] border-white/15 shadow-[3px_3px_0px_0px_rgba(0,180,216,0.25)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  onlyOnline ? (isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]') : 'bg-stone-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  onlyOnline ? (isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]') : 'bg-stone-400'
                }`}
              ></span>
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold tracking-tight ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>
                  {lang === 'en' ? 'Live Filter:' : 'လက်ရှိလွှင့်တင်ဆဲ စစ်ထုတ်မှု:'}
                </span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-xs font-bold border transition-colors ${
                    onlyOnline
                      ? isLight
                        ? 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D] shadow-[1px_1px_0px_0px_rgba(180,83,9,0.25)]'
                        : 'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/60 shadow-[1px_1px_0px_0px_rgba(0,180,216,0.4)]'
                      : isLight
                      ? 'bg-stone-100 text-stone-700 border-stone-300'
                      : 'bg-[#0B132B] text-[#94A3B8] border-white/10'
                  }`}
                >
                  {onlyOnline
                    ? lang === 'en'
                      ? `CURRENT Online: ${liveCount} Sites Only`
                      : `လက်ရှိ အွန်လိုင်း: ${liveCount} ခုသာ`
                    : lang === 'en'
                    ? `Showing All: ${SUBDOMAINS_DATA.length} Records`
                    : `အားလုံး: ${SUBDOMAINS_DATA.length} ခု`}
                </span>
              </div>
              <p
                className={`text-[11px] mt-1 ${
                  isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                } ${lang === 'mm' ? 'leading-[1.8] pb-0.5' : 'leading-normal'}`}
              >
                {onlyOnline
                  ? lang === 'en'
                    ? 'Showing only active verified HTTP 200 sites (proxy.myanmardev.com, tinghah, etc.)'
                    : 'တိုက်ရိုက်လည်ပတ်နေသော HTTP 200 ဆိုက်များ (proxy, tinghah, winnaingsoe, samuel, app) ကိုသာ ပြသထားပါသည်'
                  : lang === 'en'
                  ? 'Showing all 18 historical and discovered subdomains'
                  : 'မှတ်တမ်းတင်ထားသော ဒိုမိန်းခွဲ ၁၈ ခုလုံးကို ပြသထားပါသည်'}
              </p>
            </div>
          </div>

          {/* Interactive Toggle Switch */}
          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <span className={`text-xs font-mono font-medium ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
              {onlyOnline
                ? lang === 'en'
                  ? 'CURRENT Online Only'
                  : 'အွန်လိုင်းသာ'
                : lang === 'en'
                ? 'Show All Subdomains'
                : 'အားလုံး ပြသမည်'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={onlyOnline}
              onClick={() => {
                const next = !onlyOnline;
                setOnlyOnline(next);
                if (next) {
                  setCategoryFilter('online');
                } else {
                  setCategoryFilter('all');
                }
              }}
              className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                isLight ? 'focus:ring-[#B45309]' : 'focus:ring-[#00B4D8]'
              } ${
                onlyOnline
                  ? isLight ? 'bg-[#B45309]' : 'bg-[#00B4D8]'
                  : isLight ? 'bg-stone-300' : 'bg-[#0B132B] border border-white/20'
              }`}
              title={
                onlyOnline
                  ? 'Click to show all subdomains'
                  : 'Click to show only current online subdomains'
              }
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-md ring-0 transition duration-200 ease-in-out ${
                  isLight
                    ? 'bg-white'
                    : onlyOnline ? 'bg-[#F8F9FA]' : 'bg-[#0B132B] border border-white/20'
                } ${onlyOnline ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-stone-400' : 'text-[#94A3B8]'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={curr.searchPlaceholder}
            className={`w-full pl-10 pr-4 py-2.5 rounded-sm text-sm font-mono transition-colors shadow-sm focus:outline-none ${
              isLight
                ? 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]'
                : 'bg-[#1C2541] border border-white/15 text-[#F8F9FA] placeholder-[#94A3B8] focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8]'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                isLight ? 'text-stone-500 hover:text-stone-800' : 'text-[#94A3B8] hover:text-[#F8F9FA]'
              }`}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'online', label: curr.liveTab, count: liveCount },
            { id: 'all', label: curr.allTab, count: SUBDOMAINS_DATA.length },
            { id: 'portfolio', label: curr.portfolioTab, count: SUBDOMAINS_DATA.filter((s) => s.category === 'portfolio').length },
            { id: 'app', label: curr.appsTab, count: SUBDOMAINS_DATA.filter((s) => s.category === 'app').length },
            { id: 'enterprise', label: curr.enterpriseTab, count: SUBDOMAINS_DATA.filter((s) => s.category === 'enterprise').length },
            { id: 'infrastructure', label: curr.infraTab, count: SUBDOMAINS_DATA.filter((s) => s.category === 'infrastructure').length },
          ].map((tab) => {
            const isActive =
              (categoryFilter === tab.id && (!onlyOnline || tab.id === 'online')) ||
              (onlyOnline && tab.id === 'online');

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setCategoryFilter(tab.id as any);
                  if (tab.id === 'online') {
                    setOnlyOnline(true);
                  } else {
                    setOnlyOnline(false);
                  }
                }}
                className={`px-3 py-1.5 rounded-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? isLight
                      ? 'bg-[#B45309] text-white border-[#B45309] shadow-[2px_2px_0px_0px_rgba(180,83,9,0.3)]'
                      : 'bg-[#00B4D8] text-[#0B132B] border-[#00B4D8] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]'
                    : isLight
                    ? 'bg-white text-stone-700 hover:text-stone-900 border-stone-300 hover:border-stone-400'
                    : 'bg-[#1C2541] text-[#94A3B8] hover:text-[#F8F9FA] border-white/10 hover:border-white/20'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs font-bold ${
                    isActive
                      ? isLight ? 'bg-[#78350F] text-amber-100' : 'bg-[#0B132B] text-[#00B4D8]'
                      : isLight ? 'bg-stone-100 text-stone-700' : 'bg-[#0B132B] text-[#94A3B8]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sites Cards Grid */}
      {filteredSites.length === 0 ? (
        <div
          className={`p-12 text-center rounded-sm border ${
            isLight
              ? 'bg-white border-[#E7DFD3] text-stone-600 shadow-[3px_3px_0px_0px_rgba(180,83,9,0.18)]'
              : 'bg-[#1C2541] border-white/10 text-[#94A3B8] shadow-[3px_3px_0px_0px_rgba(0,180,216,0.15)]'
          }`}
        >
          <Globe className="w-10 h-10 mx-auto mb-3 opacity-60" />
          <p className="text-sm">{curr.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSites.map((site) => {
            const isCopiedUrl = copiedField === `url_${site.id}`;
            const isCopiedIp = copiedField === `ip_${site.id}`;
            const isOnline = site.status === 'online';

            return (
              <div
                key={site.id}
                className={`rounded-sm p-5 flex flex-col justify-between transition-all relative overflow-hidden border ${
                  isLight
                    ? isOnline
                      ? 'bg-white border-[#B45309] shadow-[4px_4px_0px_0px_rgba(180,83,9,0.22)] hover:shadow-[5px_5px_0px_0px_rgba(180,83,9,0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5'
                      : 'bg-white border-stone-200 shadow-[3px_3px_0px_0px_rgba(180,83,9,0.1)] hover:border-stone-300'
                    : isOnline
                    ? 'bg-[#1C2541] border-[#00B4D8]/50 shadow-[4px_4px_0px_0px_rgba(0,180,216,0.25)] hover:shadow-[5px_5px_0px_0px_rgba(0,180,216,0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5'
                    : 'bg-[#1C2541] border-white/10 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:border-white/20'
                }`}
              >
                {/* Top Header: Subdomain & Status Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 border ${
                          isLight
                            ? 'bg-[#FFFBEB] border-[#FCD34D] text-[#B45309]'
                            : 'bg-[#0B132B] border-white/10 text-[#00B4D8]'
                        }`}
                      >
                        {site.id === 'proxy' ? (
                          <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-[#FFB703]'}`} />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </div>
                      <a
                        href={site.fullUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-sm font-bold font-mono truncate transition-colors flex items-center gap-1.5 group ${
                          isLight
                            ? 'text-stone-900 hover:text-[#B45309]'
                            : 'text-[#F8F9FA] hover:text-[#00B4D8]'
                        }`}
                      >
                        <span>{site.subdomain}</span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                            isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'
                          }`}
                        />
                      </a>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isOnline ? (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold border ${
                            isLight
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-[#00B4D8]/15 text-[#00B4D8] border-[#00B4D8]/50'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              isLight ? 'bg-emerald-600' : 'bg-[#00B4D8]'
                            }`}
                          ></span>
                          <span>200 OK</span>
                        </span>
                      ) : site.status === 'active_dns' ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-mono font-medium border ${
                            isLight
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-[#1C2541] text-[#FFB703] border-[#FFB703]/40'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>DNS Active</span>
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-mono font-medium border ${
                            isLight
                              ? 'bg-stone-100 text-stone-600 border-stone-300'
                              : 'bg-[#0B132B] text-[#94A3B8] border-white/10'
                          }`}
                        >
                          <span>CT Log</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description with Burmese Line-height compliance */}
                  <h3
                    className={`text-sm font-bold mb-1.5 break-words ${
                      isLight ? 'text-stone-900' : 'text-[#F8F9FA]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-snug'}`}
                  >
                    {lang === 'en' ? site.titleEn : site.titleMm}
                  </h3>
                  <p
                    className={`text-xs mb-4 break-words ${
                      isLight ? 'text-stone-700 font-medium' : 'text-[#94A3B8]'
                    } ${lang === 'mm' ? 'leading-[1.85] pb-0.5' : 'leading-relaxed'}`}
                  >
                    {lang === 'en' ? site.descriptionEn : site.descriptionMm}
                  </p>

                  {/* Technical Meta Box */}
                  <div
                    className={`rounded-sm p-3 text-xs font-mono space-y-2 mb-4 border ${
                      isLight
                        ? 'bg-[#FEF9EE] border-stone-200 shadow-xs'
                        : 'bg-[#0B132B] border-white/10 shadow-inner'
                    }`}
                  >
                    {/* Person / Owner */}
                    <div className={`flex items-start justify-between gap-2 pb-2 border-b ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <span className={`text-[11px] flex items-center gap-1 shrink-0 ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>
                        <User className={`w-3 h-3 ${isLight ? 'text-amber-700' : 'text-[#FFB703]'}`} />
                        <span>{curr.ownerLabel}</span>
                      </span>
                      <div className="text-right">
                        <span className={`font-bold ${isLight ? 'text-stone-900' : 'text-[#F8F9FA]'}`}>{site.ownerName}</span>
                        <span
                          className={`block text-[10px] ${
                            isLight ? 'text-stone-600 font-medium' : 'text-[#94A3B8]'
                          } ${lang === 'mm' ? 'leading-[1.8]' : 'font-sans'}`}
                        >
                          {lang === 'en' ? site.ownerRoleEn : site.ownerRoleMm}
                        </span>
                      </div>
                    </div>

                    {/* Target IP */}
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className={`shrink-0 ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>{curr.ipLabel}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${isLight ? 'text-[#B45309]' : 'text-[#00B4D8]'}`}>
                          {site.ipAddress || 'Dynamic'}
                        </span>
                        {site.ipAddress && !site.ipAddress.includes(' ') && (
                          <button
                            type="button"
                            onClick={() => handleCopy(site.ipAddress!, `ip_${site.id}`)}
                            className={`p-1 rounded-xs transition-colors ${
                              isLight
                                ? 'hover:bg-stone-200 text-stone-600 hover:text-stone-900'
                                : 'hover:bg-[#1C2541] text-[#94A3B8] hover:text-[#F8F9FA]'
                            }`}
                            title="Copy IP Address"
                          >
                            {isCopiedIp ? (
                              <Check className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Host / CNAME */}
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className={`shrink-0 ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>{curr.cnameLabel}</span>
                      <span className={`truncate max-w-[210px] text-right font-mono ${isLight ? 'text-stone-800' : 'text-[#F8F9FA]'}`}>
                        {site.cname || 'Direct Zone'}
                      </span>
                    </div>

                    {/* Provider */}
                    <div className={`flex items-center justify-between gap-2 text-[11px] pt-1.5 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                      <span className={`shrink-0 ${isLight ? 'text-stone-600' : 'text-[#94A3B8]'}`}>{curr.providerLabel}</span>
                      <span
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-bold border ${
                          isLight
                            ? 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D]'
                            : 'bg-[#1C2541] text-[#00B4D8] border-[#00B4D8]/30'
                        }`}
                      >
                        {site.provider}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className={`pt-3 border-t flex items-center justify-between gap-2 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                  <button
                    type="button"
                    onClick={() => handleCopy(site.fullUrl, `url_${site.id}`)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-xs flex items-center gap-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300 shadow-xs'
                        : 'bg-[#0B132B] hover:bg-[#1C2541] text-[#F8F9FA] border-white/15 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    {isCopiedUrl ? (
                      <>
                        <Check className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-[#00B4D8]'}`} />
                        <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-[#00B4D8]'}`}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-3.5 h-3.5 ${isLight ? 'text-stone-500' : 'text-[#94A3B8]'}`} />
                        <span>{curr.copyUrl}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={site.fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xs flex items-center gap-1.5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 ${
                      isLight
                        ? 'bg-[#B45309] hover:bg-[#92400E] text-white shadow-[2px_2px_0px_0px_rgba(180,83,9,0.25)]'
                        : 'bg-[#00B4D8] hover:bg-[#38c7e5] text-[#0B132B] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                    }`}
                  >
                    <span>{curr.visitSite}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
