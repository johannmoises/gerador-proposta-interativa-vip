const baseProposal = {
        theme: {
          accent: "#2dff12",
          bg: "#050505",
          graphite: "#111010",
          panel: "#1b181a",
          panel2: "#211f20",
          text: "#f8f8f4",
          muted: "#bdb7b7"
        },

        visual: {
          heroEyebrow: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          heroTitle: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          heroHighlight: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          heroLead: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          investmentTitle: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          investmentPrice: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          },
          approvalTitle: {
            desktop: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            tablet: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" },
            mobile: { fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
          }
        },

        brand: {
          agencyName: "Pixel Demand",
          wordmarkAlt: "Pixel Demand",
          icon: "imagens identidade visual pixel demand/icone pixel demand.png",
          wordmark: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-18.png",
          showcaseLogo: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-17.png",
          identityLogo: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-18.png",
          identityArt: "imagens identidade visual pixel demand/PROPOSTA INVESTIMENTO - pixel demand-01.png"
        },

        wordpressMedia: {
          // Elementor/WordPress: mude enabled para true e cole aqui as URLs absolutas da biblioteca de mídia.
          // Se algum campo ficar vazio, o template usa automaticamente o caminho local antigo em brand/gallery.
          enabled: false,
          icon: "",
          wordmark: "",
          showcaseLogo: "",
          identityLogo: "",
          identityArt: "",
          gallery: [
            "",
            "",
            ""
          ]
        },

        client: {
          name: "Brooklyn Academia",
          slug: "brooklyn-academia",
          proposalName: "Proposta de investimento",
          validity: "7 dias",
          date: "Maio de 2026"
        },

        contact: {
          whatsappNumber: "5500000000000",
          whatsappApproveText: "Quero aprovar a proposta da Pixel Demand para Brooklyn Academia",
          whatsappQuestionText: "Quero tirar uma dúvida sobre a proposta da Pixel Demand para Brooklyn Academia"
        },

        sections: {
          intro: true,
          diagnosis: true,
          services: true,
          gallery: false,
          packages: true,
          details: true,
          timeline: true,
          scope: true,
          investment: true,
          conditions: true,
          approval: true
        },

        behavior: {
          closeOtherAccordions: false,
          enableScrollReveal: true,
          enablePackageSelection: true
        },

        nav: [
          { label: "Serviços", target: "servicos", section: "services" },
          { label: "Pacotes", target: "pacotes", section: "packages" },
          { label: "Investimento", target: "investimento", section: "investment" },
          { label: "Aprovar", target: "aprovar", section: "approval" }
        ],

        hero: {
          eyebrow: "Proposta comercial personalizada",
          title: "Proposta de investimento",
          highlight: "Brooklyn Academia",
          lead: "Uma experiência interativa para apresentar diagnóstico, serviços, escopo, cronograma e investimento com clareza premium, visual forte e aprovação simples.",
          primaryButton: "Ver investimento",
          secondaryButton: "Falar no WhatsApp"
        },

        summary: {
          metricValue: "7 dias",
          metricLabel: "Validade comercial para aprovação desta proposta.",
          title: "Reposicionar a presença digital com consistência visual e foco comercial.",
          text: "Esta proposta organiza a narrativa, o escopo, os investimentos e os próximos passos em uma experiência digital direta, moderna e fácil de aprovar."
        },

        intro: {
          kicker: "Introdução",
          title: "Visão do projeto",
          description: "Resumo direto do que esta proposta resolve e de como a Pixel Demand conduz a entrega.",
          text: "A Brooklyn Academia tem uma oportunidade direta de fortalecer percepção de valor, organizar melhor sua comunicação e transformar seus canais digitais em uma vitrine mais consistente para captação de alunos."
        },

        diagnosis: {
          kicker: "Diagnóstico",
          title: "Contexto",
          description: "Pontos de atenção identificados antes da construção da solução.",
          items: [
            "O Instagram ainda não comunica todo o potencial da marca, principalmente em relação à energia, estrutura e experiência oferecida.",
            "Existe uma oportunidade de padronizar posts, stories e materiais comerciais para reforçar identidade e reconhecimento.",
            "O conteúdo pode apresentar melhor diferenciais, ambiente, acompanhamento, treinos, resultados e prova social.",
            "Uma linha visual mais consistente pode facilitar desejo, autoridade e conversão de novos alunos."
          ]
        },

        services: {
          kicker: "Serviços",
          title: "Incluídos",
          description: "Entregas principais organizadas para aumentar clareza, consistência e conversão.",
          items: [
            {
              title: "Direção visual",
              text: "Sistema de comunicação com linguagem, ritmo, composição e padrão visual para campanhas e rotina."
            },
            {
              title: "Social media",
              text: "Planejamento de conteúdo e criativos para feed, stories e anúncios com foco em clareza e desejo."
            },
            {
              title: "Materiais comerciais",
              text: "Peças de apoio para ofertas, lançamentos, campanhas sazonais e comunicação de planos."
            },
            {
              title: "Landing page",
              text: "Página objetiva para apresentação, benefícios, oferta e contato com foco em conversão."
            },
            {
              title: "Motion e vídeo",
              text: "Cortes, animações e recursos visuais para aumentar retenção e percepção profissional."
            },
            {
              title: "Gestão de projeto",
              text: "Organização de entregas, alinhamentos, prioridades e acompanhamento durante o projeto."
            }
          ]
        },

        gallery: {
          kicker: "Visual",
          title: "Referências",
          description: "Bloco opcional para imagens, mockups, prints, identidade visual, referências ou prévias do projeto.",
          introTitle: "Material visual configurável",
          introText: "Ative esta seção quando quiser apresentar imagens de apoio sem deixar cards soltos no meio da proposta.",
          images: [
            {
              src: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-03.png",
              alt: "Referência visual Pixel Demand",
              caption: "Direção visual"
            },
            {
              src: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-05.png",
              alt: "Referência visual Pixel Demand",
              caption: "Aplicação de marca"
            },
            {
              src: "imagens identidade visual pixel demand/PIXEL DEMAND - KV 2026-14.png",
              alt: "Referência visual Pixel Demand",
              caption: "Sistema gráfico"
            }
          ]
        },

        packages: {
          kicker: "Opções",
          title: "Pacotes",
          description: "Caminhos comerciais possíveis para adequar profundidade, ritmo e investimento.",
          items: [
            {
              name: "Essencial",
              price: "R$ 4.800",
              description: "Base visual, conteúdos prioritários e organização inicial para gerar consistência rapidamente.",
              tag: "Entrada",
              recommended: false,
              investmentNote: "Pacote Essencial, com condição de pagamento em 50% na aprovação e 50% na entrega final."
            },
            {
              name: "Performance",
              price: "R$ 8.000",
              description: "Direção completa, social, landing page e materiais comerciais para captação com mais estrutura.",
              tag: "Recomendado",
              recommended: true,
              investmentNote: "Pacote Performance, com condição de pagamento em 50% na aprovação e 50% na entrega final."
            },
            {
              name: "Premium",
              price: "R$ 12.500",
              description: "Escopo ampliado com motion, campanhas, páginas extras e acompanhamento mais próximo.",
              tag: "Completo",
              recommended: false,
              investmentNote: "Pacote Premium, com condição de pagamento em 50% na aprovação e 50% na entrega final."
            }
          ]
        },

        details: {
          kicker: "Detalhes",
          title: "Entregas",
          description: "Cada bloco pode ser aberto para visualizar o escopo de forma objetiva.",
          items: [
            {
              title: "Identidade aplicada e direção criativa",
              open: true,
              text: "Organização da linguagem visual para manter consistência em todos os pontos de contato.",
              bullets: [
                "Guia visual aplicado para redes e campanhas.",
                "Paleta, uso tipográfico, composições e hierarquia.",
                "Modelos base para comunicação recorrente."
              ]
            },
            {
              title: "Conteúdos e materiais digitais",
              open: false,
              text: "Criativos pensados para comunicar valor, diferenciais e ofertas de forma mais comercial.",
              bullets: [
                "Posts estáticos e carrosséis.",
                "Stories de campanha e relacionamento.",
                "Peças comerciais para planos, aulas e chamadas."
              ]
            },
            {
              title: "Página de conversão",
              open: false,
              text: "Landing page responsiva para apresentar a academia e conduzir o interessado ao contato.",
              bullets: [
                "Hero com oferta principal.",
                "Blocos de benefícios, estrutura e prova social.",
                "CTA para WhatsApp e captura de interesse."
              ]
            }
          ]
        },

        timeline: {
          kicker: "Etapas",
          title: "Cronograma",
          description: "Cadência simples para sair de alinhamento, passar por produção e chegar na entrega final.",
          items: [
            {
              period: "Semana 01",
              title: "Imersão e alinhamento",
              text: "Coleta de referências, objetivos, ofertas, materiais existentes e definição das prioridades."
            },
            {
              period: "Semana 02",
              title: "Direção visual e primeiras peças",
              text: "Criação do sistema visual aplicado, aprovações iniciais e ajuste de linguagem."
            },
            {
              period: "Semana 03",
              title: "Produção das entregas",
              text: "Desenvolvimento dos materiais, página e criativos conforme pacote escolhido."
            },
            {
              period: "Semana 04",
              title: "Revisão e entrega final",
              text: "Refinamentos finais, fechamento dos arquivos e orientação de uso dos materiais."
            }
          ]
        },

        scope: {
          kicker: "Escopo",
          title: "Limites",
          description: "Bloco importante para proteger o projeto e evitar desalinhamento depois da aprovação.",
          includedTitle: "Incluso nesta proposta",
          excludedTitle: "Não incluso nesta proposta",
          included: [
            "Planejamento e direção visual das entregas descritas.",
            "Criação dos materiais previstos no pacote aprovado.",
            "Ajustes de refinamento dentro do escopo combinado.",
            "Orientação de uso e organização final dos arquivos."
          ],
          excluded: [
            "Gestão de tráfego pago ou verba de mídia.",
            "Captações presenciais extras não previstas no escopo.",
            "Demandas urgentes fora do cronograma combinado.",
            "Novas páginas, peças ou campanhas não listadas na proposta."
          ]
        },

        investment: {
          title: "Investimento recomendado",
          packageName: "Performance",
          price: "R$ 8.000",
          note: "Pacote Performance, com condição de pagamento em 50% na aprovação e 50% na entrega final."
        },

        conditions: {
          kicker: "Comercial",
          title: "Condições",
          description: "Regras essenciais para início, pagamento e validade da proposta.",
          items: [
            {
              title: "Início",
              text: "O projeto inicia após aprovação formal e pagamento da primeira parcela."
            },
            {
              title: "Pagamento",
              text: "50% na aprovação e 50% na entrega. Outras condições podem ser alinhadas antes do aceite."
            },
            {
              title: "Validade",
              text: "Valores e escopo válidos por 7 dias a partir do envio desta proposta."
            }
          ]
        },

        approval: {
          kicker: "Aprovação",
          title: "Pronto para aprovar?",
          text: "Ao aprovar, alinhamos os próximos passos, materiais necessários e data de início do projeto.",
          button: "Aprovar no WhatsApp"
        },

        footer: {
          left: "Pixel Demand — proposta comercial personalizada.",
          right: "Página não indexável. Link criado para análise direta do cliente."
        }
      };

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDeep(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      target[key] = value;
      return;
    }

    if (value && typeof value === "object" && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
      target[key] = mergeDeep({ ...target[key] }, value);
      return;
    }

    target[key] = value;
  });
  return target;
}

