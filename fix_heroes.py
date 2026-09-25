import os
import re
import glob

files = glob.glob("src/pages/*.tsx")

for file in files:
    if "Home.tsx" in file:
        continue
    with open(file, "r") as f:
        content = f.read()
    
    # Change top spacing
    content = content.replace('className="space-y-12 sm:space-y-16 pb-16"', 'className="space-y-16 sm:space-y-24 pb-16"')
    
    # Change inner section spacing
    content = content.replace('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6"')
    content = content.replace('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6"')
    
    # Change Header div
    content = content.replace('className="space-y-4 max-w-4xl"', 'className="max-w-3xl space-y-2"')
    content = content.replace('className="max-w-4xl space-y-3"', 'className="max-w-3xl space-y-2"')
    content = content.replace('className="max-w-3xl space-y-3"', 'className="max-w-3xl space-y-2"')
    
    # Change badge to span
    def repl_badge(m):
        category = m.group(1).strip()
        return f'<span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">\n              {category}\n            </span>'
        
    content = re.sub(
        r'<div className="inline-flex items-center gap-[^>]+>.*?<[A-Za-z0-9]+ className="w-3\.5 h-3\.5[^>]+/>\s*(.*?)\s*</div>',
        repl_badge,
        content,
        flags=re.DOTALL
    )
    
    # Adjust Imprint & Privacy headers (different format)
    def repl_badge2(m):
        category = m.group(1).strip()
        return f'<span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">\n          {category}\n        </span>'

    content = re.sub(
        r'<div className="inline-flex items-center gap-[^>]+bg-slate-100[^>]+>.*?<[A-Za-z0-9]+ className="w-3\.5 h-3\.5[^>]+/>\s*(.*?)\s*</div>',
        repl_badge2,
        content,
        flags=re.DOTALL
    )

    # Change H1 sizes
    content = content.replace('className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight"', 'className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight"')
    content = content.replace('className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight"', 'className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight"')
    
    # Change p sizes
    content = content.replace('className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"', 'className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl"')
    content = content.replace('className="text-base text-slate-600"', 'className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl"')
    
    # Fix Imprint/Privacy top divs
    content = content.replace('className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10"', 'className="space-y-16 sm:space-y-24 pb-16"')
    
    with open(file, "w") as f:
        f.write(content)

