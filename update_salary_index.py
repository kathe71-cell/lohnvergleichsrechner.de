import re

with open("src/pages/SalaryIndexPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add import for useNavigate and JobAutocomplete
content = content.replace("import { Link } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';\nimport JobAutocomplete from '../components/JobAutocomplete';")

# Change SalaryIndexPage component
# Replace: 
#   const [searchTerm, setSearchTerm] = useState('');
#   const [selectedCat, setSelectedCat] = useState('Alle');
# with:
#   const navigate = useNavigate();
#   const [selectedCat, setSelectedCat] = useState('Alle');

content = re.sub(
    r"const \[searchTerm, setSearchTerm\] = useState\(''\);",
    "const navigate = useNavigate();",
    content
)

# Update filteredJobs logic
new_filtered_jobs = """
  const filteredJobs = useMemo(() => {
    return SALARY_DATABASE.filter(j => {
      return selectedCat === 'Alle' || j.category === selectedCat;
    });
  }, [selectedCat]);
"""
content = re.sub(
    r"const filteredJobs = useMemo\(\(\) => \{[\s\S]*?\}, \[searchTerm, selectedCat\]\);",
    new_filtered_jobs.strip(),
    content
)

# Replace the Search input with JobAutocomplete
search_html = """
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Beruf suchen (z. B. Softwareentwickler, Mechatroniker, Pflegefachkraft)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
"""

autocomplete_html = """
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <JobAutocomplete 
              mode="navigate" 
              onSelect={(id) => navigate(`/gehalt/${id}`)}
              placeholder="Beruf suchen, z. B. Softwareentwickler..."
            />
          </div>
"""

content = content.replace(search_html.strip(), autocomplete_html.strip())

with open("src/pages/SalaryIndexPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("SalaryIndexPage updated.")
