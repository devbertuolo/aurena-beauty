# Aurena Beauty — adaptação visual

Projeto conceitual da Agência Nofer. O briefing pede reaproveitamento integral da experiência existente: estrutura, ordem, grades, componentes, tecnologia, comportamento responsivo e movimentos foram preservados. Os ajustes se restringem à identidade, imagens, conteúdo, contraste e acomodação dos serviços.

## Tokens

| Token | Cor | Uso |
| --- | --- | --- |
| `dark` / `ink` | `#643845` | Vinho; cabeçalho, abertura, contato, superfície da localização e texto nas áreas claras |
| `paper` | `#F5EFE6` | Creme; fundo claro e texto principal sobre vinho |
| `terracotta` | `#B97965` | Terracota; detalhes, indicadores e bordas animadas |
| `terracottaAction` | `#E6B8A2` | Tom claro para ações com texto vinho e faixa do destaque |
| `terracottaInk` | `#864F40` | Texto pequeno de destaque sobre superfícies claras |
| `terracottaText` | `#F0C4AF` | Etiquetas, foco e destaques sobre vinho |
| `muted` | `#765D61` | Texto secundário em superfícies claras |
| `surface` | `#EEE2D8` | Apresentação da marca e corpo do destaque |
| `darkSurface` | `#57303C` | Campos e ação secundária sobre vinho |
| `line` | `#D6BCB7` | Separadores em áreas claras |

O terracota original fica nos elementos gráficos. Os tons de texto e de preenchimento de ação foram ajustados para manter leitura, com a mesma animação da base. As cores restantes de bordas, sombras, placeholders, estados de erro e fundos também acompanham vinho/creme/terracota.

## Estrutura e tipografia

Mesmas cinco seções: abertura; serviços; apresentação com galeria; localização; contato. Cabeçalho fixado ao topo, menu no celular e rodapé preservados. Manrope variável local, títulos em peso 500, sem trocar bibliotecas. Logo e símbolo continuam sendo as imagens fornecidas.

Container máximo de 1200 px e mesmos breakpoints da base. A logo tem proporção 1000 × 302; símbolos, 360 × 266. As dimensões são intrínsecas, com `height:auto` no CSS, sem cortes ou filtros. A marca clara aparece sobre vinho, e a escura no rodapé creme. O branco dos anexos corresponde à visualização da transparência real dos PNGs.

As cinco abas são Todos, Cortes, Escovas, Coloração e Tratamentos. O espaçamento se adapta para acomodar os rótulos no celular. O prefixo “a partir de” é uma linha curta acima de cada preço e também integra as opções do formulário. O aviso contextual explica a variação por comprimento, volume, técnica e avaliação.

## Componentes Cult UI preservados

| Componente | Uso na Aurena |
| --- | --- |
| Halo Tabs | Underline deslizante em terracota, `tablist`, seleção e setas/Home/End |
| Cutout Card | Fachada e primeira foto da galeria, com a geometria original do recorte |
| Organic Card | Hidratação, com imagem de papelaria, preço, seleção e faixa SVG animada |
| Neumorph Button | Conhecer serviços, escolher tratamento e voltar da prévia |
| Halo Button | Solicitar horário e continuar no WhatsApp, contorno com resposta de hover/foco |

As adaptações HTML/CSS/JS e geometrias já existentes foram mantidas, com troca de cores e conteúdo. Não houve reinstalação de componentes ou introdução de React, Motion ou Tailwind. Código de referência preservado em `referencias/cult-ui/`, com licença MIT em `licenses/` e no diretório público.

## Imagens e identificação

Os recortes mostram fachada, espelho/cadeira, avental, toalha e papelaria Aurena. O painel completo fica como referência local. Limites de cada recorte em `referencias/recortes.json`; não se ampliam os WebP acima da dimensão de origem na geração. O layout usa `object-fit:cover` conforme a base e a galeria ampliada usa `contain`.

O favicon usa o símbolo claro sobre vinho. A imagem social própria combina a logo escura e a fachada conceitual, em 1200 × 630 px. Originais de marca e painel preservados. Não são fotografias de um estabelecimento ou equipe real, nem resultados de serviços.

## Interação e acessibilidade

Seleção de serviço preenche o formulário, navega até ele e foca o nome. Validação mantém rótulos, erros associados e foco no primeiro campo inválido. A mensagem local tem nome, serviço e observação; não confirma reserva. Contatos e endereço começam vazios.

Galeria e prévia usam diálogos nativos com fundo inerte, ciclo de Tab/Shift+Tab, Escape, fechamento pelo fundo e retorno ao acionador. Menu móvel mantém `aria-expanded` e Escape. Redução de movimento remove transições, animações e rolagem suave. Foco visível e ações de pelo menos 44 px mantidos; nenhuma interação depende de hover.

O projeto permanece identificado como conceitual na abertura e no rodapé, com preços/horários ilustrativos e `noindex, nofollow`. O envio do código ao GitHub não configura a hospedagem. Evidências e limites da conferência permanecem no acervo local da agência; o README resume as verificações realizadas.
