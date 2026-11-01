# Aurena Beauty

Site conceitual da Agência Nofer para um salão de beleza. Cópia independente da implementação existente da agência, com a mesma ordem de seções, layout, componentes Cult UI, navegação, galeria, formulário, animações e acessibilidade. A identidade, o conteúdo e os recursos visuais pertencem à Aurena.

## Executar localmente

Requer Node.js com suporte a módulos ES e `node --test`. Não há dependências para instalar, etapa de build ou `node_modules`.

```sh
npm start
# Alternativa direta:
node scripts/serve.mjs
```

URL padrão: **http://127.0.0.1:4174/**. Se a porta estiver ocupada, execute `node scripts/serve.mjs 4175`. O servidor atende somente `dist/`, no endereço local 127.0.0.1. Interrompa com Ctrl+C no terminal que o iniciou.

Repositório: [devbertuolo/aurena-beauty](https://github.com/devbertuolo/aurena-beauty).

Execute os comandos a partir da raiz do repositório clonado.

## Organização

```text
dist/                    Arquivos públicos prontos para hospedagem estática
  index.html             Estrutura e conteúdo inicial
  assets/config.js       Identidade, textos, serviços, imagens, contato e SEO
  assets/app.js          Interações do navegador
  assets/core.js         Validação, preços e montagem de mensagens/URLs
  assets/styles.css      Layout, tokens, componentes e responsividade
  assets/brand/          PNGs fornecidos e derivados WebP transparentes
  assets/images/         Recortes conceituais e prévia de compartilhamento
  assets/fonts/          Fonte local Manrope e sua licença
scripts/                 Servidor, sincronização de metadados e preparo de imagens
tests/                   Testes funcionais com Node
licenses/                Licenças MIT e SIL OFL
referencias/              Painel original, limites dos recortes e códigos Cult UI
```

Os PNGs originais usados pelo site ficam em `dist/assets/brand/`, e o painel original em `referencias/Referencia Identidade Visual.png`. O arquivo de edição Illustrator, as duplicatas da raiz e as evidências de conferência permanecem no acervo local da agência. O repositório é independente, sem credenciais, remotos ou identificadores de hospedagem da implementação de origem.

## Configuração

Edite **`dist/assets/config.js`**. Ele separa `business`, `brand`, `theme`, `seo`, `contact`, `location`, `hours`, `serviceCategories`, `services`, `featuredService`, `images`, `copy` e `credit`.

- Cortes: Corte personalizado, a partir de R$ 80.
- Escovas: Escova, a partir de R$ 60.
- Coloração: Coloração, a partir de R$ 160.
- Tratamentos: Hidratação, a partir de R$ 90; Reconstrução, a partir de R$ 140.

Valores ilustrativos. O preço final depende do comprimento, volume, técnica e avaliação. `fromPrice: true` exibe o prefixo na lista, no destaque e no seletor do formulário. O destaque seleciona Hidratação usando o mesmo fluxo dos outros serviços.

Depois de alterar textos ou SEO, execute:

```sh
node scripts/sync-metadata.mjs
```

Isso atualiza os metadados e os fallbacks textuais do HTML a partir da configuração. Ao mudar um arquivo de imagem, mantenha também suas dimensões intrínsecas atualizadas.

## Contato e demonstração

`demoMode: true`, WhatsApp e Instagram vazios, endereço e cidade vazios. Os horários são exemplos identificados na interface. Não há dados de um estabelecimento em funcionamento.

O formulário valida nome e serviço, monta a mensagem e abre uma **prévia local**. Nada é enviado, armazenado ou reservado. A seleção de serviço leva ao formulário e preserva o serviço escolhido. Não há cookies, rastreadores, agenda, banco de dados ou armazenamento no navegador.

Para uma futura versão real, configure um número completo com DDI, confirme os dados do salão e altere `demoMode` para `false`. Com número ausente ou inválido, a prévia local continua ativa. Com número válido e modo real, o site abre o WhatsApp com a mensagem codificada; a pessoa decide enviá-la. O atendimento combina o horário, sem confirmação automática pelo site.

## Identidade e imagens

Creme `#F5EFE6`, terracota `#B97965` e vinho `#643845`. Variações tonais fornecem contraste para texto pequeno e ações. Logos claras em superfícies escuras e escuras em superfícies claras; sem filtros ou deformação. A proporção própria da Aurena foi preservada.

As cinco imagens de ambiente e materiais são recortes do painel fornecido, identificados como conceituais. Nenhuma delas representa atendimento, equipe ou resultado real. O painel inteiro não aparece como fundo. Consulte `CREDITOS.md`, `DESIGN.md` e `referencias/recortes.json`.

`scripts/prepare-assets.py` reproduz os WebP, o favicon e a prévia social. Requer Pillow somente para preparar esses arquivos; o site funciona sem Python. Os originais não são alterados.

## Publicação futura

Pasta pública: **`dist/`**. Destino previsto nos metadados: `https://aurena.agencianofer.com.br/`. A imagem social própria está em `assets/images/aurena-social.jpg`, com 1200 × 630 px. A URL prevista não indica publicação concluída.

O código está preparado para hospedagem estática. O envio ao GitHub não configura uma hospedagem, um domínio ou DNS. A demonstração mantém **`noindex, nofollow`**, mesmo se `allowIndexing` for habilitado enquanto `demoMode` continuar verdadeiro.

## Verificação

```sh
node --test
node --check dist/assets/app.js
```

Os testes cobrem modo demonstrativo, número ausente/inválido, codificação da mensagem, seleção, categorias, preços com prefixo, validação, URLs externas, noindex, referências locais e isolamento da identidade/contato.

A versão foi conferida no Chromium nas larguras de 360, 390, 768, 1280 e 1440 px, sem overflow horizontal. Menu, categorias, seleção de serviço, galeria e prévia da mensagem foram verificados por ponteiro e teclado; o console ficou sem avisos ou erros. A checagem parcial de contraste cobriu 134 elementos de texto sem falhas nos critérios usados.

O relatório detalhado e as capturas permanecem no acervo local da agência, fora do Git. Não houve ensaio em aparelho físico, Safari, Firefox ou leitor de tela, nem envio real pelo WhatsApp.

## Materiais para a versão real

Confirmar WhatsApp, Instagram, endereço, horários, serviços e preços. Fotografias individuais de maior resolução permitirão mais definição em telas de alta densidade; os recortes atuais usam a resolução disponível no painel. Sem depoimentos, avaliações ou equipe inventados.
