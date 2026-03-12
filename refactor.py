import re
import os

filepath = r'd:\projetos\mauricio-site\src\devops-salesforce.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Navbar
content = re.sub(
    r'<a href="#jornada" class="hover:text-white transition-colors">Como Funciona</a>\s*<a href="#ganhos" class="hover:text-white transition-colors">Ganhos</a>',
    r'<a href="#business-agility" class="hover:text-white transition-colors">Estratégia</a>\n        <a href="#engenharia" class="hover:text-white transition-colors">Engenharia</a>',
    content
)

# 2. Rename Tradutor
content = content.replace('<h3 class="text-xl font-bold mb-3">O Tradutor</h3>', '<h3 class="text-xl font-bold mb-3">O Flosum Cloud Agent</h3>')

# 3. Deep dive subtitle
content = re.sub(
    r'<p class="text-white/50 max-w-2xl mx-auto text-lg">\s*Construído para escalar na AWS.+?massivos\.\s*</p>',
    r'<p class="text-white/50 max-w-2xl mx-auto text-lg">\n          Arquitetura Enterprise baseada na imagem oficial do Flosum Cloud Agent, orquestrada para alta disponibilidade.\n        </p>',
    content, flags=re.DOTALL
)

# 4. Matriz subtitle
content = re.sub(
    r'<p class="text-white/50 max-w-2xl mx-auto text-lg">\s*O Devin não substitui seus engenheiros seniores; ele os eleva a\s*arquitetos\.\s*</p>',
    r'<p class="text-white/50 max-w-2xl mx-auto text-lg">\n          IA executa, Humano governa.\n        </p>',
    content, flags=re.DOTALL
)

# 5. Extract Business Agility and move it after Solucao
bus_start = '<section id="business-agility"'
bus_end_idx = content.find('</section>', content.find(bus_start)) + 10
bus_str = content[content.find(bus_start):bus_end_idx]

content = content.replace(bus_str, '')

solucao_end_idx = content.find('</section>', content.find('<section id="solucao"')) + 10
# insert bus_str right after solucao end
content = content[:solucao_end_idx] + '\n\n  <!-- ══════════════════ BUSINESS AGILITY ══════════════════ -->\n  ' + bus_str + content[solucao_end_idx:]

# 6. Group Deep Dive, Matriz, Setup AWS into Engenharia
# They are continuous blocks: deep-dive -> matriz -> setup-aws
dd_start = content.find('<!-- ══════════════════ DEEP DIVE TÉCNICO ══════════════════ -->')
saws_end = content.find('</section>', content.find('<section id="setup-aws"')) + 10

blocks_str = content[dd_start:saws_end]

# Modify the inner tags to be <div> instead of <section> and remove their bg colors so they inherit from the main section
blocks_str = re.sub(r'<section id="deep-dive" class="[^"]*">', r'<div id="deep-dive" class="pt-10 mb-20">', blocks_str)
blocks_str = blocks_str.replace('<!-- ══════════════════ MATRIZ DE RESPONSABILIDADE ══════════════════ -->', '')
blocks_str = re.sub(r'<section id="matriz" class="[^"]*">', r'<div id="matriz" class="mb-20">', blocks_str)
blocks_str = blocks_str.replace('<!-- ══════════════════ SETUP AWS EKS ══════════════════ -->', '')
blocks_str = re.sub(r'<section id="setup-aws" class="[^"]*">', r'<div id="setup-aws" class="pb-10">', blocks_str)

# replace their inner </section> with </div>
blocks_str = blocks_str.replace('</section>', '</div>')

engenharia_wrapper = f'''<!-- ══════════════════ ENGENHARIA E GOVERNANÇA ══════════════════ -->
  <section id="engenharia" class="py-24 bg-navy-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="section-divider mb-16"></div>
      <div class="text-center mb-16 animated">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-xs font-semibold mb-5">
          🛠️ Centro de Engenharia
        </div>
        <h2 class="text-3xl lg:text-4xl font-black mb-5">
          Engenharia e <span class="gradient-text">Governança</span>
        </h2>
        <p class="text-white/50 max-w-2xl mx-auto text-lg">
          Onde a arquitetura encontra a conformidade.
        </p>
      </div>
    </div>
    
    {blocks_str}
  </section>'''

content = content[:dd_start] + engenharia_wrapper + content[saws_end:]


# 7. Jornada Layout update
# Desktop steps wrap replacement
jornada_start = content.find('<div class="hidden lg:block relative">')
jornada_end = content.find('</div>\n\n      <!-- Mobile steps vertical -->', jornada_start) + 6

