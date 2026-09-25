import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Layout } from "./App";

export {
  SALARY_DATABASE,
  STATE_FACTORS,
  DATA_METADATA,
  EXPERIENCE_FACTORS,
  COMPANY_SIZE_FACTORS,
  EDUCATION_FACTORS
} from "./data/salaryData";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <Layout />
    </StaticRouter>
  );
  return { html };
}
