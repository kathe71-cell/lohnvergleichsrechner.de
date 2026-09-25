import json
import re

with open("new_jobs_data.json", "r", encoding="utf-8") as f:
    jobs = json.load(f)

with open("src/data/salaryData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace interface JobSalary
new_interface = """export interface JobSalary {
  id: string;
  title: string;
  aliases?: string[];
  category: string;
  kldbCode: string;
  officialKldbLabel?: string;
  requirementLevel?: number;
  salaryReferencePeriod?: string;
  salarySource?: string;
  salarySourceType?: string;
  dataCategory?: "A" | "B" | "C";
  medianYear: number;
  p25Year: number;
  p75Year: number;
  minYear: number;
  maxYear: number;
  trendPercent: number;
  typicalEducation: string;
  shortDesc: string;
  tasks?: string[];
  skills?: string[];
}"""

content = re.sub(r'export interface JobSalary \{.*?\n\}', new_interface, content, flags=re.DOTALL)

# Replace SALARY_DATABASE array
jobs_json_str = json.dumps(jobs, ensure_ascii=False, indent=2)

start_str = "export const SALARY_DATABASE: JobSalary[] = ["
end_str = "];\n\n/**\n * Datenklassifikation:"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + "export const SALARY_DATABASE: JobSalary[] = " + jobs_json_str + content[end_idx + 1:]
    with open("src/data/salaryData.ts", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully updated salaryData.ts")
else:
    print("Could not find SALARY_DATABASE bounds")