function proposalVariant(overrides) {
  return mergeDeep(deepClone(baseProposal), overrides);
}

const nonnaAngelaProposal = proposalVariant({
  visual: {
    heroTitle: {
      desktop: { fontSize: "65", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    heroHighlight: {
      desktop: { fontSize: "40", fontWeight: "500", lineHeight: "", letterSpacing: "2", textAlign: "", color: "" }
    },
    heroLead: {
      desktop: { fontSize: "20", fontWeight: "100", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    investmentTitle: {
      desktop: { fontSize: "56", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    introText: {
      desktop: { fontSize: "20", fontWeight: "500", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    packagesTitle: {
      desktop: { fontSize: "60", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    servicesTitle: {
      desktop: { fontSize: "59", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    diagnosisTitle: {
      desktop: { fontSize: "55", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    introTitle: {
      desktop: { fontSize: "60", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    detailsTitle: {
      desktop: { fontSize: "57", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    timelineTitle: {
      desktop: { fontSize: "58", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    scopeTitle: {
      desktop: { fontSize: "60", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    },
    conditionsTitle: {
      desktop: { fontSize: "58", fontWeight: "", lineHeight: "", letterSpacing: "", textAlign: "", color: "" }
    }
  },
  brand: {
    identityArt: "/imagens identidade visual pixel demand/nonna.jpg"
  },
  client: {
    name: "Massas Nonna Angela",
    slug: "nonna-angela",
    proposalName: "Proposta de investimento",
    validity: "7 dias",
    date: "Maio de 2026"
  },
  contact: {
    whatsappNumber: "554491445267",
    whatsappApproveText: "Quero aprovar a proposta da Pixel Demand para Massas Nonna Angela",
    whatsappQuestionText: "Quero tirar uma dúvida sobre a proposta da Pixel Demand para Massas Nonna Angela"
  },
  hero: {
    title: "Proposta de investimento",
    highlight: "Massas Nonna Angela",
    lead: "Uma proposta para organizar a presença digital da Massas Nonna Angela com mais clareza, estética e intenção comercial."
  },
  summary: {
    title: "Organizar a comunicação sem mudar a essência — só apresentar melhor o que já existe.",
    text: "A Pixel Demand entra como apoio profissional para organizar a comunicação da Massas Nonna Angela, melhorar a apresentação dos conteúdos e criar materiais mais bonitos e comerciais, sem mudar a essência da marca."
  },
  intro: {
    title: "Visão do projeto",
    description: "O que esta proposta resolve para a Massas Nonna Angela.",
    text: "A ideia não é mudar a essência da marca, mas valorizar melhor o que ela já tem: tradição, sabor, cuidado e produtos com apelo visual. A Pixel Demand entra como apoio para melhorar a apresentação dos conteúdos e organizar a comunicação de forma mais profissional."
  },
  diagnosis: {
    title: "Contexto",
    description: "Pontos de atenção identificados antes da construção da solução.",
    items: [
      "A comunicação pode transmitir melhor a tradição, o sabor e o cuidado da marca.",
      "Os conteúdos podem ser mais organizados visualmente.",
      "Produtos, bastidores e encomendas podem aparecer com mais clareza.",
      "Uma presença mais consistente ajuda a fortalecer lembrança e confiança."
    ]
  },
  services: {
    description: "O que a Pixel Demand oferece como apoio à comunicação da Massas Nonna Angela.",
    items: [
      {
        title: "Direção visual básica",
        text: "Organização de linguagem, enquadramento e padrão visual para os conteúdos da marca."
      },
      {
        title: "Conteúdos para redes",
        text: "Vídeos curtos e materiais simples para Reels, Stories e publicações no Instagram."
      },
      {
        title: "Apoio comercial",
        text: "Chamadas e peças pontuais para produtos, encomendas, combos e datas especiais."
      },
      {
        title: "Organização mensal",
        text: "Alinhamento de prioridades, materiais e entregas do mês conforme o plano escolhido."
      }
    ]
  },
  packages: {
    description: "Caminhos possíveis para começar, manter ou ampliar a comunicação da Massas Nonna Angela.",
    items: [
      {
        name: "Projeto Fechado",
        price: "R$ 1.000",
        description: "Produção pontual para criar materiais iniciais com melhor apresentação dos produtos, preparos e bastidores.",
        tag: "Pacote 01",
        recommended: false,
        investmentNote: "Projeto Fechado — R$ 1.000, pagamento único na aprovação. Ideal para começar sem compromisso mensal e sentir, na prática, a diferença de uma apresentação mais profissional.",
        details: [
          "1 captação presencial",
          "4 a 6 vídeos curtos editados",
          "registros de produtos, preparos e bastidores",
          "cortes para Reels e Stories",
          "entrega organizada dos arquivos finais"
        ]
      },
      {
        name: "Plano Mensal Essencial",
        price: "R$ 1.400/mês",
        description: "Plano leve para manter a Massas Nonna Angela presente nas redes com conteúdos mais organizados e comerciais.",
        tag: "Pacote 02",
        recommended: true,
        investmentNote: "Plano Mensal Essencial — R$ 1.400/mês, contrato mensal renovável. Uma condição inicial para organizar a comunicação da Massas Nonna Angela com constância, materiais melhores e um volume de entregas realista para a fase atual da marca.",
        details: [
          "1 captação presencial por mês",
          "6 a 8 vídeos curtos editados",
          "conteúdos para Reels e Stories",
          "chamadas para produtos e encomendas",
          "organização básica dos conteúdos do mês",
          "orientação visual simples"
        ]
      },
      {
        name: "Plano Mensal Completo",
        price: "R$ 2.000/mês",
        description: "Plano com mais volume de conteúdo e apoio mensal para fortalecer a presença digital da marca.",
        tag: "Pacote 03",
        recommended: false,
        investmentNote: "Plano Mensal Completo — R$ 2.000/mês, contrato mensal renovável. Indicado para quem quer mais volume, mais consistência e um acompanhamento mais próximo da comunicação mensal.",
        details: [
          "2 captações presenciais por mês",
          "10 a 12 vídeos curtos editados",
          "até 4 posts ou carrosséis simples",
          "Stories comerciais e institucionais",
          "apoio em datas especiais",
          "acompanhamento mensal da comunicação"
        ]
      }
    ]
  },
  details: {
    items: [
      {
        title: "Direção visual e organização dos conteúdos",
        open: true,
        text: "Organização da linguagem e do padrão visual para deixar os conteúdos mais coerentes e apresentáveis.",
        bullets: [
          "Orientação de enquadramento, luz e composição nas captações.",
          "Padrão visual básico para os conteúdos do mês.",
          "Consistência entre vídeos, stories e publicações."
        ]
      },
      {
        title: "Vídeos e conteúdos para redes sociais",
        open: false,
        text: "Produção de vídeos curtos e materiais simples para o Instagram da Massas Nonna Angela.",
        bullets: [
          "Vídeos editados para Reels e Stories.",
          "Registros de produtos, preparos, bastidores e encomendas.",
          "Chamadas simples para produtos, ofertas e pedidos."
        ]
      },
      {
        title: "Apoio comercial e datas especiais",
        open: false,
        text: "Materiais pontuais de apoio para datas, encomendas e comunicação comercial básica.",
        bullets: [
          "Peças simples para combos, promoções e encomendas.",
          "Apoio em datas como Dia das Mães, Natal e Páscoa.",
          "Stories e chamadas comerciais conforme o plano escolhido."
        ]
      }
    ]
  },
  timeline: {
    title: "Cronograma",
    description: "Etapas simples para organizar o início da produção.",
    items: [
      {
        period: "Etapa 01",
        title: "Alinhamento inicial",
        text: "Conversa rápida para entender prioridades, produtos, referências e o que a marca quer comunicar."
      },
      {
        period: "Etapa 02",
        title: "Captação e organização",
        text: "Visita presencial para registrar produtos, preparos e bastidores com direção visual básica."
      },
      {
        period: "Etapa 03",
        title: "Produção dos conteúdos",
        text: "Edição dos vídeos e materiais conforme o pacote aprovado."
      },
      {
        period: "Etapa 04",
        title: "Entrega e ajustes",
        text: "Entrega organizada dos arquivos finais e ajustes combinados dentro do escopo."
      }
    ]
  },
  scope: {
    included: [
      "Direção visual básica nas captações.",
      "Edição dos materiais previstos no pacote aprovado.",
      "Ajustes dentro do escopo combinado.",
      "Entrega organizada dos arquivos finais."
    ],
    excluded: [
      "Tráfego pago ou verba de mídia.",
      "Captações presenciais extras fora do pacote.",
      "Demandas urgentes fora do combinado.",
      "Peças, vídeos ou campanhas não previstos na proposta."
    ]
  },
  investment: {
    title: "Investimento recomendado",
    packageName: "Plano Mensal Essencial",
    price: "R$ 1.400/mês",
    note: "Plano Mensal Essencial — R$ 1.400/mês. Uma condição inicial para organizar a comunicação da Massas Nonna Angela com constância, materiais melhores e um volume de entregas realista para a fase atual da marca."
  },
  conditions: {
    items: [
      {
        title: "Início",
        text: "O trabalho começa após aprovação da proposta e pagamento da primeira mensalidade."
      },
      {
        title: "Pagamento",
        text: "Pagamento mensal recorrente. O Projeto Fechado é pago integralmente na aprovação."
      },
      {
        title: "Validade",
        text: "Valores e escopo válidos por 7 dias a partir do envio desta proposta."
      }
    ]
  },
  approval: {
    title: "Pronto para aprovar?",
    text: "Ao aprovar, alinhamos os próximos passos e a data de início. Sem burocracia.",
    button: "Aprovar no WhatsApp"
  }
});

export const proposals = {
  "brooklyn-academia": baseProposal,

  "nonna-angela": nonnaAngelaProposal,

  "donna-angela": nonnaAngelaProposal,

  "grand-villagio": proposalVariant({
    client: {
      name: "Grand Villagio",
      slug: "grand-villagio",
      proposalName: "Proposta de investimento",
      validity: "7 dias",
      date: "Maio de 2026"
    },
    contact: {
      whatsappApproveText: "Quero aprovar a proposta da Pixel Demand para Grand Villagio",
      whatsappQuestionText: "Quero tirar uma dúvida sobre a proposta da Pixel Demand para Grand Villagio"
    },
    hero: {
      highlight: "Grand Villagio"
    }
  })
};

export const proposalSlugs = Object.keys(proposals);

export function getProposalBySlug(slug = "brooklyn-academia") {
  return deepClone(proposals[slug] || proposals["brooklyn-academia"]);
}

export { baseProposal };
