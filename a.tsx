import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Brain, Flame, Heart, Moon, Compass, Calendar,
    Settings, Sparkles, Sliders, Battery, User, Search, Bell,
    ChevronRight, CheckCircle, RefreshCw, Play, BookOpen, Send,
    Mic, Image as ImageIcon, Link2, LogIn, Sun, Moon as MoonIcon
} from 'lucide-react';

const ThemeCtx = React.createContext<any>({});
const useTheme = () => React.useContext(ThemeCtx);
const darkT = { bg: '#000', s1: '#141414', s2: '#1c1c1e', b: '#2a2a2a', t1: '#ffffff', t2: '#636366', t3: '#48484a', t4: '#3a3a3c', ac: '#34d399', acDim: 'rgba(52,211,153,0.08)', sidebar: '#000', sbBorder: '#1c1c1e', cardGrad: 'linear-gradient(145deg,#141414,#0d0d0d)', header: 'rgba(0,0,0,0.85)', track: '#1a1a1a', toggleOff: '#2a2a2a', thumbOn: '#000', thumbOff: '#555' };
const lightT = { bg: '#ffffff', s1: '#f5f5f7', s2: '#ebebf0', b: '#d2d2d7', t1: '#1d1d1f', t2: '#6e6e73', t3: '#8e8e93', t4: '#aeaeb2', ac: '#059669', acDim: 'rgba(5,150,105,0.08)', sidebar: '#f5f5f7', sbBorder: '#e5e5ea', cardGrad: 'linear-gradient(145deg,#ffffff,#fafafa)', header: 'rgba(255,255,255,0.9)', track: '#e5e5ea', toggleOff: '#d2d2d7', thumbOn: '#fff', thumbOff: '#8e8e93' };

export default function AuraTwin() {
    const [tab, setTab] = useState<'dashboard' | 'twin' | 'timeline' | 'mood' | 'journal' | 'sleep' | 'wearables' | 'landing' | 'peaks' | 'cascade' | 'bioage'>('landing');

    const [cmdOpen, setCmdOpen] = useState(false);
    const [notifs] = useState([
        { id: 1, text: "Burnout Risk low — rest not required tonight.", type: 'success' },
        { id: 2, text: "Oura Ring synced. Sleep Score: 92/100", type: 'success' },
        { id: 3, text: "AuraTwin predicts 12% lower energy if sleep drops.", type: 'info' }
    ]);
    const [showN, setShowN] = useState(false);
    const [chat, setChat] = useState(false);
    const [logged, setLogged] = useState(true);
    const [sliders, setSliders] = useState({ sleep: 8.2, exercise: 45, water: 2.2, calories: 2200, stress: 3 });
    const [dark, setDark] = useState(true);
    const F = dark ? darkT : lightT;

    // Command Palette Keyboard Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCmdOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ThemeCtx.Provider value={F}>
            <div style={{ backgroundColor: F.bg, fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", color: F.t1, minHeight: '100vh', overflowX: 'hidden' }}>
                <style>{`
                  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
                  * { box-sizing: border-box; }
                  html { scroll-behavior: smooth; }
                  body { margin: 0; }
                  ::selection { background: ${F.ac}; color: ${F.bg}; }
                  ::-webkit-scrollbar { width: 5px; height: 5px; }
                  ::-webkit-scrollbar-track { background: transparent; }
                  ::-webkit-scrollbar-thumb { background: ${F.track}; border-radius: 4px; }
                  ::-webkit-scrollbar-thumb:hover { background: ${F.ac}; }
                  input[type=range] { -webkit-appearance: none; width: 100%; height: 2px; background: ${F.b}; border-radius: 2px; outline: none; }
                  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${F.ac}; cursor: pointer; border: 2px solid ${F.bg}; box-shadow: 0 0 0 0 ${F.ac}55; transition: box-shadow 0.2s; }
                  input[type=range]:hover::-webkit-slider-thumb { box-shadow: 0 0 0 6px ${F.ac}25; }
                  button { transition: filter 0.15s ease, transform 0.15s ease; }
                  button:active { filter: brightness(0.9); transform: scale(0.97); }
                  :focus-visible { outline: 2px solid ${F.ac}; outline-offset: 2px; border-radius: 6px; }

                  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.08)} 66%{transform:translate(-30px,50px) scale(0.95)} }
                  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-80px,30px) scale(1.05)} 66%{transform:translate(50px,-60px) scale(1.1)} }
                  @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1.05)} 50%{transform:translate(40px,40px) scale(0.95)} }
                  @keyframes shimmerSweep { 0%{transform:translateX(-100%) skewX(-12deg)} 100%{transform:translateX(300%) skewX(-12deg)} }
                  @keyframes scanLine { 0%{top:-2px} 100%{top:100%} }
                  @keyframes pulseRing { 0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 70%{transform:scale(1);box-shadow:0 0 0 14px rgba(52,211,153,0)} 100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(52,211,153,0)} }
                  @keyframes neonPulse { 0%,100%{filter:drop-shadow(0 0 4px currentColor)} 50%{filter:drop-shadow(0 0 14px currentColor) drop-shadow(0 0 28px currentColor)} }
                  @keyframes floatUp { 0%{transform:translateY(0);opacity:0.7} 100%{transform:translateY(-120px);opacity:0} }
                  @keyframes spin360 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                  @keyframes fadeInUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
                  @keyframes softGlow { 0%,100%{opacity:0.45} 50%{opacity:1} }
                  @keyframes bgShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

                  .card-shimmer::after {
                    content:'';
                    position:absolute;
                    inset:0;
                    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%);
                    transform:translateX(-100%) skewX(-12deg);
                    transition: none;
                    pointer-events:none;
                  }
                  .card-shimmer:hover::after {
                    animation: shimmerSweep 0.65s ease forwards;
                  }

                  @media (prefers-reduced-motion: reduce) {
                    * { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
                  }
                `}</style>

                <AnimatePresence>
                    {cmdOpen && <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={(t: any) => setTab(t)} />}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {!logged ? <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}><AuthScreen onLogin={() => setLogged(true)} /></motion.div> :
                        tab === 'landing' ? <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}><LandingPage onEnter={() => setTab('dashboard')} /></motion.div> : (
                            <motion.div key="app" initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
                                <Sidebar active={tab} setActive={setTab} onLogout={() => setLogged(false)} />
                                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
                                    {/* Ambient gradient orbs */}
                                    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.055) 0%, transparent 70%)', top: '-15%', left: '30%', animation: 'orbFloat1 22s ease-in-out infinite' }} />
                                        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.045) 0%, transparent 70%)', top: '40%', right: '-10%', animation: 'orbFloat2 28s ease-in-out infinite' }} />
                                        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.035) 0%, transparent 70%)', bottom: '5%', left: '15%', animation: 'orbFloat3 18s ease-in-out infinite' }} />
                                    </div>
                                    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: F.header, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${F.b}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: F.t2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Environment</span>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: F.ac, letterSpacing: '0.04em' }}>Staging</span>
                                            <button onClick={() => setTab('landing')} style={{ fontSize: 11, color: F.t2, background: 'none', border: `1px solid ${F.b}`, borderRadius: 20, padding: '4px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
                                                <Compass size={10} /> Landing
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                            <button onClick={() => setDark(!dark)} title={dark ? 'Light mode' : 'Dark mode'} style={{ background: 'none', border: `1px solid ${F.b}`, borderRadius: 20, padding: '6px 10px', cursor: 'pointer', color: F.t2, display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>{dark ? <Sun size={14} /> : <MoonIcon size={14} />}</button>

                                            <button onClick={() => setCmdOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: F.s2, border: `1px solid ${F.b}`, borderRadius: 20, padding: '6px 16px', fontSize: 12, color: F.t2, cursor: 'pointer' }}>
                                                <Search size={13} />
                                                <span>Search...</span>
                                                <span style={{ fontSize: 10, padding: '2px 6px', background: F.b, borderRadius: 6, marginLeft: 10 }}>⌘K</span>
                                            </button>

                                            <div style={{ position: 'relative' }}>
                                                <button onClick={() => setShowN(!showN)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: F.t2, padding: 6, position: 'relative' }}>
                                                    <Bell size={17} />
                                                    <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: F.ac }} />
                                                </button>
                                                {showN && (
                                                    <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, width: 320, background: F.s1, border: `1px solid ${F.b}`, borderRadius: 16, padding: 16, zIndex: 50 }}>
                                                        <p style={{ fontSize: 10, fontWeight: 600, color: F.t2, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Notifications</p>
                                                        {notifs.map(n => <div key={n.id} style={{ fontSize: 12, color: F.t2, padding: '8px 0', borderBottom: `1px solid ${F.b}` }}>{n.text}</div>)}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 16, borderLeft: `1px solid ${F.b}` }}>
                                                <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden' }}>
                                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 12, fontWeight: 600, color: F.t1, margin: 0 }}>Alex Vance</p>
                                                    <p style={{ fontSize: 10, color: F.t2, margin: 0 }}>Premium Pioneer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <div style={{ flex: 1, overflowY: 'auto' }}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={tab}
                                                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                style={{ padding: '40px 40px', position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}
                                            >
                                                {tab === 'dashboard' && <DashboardHome sliders={sliders} setSliders={setSliders} />}
                                                {tab === 'twin' && <WellnessTwinView sliders={sliders} setSliders={setSliders} />}
                                                {tab === 'timeline' && <TimelineView />}
                                                {tab === 'mood' && <MoodView />}
                                                {tab === 'journal' && <JournalView />}
                                                {tab === 'sleep' && <SleepView />}
                                                {tab === 'wearables' && <WearablesView />}
                                                {tab === 'peaks' && <CircadianPeaksView />}
                                                {tab === 'cascade' && <StressCascadeView />}
                                                {tab === 'bioage' && <BiologicalAgeView />}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </main>
                            </motion.div>
                        )}
                </AnimatePresence>
                {logged && (
                    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 50 }}>
                        {/* Pulsing ripple rings */}
                        <motion.div
                            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${F.ac}` }}
                        />
                        <motion.div
                            animate={{ scale: [1, 2.2], opacity: [0.2, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${F.ac}` }}
                        />
                        <motion.button
                            onClick={() => setChat(!chat)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.93 }}
                            style={{ position: 'relative', zIndex: 1, width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${F.ac}, #059669)`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: `0 8px 32px ${F.ac}60` }}
                        >
                            <Sparkles size={20} />
                        </motion.button>
                        <AnimatePresence>{chat && <ChatDrawer onClose={() => setChat(false)} />}</AnimatePresence>
                    </div>
                )}
            </div>
        </ThemeCtx.Provider>
    );
}

