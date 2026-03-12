const fs = require('fs');
const path = require('path');

const filepath = path.join('d:', 'projetos', 'mauricio-site', 'src', 'devops-salesforce.html');
let content = fs.readFileSync(filepath, 'utf-8');

// 5. Extract Business Agility and move it after Solucao
const busStart = '<!-- ══════════════════ BUSINESS AGILITY ══════════════════ -->';
let busStartIdx = content.indexOf(busStart);
let busEndIdx = content.indexOf('</section>', busStartIdx) + 10;
const busStr = content.substring(busStartIdx, busEndIdx);

content = content.replace(busStr, '');

let solucaoStartIdx = content.indexOf('<section id="solucao"');
let solucaoEndIdx = content.indexOf('</section>', solucaoStartIdx) + 10;

content = content.substring(0, solucaoEndIdx) + '\n\n  ' + busStr + content.substring(solucaoEndIdx);

// 6. Group Deep Dive, Matriz, Setup AWS into Engenharia
const ddStart = content.indexOf('<!-- ══════════════════ DEEP DIVE TÉCNICO ══════════════════ -->');
let sawsStart = content.indexOf('<section id="setup-aws"');
let sawsEnd = content.indexOf('</section>', sawsStart) + 10;

let blocksStr = content.substring(ddStart, sawsEnd);

blocksStr = blocksStr.replace(/<section id="deep-dive" class="[^"]*">/, '<div id="deep-dive" class="pt-10 mb-20">');
// Removing old comments inside the block to keep formatting clean
blocksStr = blocksStr.replace('<!-- ══════════════════ MATRIZ DE RESPONSABILIDADE ══════════════════ -->\n  ', '');
blocksStr = blocksStr.replace('<!-- ══════════════════ MATRIZ DE RESPONSABILIDADE ══════════════════ -->\n', '');
blocksStr = blocksStr.replace('<!-- ══════════════════ MATRIZ DE RESPONSABILIDADE ══════════════════ -->', '');
blocksStr = blocksStr.replace(/<section id="matriz" class="[^"]*">/, '<div id="matriz" class="mb-20">');
blocksStr = blocksStr.replace('<!-- ══════════════════ SETUP AWS EKS ══════════════════ -->\n  ', '');
blocksStr = blocksStr.replace('<!-- ══════════════════ SETUP AWS EKS ══════════════════ -->\n', '');
blocksStr = blocksStr.replace('<!-- ══════════════════ SETUP AWS EKS ══════════════════ -->', '');
blocksStr = blocksStr.replace(/<section id="setup-aws" class="[^"]*">/, '<div id="setup-aws" class="pb-10">');

blocksStr = blocksStr.replace(/<\/section>/g, '</div>');

const engenhariaWrapper = `<!-- ══════════════════ ENGENHARIA E GOVERNANÇA ══════════════════ -->
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
          A fundação técnica que torna tudo possível. Transparência total em nossa arquitetura de Agent.
        </p>
      </div>
    </div>
    
    ${blocksStr}
  </section>`;

content = content.substring(0, ddStart) + engenhariaWrapper + content.substring(sawsEnd);


// 7. Jornada Layout update
const jornadaStart = content.indexOf('<div class="hidden lg:block relative">');
const jornadaEndStr = '<!-- Mobile steps vertical -->';
const jornadaEnd = content.indexOf(jornadaEndStr, jornadaStart);

if (jornadaStart !== -1 && jornadaEnd !== -1) {
    const oldJornadaDesktop = content.substring(jornadaStart, jornadaEnd);

    const newJornadaDesktop = `<div class="hidden lg:flex justify-between items-start relative mt-12 w-full mb-16">
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
          <p class="text-white/45 text-xs leading-relaxed">Devin cria Scratch Org, escreve código e testes (75%+), e abre o PR.</p>
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
      </div>\n\n      <!-- Mobile steps vertical -->`;

    content = content.replace(oldJornadaDesktop, newJornadaDesktop);
}

fs.writeFileSync(filepath, content, 'utf-8');
console.log("Migration done correctly this time");