old_jornada_desktop = content[jornada_start:jornada_end]

new_jornada_desktop = """<div class="hidden lg:flex justify-between items-start relative mt-12 w-full">
        <!-- Connector line -->
        <div class="absolute top-[28px] left-[10%] right-[10%] h-px bg-white/10 z-0 step-connector"></div>
        
        <!-- Step 1 -->
        <div class="flex flex-col items-center text-center w-1/5 px-2 relative z-10 animated animated-delay-1">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-neon-400/30" style="background: linear-gradient(135deg, rgba(0, 245, 160, 0.15), rgba(30, 58, 138, 0.3));">
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full timeline-dot flex items-center justify-center text-navy-900 font-black text-[10px]">1</span>
            <svg class="w-6 h-6 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <h3 class="font-bold text-white mb-2 text-sm">Delegação<br>Inteligente</h3>
          <p class="text-white/45 text-xs leading-relaxed">A demanda chega via Jira. O dev marca <span class="text-neon-400 font-mono">@Devin</span>.</p>
        </div>
        
        <!-- Step 2 -->
        <div class="flex flex-col items-center text-center w-1/5 px-2 relative z-10 animated animated-delay-2">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-neon-400/30" style="background: linear-gradient(135deg, rgba(0, 245, 160, 0.15), rgba(30, 58, 138, 0.3));">
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full timeline-dot flex items-center justify-center text-navy-900 font-black text-[10px]">2</span>
            <svg class="w-6 h-6 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <h3 class="font-bold text-white mb-2 text-sm">Trabalho<br>Autônomo</h3>
          <p class="text-white/45 text-xs leading-relaxed">Devin escreve código, testes unitários e abre PR no GitHub.</p>
        </div>
        
        <!-- Step 3 -->
        <div class="flex flex-col items-center text-center w-1/5 px-2 relative z-10 animated animated-delay-3">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-neon-400/30" style="background: linear-gradient(135deg, rgba(0, 245, 160, 0.15), rgba(30, 58, 138, 0.3));">
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full timeline-dot flex items-center justify-center text-navy-900 font-black text-[10px]">3</span>
            <svg class="w-6 h-6 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3 class="font-bold text-white mb-2 text-sm">Revisão<br>de Elite</h3>
          <p class="text-white/45 text-xs leading-relaxed">Engenheiros atuam como arquitetos, revisando e aprovando o PR.</p>
        </div>
        
        <!-- Step 4 -->
        <div class="flex flex-col items-center text-center w-1/5 px-2 relative z-10 animated">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-neon-400/30" style="background: linear-gradient(135deg, rgba(0, 245, 160, 0.15), rgba(30, 58, 138, 0.3));">
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full timeline-dot flex items-center justify-center text-navy-900 font-black text-[10px]">4</span>
            <svg class="w-6 h-6 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 class="font-bold text-white mb-2 text-sm">Merge &amp;<br>Aprovação</h3>
          <p class="text-white/45 text-xs leading-relaxed">Código mergeado na branch principal com ID rastreável.</p>
        </div>
        
        <!-- Step 5 -->
        <div class="flex flex-col items-center text-center w-1/5 px-2 relative z-10 animated animated-delay-3">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-purple-400/30" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(30, 58, 138, 0.3)); box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);">
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white font-black text-[10px]" style="background: linear-gradient(135deg, #a78bfa, #7c3aed)">5</span>
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
          <h3 class="font-bold text-purple-400 mb-2 text-sm">Sincronização<br>Reversa</h3>
          <p class="text-white/45 text-xs leading-relaxed">Webhook aciona o Flosum para retorno ao processo do Salesforce.</p>
        </div>
      </div>"""

content = content.replace(old_jornada_desktop, new_jornada_desktop)

# Contradictions Fix (PR vs Push, etc)
# Change "com 75%+ de cobertura de testes unitários e abre o PR."
content = content.replace(
    'Devin clona o repo, cria Scratch Org, escreve código com 75%+ de\n              cobertura de testes unitários e abre o PR.',
    'Devin cria Scratch Org, escreve código e testes unitários (75%+), e abre o Pull Request.'
)
content = content.replace(
    'Devin clona o repo, cria Scratch Org, escreve código com 75%+ de\n              cobertura de testes e abre o PR automaticamente.',
    'Devin cria Scratch Org, escreve código e testes unitários (75%+), e abre o Pull Request automaticamente.'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML Refactored!")
