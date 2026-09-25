import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Layout } from "./App";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <Layout />
    </StaticRouter>
  );
  return { html };
}
