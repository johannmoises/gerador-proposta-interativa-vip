import baseCss from "../styles/main.css?raw";
import shellHtml from "../templates/shell.html?raw";
import runtimeSource from "./runtime.js?raw";
import { getProposalBySlug, proposalSlugs } from "../data/proposals.js";

function injectStyle(id, cssText) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }
  style.textContent = cssText;
}

function resolveProposalSlug() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts[0] === "propostas" && parts[1]) return parts[1];
  if (parts[0] && parts[0] !== "index.html") return parts[0];
  return "brooklyn-academia";
}

function mountRuntime() {
  const runtime = document.createElement("script");
  runtime.textContent = runtimeSource;
  document.body.appendChild(runtime);
}

const slug = resolveProposalSlug();
const proposal = getProposalBySlug(slug);

window.PROPOSTA = proposal;
window.PD_EMBEDDED_ELEMENTOR = false;
window.PD_RUNTIME_SOURCE = runtimeSource;
window.PD_ASSET_BASE = "/";
window.PD_CURRENT_SLUG = proposalSlugs.includes(slug) ? slug : "brooklyn-academia";

injectStyle("pd-base-styles", baseCss);
document.getElementById("pd-root").innerHTML = shellHtml;
mountRuntime();
