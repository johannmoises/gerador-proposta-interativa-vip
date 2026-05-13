/* ==========================================================
         PIXEL DEMAND — TEMPLATE CONFIGURÁVEL DE PROPOSTA
         Edite SOMENTE este objeto para trocar cliente, textos,
         valores, imagens, cores, WhatsApp, escopo e seções.

         IMPORTANTE:
         Os caminhos de imagem abaixo foram preservados exatamente
         como estavam no arquivo original.
      ========================================================== */

      const PD_EMBEDDED_ELEMENTOR = window.PD_EMBEDDED_ELEMENTOR === true;
      const PD_SCRIPT_SOURCE = window.PD_RUNTIME_SOURCE || document.currentScript?.textContent || "";

      let PROPOSTA = window.PROPOSTA;

      const PD_STORAGE_KEY = `pixeldemand-proposta-admin-draft-v1:${window.PD_CURRENT_SLUG || PROPOSTA?.client?.slug || "default"}`;
      const PD_ADMIN_EXPORT_LOCK = false;
      const PD_DEFAULT_PROPOSTA = JSON.parse(JSON.stringify(PROPOSTA));
      let pdAdminMode = false;
      let pdQuickEdit = null;

      const $ = (selector, context = document) => context.querySelector(selector);
      const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

      function escapeHTML(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function attr(value) {
        return escapeHTML(value);
      }

      const PD_STYLE_PROPS = {
        fontSize: "font-size",
        fontWeight: "font-weight",
        lineHeight: "line-height",
        letterSpacing: "letter-spacing",
        textAlign: "text-align",
        color: "color"
      };
      const PD_VISUAL_DEVICES = ["desktop", "tablet", "mobile"];

      function styleKeyFromPath(path) {
        return String(path || "")
          .replace(/\.(\d+)/g, "_$1")
          .replace(/[^a-zA-Z0-9]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase())
          .replace(/^[A-Z]/, (char) => char.toLowerCase());
      }

      function emptyVisualStyle() {
        return Object.keys(PD_STYLE_PROPS).reduce((style, key) => {
          style[key] = "";
          return style;
        }, {});
      }

      function normalizeVisualStyleEntry(entry = {}) {
        const normalized = {
          desktop: emptyVisualStyle(),
          tablet: emptyVisualStyle(),
          mobile: emptyVisualStyle()
        };

        if (!isPlainObject(entry)) return normalized;

        PD_VISUAL_DEVICES.forEach((device) => {
          if (!isPlainObject(entry[device])) return;
          Object.keys(PD_STYLE_PROPS).forEach((key) => {
            normalized[device][key] = String(entry[device][key] || "").trim();
          });
        });

        Object.keys(PD_STYLE_PROPS).forEach((key) => {
          const legacyValue = String(entry[key] || "").trim();
          if (legacyValue && !normalized.desktop[key]) {
            normalized.desktop[key] = legacyValue;
          }
        });

        return normalized;
      }

      function migrateVisualStyles() {
        PROPOSTA.visual ||= {};
        Object.keys(PROPOSTA.visual).forEach((styleKey) => {
          PROPOSTA.visual[styleKey] = normalizeVisualStyleEntry(PROPOSTA.visual[styleKey]);
        });
      }

      function safeCssValue(value, key = "") {
        const cleaned = String(value || "").replace(/!important/gi, "").replace(/[{};]/g, "").trim();
        if (!cleaned) return "";
        if ((key === "fontSize" || key === "letterSpacing") && /^-?\d+(\.\d+)?$/.test(cleaned)) {
          return `${cleaned}px`;
        }
        return cleaned;
      }

      function visualStyleText(styleKey, device = "desktop", source = PROPOSTA.visual) {
        const entry = normalizeVisualStyleEntry(source?.[styleKey] || {});
        const style = entry[device] || {};
        return Object.entries(PD_STYLE_PROPS)
          .map(([key, cssProp]) => {
            const value = safeCssValue(style[key], key);
            return value ? `${cssProp}: ${value} !important` : "";
          })
          .filter(Boolean)
          .join("; ");
      }

      function cssAttributeValue(value) {
        return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      }

      function renderVisualStyles(source = PROPOSTA.visual) {
        migrateVisualStyles();
        const visual = source || PROPOSTA.visual || {};
        const rules = [];

        Object.keys(visual).forEach((styleKey) => {
          const selector = `.pd-proposal.pd-proposal [data-pd-style="${cssAttributeValue(styleKey)}"][data-pd-style]`;
          const desktop = visualStyleText(styleKey, "desktop", visual);
          const tablet = visualStyleText(styleKey, "tablet", visual);
          const mobile = visualStyleText(styleKey, "mobile", visual);

          if (desktop) rules.push(`@media (min-width: 981px) {\n  ${selector} { ${desktop}; }\n}`);
          if (tablet) rules.push(`@media (min-width: 641px) and (max-width: 980px) {\n  ${selector} { ${tablet}; }\n}`);
          if (mobile) rules.push(`@media (max-width: 640px) {\n  ${selector} { ${mobile}; }\n}`);
        });

        let styleTag = document.getElementById("pd-dynamic-visual-styles");
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = "pd-dynamic-visual-styles";
        }
        const styleParent = document.head || document.body || document.documentElement;
        if (styleTag.parentNode !== styleParent || styleParent.lastElementChild !== styleTag) {
          styleParent.appendChild(styleTag);
        }
        styleTag.textContent = rules.join("\n\n");
      }

      function styleAttrs(styleKey) {
        if (!styleKey) return "";
        return ` data-pd-style="${attr(styleKey)}"`;
      }

      function editAttrs(type, path, styleKey = "") {
        const resolvedStyleKey = styleKey || styleKeyFromPath(path);
        const style = styleAttrs(resolvedStyleKey);
        if (PD_ADMIN_EXPORT_LOCK) return style;
        return ` data-pd-edit="${attr(type)}" data-pd-path="${attr(path)}"${style}`;
      }

      function isAbsoluteMediaUrl(value) {
        return /^https?:\/\//i.test(String(value || "").trim());
      }

      function normalizeMediaSrc(value) {
        const src = String(value || "").trim();
        if (!src) return "";
        if (/^(https?:|data:|\/)/i.test(src)) return src;
        if (src.startsWith("imagens identidade visual pixel demand/")) return `/${src}`;
        return src;
      }

      function resolveMedia(key, fallback, index = null) {
        const media = PROPOSTA.wordpressMedia || {};
        if (media.enabled === true) {
          const value = key === "gallery" ? media.gallery?.[index] : media[key];
          if (isAbsoluteMediaUrl(value)) return String(value).trim();
        }
        return normalizeMediaSrc(fallback);
      }

      function handleImageError(image) {
        if (!image || image.dataset.fallbackApplied === "true") return;
        image.dataset.fallbackApplied = "true";
        image.style.display = "none";

        const holder = image.closest("figure,.pd-brand-showcase,.pd-identity-art,.pd-gallery-card,.pd-brand,.pd-quick-edit-preview");
        if (!holder) return;

        holder.classList.add("pd-image-holder-broken");
        if (!holder.querySelector(".pd-image-fallback")) {
          const label = image.alt || "Imagem indisponível";
          holder.insertAdjacentHTML("beforeend", `<span class="pd-image-fallback">${escapeHTML(label)}</span>`);
        }
      }

      function whatsappLink(text) {
        const number = String(PROPOSTA.contact.whatsappNumber || "").replace(/\D/g, "");
        return `https://wa.me/${number}?text=${encodeURIComponent(text || "")}`;
      }

      function indexLabel(index) {
        return String(index + 1).padStart(2, "0");
      }

      function list(items, path = "") {
        if (!items || !items.length) return "";
        return `<ul class="pd-list">${items.map((item, index) => {
          const itemPath = path ? `${path}.${index}` : "";
          return `<li${itemPath ? editAttrs("textarea", itemPath) : ""}>${escapeHTML(item)}</li>`;
        }).join("")}</ul>`;
      }

      function heading({ kicker, title, description }, basePath = "") {
        return `
          <div class="pd-section-heading pd-reveal">
            ${kicker ? `<div class="pd-kicker"${basePath ? editAttrs("text", `${basePath}.kicker`) : ""}>${escapeHTML(kicker)}</div>` : ""}
            ${title ? `<h2${basePath ? editAttrs("text", `${basePath}.title`) : ""}>${escapeHTML(title)}</h2>` : ""}
            ${description ? `<p${basePath ? editAttrs("textarea", `${basePath}.description`) : ""}>${escapeHTML(description)}</p>` : ""}
          </div>
        `;
      }

      function imgTag({ src, alt = "", className = "", loading = "lazy", editPath = "" }) {
        if (!src) return "";
        return `<img${className ? ` class="${attr(className)}"` : ""}${editPath ? editAttrs("image", editPath) : ""} src="${attr(src)}" alt="${attr(alt)}" loading="${attr(loading)}" decoding="async" onerror="handleImageError(this)" />`;
      }

      function section(id, config, content, extraClass = "") {
        const pathMap = {
          introducao: "intro",
          diagnostico: "diagnosis",
          servicos: "services",
          visual: "gallery",
          pacotes: "packages",
          detalhes: "details",
          cronograma: "timeline",
          escopo: "scope",
          condicoes: "conditions"
        };
        const basePath = pathMap[id] || "";
        return `
          <section class="pd-section ${extraClass}" id="${attr(id)}">
            ${heading(config, basePath)}
            <div class="pd-reveal">${content}</div>
          </section>
        `;
      }

      function renderHero() {
        const { hero, summary, brand, client } = PROPOSTA;
        const showcaseLogo = resolveMedia("showcaseLogo", brand.showcaseLogo);
        const icon = resolveMedia("icon", brand.icon);
        return `
          <section class="pd-hero" aria-label="Proposta para ${attr(client.name)}">
            <div class="pd-hero-copy pd-reveal">
              <div class="pd-eyebrow"${editAttrs("text", "hero.eyebrow", "heroEyebrow")}>${escapeHTML(hero.eyebrow)}</div>
              <h1${editAttrs("text", "hero.title", "heroTitle")}>${escapeHTML(hero.title)} <span${editAttrs("text", "hero.highlight", "heroHighlight")}>${escapeHTML(hero.highlight || client.name)}</span></h1>
              <p class="pd-lead"${editAttrs("textarea", "hero.lead", "heroLead")}>${escapeHTML(hero.lead)}</p>
              <div class="pd-actions">
                <a class="pd-button primary" href="#investimento">${escapeHTML(hero.primaryButton)}</a>
                <a class="pd-button" href="${attr(whatsappLink(PROPOSTA.contact.whatsappQuestionText))}" target="_blank" rel="noreferrer">${escapeHTML(hero.secondaryButton)}</a>
              </div>
            </div>

            <aside class="pd-hero-side pd-reveal" aria-label="Resumo da proposta">
              <div class="pd-brand-showcase" aria-label="Identidade visual Pixel Demand">
                ${imgTag({ src: showcaseLogo, alt: brand.wordmarkAlt, className: "pd-showcase-logo", loading: "eager", editPath: "brand.showcaseLogo" })}
                ${imgTag({ src: icon, alt: "", className: "pd-showcase-star", loading: "eager", editPath: "brand.icon" })}
              </div>
              <div class="pd-metric">
                <strong${editAttrs("text", "summary.metricValue")}>${escapeHTML(summary.metricValue || client.validity)}</strong>
                <span${editAttrs("textarea", "summary.metricLabel")}>${escapeHTML(summary.metricLabel)}</span>
              </div>
              <div class="pd-side-note">
                <h2${editAttrs("textarea", "summary.title")}>${escapeHTML(summary.title)}</h2>
                <p${editAttrs("textarea", "summary.text")}>${escapeHTML(summary.text)}</p>
              </div>
            </aside>
          </section>
        `;
      }

      function renderIntro() {
        const { intro, brand } = PROPOSTA;
        const identityLogo = resolveMedia("identityLogo", brand.identityLogo);
        const identityArt = resolveMedia("identityArt", brand.identityArt);
        return section("introducao", intro, `
          <div class="pd-panel pd-identity-panel">
            <div class="pd-identity-copy">
              <p class="pd-intro-text"${editAttrs("textarea", "intro.text")}>${escapeHTML(intro.text)}</p>
              ${imgTag({ src: identityLogo, alt: brand.wordmarkAlt, className: "pd-identity-logo", editPath: "brand.identityLogo" })}
            </div>
            <figure class="pd-identity-art" aria-label="Referência visual oficial da Pixel Demand"${editAttrs("image", "brand.identityArt")}>
              ${imgTag({ src: identityArt, alt: "" })}
            </figure>
          </div>
        `);
      }

      function renderDiagnosis() {
        const diagnosis = PROPOSTA.diagnosis;
        return section("diagnostico", diagnosis, `<div class="pd-panel">${list(diagnosis.items, "diagnosis.items")}</div>`);
      }

      function renderServices() {
        const services = PROPOSTA.services;
        const cards = services.items.map((item, index) => `
          <article class="pd-card">
            <span class="pd-index">${indexLabel(index)}</span>
            <h3${editAttrs("text", `services.items.${index}.title`)}>${escapeHTML(item.title)}</h3>
            <p${editAttrs("textarea", `services.items.${index}.text`)}>${escapeHTML(item.text)}</p>
          </article>
        `).join("");

        return section("servicos", services, `<div class="pd-grid-3">${cards}</div>`);
      }

      function renderGallery() {
        const gallery = PROPOSTA.gallery;
        const images = gallery.images.map((image, index) => `
          <figure class="pd-gallery-card"${editAttrs("image", `gallery.images.${index}.src`)}>
            ${imgTag({ src: resolveMedia("gallery", image.src, index), alt: image.alt || image.caption })}
            ${image.caption ? `<figcaption${editAttrs("text", `gallery.images.${index}.caption`)}>${escapeHTML(image.caption)}</figcaption>` : ""}
          </figure>
        `).join("");

        return section("visual", gallery, `
          <div class="pd-gallery">
            <div class="pd-gallery-intro">
              <div class="pd-kicker"${editAttrs("text", "gallery.kicker")}>${escapeHTML(gallery.kicker)}</div>
              <h3${editAttrs("text", "gallery.introTitle")}>${escapeHTML(gallery.introTitle)}</h3>
              <p${editAttrs("textarea", "gallery.introText")}>${escapeHTML(gallery.introText)}</p>
            </div>
            <div class="pd-gallery-grid">${images}</div>
          </div>
        `);
      }

      function recommendedPackageIndex() {
        const packages = PROPOSTA.packages.items || [];
        const byRecommendation = packages.findIndex((item) => item.recommended);
        return byRecommendation >= 0 ? byRecommendation : 0;
      }

      function renderPackages() {
        const packages = PROPOSTA.packages;
        const cards = packages.items.map((item, index) => `
          <article class="pd-card pd-package-card ${item.recommended ? "pd-featured is-active" : ""}" data-package-index="${index}" data-package-price="${attr(item.price)}" data-package-note="${attr(item.investmentNote || item.description)}">
            ${item.tag ? `<span class="pd-tag">${escapeHTML(item.tag)}</span><br />` : ""}
            <span class="pd-index">${indexLabel(index)}</span>
            <h3${editAttrs("text", `packages.items.${index}.name`)}>${escapeHTML(item.name)}</h3>
            <p${editAttrs("textarea", `packages.items.${index}.description`)}>${escapeHTML(item.description)}</p>
            <strong class="pd-price"${editAttrs("text", `packages.items.${index}.price`)}>${escapeHTML(item.price)}</strong>
            ${PROPOSTA.behavior.enablePackageSelection ? `
              <div class="pd-card-actions">
                <button class="pd-button small pd-select-package" type="button" data-package-index="${index}">
                  Ver este investimento
                </button>
              </div>
            ` : ""}
          </article>
        `).join("");

        return section("pacotes", packages, `<div class="pd-grid-3">${cards}</div>`);
      }

      function renderDetails() {
        const details = PROPOSTA.details;
        const items = details.items.map((item, index) => `
          <article class="pd-accordion-item ${item.open ? "open" : ""}">
            <button class="pd-accordion-trigger" type="button" aria-expanded="${item.open ? "true" : "false"}">
              <strong${editAttrs("text", `details.items.${index}.title`)}>${escapeHTML(item.title)}</strong>
              <span aria-hidden="true">+</span>
            </button>
            <div class="pd-accordion-panel">
              <div class="pd-accordion-content"${editAttrs("textarea", `details.items.${index}.text`)}>
                ${escapeHTML(item.text)}
                ${list(item.bullets, `details.items.${index}.bullets`)}
              </div>
            </div>
          </article>
        `).join("");

        return section("detalhes", details, `<div class="pd-accordion">${items}</div>`);
      }

      function renderTimeline() {
        const timeline = PROPOSTA.timeline;
        const items = timeline.items.map((item, index) => `
          <article class="pd-timeline-item">
            <time${editAttrs("text", `timeline.items.${index}.period`)}>${escapeHTML(item.period)}</time>
            <div>
              <h3${editAttrs("text", `timeline.items.${index}.title`)}>${escapeHTML(item.title)}</h3>
              <p${editAttrs("textarea", `timeline.items.${index}.text`)}>${escapeHTML(item.text)}</p>
            </div>
          </article>
        `).join("");

        return section("cronograma", timeline, `<div class="pd-timeline">${items}</div>`);
      }

      function renderScope() {
        const scope = PROPOSTA.scope;
        return section("escopo", scope, `
          <div class="pd-scope-grid">
            <div class="pd-scope-box">
              <h3${editAttrs("text", "scope.includedTitle")}>${escapeHTML(scope.includedTitle)}</h3>
              ${list(scope.included, "scope.included")}
            </div>
            <div class="pd-scope-box">
              <h3${editAttrs("text", "scope.excludedTitle")}>${escapeHTML(scope.excludedTitle)}</h3>
              ${list(scope.excluded, "scope.excluded")}
            </div>
          </div>
        `);
      }

      function renderInvestment() {
        const inv = PROPOSTA.investment;
        return `
          <section class="pd-investment pd-reveal" id="investimento"${editAttrs("color", "theme.accent")}>
            <h2${editAttrs("text", "investment.title", "investmentTitle")}>${escapeHTML(inv.title)}</h2>
            <div class="pd-investment-summary">
              <strong id="pd-investment-price"${editAttrs("text", "investment.price", "investmentPrice")}>${escapeHTML(inv.price)}</strong>
              <span id="pd-investment-note"${editAttrs("textarea", "investment.note")}>${escapeHTML(inv.note)}</span>
            </div>
          </section>
        `;
      }

      function renderConditions() {
        const conditions = PROPOSTA.conditions;
        const cards = conditions.items.map((item, index) => `
          <article class="pd-condition">
            <span class="pd-index">${indexLabel(index)}</span>
            <h3${editAttrs("text", `conditions.items.${index}.title`)}>${escapeHTML(item.title)}</h3>
            <p${editAttrs("textarea", `conditions.items.${index}.text`)}>${escapeHTML(item.text)}</p>
          </article>
        `).join("");

        return section("condicoes", conditions, `<div class="pd-grid-3">${cards}</div>`);
      }

      function renderApproval() {
        const approval = PROPOSTA.approval;
        return `
          <section class="pd-final-cta pd-reveal" id="aprovar">
            <div>
              <div class="pd-kicker"${editAttrs("text", "approval.kicker")}>${escapeHTML(approval.kicker)}</div>
              <h2${editAttrs("text", "approval.title", "approvalTitle")}>${escapeHTML(approval.title)}</h2>
              <p${editAttrs("textarea", "approval.text")}>${escapeHTML(approval.text)}</p>
            </div>
            <a class="pd-button primary" id="pd-approve-link" href="${attr(whatsappLink(PROPOSTA.contact.whatsappApproveText))}" target="_blank" rel="noreferrer"${editAttrs("text", "approval.button")}>${escapeHTML(approval.button)}</a>
          </section>
        `;
      }

      function renderFooter() {
        return `
          <div class="pd-footer-note pd-reveal">
            <span>${escapeHTML(PROPOSTA.footer.left)}</span>
            <span>${escapeHTML(PROPOSTA.footer.right)}</span>
          </div>
        `;
      }

      function applyTheme() {
        const root = document.documentElement;
        const theme = PROPOSTA.theme;
        const brand = PROPOSTA.brand;
        const icon = resolveMedia("icon", brand.icon);
        const wordmark = resolveMedia("wordmark", brand.wordmark);

        [root, $("#pd-proposal-shell")].filter(Boolean).forEach((target) => {
          target.style.setProperty("--pd-lime", theme.accent);
          target.style.setProperty("--pd-bg", theme.bg);
          target.style.setProperty("--pd-graphite", theme.graphite);
          target.style.setProperty("--pd-panel", theme.panel);
          target.style.setProperty("--pd-panel-2", theme.panel2);
          target.style.setProperty("--pd-text", theme.text);
          target.style.setProperty("--pd-muted", theme.muted);
          target.style.setProperty("--pd-brand-icon-url", `url("${icon}")`);
        });

        const symbol = $("#pd-brand-symbol");
        const wordmarkImage = $("#pd-brand-wordmark");
        if (symbol) symbol.src = icon;
        if (wordmarkImage) {
          wordmarkImage.src = wordmark;
          wordmarkImage.alt = brand.wordmarkAlt || brand.agencyName;
        }

        if (!PD_EMBEDDED_ELEMENTOR) {
          document.title = `${brand.agencyName} | ${PROPOSTA.client.proposalName} — ${PROPOSTA.client.name}`;
        }
      }

      function renderNav() {
        const nav = $("#pd-nav");
        if (!nav) return;

        nav.innerHTML = PROPOSTA.nav
          .filter((item) => !item.section || PROPOSTA.sections[item.section])
          .map((item) => `<a href="#${attr(item.target)}">${escapeHTML(item.label)}</a>`)
          .join("");
      }

      function renderApp() {
        const app = $("#pd-app");
        if (!app) return;

        const sections = [
          renderHero(),
          PROPOSTA.sections.intro ? renderIntro() : "",
          PROPOSTA.sections.diagnosis ? renderDiagnosis() : "",
          PROPOSTA.sections.services ? renderServices() : "",
          PROPOSTA.sections.gallery ? renderGallery() : "",
          PROPOSTA.sections.packages ? renderPackages() : "",
          PROPOSTA.sections.details ? renderDetails() : "",
          PROPOSTA.sections.timeline ? renderTimeline() : "",
          PROPOSTA.sections.scope ? renderScope() : "",
          PROPOSTA.sections.investment ? renderInvestment() : "",
          PROPOSTA.sections.conditions ? renderConditions() : "",
          PROPOSTA.sections.approval ? renderApproval() : "",
          renderFooter()
        ];

        app.innerHTML = sections.join("");
      }

      function syncAccordion(item) {
        const panel = item.querySelector(".pd-accordion-panel");
        const button = item.querySelector(".pd-accordion-trigger");
        const isOpen = item.classList.contains("open");

        if (!panel || !button) return;
        button.setAttribute("aria-expanded", String(isOpen));
        panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
      }

      function setupAccordion() {
        const accordionItems = $$(".pd-accordion-item");

        accordionItems.forEach((item) => {
          const button = item.querySelector(".pd-accordion-trigger");
          if (!button) return;

          button.addEventListener("click", () => {
            const isOpening = !item.classList.contains("open");

            if (PROPOSTA.behavior.closeOtherAccordions) {
              accordionItems.forEach((otherItem) => {
                if (otherItem !== item) {
                  otherItem.classList.remove("open");
                  syncAccordion(otherItem);
                }
              });
            }

            item.classList.toggle("open", isOpening);
            syncAccordion(item);
          });

          syncAccordion(item);
        });

        window.addEventListener("resize", () => {
          accordionItems.forEach(syncAccordion);
        });
      }

      function updateInvestmentFromPackage(index) {
        const packageItem = PROPOSTA.packages.items[index];
        if (!packageItem) return;

        const price = $("#pd-investment-price");
        const note = $("#pd-investment-note");
        const approve = $("#pd-approve-link");
        PROPOSTA.investment.packageName = packageItem.name;
        PROPOSTA.investment.price = packageItem.price;
        PROPOSTA.investment.note = packageItem.investmentNote || packageItem.description;

        if (price) price.textContent = packageItem.price;
        if (note) note.textContent = packageItem.investmentNote || packageItem.description;

        $$(".pd-package-card").forEach((card) => {
          card.classList.toggle("is-active", Number(card.dataset.packageIndex) === index);
        });

        if (approve) {
          const approvalText = `${PROPOSTA.contact.whatsappApproveText} — pacote ${packageItem.name} (${packageItem.price})`;
          approve.href = whatsappLink(approvalText);
        }
      }

      function setupPackages() {
        if (!PROPOSTA.behavior.enablePackageSelection) return;

        $$(".pd-select-package").forEach((button) => {
          button.addEventListener("click", () => {
            const index = Number(button.dataset.packageIndex);
            updateInvestmentFromPackage(index);
            const investment = $("#investimento");
            if (investment) investment.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        });

        if (!pdAdminMode) {
          updateInvestmentFromPackage(recommendedPackageIndex());
        }
      }

      function setupReveal() {
        const revealItems = $$(".pd-reveal");
        if (!PROPOSTA.behavior.enableScrollReveal || !("IntersectionObserver" in window)) {
          revealItems.forEach((item) => item.classList.add("is-visible"));
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        );

        revealItems.forEach((item) => observer.observe(item));
      }

      function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
      }

      function isPlainObject(value) {
        return value && typeof value === "object" && !Array.isArray(value);
      }

      function mergeDeep(target, source) {
        if (!isPlainObject(source)) return target;

        Object.keys(source).forEach((key) => {
          const sourceValue = source[key];
          const targetValue = target[key];

          if (Array.isArray(sourceValue)) {
            target[key] = sourceValue;
          } else if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
            target[key] = mergeDeep({ ...targetValue }, sourceValue);
          } else {
            target[key] = sourceValue;
          }
        });

        return target;
      }

      function getPath(source, path) {
        return path.split(".").reduce((current, key) => current?.[key], source);
      }

      function setPath(source, path, value) {
        const keys = path.split(".");
        let target = source;

        keys.slice(0, -1).forEach((key) => {
          if (!target[key] || typeof target[key] !== "object") target[key] = {};
          target = target[key];
        });

        target[keys[keys.length - 1]] = value;
      }

      function loadSavedDraft() {
        if (PD_ADMIN_EXPORT_LOCK) return;

        try {
          const saved = localStorage.getItem(PD_STORAGE_KEY);
          if (!saved) return;
          PROPOSTA = mergeDeep(deepClone(PD_DEFAULT_PROPOSTA), JSON.parse(saved));
        } catch {
          localStorage.removeItem(PD_STORAGE_KEY);
        }
      }

      function saveDraft() {
        applyAdminFormToProposal();
        localStorage.setItem(PD_STORAGE_KEY, JSON.stringify(PROPOSTA));
        showAdminToast("Rascunho salvo neste navegador.");
      }

      function refreshProposal() {
        migrateVisualStyles();
        applyTheme();
        renderNav();
        renderApp();
        renderVisualStyles();
        setupAccordion();
        setupPackages();
        setupReveal();
        updateAdminActiveClass();
      }

      function showAdminToast(message) {
        const toast = $("#pd-admin-toast");
        if (!toast) return;
        toast.textContent = message;
        toast.hidden = false;
        clearTimeout(showAdminToast.timer);
        showAdminToast.timer = setTimeout(() => {
          toast.hidden = true;
        }, 2800);
      }

      function adminField(label, path, type = "text") {
        const value = getPath(PROPOSTA, path) ?? "";
        return `
          <label class="pd-admin-label">
            <span>${escapeHTML(label)}</span>
            <input type="${attr(type)}" data-pd-path="${attr(path)}" value="${attr(value)}" />
          </label>
        `;
      }

      function adminTextarea(label, path, rows = 4) {
        const value = getPath(PROPOSTA, path) ?? "";
        return `
          <label class="pd-admin-label">
            <span>${escapeHTML(label)}</span>
            <textarea data-pd-path="${attr(path)}" rows="${attr(rows)}">${escapeHTML(value)}</textarea>
          </label>
        `;
      }

      function adminArrayTextarea(label, path, rows = 7) {
        const value = getPath(PROPOSTA, path) || [];
        return `
          <label class="pd-admin-label">
            <span>${escapeHTML(label)}</span>
            <textarea data-pd-array-path="${attr(path)}" rows="${attr(rows)}">${escapeHTML(value.join("\n"))}</textarea>
          </label>
        `;
      }

      function adminCheckbox(label, path) {
        const checked = getPath(PROPOSTA, path) ? "checked" : "";
        return `
          <label class="pd-admin-check">
            <input type="checkbox" data-pd-path="${attr(path)}" ${checked} />
            <span>${escapeHTML(label)}</span>
          </label>
        `;
      }

      function adminSection(title, content, open = false) {
        return `
          <details class="pd-admin-section" ${open ? "open" : ""}>
            <summary>${escapeHTML(title)}</summary>
            <div class="pd-admin-fields">${content}</div>
          </details>
        `;
      }

      function renderAdminEditor() {
        const fields = $("#pd-admin-fields");
        if (!fields) return;

        const serviceFields = PROPOSTA.services.items.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Serviço ${indexLabel(index)}</p>
            ${adminField("Título", `services.items.${index}.title`)}
            ${adminTextarea("Descrição", `services.items.${index}.text`, 3)}
          </div>
        `).join("");

        const packageFields = PROPOSTA.packages.items.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Pacote ${indexLabel(index)}</p>
            ${adminField("Nome", `packages.items.${index}.name`)}
            ${adminField("Valor", `packages.items.${index}.price`)}
            ${adminField("Tag", `packages.items.${index}.tag`)}
            ${adminCheckbox("Pacote recomendado", `packages.items.${index}.recommended`)}
            ${adminTextarea("Descrição", `packages.items.${index}.description`, 3)}
            ${adminTextarea("Nota de investimento", `packages.items.${index}.investmentNote`, 3)}
          </div>
        `).join("");

        const detailFields = PROPOSTA.details.items.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Accordion ${indexLabel(index)}</p>
            ${adminField("Título", `details.items.${index}.title`)}
            ${adminCheckbox("Aberto por padrão", `details.items.${index}.open`)}
            ${adminTextarea("Texto", `details.items.${index}.text`, 3)}
            ${adminArrayTextarea("Bullets (um por linha)", `details.items.${index}.bullets`, 5)}
          </div>
        `).join("");

        const timelineFields = PROPOSTA.timeline.items.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Etapa ${indexLabel(index)}</p>
            ${adminField("Período", `timeline.items.${index}.period`)}
            ${adminField("Título", `timeline.items.${index}.title`)}
            ${adminTextarea("Descrição", `timeline.items.${index}.text`, 3)}
          </div>
        `).join("");

        const conditionFields = PROPOSTA.conditions.items.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Condição ${indexLabel(index)}</p>
            ${adminField("Título", `conditions.items.${index}.title`)}
            ${adminTextarea("Texto", `conditions.items.${index}.text`, 3)}
          </div>
        `).join("");

        const galleryFields = PROPOSTA.gallery.images.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Imagem visual ${indexLabel(index)}</p>
            ${adminField("Caminho da imagem", `gallery.images.${index}.src`)}
            ${adminField("Alt", `gallery.images.${index}.alt`)}
            ${adminField("Legenda", `gallery.images.${index}.caption`)}
          </div>
        `).join("");

        const wordpressGalleryFields = PROPOSTA.gallery.images.map((_, index) => `
          <div class="pd-admin-item">
            <p class="pd-admin-help">Galeria WordPress ${indexLabel(index)}</p>
            ${adminField("URL absoluta", `wordpressMedia.gallery.${index}`)}
          </div>
        `).join("");

        const sectionToggles = Object.keys(PROPOSTA.sections).map((key) =>
          adminCheckbox(key, `sections.${key}`)
        ).join("");

        fields.innerHTML = [
          adminSection("Dados principais", `
            <div class="pd-admin-grid">
              ${adminField("Nome do cliente", "client.name")}
              ${adminField("Slug", "client.slug")}
              ${adminField("Data", "client.date")}
              ${adminField("Validade", "client.validity")}
              ${adminField("WhatsApp", "contact.whatsappNumber")}
              ${adminField("Cor principal", "theme.accent", "color")}
            </div>
            ${adminField("Nome da proposta", "client.proposalName")}
            ${adminField("Título da proposta", "hero.title")}
            ${adminField("Destaque do hero", "hero.highlight")}
            ${adminTextarea("Texto principal", "hero.lead", 4)}
            ${adminTextarea("Texto botão WhatsApp", "contact.whatsappQuestionText", 2)}
            ${adminTextarea("Texto aprovação WhatsApp", "contact.whatsappApproveText", 2)}
          `, true),

          adminSection("Introdução e diagnóstico", `
            ${adminField("Kicker introdução", "intro.kicker")}
            ${adminField("Título introdução", "intro.title")}
            ${adminTextarea("Descrição introdução", "intro.description", 2)}
            ${adminTextarea("Texto de introdução", "intro.text", 5)}
            ${adminField("Kicker diagnóstico", "diagnosis.kicker")}
            ${adminField("Título diagnóstico", "diagnosis.title")}
            ${adminTextarea("Descrição diagnóstico", "diagnosis.description", 2)}
            ${adminArrayTextarea("Diagnóstico (um por linha)", "diagnosis.items", 8)}
          `),

          adminSection("Serviços", `
            ${adminField("Kicker", "services.kicker")}
            ${adminField("Título", "services.title")}
            ${adminTextarea("Descrição", "services.description", 2)}
            ${serviceFields}
          `),

          adminSection("Pacotes e valores", `
            ${adminField("Kicker", "packages.kicker")}
            ${adminField("Título", "packages.title")}
            ${adminTextarea("Descrição", "packages.description", 2)}
            ${packageFields}
          `),

          adminSection("Investimento recomendado", `
            <div class="pd-admin-grid">
              ${adminField("Título", "investment.title")}
              ${adminField("Pacote", "investment.packageName")}
              ${adminField("Valor", "investment.price")}
              ${adminField("Validade exibida", "summary.metricValue")}
            </div>
            ${adminTextarea("Nota", "investment.note", 3)}
            ${adminTextarea("Resumo lateral", "summary.title", 2)}
            ${adminTextarea("Texto resumo lateral", "summary.text", 3)}
            ${adminTextarea("Legenda validade", "summary.metricLabel", 2)}
          `),

          adminSection("Detalhes / accordions", `
            ${adminField("Kicker", "details.kicker")}
            ${adminField("Título", "details.title")}
            ${adminTextarea("Descrição", "details.description", 2)}
            ${detailFields}
          `),

          adminSection("Cronograma", `
            ${adminField("Kicker", "timeline.kicker")}
            ${adminField("Título", "timeline.title")}
            ${adminTextarea("Descrição", "timeline.description", 2)}
            ${timelineFields}
          `),

          adminSection("Escopo", `
            ${adminField("Kicker", "scope.kicker")}
            ${adminField("Título", "scope.title")}
            ${adminTextarea("Descrição", "scope.description", 2)}
            ${adminField("Título incluso", "scope.includedTitle")}
            ${adminArrayTextarea("Escopo incluso (um por linha)", "scope.included", 7)}
            ${adminField("Título não incluso", "scope.excludedTitle")}
            ${adminArrayTextarea("Escopo não incluso (um por linha)", "scope.excluded", 7)}
          `),

          adminSection("Condições comerciais", `
            ${adminField("Kicker", "conditions.kicker")}
            ${adminField("Título", "conditions.title")}
            ${adminTextarea("Descrição", "conditions.description", 2)}
            ${conditionFields}
          `),

          adminSection("CTA final", `
            ${adminField("Kicker", "approval.kicker")}
            ${adminField("Título", "approval.title")}
            ${adminTextarea("Texto", "approval.text", 3)}
            ${adminField("Botão", "approval.button")}
          `),

          adminSection("Imagens configuráveis", `
            <p class="pd-admin-help">Os caminhos atuais foram preservados. Edite apenas quando quiser trocar a imagem por outro arquivo existente.</p>
            ${adminField("Ícone / estrela", "brand.icon")}
            ${adminField("Wordmark", "brand.wordmark")}
            ${adminField("Logo vitrine", "brand.showcaseLogo")}
            ${adminField("Logo introdução", "brand.identityLogo")}
            ${adminField("Arte introdução", "brand.identityArt")}
            ${galleryFields}
          `),

          adminSection("Imagens WordPress / URLs absolutas", `
            <p class="pd-admin-help">Cole aqui as URLs completas da biblioteca de mídia do WordPress. Quando ativado, URLs absolutas válidas substituem os caminhos locais. Campos vazios continuam usando o fallback local.</p>
            ${adminCheckbox("Usar URLs absolutas do WordPress", "wordpressMedia.enabled")}
            ${adminField("Ícone / símbolo", "wordpressMedia.icon")}
            ${adminField("Wordmark", "wordpressMedia.wordmark")}
            ${adminField("Logo vitrine", "wordpressMedia.showcaseLogo")}
            ${adminField("Logo introdução", "wordpressMedia.identityLogo")}
            ${adminField("Arte introdução", "wordpressMedia.identityArt")}
            ${wordpressGalleryFields}
          `),

          adminSection("Exibir / ocultar seções", `
            ${sectionToggles}
            <p class="pd-admin-help">A navegação acompanha automaticamente as seções habilitadas.</p>
          `),

          adminSection("Rodapé", `
            ${adminTextarea("Texto esquerdo", "footer.left", 2)}
            ${adminTextarea("Texto direito", "footer.right", 2)}
          `)
        ].join("");
      }

      function applyAdminFormToProposal() {
        const form = $("#pd-admin-form");
        if (!form) return;

        $$("[data-pd-path]", form).forEach((field) => {
          const path = field.dataset.pdPath;
          const value = field.type === "checkbox" ? field.checked : field.value;
          setPath(PROPOSTA, path, value);
        });

        $$("[data-pd-array-path]", form).forEach((field) => {
          const path = field.dataset.pdArrayPath;
          const items = field.value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
          setPath(PROPOSTA, path, items);
        });

        refreshProposal();
      }

      function updateAdminActiveClass() {
        const shell = $("#pd-proposal-shell");
        if (shell) shell.classList.toggle("pd-admin-active", pdAdminMode && !PD_ADMIN_EXPORT_LOCK);
        document.body?.classList.toggle("pd-admin-active", pdAdminMode && !PD_ADMIN_EXPORT_LOCK);
      }

      function setQuickTab(tabName) {
        $$(".pd-quick-edit-tab").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.quickTab === tabName);
        });
        $("#pd-quick-edit-content").hidden = tabName !== "content";
        $("#pd-quick-edit-style").hidden = tabName !== "style";
      }

      function setQuickPreview(src) {
        const preview = $("#pd-quick-edit-preview");
        if (!preview) return;
        const value = String(src || "").trim();
        preview.innerHTML = value
          ? `<img src="${attr(value)}" alt="Preview" onerror="handleImageError(this)" />`
          : `<span class="pd-image-fallback">Sem imagem selecionada</span>`;
      }

      function quickInputMarkup(type, path, value) {
        if (type === "image") {
          return `
            <label class="pd-admin-label">
              <span>URL ou caminho da imagem</span>
              <input type="text" id="pd-quick-edit-value" value="${attr(value)}" placeholder="assets/imagem.png ou https://..." />
            </label>
            <label class="pd-admin-label">
              <span>Escolher arquivo</span>
              <input type="file" id="pd-quick-edit-file" accept="image/*" />
            </label>
            <div class="pd-quick-edit-preview" id="pd-quick-edit-preview"></div>
            <p class="pd-admin-help">Para versão final em produção, prefira usar caminho do projeto ou URL hospedada.</p>
          `;
        }

        if (type === "textarea") {
          return `
            <label class="pd-admin-label">
              <span>Texto</span>
              <textarea id="pd-quick-edit-value" rows="7">${escapeHTML(value)}</textarea>
            </label>
          `;
        }

        if (type === "color") {
          const safeColor = /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : PROPOSTA.theme.accent;
          return `
            <label class="pd-admin-label">
              <span>Cor principal do tema</span>
              <input type="color" id="pd-quick-edit-color-picker" value="${attr(safeColor)}" />
            </label>
            <label class="pd-admin-label">
              <span>Valor CSS</span>
              <input type="text" id="pd-quick-edit-value" value="${attr(value)}" placeholder="#2dff12" />
            </label>
            <p class="pd-admin-help">Clique em uma área livre do bloco de investimento para alterar a cor principal.</p>
          `;
        }

        return `
          <label class="pd-admin-label">
            <span>Texto</span>
            <input type="text" id="pd-quick-edit-value" value="${attr(value)}" />
          </label>
        `;
      }

      function currentViewportDevice() {
        const width = window.innerWidth || 1200;
        if (width <= 640) return "mobile";
        if (width <= 980) return "tablet";
        return "desktop";
      }

      function styleInputId(key) {
        return `pd-style-${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;
      }

      function fillQuickStyleFields(styleKey, device = pdQuickEdit?.device || currentViewportDevice()) {
        const entry = pdQuickEdit?.visualDraft || normalizeVisualStyleEntry(PROPOSTA.visual?.[styleKey] || {});
        const style = entry[device] || emptyVisualStyle();
        const deviceSelect = $("#pd-style-device");
        if (deviceSelect) deviceSelect.value = device;

        Object.keys(PD_STYLE_PROPS).forEach((key) => {
          const input = $(`#${styleInputId(key)}`);
          if (input) input.value = style[key] || "";
        });
      }

      function readQuickStyleFields(styleKey) {
        if (!styleKey || !pdQuickEdit) return;
        const device = pdQuickEdit.device || currentViewportDevice();
        pdQuickEdit.visualDraft ||= normalizeVisualStyleEntry(PROPOSTA.visual?.[styleKey] || {});
        pdQuickEdit.visualDraft[device] ||= emptyVisualStyle();

        Object.keys(PD_STYLE_PROPS).forEach((key) => {
          const input = $(`#${styleInputId(key)}`);
          pdQuickEdit.visualDraft[device][key] = input ? input.value.trim() : "";
        });
      }

      function quickVisualSource() {
        const visual = deepClone(PROPOSTA.visual || {});
        if (pdQuickEdit?.styleKey) {
          visual[pdQuickEdit.styleKey] = normalizeVisualStyleEntry(pdQuickEdit.visualDraft || {});
        }
        return visual;
      }

      function previewQuickStyleFields() {
        if (!pdQuickEdit?.styleKey) return;
        readQuickStyleFields(pdQuickEdit.styleKey);
        renderVisualStyles(quickVisualSource());
      }

      function openQuickEdit(element) {
        if (!pdAdminMode || !element) return;
        const type = element.dataset.pdEdit || "text";
        const path = element.dataset.pdPath || "";
        const styleKey = element.dataset.pdStyle || styleKeyFromPath(path);
        if (!path) return;

        const device = currentViewportDevice();
        pdQuickEdit = {
          type,
          path,
          styleKey,
          device,
          visualDraft: normalizeVisualStyleEntry(PROPOSTA.visual?.[styleKey] || {})
        };
        const value = getPath(PROPOSTA, path) ?? "";
        const modal = $("#pd-quick-edit-modal");
        const fields = $("#pd-quick-edit-content-fields");
        const pathLabel = $("#pd-quick-edit-path");

        if (pathLabel) pathLabel.textContent = path;
        if (fields) fields.innerHTML = quickInputMarkup(type, path, value);
        fillQuickStyleFields(styleKey, device);
        setQuickTab("content");

        const valueInput = $("#pd-quick-edit-value");
        const colorPicker = $("#pd-quick-edit-color-picker");
        const fileInput = $("#pd-quick-edit-file");

        if (type === "image") {
          setQuickPreview(value);
          valueInput?.addEventListener("input", () => setQuickPreview(valueInput.value));
          fileInput?.addEventListener("change", () => {
            const file = fileInput.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              valueInput.value = String(reader.result || "");
              setQuickPreview(valueInput.value);
            };
            reader.readAsDataURL(file);
          });
        }

        if (type === "color" && colorPicker && valueInput) {
          colorPicker.addEventListener("input", () => {
            valueInput.value = colorPicker.value;
          });
        }

        if (modal) {
          modal.hidden = false;
          modal.setAttribute("aria-hidden", "false");
          window.setTimeout(() => valueInput?.focus(), 30);
        }
      }

      function closeQuickEdit(options = {}) {
        const modal = $("#pd-quick-edit-modal");
        const shouldRestoreStyles = pdQuickEdit && !options.keepVisualStyles;
        pdQuickEdit = null;
        if (modal) {
          modal.hidden = true;
          modal.setAttribute("aria-hidden", "true");
        }
        if (shouldRestoreStyles) renderVisualStyles();
      }

      function applyQuickEdit() {
        if (!pdQuickEdit) return;
        const valueInput = $("#pd-quick-edit-value");
        if (valueInput) {
          setPath(PROPOSTA, pdQuickEdit.path, valueInput.value);
        }
        readQuickStyleFields(pdQuickEdit.styleKey);
        if (pdQuickEdit.styleKey) {
          PROPOSTA.visual ||= {};
          PROPOSTA.visual[pdQuickEdit.styleKey] = normalizeVisualStyleEntry(pdQuickEdit.visualDraft || {});
        }
        refreshProposal();
        renderAdminEditor();
        closeQuickEdit({ keepVisualStyles: true });
        showAdminToast("Alteração aplicada. Salve o rascunho para manter.");
      }

      function handleVisualEditClick(event) {
        if (!pdAdminMode || PD_ADMIN_EXPORT_LOCK) return;
        const target = event.target.closest?.("[data-pd-edit]");
        if (!target || target.closest("[data-pd-admin]")) return;
        event.preventDefault();
        event.stopPropagation();
        openQuickEdit(target);
      }

      function openAdminDrawer() {
        if (!pdAdminMode) return;
        renderAdminEditor();
        const drawer = $("#pd-admin-drawer");
        const backdrop = $("#pd-admin-backdrop");
        if (drawer) {
          drawer.hidden = false;
          drawer.setAttribute("aria-hidden", "false");
        }
        if (backdrop) backdrop.hidden = false;
      }

      function closeAdminDrawer() {
        const drawer = $("#pd-admin-drawer");
        const backdrop = $("#pd-admin-backdrop");
        if (drawer) {
          drawer.hidden = true;
          drawer.setAttribute("aria-hidden", "true");
        }
        if (backdrop) backdrop.hidden = true;
      }

      function setAdminMode(active) {
        if (PD_ADMIN_EXPORT_LOCK) return;
        pdAdminMode = active;
        const bar = $("#pd-admin-bar");
        if (bar) bar.hidden = !active;
        updateAdminActiveClass();
        if (!active) {
          closeAdminDrawer();
          closeQuickEdit();
        } else {
          renderAdminEditor();
          showAdminToast("Modo admin ativado. Clique em textos, imagens e blocos para editar.");
        }
      }

      function restoreDefaultProposal() {
        if (!window.confirm("Restaurar o padrão e apagar o rascunho local?")) return;
        PROPOSTA = deepClone(PD_DEFAULT_PROPOSTA);
        localStorage.removeItem(PD_STORAGE_KEY);
        refreshProposal();
        renderAdminEditor();
        showAdminToast("Padrão restaurado.");
      }

      function downloadTextFile(filename, content, type = "text/plain;charset=utf-8") {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }

      function exportFinalHTML() {
        applyAdminFormToProposal();
        renderVisualStyles();
        const proposalShell = $("#pd-proposal-shell");
        const exportShell = proposalShell?.cloneNode(true);
        if (exportShell) {
          exportShell.classList.remove("pd-admin-active");
          exportShell.querySelectorAll("[data-pd-edit], [data-pd-path]").forEach((element) => {
            element.removeAttribute("data-pd-edit");
            element.removeAttribute("data-pd-path");
          });
        }
        const styleTag = Array.from(document.querySelectorAll("style")).find((style) =>
          style.id !== "pd-dynamic-visual-styles" && style.textContent.includes(".pd-proposal")
        );
        const dynamicStyleTag = document.getElementById("pd-dynamic-visual-styles");
        const serializedProposal = JSON.stringify(PROPOSTA, null, 8).replace(/</g, "\\u003c");
        let scriptSource = PD_SCRIPT_SOURCE || "";
        if (scriptSource.includes("let PROPOSTA = window.PROPOSTA;")) {
          scriptSource = scriptSource.replace("let PROPOSTA = window.PROPOSTA;", `let PROPOSTA = ${serializedProposal};`);
        } else {
          scriptSource = scriptSource.replace(
            /let PROPOSTA = [\s\S]*?\n\s*const PD_STORAGE_KEY =/,
            `let PROPOSTA = ${serializedProposal};\n\n      const PD_STORAGE_KEY =`
          );
        }
        scriptSource = scriptSource.replace("const PD_EMBEDDED_ELEMENTOR = window.PD_EMBEDDED_ELEMENTOR === true;", "const PD_EMBEDDED_ELEMENTOR = false;");
        scriptSource = scriptSource.replace("const PD_SCRIPT_SOURCE = window.PD_RUNTIME_SOURCE || document.currentScript?.textContent || \"\";", "const PD_SCRIPT_SOURCE = document.currentScript?.textContent || \"\";");
        scriptSource = scriptSource.replace("`pixeldemand-proposta-admin-draft-v1:${window.PD_CURRENT_SLUG || PROPOSTA?.client?.slug || \"default\"}`", "\"pixeldemand-proposta-admin-draft-v1\"");
        scriptSource = scriptSource.replace("const PD_ADMIN_EXPORT_LOCK = false;", "const PD_ADMIN_EXPORT_LOCK = true;");

        const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
    <title>${escapeHTML(PROPOSTA.brand.agencyName)} | ${escapeHTML(PROPOSTA.client.proposalName)} — ${escapeHTML(PROPOSTA.client.name)}</title>
    <style>
${styleTag ? styleTag.textContent : ""}
    </style>
${dynamicStyleTag?.textContent ? `    <style id="pd-dynamic-visual-styles">\n${dynamicStyleTag.textContent}\n    </style>` : ""}
  </head>
  <body>
${exportShell ? exportShell.outerHTML : ""}
    <script>
${scriptSource}
    <\/script>
  </body>
</html>`;

        downloadTextFile(`proposta-${PROPOSTA.client.slug || "pixel-demand"}.html`, html, "text/html;charset=utf-8");
        showAdminToast("HTML final exportado sem painel admin.");
      }

      function exportPDF() {
        applyAdminFormToProposal();
        showAdminToast("Abrindo impressão para exportar PDF.");
        window.setTimeout(() => window.print(), 120);
      }

      function setupAdmin() {
        if (PD_ADMIN_EXPORT_LOCK) return;

        window.addEventListener("keydown", (event) => {
          if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "e") {
            event.preventDefault();
            setAdminMode(!pdAdminMode);
          }
        });

        document.addEventListener("click", handleVisualEditClick, true);
        $("#pd-admin-visual")?.addEventListener("click", () => {
          closeAdminDrawer();
          showAdminToast("Clique diretamente em um texto, imagem, card ou bloco da proposta.");
        });
        $("#pd-admin-open")?.addEventListener("click", openAdminDrawer);
        $("#pd-admin-close")?.addEventListener("click", closeAdminDrawer);
        $("#pd-admin-close-footer")?.addEventListener("click", closeAdminDrawer);
        $("#pd-admin-backdrop")?.addEventListener("click", closeAdminDrawer);
        $("#pd-admin-exit")?.addEventListener("click", () => setAdminMode(false));
        $("#pd-quick-edit-close")?.addEventListener("click", closeQuickEdit);
        $("#pd-quick-edit-cancel")?.addEventListener("click", closeQuickEdit);
        $("#pd-quick-edit-apply")?.addEventListener("click", applyQuickEdit);
        $("#pd-quick-edit-modal")?.addEventListener("click", (event) => {
          if (event.target?.id === "pd-quick-edit-modal") closeQuickEdit();
        });
        $("#pd-style-device")?.addEventListener("change", (event) => {
          if (!pdQuickEdit) return;
          readQuickStyleFields(pdQuickEdit.styleKey);
          pdQuickEdit.device = event.target.value || "desktop";
          fillQuickStyleFields(pdQuickEdit.styleKey, pdQuickEdit.device);
          renderVisualStyles(quickVisualSource());
        });
        Object.keys(PD_STYLE_PROPS).forEach((key) => {
          const input = $(`#${styleInputId(key)}`);
          input?.addEventListener("input", previewQuickStyleFields);
          input?.addEventListener("change", previewQuickStyleFields);
        });
        $$(".pd-quick-edit-tab").forEach((button) => {
          button.addEventListener("click", () => setQuickTab(button.dataset.quickTab || "content"));
        });
        $("#pd-admin-apply")?.addEventListener("click", () => {
          applyAdminFormToProposal();
          renderAdminEditor();
          showAdminToast("Prévia atualizada.");
        });
        $("#pd-admin-save")?.addEventListener("click", saveDraft);
        $("#pd-admin-save-drawer")?.addEventListener("click", saveDraft);
        $("#pd-admin-reset")?.addEventListener("click", restoreDefaultProposal);
        $("#pd-admin-export-html")?.addEventListener("click", exportFinalHTML);
        $("#pd-admin-export-pdf")?.addEventListener("click", exportPDF);
      }

      function initProposal() {
        refreshProposal();
      }

      loadSavedDraft();
      migrateVisualStyles();
      initProposal();
      setupAdmin();
