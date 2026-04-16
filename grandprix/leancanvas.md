# Lean Canvas — AcessívelBR Hub
### Plataforma Inteligente de Gestão de Barreiras à Inclusão | Petrobras Hackathon

---

## 1. PROBLEMA

> **Coloque no Canva:** Bloco "Problema"

- A inclusão de pessoas com deficiência (PcD) na Petrobras acontece de forma **reativa e fragmentada**, sem uma visão integrada entre áreas (RH, TI, Predial, SMS, Educação)
- Relatos de barreiras chegam por **canais dispersos e informais** (e-mail, conversa de corredor), sem rastreamento, priorização ou SLA definido
- Gestores e equipes de resposta **não têm visibilidade em tempo real** sobre padrões sistêmicos — ex.: 22 reclamações simultâneas do sistema SAP após uma atualização foram tratadas individualmente, gerando esforço duplicado
- Barreiras **atitudinais e de capacitismo** (ex.: subestimação de capacidade analítica de colaborador com deficiência visual) ficam invisíveis por falta de canal estruturado e anônimo
- Conteúdos obrigatórios de integração e segurança (SMS) **sem tradução em Libras**, violando direitos fundamentais e expondo a empresa a risco legal

---

## 2. SOLUÇÃO

> **Coloque no Canva:** Bloco "Solução"

- **Fórum estruturado de tópicos**: colaboradores com deficiência relatam barreiras (físicas, tecnológicas, atitudinais, comunicacionais) em uma plataforma centralizada, com categorização e campos padronizados
- **Triagem automática por IA** com 98% de precisão: o sistema classifica e direciona cada demanda automaticamente à área responsável (RH, TI, Predial, SMS) em até 45 segundos — substituindo processo manual que levava 24h
- **Clustering inteligente**: a IA agrupa demandas com origem comum (ex.: "CLUSTER-SAP-2024") evitando que áreas recebam dezenas de tickets duplicados
- **Painel admin com mapa de calor do Brasil**: visualização geográfica de hotspots de barreiras por unidade/refinaria, com detalhamento por tipo (tecnológica, atitudinal, física, comunicacional)
- **Sistema de prioridade e votos**: colaboradores podem votar em demandas existentes (upvote), amplificando os casos mais críticos para o topo da fila de gestão
- **Histórico de soluções vinculadas**: para cada tipo de barreira, a IA sugere iniciativas passadas bem-sucedidas e normas aplicáveis (ex.: WCAG 2.1 AA, ABNT NBR 9050, NR-17)

---

## 3. PROPOSTA DE VALOR ÚNICA

> **Coloque no Canva:** Bloco "Proposta de Valor Única"

**"Do relato ao encaminhamento em 45 segundos — transformando a experiência de inclusão em dado estratégico."**

- A única plataforma interna que **conecta o colaborador com deficiência diretamente à área correta** sem burocracia ou intermediários
- Transforma **cada relato em inteligência organizacional**: padrões invisíveis se tornam métricas acionáveis para o time de Diversidade & Inclusão
- Atua simultaneamente como **ouvidoria, CRM de inclusão e torre de controle de acessibilidade**

---

## 4. VANTAGEM INJUSTA

> **Coloque no Canva:** Bloco "Vantagem Injusta"

- **Dados proprietários Petrobras**: o modelo de IA é treinado e aprimorado com o histórico real de demandas e soluções já aplicadas nas unidades — concorrentes não têm acesso a esse acervo
- **Integração nativa com o ecossistema corporativo**: criado especificamente para a estrutura organizacional (refinarias, EDISE, REPLAN, RLAM, etc.) e sistemas internos (SAP, portais corporativos)
- **Efeito de rede interna**: quanto mais colaboradores relatam, mais precisa fica a IA e mais rico fica o mapa de calor, criando um ciclo virtuoso de melhoria contínua
- **Legitimidade institucional**: desenvolvido no contexto do programa de Diversidade & Inclusão da Petrobras, com apoio direto de gestores de Sustentabilidade e Acessibilidade

---

## 5. SEGMENTOS DE CLIENTES

> **Coloque no Canva:** Bloco "Segmentos de Clientes"

**Usuários primários (relatores):**
- Colaboradores com deficiência visual (usuários de leitores de tela como NVDA)
- Colaboradores com deficiência física que enfrentam barreiras prediais
- Colaboradores surdos que dependem de Libras em treinamentos obrigatórios
- Colaboradores com deficiências que sofrem capacitismo ou barreiras atitudinais de liderança

