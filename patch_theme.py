
import re

with open('a.tsx', 'r') as f:
    c = f.read()

NEW_FS = '''function FeatureShowcase() {
    const F = useTheme();
    const [idx, setIdx] = React.useState(0);
    React.useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%3),3800); return ()=>clearInterval(t); },[]);

    const features = [
        {
            icon: Brain, color:'#34d399',
            title:'AI That Thinks Ahead',
            subtitle:'Predictive intelligence across every health dimension',
            visual: (
                <div style={{padding:'16px 20px',height:130,position:'relative',overflow:'hidden'}}>
                    {/* animated wave line */}
                    <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.2"/>
                                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        <motion.path d="M0,70 C40,50 80,30 120,45 C160,60 200,20 240,30 C260,35 270,30 280,28" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4,ease:'easeInOut'}}/>
                        <motion.path d="M0,70 C40,50 80,30 120,45 C160,60 200,20 240,30 C260,35 270,30 280,28 L280,100 L0,100 Z" fill="url(#wg)" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.5}}/>
                        {[{cx:0,cy:70},{cx:120,cy:45},{cx:200,cy:20},{cx:280,cy:28}].map((p,i)=>(
                            <motion.circle key={i} cx={p.cx} cy={p.cy} r="5" fill="#34d399" stroke="#000" strokeWidth="2" initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3+i*0.25}}/>
                        ))}
                    </svg>
                    <div style={{position:'absolute',top:8,right:12,background:'#34d39920',border:'1px solid #34d39940',borderRadius:8,padding:'4px 10px',fontSize:10,color:'#34d399',fontWeight:700}}>LIVE</div>
                </div>
            )
        },
        {
            icon: Activity, color:'#fb923c',
            title:'Burnout Before It Starts',
            subtitle:'Detect physiological stress signals 24 hours early',
            visual: (
                <div style={{padding:'16px 20px',height:130,display:'flex',flexDirection:'column',justifyContent:'center',gap:10}}>
                    {[{l:'Stress Load',v:72,c:'#fb923c'},{l:'Recovery',v:88,c:'#34d399'},{l:'HRV Trend',v:65,c:'#fbbf24'},{l:'Sleep Debt',v:40,c:'#f87171'}].map((m,i)=>(
                        <div key={i} style={{display:'flex',alignItems:'center',gap:10}}>
                            <span style={{fontSize:10,color:'#636366',width:70,flexShrink:0}}>{m.l}</span>
                            <div style={{flex:1,height:5,background:'#1c1c1e',borderRadius:3,overflow:'hidden'}}>
                                <motion.div initial={{width:0}} animate={{width:`${m.v}%`}} transition={{duration:0.9,delay:0.2+i*0.1,ease:'easeOut'}} style={{height:'100%',background:m.c,borderRadius:3}}/>
                            </div>
                            <span style={{fontSize:10,fontWeight:700,color:m.c,width:28,textAlign:'right'}}>{m.v}</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            icon: Link2, color:'#60a5fa',
            title:'All Your Devices, One View',
            subtitle:'Apple Health · WHOOP · Oura · Garmin · Fitbit unified',
            visual: (
                <div style={{padding:'16px 20px',height:130,display:'flex',alignItems:'center',justifyContent:'center',gap:0}}>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,width:'100%'}}>
                        {[{Icon:Heart,label:'Apple',c:'#ff6b6b'},{Icon:Activity,label:'WHOOP',c:'#34d399'},{Icon:Moon,label:'Oura',c:'#a78bfa'},{Icon:Flame,label:'Garmin',c:'#fb923c'},{Icon:Brain,label:'Fitbit',c:'#60a5fa'}].map((d,i)=>(
                            <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.15*i}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                                <div style={{width:38,height:38,borderRadius:12,background:`${d.c}18`,border:`1px solid ${d.c}40`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <d.Icon size={16} color={d.c}/>
                                </div>
                                <span style={{fontSize:9,color:'#636366',fontWeight:600}}>{d.label}</span>
                                <motion.div animate={{opacity:[0.4,1,0.4]}} transition={{duration:1.5,repeat:Infinity,delay:i*0.3}} style={{width:5,height:5,borderRadius:'50%',background:'#34d399'}}/>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    const feat = features[idx];
    return (
        <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.4}} style={{animation:'float 5s ease-in-out infinite'}}>
            <div style={{background:F.cardGrad,border:`1px solid ${F.b}`,borderRadius:24,padding:28,boxShadow:`0 40px 100px rgba(0,0,0,0.35), 0 0 60px ${feat.color}15`,minHeight:360,display:'flex',flexDirection:'column',gap:20}}>
                {/* progress pills */}
                <div style={{display:'flex',gap:6,justifyContent:'flex-end'}}>
                    {features.map((_,i)=>(
                        <motion.div key={i} animate={{width:i===idx?28:8,background:i===idx?feat.color:F.b}} transition={{duration:0.3}} style={{height:4,borderRadius:2}}/>
                    ))}
                </div>
                {/* content */}
                <AnimatePresence mode="wait">
                    <motion.div key={idx} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}} style={{display:'flex',flexDirection:'column',gap:12}}>
                        <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <div style={{width:42,height:42,borderRadius:13,background:`${feat.color}18`,border:`1px solid ${feat.color}30`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <feat.icon size={19} color={feat.color}/>
                            </div>
                            <div>
                                <h3 style={{fontSize:17,fontWeight:800,color:F.t1,margin:0,letterSpacing:'-0.02em'}}>{feat.title}</h3>
                                <p style={{fontSize:12,color:F.t2,margin:0,lineHeight:1.5,marginTop:2}}>{feat.subtitle}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                {/* visual */}
                <AnimatePresence mode="wait">
                    <motion.div key={`v${idx}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}} style={{background:F.s2,borderRadius:14,border:`1px solid ${F.b}`,overflow:'hidden'}}>
                        {feat.visual}
                    </motion.div>
                </AnimatePresence>
                {/* cta */}
                <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:F.t3,marginTop:'auto'}}>
                    <motion.span animate={{x:[0,5,0]}} transition={{duration:1.5,repeat:Infinity}} style={{color:feat.color,fontSize:14}}>→</motion.span>
                    Connect your devices to get started — free
                </div>
            </div>
        </motion.div>
    );
}

'''

# Replace old FeatureShowcase entirely
c = re.sub(
    r'function FeatureShowcase\(\).*?\n\}\n\n(?=function LandingPage)',
    NEW_FS,
    c, flags=re.DOTALL
)

with open('a.tsx', 'w') as f:
    f.write(c)
print('done')
