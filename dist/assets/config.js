// Conteúdo e identidade do projeto conceitual Aurena Beauty.
export default {
  "demoMode": true,
  "business": {
    "name": "Aurena Beauty",
    "category": "Salão de beleza",
    "monogram": "A"
  },
  "brand": {
    "logoLight": "assets/brand/logo-clara.webp",
    "logoDark": "assets/brand/logo-escura.webp",
    "symbolLight": "assets/brand/simbolo-claro.webp",
    "symbolDark": "assets/brand/simbolo-escuro.webp",
    "logoWidth": 1000,
    "logoHeight": 302,
    "symbolWidth": 360,
    "symbolHeight": 266,
    "favicon": "assets/favicon.png"
  },
  "theme": {
    "dark": "#643845",
    "paper": "#F5EFE6",
    "terracotta": "#B97965",
    "ink": "#643845",
    "terracottaAction": "#E6B8A2",
    "terracottaInk": "#864F40",
    "terracottaText": "#F0C4AF",
    "muted": "#765D61",
    "surface": "#EEE2D8",
    "darkSurface": "#57303C",
    "line": "#D6BCB7"
  },
  "seo": {
    "title": "Aurena Beauty — Seu momento de beleza. | Projeto conceitual Nofer",
    "description": "Cortes, escovas, coloração e tratamentos. Conheça a Aurena Beauty, projeto conceitual da Agência Nofer, e experimente a solicitação de horário por WhatsApp.",
    "siteUrl": "https://aurena.agencianofer.com.br/",
    "image": "assets/images/aurena-social.jpg",
    "allowIndexing": false
  },
  "contact": {
    "whatsapp": "",
    "countryCode": "55",
    "instagram": ""
  },
  "location": {
    "address": "",
    "city": "",
    "note": "O endereço será informado na versão do salão."
  },
  "hours": [
    {
      "days": "Terça a sexta",
      "time": "9h às 19h"
    },
    {
      "days": "Sábado",
      "time": "9h às 18h"
    },
    {
      "days": "Domingo e segunda",
      "time": "Fechado"
    }
  ],
  "serviceCategories": [
    {
      "id": "todos",
      "label": "Todos"
    },
    {
      "id": "cortes",
      "label": "Cortes"
    },
    {
      "id": "escovas",
      "label": "Escovas"
    },
    {
      "id": "coloracao",
      "label": "Coloração"
    },
    {
      "id": "tratamentos",
      "label": "Tratamentos"
    }
  ],
  "services": [
    {
      "id": "corte",
      "category": "cortes",
      "name": "Corte personalizado",
      "description": "Forma, movimento e acabamento para o seu estilo.",
      "price": 80,
      "fromPrice": true
    },
    {
      "id": "escova",
      "category": "escovas",
      "name": "Escova",
      "description": "Finalização com leveza e o movimento que você procura.",
      "price": 60,
      "fromPrice": true
    },
    {
      "id": "coloracao",
      "category": "coloracao",
      "name": "Coloração",
      "description": "Cor pensada para você, com avaliação da técnica e dos fios.",
      "price": 160,
      "fromPrice": true
    },
    {
      "id": "hidratacao",
      "category": "tratamentos",
      "name": "Hidratação",
      "description": "Reposição de hidratação e maciez, conforme os seus fios.",
      "price": 90,
      "fromPrice": true
    },
    {
      "id": "reconstrucao",
      "category": "tratamentos",
      "name": "Reconstrução",
      "description": "Um tratamento escolhido a partir da avaliação do cabelo.",
      "price": 140,
      "fromPrice": true
    }
  ],
  "featuredService": {
    "serviceId": "hidratacao",
    "eyebrow": "Um tempo para cuidar",
    "description": "Uma pausa para olhar para os seus fios e conversar sobre o cuidado que eles precisam.",
    "action": "Escolher tratamento",
    "footer": "Seu próximo cuidado",
    "image": {
      "src": "assets/images/aurena-materiais.webp",
      "alt": "Papelaria creme e vinho da identidade Aurena Beauty. Aplicação conceitual.",
      "width": 329,
      "height": 323
    }
  },
  "images": {
    "illustrative": true,
    "hero": {
      "src": "assets/images/aurena-fachada.webp",
      "alt": "Fachada conceitual da Aurena Beauty, com tons creme, madeira e iluminação acolhedora.",
      "width": 662,
      "height": 439,
      "position": "center center"
    },
    "gallery": [
      {
        "src": "assets/images/aurena-ambiente.webp",
        "alt": "Espelho arqueado e cadeira em tons suaves em um ambiente conceitual Aurena Beauty.",
        "width": 319,
        "height": 439,
        "label": "A atmosfera",
        "detail": "Luz suave, madeira e acolhimento.",
        "credit": "Painel conceitual Aurena / Agência Nofer",
        "cutout": true
      },
      {
        "src": "assets/images/aurena-avental.webp",
        "alt": "Avental vinho com a marca Aurena Beauty. Aplicação conceitual, sem representar uma equipe real.",
        "width": 321,
        "height": 323,
        "label": "Os materiais",
        "detail": "Texturas que acompanham o cuidado.",
        "credit": "Painel conceitual Aurena / Agência Nofer",
        "cutout": false
      },
      {
        "src": "assets/images/aurena-toalha.webp",
        "alt": "Toalha vinho bordada com o símbolo Aurena em um salão conceitual.",
        "width": 299,
        "height": 423,
        "label": "Os detalhes",
        "detail": "A identidade em cada ponto de contato.",
        "credit": "Painel conceitual Aurena / Agência Nofer",
        "cutout": false
      }
    ]
  },
  "copy": {
    "skipLink": "Pular para o conteúdo",
    "homeLabel": "início",
    "menuOpen": "Abrir menu",
    "menuClose": "Fechar menu",
    "navLabel": "Navegação principal",
    "navigation": [
      {
        "href": "#inicio",
        "label": "Início"
      },
      {
        "href": "#servicos",
        "label": "Serviços"
      },
      {
        "href": "#a-aurena",
        "label": "A Aurena"
      },
      {
        "href": "#galeria",
        "label": "Galeria"
      },
      {
        "href": "#contato",
        "label": "Contato"
      }
    ],
    "primaryAction": "Solicitar horário",
    "heroEyebrow": "Beleza. Cuidado. Leveza.",
    "heroTitle": "Seu momento\nde beleza.",
    "heroDescription": "Cabelos, cuidado e atenção ao que faz você se sentir bem. Um espaço pensado para desacelerar e valorizar o seu jeito.",
    "heroSecondary": "Conhecer serviços",
    "heroFootnote": "O horário é combinado pelo atendimento.",
    "heroCaption": "Um espaço pensado para o seu momento.",
    "heroImageLabel": "Fachada conceitual",
    "heroBottom": [
      "Beleza do seu jeito.",
      "Cuidado em cada detalhe.",
      "Seu tempo, respeitado."
    ],
    "projectLabel": "Projeto conceitual / Agência Nofer",
    "servicesEyebrow": "01 / Serviços",
    "servicesTitle": "O cuidado que\ncombina com você.",
    "servicesDescription": "Escolha o cuidado para os seus fios. A gente prepara a conversa para combinar os detalhes e consultar um horário.",
    "servicesDemoNote": "Preços ilustrativos, a partir dos valores indicados. O valor final depende do comprimento, volume, técnica e avaliação.",
    "servicesNote": "Selecione um serviço para continuar no formulário. O pedido não confirma uma reserva.",
    "categoriesLabel": "Categorias de serviços",
    "categoryStatus": "{count} serviços na categoria {category}.",
    "categoryStatusSingle": "1 serviço na categoria {category}.",
    "selectService": "Selecionar",
    "selectedService": "Selecionado",
    "serviceStatus": "Serviço selecionado: {service}. Complete seus dados para solicitar um horário.",
    "aboutEyebrow": "02 / A Aurena",
    "aboutTitle": "Beleza no seu ritmo.\nCuidado no detalhe.",
    "aboutDescription": "A Aurena nasce como um conceito de salão de beleza acolhedor: tons suaves, materiais naturais e a luz certa para fazer do cuidado uma pausa no dia.",
    "aboutSecond": "Uma identidade que aproxima beleza e bem-estar de uma experiência simples, atenciosa e pensada para você.",
    "aboutDetails": [
      {
        "title": "Acolhedora por natureza",
        "description": "Creme, vinho e terracota em harmonia com a madeira."
      },
      {
        "title": "Atenção em cada escolha",
        "description": "Do primeiro pedido aos detalhes do seu cuidado."
      }
    ],
    "galleryTitle": "A atmosfera Aurena.",
    "galleryEyebrow": "Ambiente & materiais",
    "galleryNote": "Imagens conceituais da identidade Aurena. Não retratam um salão em funcionamento, uma equipe real nem clientes atendidos.",
    "galleryHint": "Toque ou clique para ampliar",
    "galleryEnlarge": "Ampliar imagem:",
    "galleryDialogLabel": "Imagem ampliada",
    "illustrativeLabel": "Imagem conceitual",
    "locationEyebrow": "03 / Localização",
    "locationTitle": "Nos vemos\nna Aurena.",
    "addressLabel": "Onde encontrar",
    "addressFallback": "Endereço a definir",
    "hoursLabel": "Horários de atendimento",
    "hoursDemoNote": "Horários de exemplo • confirme pelo atendimento",
    "mapsAction": "Abrir no Google Maps",
    "instagramAction": "Ver Instagram",
    "locationConcept": "O espaço é um conceito.\nO cuidado é a inspiração.",
    "locationPlaceholderNote": "Localização a configurar na versão do salão.",
    "contactEyebrow": "04 / Contato",
    "contactTitle": "Seu próximo cuidado.\nUma boa conversa.",
    "contactDescription": "Conte o que você procura. A mensagem fica pronta para você revisar e enviar pelo WhatsApp.",
    "contactNote": "O horário será combinado pelo atendimento. Nenhuma reserva é confirmada pelo site.",
    "nameLabel": "Seu nome",
    "namePlaceholder": "Como podemos chamar você?",
    "serviceLabel": "Serviço de interesse",
    "servicePlaceholder": "Selecione um serviço",
    "messageLabel": "Quer contar mais alguma coisa?",
    "optionalLabel": "(opcional)",
    "messagePlaceholder": "O cuidado que procura, dia ou período de preferência…",
    "submitAction": "Continuar no WhatsApp",
    "privacyNote": "Usamos os dados apenas para preparar a mensagem. O site não os armazena.",
    "demoContactNote": "Nesta demonstração, você verá uma prévia local. O contato será ativado na versão do estabelecimento.",
    "validationName": "Informe seu nome com pelo menos 2 caracteres.",
    "validationService": "Selecione um dos serviços disponíveis.",
    "validationSummary": "Confira os campos indicados para continuar.",
    "formStatus": "Revise a mensagem. Nenhuma reserva foi confirmada.",
    "previewTitle": "Vamos começar\na conversa?",
    "previewEyebrow": "Prévia da mensagem",
    "previewDemoNote": "Esta é uma demonstração local. O contato será ativado na versão do estabelecimento. Nenhuma mensagem foi enviada.",
    "previewMissingNote": "O WhatsApp ainda não está configurado. Veja a mensagem abaixo; nada foi enviado.",
    "previewMessageLabel": "Mensagem preparada",
    "previewFooter": "O horário será combinado pelo atendimento.",
    "previewClose": "Voltar ao site",
    "closeLabel": "Fechar",
    "galleryClose": "Fechar imagem",
    "footerTagline": "Beleza. Cuidado. Leveza.",
    "footerDemo": "Projeto conceitual desenvolvido pela Agência Nofer.",
    "backTop": "Voltar ao início",
    "noScript": "Ative o JavaScript para consultar os serviços e preparar a mensagem. Projeto conceitual, sem contato de WhatsApp configurado.",
    "message": {
      "greeting": "Olá, Aurena!",
      "introduction": "Meu nome é",
      "interest": "Tenho interesse em",
      "general": "Gostaria de consultar os serviços e solicitar um horário.",
      "ending": "Quais horários estão disponíveis?"
    },
    "priceFrom": "a partir de"
  },
  "credit": {
    "enabled": true,
    "prefix": "Design & desenvolvimento",
    "name": "Agência Nofer",
    "url": ""
  }
};
