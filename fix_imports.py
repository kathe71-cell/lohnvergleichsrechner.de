import os
import re
import glob

files = glob.glob("src/pages/*.tsx")

replacements = {
    "AtlasPage.tsx": r'BarChart3,\s*',
    "AverageSalaryPage.tsx": r'BarChart3,\s*',
    "CalculatorPage.tsx": r"import \{ ShieldCheck \} from 'lucide-react';\n",
    "FaqPage.tsx": r"import \{ HelpCircle \} from 'lucide-react';\n",
    "GlossaryPage.tsx": r'Layers,\s*',
    "GuidePage.tsx": r'BookOpen,\s*',
    "JobSalaryPage.tsx": r'Briefcase,\s*',
    "JobStateSalaryPage.tsx": r'MapPin,\s*',
    "MethodologyPage.tsx": r'ShieldCheck,\s*',
    "SalaryIndexPage.tsx": r'Briefcase,\s*'
}

for file in files:
    filename = os.path.basename(file)
    if filename in replacements:
        with open(file, "r") as f:
            content = f.read()
        content = re.sub(replacements[filename], '', content)
        with open(file, "w") as f:
            f.write(content)