**Usuários secundários (gestores/admins):**
- Equipe de Sustentabilidade e Acessibilidade
- RH / Diversidade & Inclusão
- Gerências de TI, Predial e SMS
- Lideranças de unidades (EDISE, REPLAN, RLAM, RPBC, etc.)

**Early adopters:**
- Unidades com maior concentração de PcDs cadastradas
- Gestores que já participam do programa de Diversidade & Inclusão

---

## 6. MÉTRICAS-CHAVE

> **Coloque no Canva:** Bloco "Métricas-Chave"

- **Tempo médio de roteamento**: de 24h (processo manual) → 45 segundos (IA)
- **Taxa de precisão da triagem por IA**: meta ≥ 98%
- **NPS de inclusão**: satisfação do colaborador PcD com a resposta recebida
- **Taxa de resolução de demandas**: % de tópicos com status "RESOLVIDA" no período
- **Demandas por tipo de barreira**: tecnológica, atitudinal, física, comunicacional
- **Clusters identificados automaticamente**: número de agrupamentos gerados pela IA por período
- **Votos por demanda**: indicador de impacto coletivo de cada barreira
- **Cobertura geográfica**: unidades ativas no mapa de calor
- **Redução de reincidência**: % de barreiras recorrentes eliminadas após resolução

---

## 7. CANAIS

> **Coloque no Canva:** Bloco "Canais"

- **Intranet corporativa da Petrobras**: ponto de entrada único para colaboradores via Single Sign-On (SSO)
- **E-mail institucional**: notificações automáticas de atualização de status para o colaborador relator
- **Painel admin**: interface web dedicada para gestores com acesso ao dashboard, mapa de calor e gestão de equipe de resposta
- **Integração com SAP e sistemas legados**: vínculo direto de demandas tecnológicas com tickets de TI
- **Comunicação em lote**: envio automático de alertas para gerências quando clusters atitudinais são detectados

---

## 8. ESTRUTURA DE CUSTOS

> **Coloque no Canva:** Bloco "Estrutura de Custos"

- **Desenvolvimento e manutenção da plataforma** (Next.js 16 + TypeScript): equipe interna de TI ou squad dedicado de D&I
- **Infraestrutura cloud**: hospedagem do frontend, API e banco de dados (Next.js + JSON → escalar para PostgreSQL em produção)
- **Modelo de IA/NLP para triagem**: uso de API (ex.: Google Gemini / OpenAI) ou fine-tuning de modelo proprietário com dados internos
- **Integração e homologação** com sistemas corporativos (SAP, SSO, RH)
- **Treinamento e onboarding**: capacitação de gestores de acessibilidade e equipes de resposta
- **Suporte e sustentação**: SLA de disponibilidade e manutenção evolutiva

---

## 9. FONTES DE RECEITA / VALOR GERADO

> **Coloque no Canva:** Bloco "Fontes de Receita"

*(Produto interno — o retorno é em valor estratégico e redução de custos, não em receita financeira direta)*

- **Redução de passivo trabalhista**: conformidade com Lei Brasileira de Inclusão (LBI — Lei 13.146/2015) e evitamento de autuações e ações judiciais
- **Redução de custo operacional**: eliminação de trabalho manual de triagem e roteamento de demandas (estimativa: -24h por demanda → escala significativa considerando volume de unidades)
- **Aumento de produtividade do PcD**: colaborador com barreira resolvida rapidamente volta à plena capacidade mais rápido
- **Valor de marca e ESG**: indicador tangível de maturidade em Diversidade & Inclusão para relatórios ESG, rankings (GPTW, MSCI) e audit de sustentabilidade
- **Replicabilidade**: modelo pode ser licenciado ou adaptado para outras empresas do Sistema Petrobras (Transpetro, Petrobras Distribuidora, BR Distribuidora)

---

## NOTAS PARA O CANVA

> Use estas informações ao preencher manualmente o template visual no Canva.
> Cada seção acima corresponde a um bloco do Lean Canvas.
> Recomenda-se usar os **tópicos em negrito** como título de cada ponto e o texto restante como descrição.

**Nome do produto:** AcessívelBR Hub
**Contexto:** Hackathon Petrobras — Diversidade & Inclusão
**Stack tecnológica:** Next.js 16.2 · React 19 · TypeScript · Tailwind CSS · IA de Triagem
**Repositório:** Forum--HACKTHON / grandprix