function CommandPalette({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (tab: string) => void }) {
    const F = useTheme();
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isOpen) {
            const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    const actions = [
        { id: 'dashboard', label: 'Go to Dashboard', icon: <Activity size={14} /> },
        { id: 'twin', label: 'Open Wellness Twin', icon: <Sparkles size={14} /> },
        { id: 'timeline', label: 'View Trend Analytics', icon: <Calendar size={14} /> },
        { id: 'mood', label: 'Check Mood & Burnout Index', icon: <Brain size={14} /> },
        { id: 'journal', label: 'Write in AI Journal', icon: <BookOpen size={14} /> },
        { id: 'sleep', label: 'View Sleep & Fitness Stats', icon: <Moon size={14} /> },
        { id: 'wearables', label: 'Manage Device Integrations', icon: <Link2 size={14} /> },
        { id: 'peaks', label: 'View Circadian Peak Windows', icon: <Sun size={14} /> },
        { id: 'cascade', label: 'Stress Cascade Map', icon: <Flame size={14} /> },
        { id: 'bioage', label: 'Biological Age Analysis', icon: <Heart size={14} /> },
    ].filter(a => a.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={e => e.stopPropagation()} style={{ width: 540, maxWidth: '90%', background: F.s1, border: `1px solid ${F.b}`, borderRadius: 16, overflow: 'hidden', boxShadow: `0 24px 50px rgba(0,0,0,0.5), 0 0 0 1px ${F.ac}30` }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${F.b}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Search size={18} color={F.t2} />
                    <input autoFocus placeholder="Type a command or navigate..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: F.t1, fontSize: 16, fontFamily: 'inherit' }} />
                    <span style={{ fontSize: 10, color: F.t3, background: F.s2, padding: '4px 8px', borderRadius: 6, border: `1px solid ${F.b}`, fontWeight: 600 }}>ESC</span>
                </div>
                <div style={{ padding: '8px', maxHeight: 320, overflowY: 'auto' }}>
                    {actions.length > 0 ? actions.map((act, i) => (
                        <button key={i} onClick={() => { onNavigate(act.id); onClose(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: F.t1, borderRadius: 8, textAlign: 'left', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = F.s2} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <span style={{ color: F.ac }}>{act.icon}</span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>{act.label}</span>
                        </button>
                    )) : (
                        <div style={{ padding: '32px', textAlign: 'center', color: F.t3, fontSize: 14 }}>No actions found matching "{search}".</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

function FeatureShowcase() {
    const F = useTheme();
    const [idx, setIdx] = React.useState(0);
    React.useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % 3), 3800); return () => clearInterval(t); }, []);

    const features = [
        {
            icon: Brain, color: '#34d399',
            title: 'AI That Thinks Ahead',
            subtitle: 'Predictive intelligence across every health dimension',
            visual: (
                <div style={{ padding: '16px 20px', height: 130, position: 'relative', overflow: 'hidden' }}>
                    {/* animated wave line */}
                    <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path d="M0,70 C40,50 80,30 120,45 C160,60 200,20 240,30 C260,35 270,30 280,28" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
                        <motion.path d="M0,70 C40,50 80,30 120,45 C160,60 200,20 240,30 C260,35 270,30 280,28 L280,100 L0,100 Z" fill="url(#wg)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                        {[{ cx: 0, cy: 70 }, { cx: 120, cy: 45 }, { cx: 200, cy: 20 }, { cx: 280, cy: 28 }].map((p, i) => (
                            <motion.circle key={i} cx={p.cx} cy={p.cy} r="5" fill="#34d399" stroke="#000" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.25 }} />
                        ))}
                    </svg>
                    <div style={{ position: 'absolute', top: 8, right: 12, background: '#34d39920', border: '1px solid #34d39940', borderRadius: 8, padding: '4px 10px', fontSize: 10, color: '#34d399', fontWeight: 700 }}>LIVE</div>
                </div>
            )
        },
        {
            icon: Activity, color: '#fb923c',
            title: 'Burnout Before It Starts',
            subtitle: 'Detect physiological stress signals 24 hours early',
            visual: (
                <div style={{ padding: '16px 20px', height: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
                    {[{ l: 'Stress Load', v: 72, c: '#fb923c' }, { l: 'Recovery', v: 88, c: '#34d399' }, { l: 'HRV Trend', v: 65, c: '#fbbf24' }, { l: 'Sleep Debt', v: 40, c: '#f87171' }].map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 10, color: '#636366', width: 70, flexShrink: 0 }}>{m.l}</span>
                            <div style={{ flex: 1, height: 5, background: '#1c1c1e', borderRadius: 3, overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.v}%` }} transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: 'easeOut' }} style={{ height: '100%', background: m.c, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: m.c, width: 28, textAlign: 'right' }}>{m.v}</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            icon: Link2, color: '#60a5fa',
            title: 'All Your Devices, One View',
            subtitle: 'Apple Health · WHOOP · Oura · Garmin · Fitbit unified',
            visual: (
                <div style={{ padding: '16px 20px', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, width: '100%' }}>
                        {[{ Icon: Heart, label: 'Apple', c: '#ff6b6b' }, { Icon: Activity, label: 'WHOOP', c: '#34d399' }, { Icon: Moon, label: 'Oura', c: '#a78bfa' }, { Icon: Flame, label: 'Garmin', c: '#fb923c' }, { Icon: Brain, label: 'Fitbit', c: '#60a5fa' }].map((d, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 12, background: `${d.c}18`, border: `1px solid ${d.c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <d.Icon size={16} color={d.c} />
                                </div>
                                <span style={{ fontSize: 9, color: '#636366', fontWeight: 600 }}>{d.label}</span>
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    const feat = features[idx];
    return (
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ animation: 'float 5s ease-in-out infinite' }}>
            <div style={{ background: F.cardGrad, border: `1px solid ${F.b}`, borderRadius: 24, padding: 28, boxShadow: `0 40px 100px rgba(0,0,0,0.35), 0 0 60px ${feat.color}15`, minHeight: 360, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* progress pills */}
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {features.map((_, i) => (
                        <motion.div key={i} animate={{ width: i === idx ? 28 : 8, background: i === idx ? feat.color : F.b }} transition={{ duration: 0.3 }} style={{ height: 4, borderRadius: 2 }} />
                    ))}
                </div>
                {/* content */}
                <AnimatePresence mode="wait">
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 13, background: `${feat.color}18`, border: `1px solid ${feat.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <feat.icon size={19} color={feat.color} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, color: F.t1, margin: 0, letterSpacing: '-0.02em' }}>{feat.title}</h3>
                                <p style={{ fontSize: 12, color: F.t2, margin: 0, lineHeight: 1.5, marginTop: 2 }}>{feat.subtitle}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                {/* visual */}
                <AnimatePresence mode="wait">
                    <motion.div key={`v${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ background: F.s2, borderRadius: 14, border: `1px solid ${F.b}`, overflow: 'hidden' }}>
                        {feat.visual}
                    </motion.div>
                </AnimatePresence>
                {/* cta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: F.t3, marginTop: 'auto' }}>
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: feat.color, fontSize: 14 }}>→</motion.span>
                    Connect your devices to get started — free
                </div>
            </div>
        </motion.div>
    );
}

function LandingPage({ onEnter }: { onEnter: () => void }) {
    const F = useTheme();
    const [hov, setHov] = React.useState(false);
    const [mag, setMag] = React.useState({ x: 0, y: 0 });
    const [spot, setSpot] = React.useState({ x: 50, y: 40 });
    const [scrollPct, setScrollPct] = React.useState(0);
    const rootRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const particles = React.useMemo(() => Array.from({ length: 35 }, (_, i) => ({
        id: i, left: Math.random() * 100, top: Math.random() * 100,
        size: Math.random() * 2.5 + 1, delay: Math.random() * 10, dur: Math.random() * 8 + 10, op: Math.random() * 0.35 + 0.1
    })), []);
    const marqueeItems = ['HRV · 84ms', 'SLEEP SCORE · 92', 'BURNOUT · LOW', 'RECOVERY · 97%', 'VO₂ MAX · 52.4', 'CORTISOL · OPTIMAL', 'DEEP SLEEP · 2h14m', 'RHR · 58bpm'].join('  ·  ');
    const feats: { icon: React.ElementType; title: string; desc: string }[] = [
        { icon: Brain, title: 'Explainable AI', desc: 'Every insight is backed by transparent biometric reasoning.' },
        { icon: Activity, title: 'Burnout Prediction', desc: 'Detect overreach 24 hours before you feel the effects.' },
        { icon: Link2, title: 'Wearable Fusion', desc: 'Oura, WHOOP, Garmin, and Apple Health in one layer.' },
    ];
    return (
        <div ref={rootRef} onMouseMove={(e) => { const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect(); setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }} style={{ minHeight: '100vh', background: F.bg, overflow: 'hidden', position: 'relative', color: F.t1 }}>
            <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}} @keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}} @keyframes shine{0%{background-position:-200% center}100%{background-position:200% center}} @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}} @keyframes grainShift{0%,100%{transform:translate(0,0)}10%{transform:translate(-1%,-2%)}30%{transform:translate(2%,1%)}50%{transform:translate(-1%,2%)}70%{transform:translate(1%,-1%)}90%{transform:translate(-2%,1%)}} @media (prefers-reduced-motion: reduce){*{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}}`}</style>
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.035, mixBlendMode: 'overlay', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")', backgroundSize: '120px 120px', animation: 'grainShift 1.2s steps(4) infinite' }} />
            {/* scroll progress bar */}
            <div style={{ position: 'fixed', top: 0, left: 0, height: 3, width: `${scrollPct}%`, background: `linear-gradient(90deg,${F.ac},#60a5fa)`, zIndex: 100, transition: 'width 0.1s linear', boxShadow: `0 0 12px ${F.ac}80` }} />
            {/* cursor spotlight */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, ${F.ac}0d, transparent 40%)`, transition: 'background 0.15s ease-out' }} />
            {/* particles */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                {particles.map(p => (
                    <motion.div key={p.id} style={{ position: 'absolute', left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, borderRadius: '50%', background: F.ac, opacity: p.op }}
                        animate={{ y: [-15, 15, -15], x: [-8, 8, -8], opacity: [p.op, p.op * 2.5, p.op] }}
                        transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }} />
                ))}
                {/* orbs */}
                <motion.div animate={{ x: [0, 70, -50, 0], y: [0, -60, 70, 0], scale: [1, 1.2, 0.85, 1] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-15%', left: '-8%', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${F.ac}16,transparent 65%)`, filter: 'blur(80px)' }} />
                <motion.div animate={{ x: [0, -60, 40, 0], y: [0, 80, -40, 0], scale: [1, 0.8, 1.15, 1] }} transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 }} style={{ position: 'absolute', bottom: '-10%', right: '-8%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${F.ac}10,transparent 65%)`, filter: 'blur(90px)' }} />
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '30%', right: '20%', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle,${F.ac}20,transparent 70%)`, filter: 'blur(40px)' }} />
            </div>
            {/* header */}
            <header style={{ padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(24px)', background: F.header, borderBottom: `1px solid ${F.b}`, position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <motion.div animate={{ boxShadow: [`0 0 10px ${F.ac}60`, `0 0 20px ${F.ac}90`, `0 0 10px ${F.ac}60`] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ width: 28, height: 28, borderRadius: 8, background: F.ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: F.bg, fontSize: 14 }}>A</motion.div>
                    <span style={{ fontWeight: 700, fontSize: 15, color: F.t1, letterSpacing: '-0.02em' }}>AuraTwin</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, color: F.t3, fontWeight: 500 }}>Adaptive Engine v4.2</span>
                    <motion.button onClick={onEnter} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} style={{ padding: '8px 22px', borderRadius: 20, background: F.ac, color: F.bg, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${F.ac}40` }}>Enter Workspace</motion.button>
                </div>
            </header>
            {/* hero split */}
            <section style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', padding: '100px 80px', minHeight: '88vh' }}>
                {/* left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${F.b}`, borderRadius: 20, padding: '6px 18px', fontSize: 11, color: F.ac, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, background: F.acDim, width: 'fit-content' }}>
                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: F.ac, display: 'inline-block' }} />
                        Live · AI Digital Twin
                    </motion.div>
                    <div style={{ lineHeight: 1.06 }}>
                        {(['Your health,', 'intelligently', 'understood.'] as const).map((line, li) => (
                            <div key={li} style={{ overflow: 'hidden' }}>
                                <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.2 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                                    <span style={li === 1 ? { fontSize: 72, fontWeight: 800, letterSpacing: '-0.05em', display: 'block', backgroundImage: `linear-gradient(100deg, ${F.ac} 20%, #5eead4 40%, ${F.ac} 60%, #5eead4 80%)`, backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'gradientShift 6s ease infinite', filter: `drop-shadow(0 0 30px ${F.ac}35)` } : { fontSize: 72, fontWeight: 800, letterSpacing: '-0.05em', color: F.t1, display: 'block' }}>{line}</span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} style={{ fontSize: 16, color: F.t2, maxWidth: 440, lineHeight: 1.8, margin: 0, fontWeight: 400 }}>
                        An AI digital twin that predicts your health trajectory and guides you toward optimal living — before issues arise.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button onClick={onEnter}
                            onMouseEnter={() => setHov(true)}
                            onMouseMove={(e) => { const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect(); setMag({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4 }); }}
                            onMouseLeave={() => { setHov(false); setMag({ x: 0, y: 0 }); }}
                            style={{ padding: '15px 40px', borderRadius: 24, background: `linear-gradient(100deg, ${F.ac} 40%, #5eead4 50%, ${F.ac} 60%)`, backgroundSize: '250% auto', animation: 'shine 5s linear infinite', color: F.bg, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transform: hov ? `scale(1.06) translate(${mag.x}px, ${mag.y}px)` : 'scale(1) translate(0,0)', transition: 'transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s', boxShadow: hov ? `0 16px 50px ${F.ac}60` : `0 6px 24px ${F.ac}30` }}>
                            Launch Ecosystem <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ display: 'flex' }}><ChevronRight size={15} /></motion.span>
                        </button>
                        <motion.button onClick={onEnter} whileHover={{ scale: 1.04, borderColor: F.ac, color: F.ac }} whileTap={{ scale: 0.96 }} style={{ padding: '15px 28px', borderRadius: 24, background: 'transparent', color: F.t1, fontWeight: 500, fontSize: 14, border: `1px solid ${F.b}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Play size={12} /> Demo
                        </motion.button>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} style={{ display: 'flex', gap: 24, paddingTop: 8 }}>
                        {[{ n: '92%', l: 'Wellness' }, { n: '84ms', l: 'HRV' }, { n: '12%', l: 'Burnout' }, { n: '97', l: 'Recovery' }].map((s, i) => (
                            <div key={i}>
                                <p style={{ fontSize: 22, fontWeight: 800, color: F.ac, margin: 0, letterSpacing: '-0.03em' }}>{s.n}</p>
                                <p style={{ fontSize: 10, color: F.t3, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{s.l}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
                {/* right — rotating feature showcase */}
                <FeatureShowcase />
            </section>
            {/* marquee */}
            <div style={{ borderTop: `1px solid ${F.b}`, borderBottom: `1px solid ${F.b}`, padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 1, background: F.s1 }}>
                <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 18s linear infinite', fontSize: 11, fontWeight: 600, color: F.t3, letterSpacing: '0.1em' }}>
                    {[marqueeItems, marqueeItems].join('  ·  ')}
                </div>
            </div>
            {/* features */}
            <section style={{ padding: '90px 80px', background: F.bg, position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: 60 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: F.ac, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Platform</p>
                        <h2 style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.04em', color: F.t1, margin: 0, lineHeight: 1.1 }}>Ecosystem<br /><span style={{ color: F.ac }}>Architecture</span></h2>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                        {feats.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
                                whileHover={{ y: -8, borderColor: F.ac, boxShadow: `0 24px 60px rgba(0,0,0,0.3), 0 0 40px ${F.ac}20` }}
                                style={{ background: F.s1, border: `1px solid ${F.b}`, borderRadius: 22, padding: '32px 28px', height: '100%', cursor: 'default' }}>
                                <motion.div animate={{ boxShadow: [`0 0 0px ${F.ac}00`, `0 0 20px ${F.ac}30`, `0 0 0px ${F.ac}00`] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1 }} whileHover={{ rotate: 8, scale: 1.08 }} style={{ width: 46, height: 46, borderRadius: 14, background: F.acDim, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    <f.icon size={20} color={F.ac} />
                                </motion.div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: F.t1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{f.title}</h3>
                                <p style={{ fontSize: 14, color: F.t2, lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <footer style={{ padding: '24px 80px', borderTop: `1px solid ${F.b}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, background: F.s1 }}>
                <span style={{ fontSize: 12, color: F.t3 }}>© 2026 AuraTwin Technologies Inc.</span>
                <span style={{ fontSize: 12, color: F.ac, fontWeight: 700 }}>All Rights Reserved.</span>
            </footer>
        </div>
    );
}

function Sidebar({ active, setActive, onLogout }: { active: string, setActive: (t: any) => void, onLogout: () => void }) {
    const F = useTheme();
    const links = [
        { id: 'dashboard', label: 'Dashboard', icon: <Activity size={15} /> },
        { id: 'twin', label: 'Wellness Twin', icon: <Sparkles size={15} /> },
        { id: 'timeline', label: 'Timeline', icon: <Calendar size={15} /> },
        { id: 'mood', label: 'Mood & Burnout', icon: <Brain size={15} /> },
        { id: 'journal', label: 'AI Journal', icon: <BookOpen size={15} /> },
        { id: 'sleep', label: 'Sleep & Fitness', icon: <Moon size={15} /> },
        { id: 'wearables', label: 'Integrations', icon: <Link2 size={15} /> },
        { id: 'peaks', label: 'Circadian Peaks', icon: <Sun size={15} /> },
        { id: 'cascade', label: 'Stress Cascade', icon: <Flame size={15} /> },
        { id: 'bioage', label: 'Biological Age', icon: <Heart size={15} /> },
    ];
    return (
        <aside style={{ width: 240, background: F.sidebar, borderRight: `1px solid ${F.sbBorder}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0', flexShrink: 0 }}>
            <div>
                <div style={{ padding: '0 24px 28px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${F.sbBorder}`, marginBottom: 24 }}>
                    <div style={{ position: 'relative', width: 34, height: 34, flexShrink: 0 }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: `conic-gradient(${F.ac}, #a78bfa, #60a5fa, ${F.ac})`, opacity: 0.5 }}
                        />
                        <div style={{ position: 'relative', width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${F.ac}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 15, boxShadow: `0 4px 16px ${F.ac}50` }}>A</div>
                    </div>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 14, color: F.t1, margin: 0, letterSpacing: '-0.02em' }}>AuraTwin</p>
                        <p style={{ fontSize: 9, color: F.t3, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Intelligence Platform</p>
                    </div>
                </div>
                <div style={{ padding: '0 12px', marginBottom: 8 }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: F.t4, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 12px 8px' }}>Navigation</p>
                </div>
                <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
                    {links.map(l => {
                        const on = active === l.id;
                        return (
                            <motion.button key={l.id} onClick={() => setActive(l.id)} whileHover={{ x: on ? 0 : 3 }} whileTap={{ scale: 0.97 }} style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: on ? F.t1 : F.t2, fontSize: 13, fontWeight: on ? 600 : 400, textAlign: 'left', overflow: 'hidden' }}>
                                {on && <motion.span layoutId="navActive" transition={{ type: 'spring', stiffness: 380, damping: 32 }} style={{ position: 'absolute', inset: 0, background: F.acDim, borderRadius: 10, borderLeft: `2px solid ${F.ac}` }} />}
                                <motion.span whileHover={{ scale: 1.15, rotate: on ? 0 : -6 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} style={{ position: 'relative', color: on ? F.ac : F.t3, transition: 'color 0.15s', display: 'flex' }}>{l.icon}</motion.span>
                                <span style={{ position: 'relative' }}>{l.label}</span>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>
            <div style={{ padding: '20px 12px', borderTop: `1px solid ${F.sbBorder}` }}>
                <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: F.t3, fontSize: 13, fontWeight: 400, transition: 'color 0.15s' }}>
                    <Settings size={15} /> Sign Out
                </button>
            </div>
        </aside>
    );
}

function Card({ children, style: s, glow }: { children: React.ReactNode, style?: React.CSSProperties, glow?: string }) {
    const F = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    const [sheen, setSheen] = useState({ x: 50, y: 50, on: false });
    const [entered, setEntered] = useState(false);
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setTilt({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 8 });
        setSheen({ x: px * 100, y: py * 100, on: true });
    };
    return (
        <motion.div
            ref={ref}
            className="card-shimmer"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: tilt.rx, rotateY: tilt.ry }}
            whileHover={{
                y: -6,
                scale: 1.008,
                borderColor: glow ? glow : `${F.ac}80`,
                boxShadow: glow
                    ? `0 0 0 1px ${glow}50, 0 28px 80px ${glow}40, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : `0 0 0 1px ${F.ac}40, 0 28px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`
            }}
            onMouseEnter={() => setEntered(true)}
            onMouseMove={onMove}
            onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setSheen(p => ({ ...p, on: false })); setEntered(false); }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: `linear-gradient(145deg, ${F.s1} 0%, ${F.s2}80 100%)`,
                border: `1px solid ${F.b}`,
                borderRadius: 22,
                padding: 28,
                boxShadow: glow ? `0 0 40px ${glow}30, 0 2px 8px rgba(0,0,0,0.4)` : '0 2px 8px rgba(0,0,0,0.35)',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                backdropFilter: 'blur(12px)',
                ...s
            }}
        >
            {/* conic shimmer spotlight */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                opacity: sheen.on ? 1 : 0, transition: 'opacity 0.4s ease',
                background: `radial-gradient(320px circle at ${sheen.x}% ${sheen.y}%, ${F.ac}16, rgba(167,139,250,0.06) 40%, transparent 65%)`
            }} />
            {/* top edge glow line */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, pointerEvents: 'none',
                opacity: entered ? 0.6 : 0, transition: 'opacity 0.4s ease',
                background: `linear-gradient(90deg, transparent, ${glow || F.ac}, transparent)`
            }} />
            <div style={{ position: 'relative' }}>{children}</div>
        </motion.div>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <p style={{ fontSize: 10, fontWeight: 600, color: '#636366', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{children}</p>;
}

function DashboardHome(_props: { sliders: any, setSliders: any }) {
    const F = useTheme();
    const score = 92;
    const [displayScore, setDisplayScore] = useState(0);
    useEffect(() => { let cur = 0; const t = setInterval(() => { cur += 2; if (cur >= score) { setDisplayScore(score); clearInterval(t); } else setDisplayScore(cur); }, 18); return () => clearInterval(t); }, []);
    const cards = [
        { icon: <Heart size={16} color="#ff6b6b" />, label: 'Resting HR', val: '58 bpm', badge: 'Optimal' },
        { icon: <Activity size={16} color={F.ac} />, label: 'HRV', val: '84 ms', badge: '+12%' },
        { icon: <Moon size={16} color="#60a5fa" />, label: 'Deep Sleep', val: '2h 14m', badge: 'Restful' },
        { icon: <Sliders size={16} color="#fb923c" />, label: 'Stress', val: '2 / 10', badge: '-18%' },
        { icon: <Battery size={16} color="#4ade80" />, label: 'Energy', val: '88%', badge: 'High' },
        { icon: <Brain size={16} color="#f472b6" />, label: 'Focus', val: 'High', badge: 'Clear' },
    ];
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 32, borderBottom: `1px solid ${F.sbBorder}` }}>
                <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: F.ac, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>Dashboard</p>
                    <h2 style={{ fontSize: 38, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>Good morning, Alex.</h2>
                    <p style={{ fontSize: 14, color: F.t2, margin: 0, fontWeight: 400 }}>Friday, July 17, 2026 · Your nervous system is primed for focus.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(48,209,88,0.07)', border: '1px solid rgba(48,209,88,0.15)', borderRadius: 20, padding: '8px 16px' }}>
                    <motion.span animate={{ opacity: [0.5, 1, 0.5], boxShadow: ['0 0 4px #30d158', '0 0 12px #30d158', '0 0 4px #30d158'] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#30d158', display: 'inline-block' }} />
                    <p style={{ fontSize: 12, color: '#30d158', margin: 0, fontWeight: 500 }}>Wearable Sync Active</p>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
                <Card glow="rgba(52,211,153,0.12)" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, padding: 32 }}>
                    <Label>Aggregate Wellness</Label>
                    <div style={{ position: 'relative', width: 170, height: 170 }}>
                        {/* outer ambient glow rings */}
                        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', inset: -12, borderRadius: '50%', background: `radial-gradient(circle, ${F.ac}30, transparent 70%)` }} />
                        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: `radial-gradient(circle, ${F.ac}20, transparent 70%)` }} />
                        <svg width="170" height="170" style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 12px ${F.ac}80) drop-shadow(0 0 28px ${F.ac}40)`, position: 'relative', zIndex: 1 }}>
                            <circle cx="85" cy="85" r="72" stroke="rgba(255,255,255,0.04)" strokeWidth="7" fill="none" />
                            {/* track glow */}
                            <circle cx="85" cy="85" r="72" stroke={`${F.ac}15`} strokeWidth="14" fill="none" />
                            <motion.circle cx="85" cy="85" r="72" stroke="url(#ringGrad)" strokeWidth="7" fill="none" strokeDasharray="452" initial={{ strokeDashoffset: 452 }} animate={{ strokeDashoffset: 452 - (452 * score / 100) }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} strokeLinecap="round" />
                            <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={F.ac} /><stop offset="100%" stopColor="#a78bfa" /></linearGradient></defs>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                            <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }} style={{ fontSize: 52, fontWeight: 800, color: F.t1, letterSpacing: '-0.05em', lineHeight: 1 }}>{displayScore}</motion.span>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: 10, color: F.ac, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginTop: 4 }}>Optimal</motion.span>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: '16px 0 0', borderTop: `1px solid ${F.sbBorder}` }}>
                        <p style={{ fontSize: 12, color: F.t2, margin: 0, lineHeight: 1.6 }}>Physical recovery <span style={{ color: '#30d158', fontWeight: 600 }}>+4%</span> vs. 7-day baseline</p>
                    </div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32 }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Sparkles size={14} color={F.ac} />
                                <span style={{ fontSize: 11, fontWeight: 700, color: F.ac, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Synthesis</span>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#30d158', background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.15)', borderRadius: 20, padding: '4px 12px' }}>94% Confidence</span>
                        </div>
                        <p style={{ fontSize: 15, color: '#aeaeb2', lineHeight: 1.75, margin: '0 0 24px', fontWeight: 300 }}>
                            Based on HRV drift overnight and consistent REM sleep, <strong style={{ color: F.t1, fontWeight: 600 }}>today is an exceptional recovery window.</strong> Your fatigue score is low — you're safe to engage in intense training.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {['Deep cognitive focus (10–13:00)', 'Aerobic power intervals (30–45 min)', 'Hydration target: 3.0 L', 'Wind-down routine by 21:30'].map((a, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12, color: F.t2, padding: '8px 12px', background: F.acDim, borderRadius: 10 }}>
                                    <CheckCircle size={13} color={F.ac} />{a}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 20, borderTop: `1px solid ${F.sbBorder}` }}>
                        <span style={{ fontSize: 11, color: F.t3 }}>Processed 8 min ago</span>
                        <button style={{ fontSize: 11, color: F.ac, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}><RefreshCw size={11} /> Recalculate</button>
                    </div>
                </Card>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14 }}>
                {cards.map((c, i) => {
                    const colors = ['#ff6b6b', F.ac, '#60a5fa', '#fb923c', '#4ade80', '#f472b6'];
                    const gc = colors[i];
                    return (
                        <Card key={i} glow={`${gc}40`} style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16, cursor: 'default' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <motion.div
                                    animate={{ boxShadow: [`0 0 0px ${gc}`, `0 0 12px ${gc}60`, `0 0 0px ${gc}`] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                                    style={{ width: 34, height: 34, borderRadius: 10, background: `${gc}12`, border: `1px solid ${gc}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >{c.icon}</motion.div>
                                <span style={{ fontSize: 9, fontWeight: 700, color: gc, letterSpacing: '0.08em', textTransform: 'uppercase', background: `${gc}12`, border: `1px solid ${gc}20`, borderRadius: 8, padding: '2px 7px' }}>{c.badge}</span>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontWeight: 600, color: F.t3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>{c.label}</p>
                                <p style={{ fontSize: 20, fontWeight: 700, color: F.t1, margin: 0, letterSpacing: '-0.02em' }}>{c.val}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </motion.div>
    );
}

function WellnessTwinView({ sliders, setSliders }: { sliders: any, setSliders: any }) {
    const F = useTheme();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const predicted = useMemo(() => {
        const { sleep, exercise, water, calories, stress } = sliders;
        const energy = Math.min(100, Math.max(10, Math.round(40 + sleep * 5 + exercise * 0.2 + water * 4 - stress * 6)));
        const burnout = Math.min(100, Math.max(0, Math.round(10 + stress * 14 - sleep * 3 - exercise * 0.1)));
        const sleepScore = Math.min(100, Math.max(20, Math.round(30 + sleep * 7 - stress * 3)));
        const weight = (74.2 - exercise * 0.015 + calories / 6000).toFixed(1);
        return { energy, burnout, sleepScore, weight };
    }, [sliders]);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        canvas.width = 420; canvas.height = 440;
        let angle = 0, id: number;
        interface N3 { x: number; y: number; z: number; name?: string; }
        const sk: N3[] = [{ x: 0, y: -100, z: 0, name: "Neural" }, { x: 0, y: -60, z: 0 }, { x: 0, y: -20, z: 0, name: "Cardio" }, { x: 0, y: 20, z: 0 }, { x: 0, y: 60, z: 0, name: "Core" }, { x: -30, y: -50, z: 0 }, { x: -60, y: -30, z: 0, name: "Vigor" }, { x: 30, y: -50, z: 0 }, { x: 60, y: -30, z: 0, name: "Metabolic" }, { x: -20, y: 80, z: 0 }, { x: -40, y: 140, z: 0 }, { x: 20, y: 80, z: 0 }, { x: 40, y: 140, z: 0 }];
        const draw = () => {
            ctx.clearRect(0, 0, 400, 420); angle += 0.006;
            const cx = 210, cy = 220;
            const AC = F.ac || '#34d399'; ctx.strokeStyle = AC + '28'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.ellipse(cx, cy + 150, 70, 25, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(cx, cy + 150, 110, 40, 0, 0, Math.PI * 2); ctx.stroke();
            const pn = sk.map(n => {
                const cos = Math.cos(angle), sin = Math.sin(angle);
                const rx = n.x * cos - n.z * sin, rz = n.x * sin + n.z * cos;
                const p = 300 / (300 + rz);
                return { px: cx + rx * p, py: cy + n.y * p, orig: n };
            });
            ctx.strokeStyle = AC + '45'; ctx.lineWidth = 1.5;
            const dl = (a: number, b: number) => { ctx.beginPath(); ctx.moveTo(pn[a].px, pn[a].py); ctx.lineTo(pn[b].px, pn[b].py); ctx.stroke(); };
            dl(0, 1); dl(1, 2); dl(2, 3); dl(3, 4); dl(1, 5); dl(5, 6); dl(1, 7); dl(7, 8); dl(4, 9); dl(9, 10); dl(4, 11); dl(11, 12);
            pn.forEach((n, i) => {
                const r = Math.sin(Date.now() / 200 + i) * 2 + 5;
                const outer = r * 8;
                const g2 = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, outer);
                g2.addColorStop(0, AC + '30'); g2.addColorStop(1, 'transparent');
                ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(n.px, n.py, outer, 0, Math.PI * 2); ctx.fill();
                const g = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, r);
                g.addColorStop(0, AC + 'ff'); g.addColorStop(0.5, AC + 'cc'); g.addColorStop(1, AC + '00');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.px, n.py, r, 0, Math.PI * 2); ctx.fill();
                if (n.orig.name) {
                    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = 'bold 10px monospace';
                    ctx.shadowColor = AC; ctx.shadowBlur = 6;
                    ctx.fillText(n.orig.name.toUpperCase(), n.px + 10, n.py + 4);
                    ctx.shadowBlur = 0;
                }
            });
            id = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(id);
    }, [F.ac]);
    const sliderDefs = [
        { key: 'sleep', label: 'Daily Rest', unit: 'hrs', min: 4, max: 12, step: 0.1 },
        { key: 'exercise', label: 'Athletic Load', unit: 'min', min: 0, max: 180, step: 5 },
        { key: 'water', label: 'Hydration', unit: 'L', min: 1, max: 5, step: 0.1 },
        { key: 'calories', label: 'Nutrient Intake', unit: 'kcal', min: 1200, max: 4000, step: 50 },
        { key: 'stress', label: 'Cognitive Load', unit: '/5', min: 1, max: 5, step: 1 },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Holographic Simulator</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Adjust variables to preview your predicted physiological trajectory.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 480, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 10, color: F.t2, background: F.s2, border: `1px solid ${F.b}`, borderRadius: 20, padding: '4px 12px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>Active Spatial View</div>
                    <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: F.t2, fontFamily: 'monospace', padding: '0 8px' }}>
                        <span>AZIMUTH: ROTATING</span><span>84.1 Hz</span>
                    </div>
                </Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <Card>
                        <p style={{ fontSize: 14, fontWeight: 600, color: F.t1, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}><Sliders size={14} color={F.ac} /> What-If Matrix</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            {sliderDefs.map(s => (
                                <div key={s.key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                                        <span style={{ color: F.t2 }}>{s.label}</span>
                                        <span style={{ color: F.ac, fontWeight: 600 }}>{sliders[s.key]}{s.unit}</span>
                                    </div>
                                    <input type="range" min={s.min} max={s.max} step={s.step} value={sliders[s.key]} onChange={e => setSliders({ ...sliders, [s.key]: s.step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value) })} />
                                </div>
                            ))}
                        </div>
                    </Card>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[
                            { label: 'Core Energy', val: `${predicted.energy}%`, color: F.ac },
                            { label: 'Burnout Risk', val: `${predicted.burnout}%`, color: '#fb923c' },
                            { label: 'Sleep Score', val: `${predicted.sleepScore}`, color: '#60a5fa' },
                            { label: 'Body Weight', val: `${predicted.weight} kg`, color: '#4ade80' },
                        ].map((p, i) => (
                            <Card key={i} style={{ padding: '16px 18px' }}>
                                <Label>{p.label}</Label>
                                <p style={{ fontSize: 24, fontWeight: 700, color: p.color, margin: 0, letterSpacing: '-0.02em' }}>{p.val}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function TimelineView() {
    const F = useTheme();
    const [range, setRange] = useState<'7' | '30' | '90'>('7');
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const scores = [78, 85, 72, 92, 88, 91, 95];
    const weekData = [
        { label: 'HRV', vals: [70, 80, 68, 84, 82, 88, 90], color: '#34d399', unit: 'ms' },
        { label: 'Sleep', vals: [75, 85, 65, 90, 80, 88, 92], color: '#60a5fa', unit: '%' },
        { label: 'Recovery', vals: [72, 82, 70, 92, 84, 90, 94], color: '#f472b6', unit: '%' },
    ];
    const trendPts = range === '7'
        ? [[0, 150], [100, 130], [200, 160], [300, 90], [400, 110], [500, 70], [600, 45]]
        : range === '30'
            ? [[0, 160], [80, 140], [160, 120], [240, 100], [320, 130], [400, 80], [480, 60], [560, 90], [600, 55]]
            : [[0, 170], [100, 150], [200, 130], [300, 110], [400, 120], [500, 80], [600, 40]];
    const pts = trendPts as [number, number][];
    const d = `M${pts.map(p => p.join(',')).join(' L')}`;
    const area = `${d} L600,200 L0,200 Z`;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: F.ac, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Timeline</p>
                    <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 4px', letterSpacing: '-0.03em' }}>Trend Analytics</h2>
                    <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Historical and predictive biometric modeling.</p>
                </div>
                <div style={{ display: 'flex', background: F.s2, border: `1px solid ${F.b}`, borderRadius: 20, padding: 4, gap: 2 }}>
                    {(['7', '30', '90'] as const).map(t => (
                        <motion.button key={t} onClick={() => setRange(t)} whileTap={{ scale: 0.95 }} style={{ padding: '7px 18px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: range === t ? F.ac : 'transparent', color: range === t ? F.bg : F.t2, transition: 'all 0.18s' }}>{t}d</motion.button>
                    ))}
                </div>
            </div>

            {/* week strip */}
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: F.t1, margin: 0 }}>Weekly Performance</p>
                    <span style={{ fontSize: 11, color: F.ac, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Sparkles size={10} /> AI Active</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
                    {days.map((d, i) => {
                        const s = scores[i]; const isToday = i === 3;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 10, fontWeight: 600, color: isToday ? F.ac : F.t3, letterSpacing: '0.08em' }}>{d}</span>
                                <div style={{ width: '100%', height: 80, background: F.s2, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: isToday ? `1px solid ${F.ac}` : '1px solid transparent' }}>
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${s}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: 'easeOut' }} style={{ background: isToday ? F.ac : `${F.ac}60`, borderRadius: 6, width: '100%' }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: isToday ? F.ac : F.t1 }}>{s}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>

            {/* trend chart */}
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: F.t1, margin: '0 0 2px' }}>Recovery Index · {range}d Trend</p>
                        <p style={{ fontSize: 11, color: F.t2, margin: 0 }}>Biometric & AI predictive overlay</p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {[{ l: 'Historical', c: F.ac }, { l: 'AI Forecast', c: '#60a5fa' }].map((leg, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 20, height: 2, background: leg.c, borderRadius: 1 }} />
                                <span style={{ fontSize: 10, color: F.t3, fontWeight: 600 }}>{leg.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ height: 200, position: 'relative' }}>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 33}%`, borderBottom: `1px dashed ${F.b}` }} />
                    ))}
                    <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                        <defs>
                            <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={F.ac} stopOpacity="0.25" />
                                <stop offset="100%" stopColor={F.ac} stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="futureLg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path d={area} fill="url(#lg2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
                        <motion.path d={d} fill="none" stroke={F.ac} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
                        <path d="M450,60 L500,40 L550,30 L600,20" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,3" strokeLinecap="round" />
                        {pts.map(([x, y], i) => (
                            <motion.circle key={i} cx={x} cy={y} r="4" fill={F.ac} stroke={F.bg} strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }} />
                        ))}
                        <circle cx={pts[3][0]} cy={pts[3][1]} r="7" fill={F.ac} stroke={F.bg} strokeWidth="2" />
                        <line x1={pts[3][0]} y1={pts[3][1]} x2={pts[3][0]} y2="200" stroke={`${F.ac}40`} strokeDasharray="4,4" />
                    </svg>
                    <div style={{ position: 'absolute', left: `${(pts[3][0] / 600) * 100}%`, top: -14, transform: 'translateX(-50%)' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: F.bg, background: F.ac, borderRadius: 20, padding: '3px 10px', whiteSpace: 'nowrap' }}>TODAY · 92%</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: F.t3, marginTop: 16 }}>
                    <span>Past</span><span style={{ color: F.t2, fontWeight: 600 }}>Today</span><span style={{ color: '#60a5fa' }}>AI Forecast →</span>
                </div>
            </Card>

            {/* multi-metric bars */}
            <Card>
                <p style={{ fontSize: 13, fontWeight: 700, color: F.t1, margin: '0 0 20px' }}>Multi-Metric Overview</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {weekData.map((m, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 12, color: F.t2, fontWeight: 500 }}>{m.label}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.vals[3]}{m.unit}</span>
                            </div>
                            <div style={{ height: 6, background: F.s2, borderRadius: 3, overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.vals[3]}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }} style={{ height: '100%', background: m.color, borderRadius: 3 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}

function MoodView() {
    const F = useTheme();
    const burnout = 14;
    const rc = 70, circ = 2 * Math.PI * rc, bOff = circ - (circ * burnout / 100);
    const emotions = [
        { day: 'M', mood: 72, color: '#34d399', emoji: '😊' }, { day: 'T', mood: 65, color: '#fbbf24', emoji: '😐' },
        { day: 'W', mood: 45, color: '#f87171', emoji: '😔' }, { day: 'T', mood: 94, color: '#34d399', emoji: '🤩' },
        { day: 'F', mood: 88, color: '#34d399', emoji: '😄' }, { day: 'S', mood: 78, color: '#60a5fa', emoji: '😌' },
        { day: 'S', mood: 82, color: '#a78bfa', emoji: '😊' },
    ];
    const factors = [
        { label: 'Autonomy', val: 88, c: '#34d399' }, { label: 'Social Energy', val: 74, c: '#60a5fa' },
        { label: 'Cognitive Load', val: 62, c: '#fb923c' }, { label: 'Recovery Quality', val: 91, c: '#a78bfa' },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Psychological Layer</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Mood & Burnout</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Biometric and sentiment fusion for psychological balance.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
                <Card glow="#30d15820" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 28 }}>
                    <Label>Burnout Risk Index</Label>
                    <div style={{ position: 'relative', width: 160, height: 160, marginTop: 8 }}>
                        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, #30d15830, transparent 70%)' }} />
                        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 10px #30d15880)' }}>
                            <circle cx="80" cy="80" r={rc} stroke={F.b} strokeWidth="8" fill="none" />
                            <circle cx="80" cy="80" r={rc} stroke="#30d15815" strokeWidth="14" fill="none" />
                            <motion.circle cx="80" cy="80" r={rc} stroke="#30d158" strokeWidth="8" fill="none" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: bOff }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }} style={{ fontSize: 42, fontWeight: 800, color: '#30d158', letterSpacing: '-0.04em' }}>{burnout}%</motion.span>
                            <span style={{ fontSize: 9, color: '#30d158', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Low Risk</span>
                        </div>
                    </div>
                    <div style={{ width: '100%', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${F.b}` }}>
                        <p style={{ fontSize: 12, color: F.t2, margin: 0, lineHeight: 1.7 }}>Dropped <span style={{ color: '#30d158', fontWeight: 600 }}>6%</span> in 24h · HRV optimal</p>
                    </div>
                </Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Card>
                        <Label>7-Day Mood Heatmap</Label>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            {emotions.map((e, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 24 }} whileHover={{ scale: 1.08, y: -3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 9, color: F.t3, fontWeight: 600 }}>{e.day}</span>
                                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: 12, background: `${e.color}15`, border: `1px solid ${e.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px ${e.color}20` }}>
                                        <span style={{ fontSize: 18 }}>{e.emoji}</span>
                                    </div>
                                    <div style={{ width: '100%', height: 3, background: F.s2, borderRadius: 2 }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${e.mood}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }} style={{ height: '100%', background: e.color, borderRadius: 2, boxShadow: `0 0 5px ${e.color}` }} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                    <Card>
                        <Label>Psychological Drivers</Label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                            {factors.map((f, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, color: F.t1, fontWeight: 500 }}>{f.label}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: f.c }}>{f.val}</span>
                                    </div>
                                    <div style={{ height: 4, background: F.s2, borderRadius: 2, overflow: 'hidden' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${f.val}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} style={{ height: '100%', background: `linear-gradient(90deg, ${f.c}88, ${f.c})`, borderRadius: 2, boxShadow: `0 0 8px ${f.c}60` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}


function JournalView() {
    const F = useTheme();
    const [txt, setTxt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const analyze = () => {
        if (!txt.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const t = txt.toLowerCase();
            let sentiment = 'Stable', score = 78, advice = 'Your thought dynamics look healthy.';
            if (t.includes('tired') || t.includes('stress') || t.includes('burnout')) { sentiment = 'Exhausted'; score = 42; advice = 'Restrict mental processing by 21:00.'; }
            else if (t.includes('happy') || t.includes('good') || t.includes('great')) { sentiment = 'Joyful'; score = 94; advice = 'Push creative workflow boundaries today.'; }
            setResult({ sentiment, score, advice }); setLoading(false);
        }, 1200);
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>AI Journal</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Write freely. AuraTwin translates thoughts into physiological variables.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Card>
                    <textarea value={txt} onChange={e => setTxt(e.target.value)} placeholder="How are you feeling today..." rows={7} style={{ width: '100%', background: 'transparent', border: 'none', resize: 'none', color: F.t1, fontSize: 14, lineHeight: 1.7, outline: 'none', fontFamily: 'inherit', borderBottom: `1px solid ${F.b}`, paddingBottom: 16, marginBottom: 16 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            <button style={{ padding: 8, borderRadius: 8, background: F.s2, border: `1px solid ${F.b}`, cursor: 'pointer', color: F.t2 }}><Mic size={13} /></button>
                            <button style={{ padding: 8, borderRadius: 8, background: F.s2, border: `1px solid ${F.b}`, cursor: 'pointer', color: F.t2 }}><ImageIcon size={13} /></button>
                        </div>
                        <button onClick={analyze} disabled={loading || !txt.trim()} style={{ padding: '8px 18px', borderRadius: 20, background: txt.trim() && !loading ? F.ac : F.s2, color: txt.trim() && !loading ? F.bg : F.t2, border: 'none', cursor: txt.trim() && !loading ? 'pointer' : 'not-allowed', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                            {loading ? 'Analyzing...' : 'Generate Insights'}<Sparkles size={12} />
                        </button>
                    </div>
                </Card>
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                            <Card style={{ height: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                    <Sparkles size={13} color={F.ac} />
                                    <Label>Cognitive Synthesizer</Label>
                                </div>
                                <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${F.b}` }}>
                                    <Label>Emotional Vector</Label>
                                    <p style={{ fontSize: 22, fontWeight: 700, color: F.t1, margin: 0, letterSpacing: '-0.02em' }}>{result.sentiment}</p>
                                </div>
                                <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${F.b}` }}>
                                    <Label>Coherence Score</Label>
                                    <p style={{ fontSize: 22, fontWeight: 700, color: F.ac, margin: 0, letterSpacing: '-0.02em' }}>{result.score}<span style={{ fontSize: 14, color: F.t2 }}>/100</span></p>
                                </div>
                                <p style={{ fontSize: 13, color: F.t2, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"{result.advice}"</p>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
                                <Sparkles size={24} color={F.b} />
                                <p style={{ fontSize: 13, color: F.t2, margin: 0, lineHeight: 1.6 }}>Write in the journal and click <span style={{ color: F.ac }}>Generate Insights</span> to activate semantic modeling.</p>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function SleepView() {
    const F = useTheme();
    const stages = [
        { label: 'Awake', dur: '0h 18m', pct: 5, color: '#f87171', from: 0, width: 5 },
        { label: 'Light', dur: '2h 30m', pct: 31, color: '#818cf8', from: 5, width: 31 },
        { label: 'Deep', dur: '1h 48m', pct: 22, color: '#60a5fa', from: 36, width: 22 },
        { label: 'REM', dur: '2h 14m', pct: 28, color: '#34d399', from: 58, width: 28 },
        { label: 'Light', dur: '1h 10m', pct: 14, color: '#818cf8', from: 86, width: 14 },
    ];
    const metrics = [
        { label: 'Active Cal', v: '680', unit: '/ 700 kcal', c: '#fb923c', pct: 97 },
        { label: 'Steps', v: '11,240', unit: '/ 10k', c: '#34d399', pct: 112 },
        { label: 'Active Min', v: '58', unit: '/ 60 min', c: '#60a5fa', pct: 97 },
        { label: 'VO₂ Max', v: '52.4', unit: 'mL/kg/min', c: '#a78bfa', pct: 90 },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Recovery Engine</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Sleep & Fitness</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>8h 00m total · Sleep score <span style={{ color: '#34d399', fontWeight: 600 }}>92 / 100</span></p>
            </div>
            {/* Sleep architecture timeline */}
            <Card glow="#60a5fa20">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: F.t1, margin: '0 0 2px' }}>Sleep Architecture</p>
                        <p style={{ fontSize: 10, color: F.t3, margin: 0 }}>22:45 – 06:45 · Oura Ring Gen3</p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {[{ l: 'REM', c: '#34d399' }, { l: 'Deep', c: '#60a5fa' }, { l: 'Light', c: '#818cf8' }].map((lg, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: lg.c, boxShadow: `0 0 6px ${lg.c}` }} />
                                <span style={{ fontSize: 10, color: F.t3, fontWeight: 600 }}>{lg.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Timeline bar */}
                <div style={{ height: 32, borderRadius: 8, overflow: 'hidden', display: 'flex', position: 'relative', marginBottom: 10, background: F.s2 }}>
                    {stages.map((s, i) => (
                        <motion.div key={i} initial={{ width: 0 }} animate={{ width: `${s.width}%` }} transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: '100%', background: s.color, opacity: 0.85, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)' }} />
                        </motion.div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    {['22:45', '00:30', '02:15', '04:00', '05:45', '06:45'].map(t => (
                        <span key={t} style={{ fontSize: 9, color: F.t3, fontWeight: 600 }}>{t}</span>
                    ))}
                </div>
                {/* Stage bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {stages.filter((s, i, arr) => arr.findIndex(x => x.label === s.label) === i).map((s, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <span style={{ fontSize: 12, color: F.t1, fontWeight: 500 }}>{s.label} Sleep</span>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <span style={{ fontSize: 11, color: s.color, fontWeight: 700 }}>{s.pct}%</span>
                                    <span style={{ fontSize: 11, color: F.t3 }}>{s.dur}</span>
                                </div>
                            </div>
                            <div style={{ height: 5, background: F.s2, borderRadius: 3, overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ height: '100%', background: `linear-gradient(90deg, ${s.color}aa, ${s.color})`, borderRadius: 3, boxShadow: `0 0 8px ${s.color}60` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            {/* Activity metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {metrics.map((m, i) => (
                    <Card key={i} glow={`${m.c}40`} style={{ padding: '20px 18px', textAlign: 'center' }}>
                        <motion.div animate={{ boxShadow: [`0 0 0px ${m.c}`, `0 0 16px ${m.c}50`, `0 0 0px ${m.c}`] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                            style={{ width: 40, height: 40, borderRadius: 12, background: `${m.c}15`, border: `1px solid ${m.c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <circle cx="9" cy="9" r="7" stroke={`${m.c}40`} strokeWidth="2" fill="none" />
                                <motion.circle cx="9" cy="9" r="7" stroke={m.c} strokeWidth="2" fill="none"
                                    strokeDasharray="44" initial={{ strokeDashoffset: 44 }} animate={{ strokeDashoffset: 44 - (44 * Math.min(m.pct, 100) / 100) }}
                                    transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '9px 9px' }} />
                            </svg>
                        </motion.div>
                        <p style={{ fontSize: 9, color: F.t3, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 4px' }}>{m.label}</p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: F.t1, margin: '0 0 2px', letterSpacing: '-0.02em' }}>{m.v}</p>
                        <p style={{ fontSize: 9, color: m.c, margin: 0, fontWeight: 600 }}>{m.unit}</p>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
}

function WearablesView() {
    const F = useTheme();
    const [items, setItems] = useState([
        { id: 'oura', name: 'Oura Ring', desc: 'Sleep, HRV, core temperature.', on: true },
        { id: 'apple', name: 'Apple Health', desc: 'Steps, heart rate, workouts.', on: true },
        { id: 'whoop', name: 'WHOOP Band', desc: 'Strain indexes and recovery.', on: false },
        { id: 'garmin', name: 'Garmin', desc: 'GPS workouts and cardiac data.', on: false },
    ]);
    const toggle = (id: string) => setItems(items.map(i => i.id === id ? { ...i, on: !i.on } : i));
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Integrations</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Manage sensor data feeding your AuraTwin core.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {items.map(item => (
                    <Card key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: 15, fontWeight: 600, color: F.t1, margin: '0 0 4px' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: F.t2, margin: 0 }}>{item.desc}</p>
                        </div>
                        <motion.button onClick={() => toggle(item.id)} whileTap={{ scale: 0.92 }} style={{ width: 44, height: 26, borderRadius: 13, background: item.on ? F.ac : F.toggleOff, border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.25s' }}>
                            <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 32 }} style={{ position: 'absolute', top: 3, left: item.on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: item.on ? F.thumbOn : F.thumbOff }} />
                        </motion.button>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
}

function AuthScreen({ onLogin }: { onLogin: () => void }) {
    const F = useTheme();
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: F.bg, padding: 24 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 360, background: F.s1, border: `1px solid ${F.b}`, borderRadius: 24, padding: 36 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: F.ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#000', fontSize: 18, margin: '0 auto 16px' }}>A</div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: F.t1, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Welcome back</h2>
                    <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Sign in to your AuraTwin workspace.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button onClick={onLogin} style={{ width: '100%', padding: '12px', borderRadius: 14, background: F.t1, color: '#000', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <User size={14} /> Continue with Apple
                    </button>
                    <button onClick={onLogin} style={{ width: '100%', padding: '12px', borderRadius: 14, background: F.s2, color: F.t2, fontWeight: 500, fontSize: 13, border: `1px solid ${F.b}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <LogIn size={14} /> Continue with Google
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
                        <div style={{ flex: 1, height: 1, background: F.b }} /><span style={{ fontSize: 10, color: F.t2, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>or</span><div style={{ flex: 1, height: 1, background: F.b }} />
                    </div>
                    <input type="email" placeholder="Email address" style={{ width: '100%', background: F.s2, border: `1px solid ${F.b}`, borderRadius: 14, padding: '12px 16px', fontSize: 13, color: F.t1, outline: 'none', fontFamily: 'inherit' }} />
                    <button onClick={onLogin} style={{ width: '100%', padding: '12px', borderRadius: 14, background: F.ac, color: '#000', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>Continue</button>
                </div>
            </motion.div>
        </div>
    );
}

function ChatDrawer({ onClose }: { onClose: () => void }) {
    const F = useTheme();
    const [msgs, setMsgs] = useState([
        { id: 1, from: 'ai', text: "Hello Alex. Ask about your sleep, burnout status, or run a what-if trajectory." }
    ]);
    const [inp, setInp] = useState('');
    const send = () => {
        if (!inp.trim()) return;
        const user = { id: Date.now(), from: 'user', text: inp };
        setMsgs(p => [...p, user]); setInp('');
        setTimeout(() => {
            const l = inp.toLowerCase();
            let reply = "Adjust sliders in Wellness Twin to preview energy drift.";
            if (l.includes('sleep')) reply = "Sleep score up 14% this week. Maintain wind-down by 21:30.";
            else if (l.includes('burnout')) reply = "Burnout score: 14%. HRV at 84ms — nervous system in healthy state.";
            setMsgs(p => [...p, { id: Date.now() + 1, from: 'ai', text: reply }]);
        }, 900);
    };
    return (
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', bottom: 64, right: 0, width: 360, height: 460, background: F.s1, border: `1px solid ${F.b}`, borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${F.b}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles size={14} color={F.ac} />
                    <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: F.t1, margin: 0 }}>AuraTwin AI</p>
                        <p style={{ fontSize: 9, color: '#30d158', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Active</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ fontSize: 12, color: F.t2, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {msgs.map(m => (
                    <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 14, background: m.from === 'user' ? F.ac : F.s2, color: m.from === 'user' ? '#000' : F.t2, fontSize: 12, lineHeight: 1.6, borderTopRightRadius: m.from === 'user' ? 4 : 14, borderTopLeftRadius: m.from === 'ai' ? 4 : 14 }}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ padding: '10px 12px', borderTop: `1px solid ${F.b}`, display: 'flex', gap: 8 }}>
                <input type="text" placeholder="Ask AuraTwin..." value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1, background: F.s2, border: `1px solid ${F.b}`, borderRadius: 12, padding: '9px 14px', fontSize: 12, color: F.t1, outline: 'none', fontFamily: 'inherit' }} />
                <button onClick={send} style={{ width: 36, height: 36, borderRadius: 10, background: F.ac, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                    <Send size={13} />
                </button>
            </div>
        </motion.div>
    );
}

function CircadianPeaksView() {
    const F = useTheme();
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const cogData = [10, 8, 5, 3, 2, 2, 4, 6, 8, 9, 10, 9, 8, 7, 6, 7, 8, 9, 8, 6, 5, 4, 3, 2];
    const phyData = [4, 3, 2, 2, 2, 3, 5, 7, 8, 9, 9, 8, 7, 9, 10, 9, 8, 6, 5, 4, 3, 2, 2, 1];
    const creData = [3, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 2, 2];
    const now = new Date().getHours();
    const zones = [
        { label: 'Deep Focus', start: 9, end: 12, color: '#34d399', desc: 'Peak prefrontal cortex activation. Ideal for analytical work.' },
        { label: 'Physical Peak', start: 14, end: 16, color: '#fb923c', desc: 'Core temperature and muscle strength at maximum.' },
        { label: 'Creative Flow', start: 13, end: 14, color: '#a78bfa', desc: 'Divergent thinking peaks. Best for ideation and problem solving.' },
        { label: 'Wind Down', start: 21, end: 23, color: '#60a5fa', desc: 'Melatonin onset. Restrict screens and stimulation.' },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: F.ac, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Circadian Intelligence</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Peak Performance Windows</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Your chronotype-calibrated cognitive, physical, and creative energy across 24 hours.</p>
            </div>
            <Card glow="#34d39930">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: F.t1, margin: '0 0 2px' }}>24-Hour Energy Bands</p>
                        <p style={{ fontSize: 10, color: F.t3, margin: 0, fontWeight: 500 }}>Live chronotype calibration active</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        {[{ l: 'Cognitive', c: '#34d399' }, { l: 'Physical', c: '#fb923c' }, { l: 'Creative', c: '#a78bfa' }].map((lg, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <motion.div animate={{ boxShadow: [`0 0 4px ${lg.c}`, `0 0 10px ${lg.c}`, `0 0 4px ${lg.c}`] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} style={{ width: 8, height: 8, borderRadius: '50%', background: lg.c }} />
                                <span style={{ fontSize: 11, color: F.t3, fontWeight: 600 }}>{lg.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bar chart with neon glow and scan line */}
                <div style={{ position: 'relative', paddingTop: 20 }}>
                    {/* scan line animation */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 24, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${F.ac}80, transparent)`, animation: 'scanLine 4s linear infinite' }} />
                    </div>
                    <svg style={{ position: 'absolute', top: 20, left: 0, right: 0, bottom: 24, width: '100%', height: 80, pointerEvents: 'none', zIndex: 0 }}>
                        <defs>
                            <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={F.b} stopOpacity="0.5" /><stop offset="100%" stopColor={F.b} stopOpacity="0" /></linearGradient>
                        </defs>
                        {[25, 50, 75, 100].map(p => <line key={p} x1="0" y1={`${100 - p}%`} x2="100%" y2={`${100 - p}%`} stroke="url(#gridFade)" strokeWidth="0.5" />)}
                    </svg>
                    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 80, position: 'relative', zIndex: 1, marginBottom: 8 }}>
                        {hours.map(h => (
                            <div key={h} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
                                {h === now && (
                                    <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', fontSize: 7, fontWeight: 800, color: F.ac, whiteSpace: 'nowrap', background: `${F.ac}18`, border: `1px solid ${F.ac}60`, borderRadius: 4, padding: '2px 5px', letterSpacing: '0.05em' }}>NOW</div>
                                )}
                                <div style={{ display: 'flex', gap: 1, height: 80, alignItems: 'flex-end' }}>
                                    {[cogData[h], phyData[h], creData[h]].map((v, ci) => {
                                        const cols = ['#34d399', '#fb923c', '#a78bfa'];
                                        const c = cols[ci];
                                        return (
                                            <motion.div key={ci}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${v * 10}%` }}
                                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: h * 0.01 + ci * 0.05 }}
                                                style={{ flex: 1, borderRadius: '2px 2px 0 0', background: `linear-gradient(to top, ${c}cc, ${c}44)`, boxShadow: h === now ? `0 0 6px ${c}cc` : 'none', position: 'relative' }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
                            <span key={h} style={{ fontSize: 9, color: F.t3, fontWeight: 600 }}>{h}:00</span>
                        ))}
                    </div>
                </div>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                {zones.map((z, i) => (
                    <Card key={i} style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 10, height: 10, borderRadius: '50%', background: z.color, boxShadow: `0 0 8px ${z.color}` }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: F.t1 }}>{z.label}</span>
                            <span style={{ marginLeft: 'auto', fontSize: 11, color: z.color, fontWeight: 600 }}>{z.start}:00–{z.end}:00</span>
                        </div>
                        <p style={{ fontSize: 12, color: F.t2, margin: 0, lineHeight: 1.7 }}>{z.desc}</p>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
}

function StressCascadeView() {
    const F = useTheme();
    const [hovered, setHovered] = useState<string | null>(null);
    const [tick, setTick] = useState(0);
    useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 50); return () => clearInterval(t); }, []);

    const nodes = [
        { id: 'sleep', label: 'POOR SLEEP', val: 68, color: '#34d399', cx: 50, cy: 12 },
        { id: 'hrv', label: 'HRV DROP', val: 52, color: '#34d399', cx: 22, cy: 35 },
        { id: 'cortisol', label: 'CORTISOL', val: 74, color: '#34d399', cx: 72, cy: 35 },
        { id: 'focus', label: 'FOCUS LOSS', val: 61, color: '#34d399', cx: 22, cy: 62 },
        { id: 'burnout', label: 'BURNOUT', val: 14, color: '#34d399', cx: 72, cy: 62 },
        { id: 'mood', label: 'MOOD DIP', val: 45, color: '#34d399', cx: 50, cy: 85 },
    ];
    const edges: [string, string][] = [['sleep', 'hrv'], ['sleep', 'cortisol'], ['hrv', 'focus'], ['cortisol', 'burnout'], ['focus', 'mood'], ['burnout', 'mood']];

    const metrics = [
        { label: 'Poor Sleep', val: 68, color: '#60a5fa', emoji: '😴' },
        { label: 'HRV Drop', val: 52, color: '#f472b6', emoji: '💓' },
        { label: 'Cortisol ↑', val: 74, color: '#fb923c', emoji: '⚡' },
        { label: 'Focus Loss', val: 61, color: '#a78bfa', emoji: '🧠' },
        { label: 'Burnout Risk', val: 14, color: '#34d399', emoji: '🔥' },
        { label: 'Mood Dip', val: 45, color: '#fbbf24', emoji: '🌧️' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Predictive Modeling</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Stress Cascade Map</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>How one physiological stressor bleeds into downstream domains. Today's overall risk is <span style={{ color: '#34d399', fontWeight: 600 }}>LOW (14%)</span>.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Spatial glowing node graph */}
                <Card glow="#34d39920" style={{ padding: 0, overflow: 'hidden', background: '#000', minHeight: 440 }}>
                    {/* header badge */}
                    <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '5px 14px', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Active Spatial View</div>
                    {/* bottom badges */}
                    <div style={{ position: 'absolute', bottom: 16, left: 20, zIndex: 10, fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Azimuth: Rotating</div>
                    <div style={{ position: 'absolute', bottom: 16, right: 20, zIndex: 10, fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.12em' }}>84.1 Hz</div>
                    {/* progress bar */}
                    <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', width: 60, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, zIndex: 10, overflow: 'hidden' }}>
                        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg, transparent, #34d399, transparent)', borderRadius: 2 }} />
                    </div>
                    {/* ellipse ground ring */}
                    <svg style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', opacity: 0.18, zIndex: 1 }} width="200" height="50" viewBox="0 0 200 50">
                        <ellipse cx="100" cy="25" rx="90" ry="22" fill="none" stroke="#34d399" strokeWidth="0.8" />
                        <ellipse cx="100" cy="25" rx="70" ry="15" fill="none" stroke="#34d399" strokeWidth="0.4" />
                    </svg>
                    {/* SVG node network */}
                    <svg width="100%" height="440" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                        <defs>
                            <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                            <filter id="glowStrong"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                        </defs>
                        {/* edges */}
                        {edges.map(([a, b], i) => {
                            const na = nodes.find(n => n.id === a)!;
                            const nb = nodes.find(n => n.id === b)!;
                            const lit = hovered === a || hovered === b;
                            return (
                                <g key={i}>
                                    <line x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy} stroke="rgba(52,211,153,0.12)" strokeWidth="0.6" />
                                    {lit && <line x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy} stroke="#34d399" strokeWidth="0.7" filter="url(#glow)" opacity="0.9" />}
                                </g>
                            );
                        })}
                        {/* nodes */}
                        {nodes.map((n, i) => {
                            const lit = hovered === n.id;
                            const pulse = Math.sin((tick / 20) + i * 1.2) * 0.5 + 0.5;
                            return (
                                <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => setHovered(hovered === n.id ? null : n.id)}>
                                    {/* outer glow ring */}
                                    <circle cx={n.cx} cy={n.cy} r={lit ? 6 : 4 + pulse * 1.5} fill="none" stroke="#34d399" strokeWidth="0.4" opacity={lit ? 0.8 : 0.2 + pulse * 0.3} filter="url(#glow)" />
                                    {/* inner fill */}
                                    <circle cx={n.cx} cy={n.cy} r="2.5" fill="#34d399" opacity={lit ? 1 : 0.7 + pulse * 0.3} filter={lit ? "url(#glowStrong)" : "url(#glow)"} />
                                    {/* label */}
                                    <text x={n.cx} y={n.cy - 6} textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.7)" fontWeight="700" letterSpacing="0.08em" style={{ fontFamily: 'monospace' }}>{n.label}</text>
                                </g>
                            );
                        })}
                    </svg>
                    {/* hover zones */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
                        {nodes.map(n => (
                            <div key={n.id} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
                                style={{ position: 'absolute', left: `${n.cx}%`, top: `${n.cy * 4.4}px`, transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }} />
                        ))}
                    </div>
                </Card>

                {/* Metrics panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {metrics.map((n, i) => (
                        <motion.div key={i} whileHover={{ x: 6, scale: 1.01 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: F.s1, border: `1px solid ${F.b}`, borderRadius: 14, cursor: 'default', position: 'relative', overflow: 'hidden' }}>
                            {/* left glow bar */}
                            <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, background: n.color, borderRadius: 2, boxShadow: `0 0 8px ${n.color}`, opacity: 0.8 }} />
                            <span style={{ fontSize: 20 }}>{n.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: F.t1 }}>{n.label}</span>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: n.color, fontVariantNumeric: 'tabular-nums' }}>{n.val}%</span>
                                </div>
                                <div style={{ height: 3, background: F.s2, borderRadius: 2, overflow: 'hidden' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${n.val}%` }} transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ height: '100%', background: `linear-gradient(90deg, ${n.color}cc, ${n.color})`, borderRadius: 2, boxShadow: `0 0 6px ${n.color}80` }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


function BiologicalAgeView() {
    const F = useTheme();
    const chronoAge = 27;
    const bioAge = 23.4;
    const diff = +(chronoAge - bioAge).toFixed(1);
    const [display, setDisplay] = useState(chronoAge);
    useEffect(() => {
        let cur = chronoAge;
        const t = setInterval(() => { cur -= 0.1; if (cur <= bioAge) { setDisplay(+bioAge.toFixed(1)); clearInterval(t); } else setDisplay(+cur.toFixed(1)); }, 30);
        return () => clearInterval(t);
    }, []);
    const drivers = [
        { label: 'Cardiovascular Fitness', score: 94, delta: '+8', color: '#34d399', note: 'VO₂ max 52.4 — top 5% for age bracket' },
        { label: 'Sleep Architecture', score: 88, delta: '+5', color: '#60a5fa', note: 'REM efficiency above population median' },
        { label: 'Metabolic Health', score: 82, delta: '+3', color: '#a78bfa', note: 'Resting glucose & insulin sensitivity optimal' },
        { label: 'HRV Baseline', score: 79, delta: '+2', color: '#34d399', note: '84ms — above age norm of 62ms' },
        { label: 'Inflammatory Markers', score: 91, delta: '+6', color: '#fbbf24', note: 'CRP proxy low — recovery efficient' },
        { label: 'Stress Resilience', score: 76, delta: '-1', color: '#fb923c', note: 'Elevated cortisol response Mon–Wed detected' },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ paddingBottom: 24, borderBottom: `1px solid ${F.b}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>Longevity Engine</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: F.t1, margin: '0 0 6px', letterSpacing: '-0.03em' }}>Biological Age</h2>
                <p style={{ fontSize: 13, color: F.t2, margin: 0 }}>Your body is aging slower than your birth year suggests. Here's what's driving it.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: 32, textAlign: 'center' }}>
                    <Label>Biological Age</Label>
                    <div style={{ position: 'relative', width: 160, height: 160 }}>
                        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 20px #a78bfa50)' }}>
                            <circle cx="80" cy="80" r="68" stroke="rgba(255,255,255,0.04)" strokeWidth="7" fill="none" />
                            <motion.circle cx="80" cy="80" r="68" stroke="url(#bioGrad)" strokeWidth="7" fill="none" strokeDasharray="427"
                                initial={{ strokeDashoffset: 427 }} animate={{ strokeDashoffset: 427 - (427 * bioAge / chronoAge) }}
                                transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }} strokeLinecap="round" />
                            <defs><linearGradient id="bioGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#34d399" /></linearGradient></defs>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 48, fontWeight: 800, color: F.t1, letterSpacing: '-0.05em', lineHeight: 1 }}>{display}</span>
                            <span style={{ fontSize: 10, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginTop: 4 }}>Bio Years</span>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: '16px 0 0', borderTop: `1px solid ${F.b}` }}>
                        <p style={{ fontSize: 13, color: F.t2, margin: '0 0 6px', lineHeight: 1.6 }}>Chronological age: <strong style={{ color: F.t1 }}>{chronoAge}</strong></p>
                        <p style={{ fontSize: 26, fontWeight: 800, color: '#34d399', margin: 0 }}>−{diff} years</p>
                        <p style={{ fontSize: 10, color: F.t3, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>younger than calendar</p>
                    </div>
                </Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {drivers.map((d, i) => (
                        <Card key={i} style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: F.t1 }}>{d.label}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: d.delta.startsWith('+') ? '#34d399' : '#fb923c' }}>{d.delta} yr</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.score}</span>
                                </div>
                            </div>
                            <div style={{ height: 4, background: F.s2, borderRadius: 2, marginBottom: 8 }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${d.score}%` }} transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }} style={{ height: '100%', background: d.color, borderRadius: 2 }} />
                            </div>
                            <p style={{ fontSize: 11, color: F.t3, margin: 0 }}>{d.note}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}