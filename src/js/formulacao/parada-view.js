/**
 * V4 — render da curva de parada e dos dois controles (doc 02, ficha V4).
 *
 * O SVG já nasce desenhado no HTML com os parâmetros padrão: sem JavaScript o
 * leitor vê o gráfico completo e a tabela de fallback. Este módulo apenas liga
 * os sliders ao modelo puro e redesenha.
 */
import {
  DOMINIO, FAIXAS, beneficioMarginal, custoMarginal, custoTotal,
  liquidoAcumulado, pontoDeParada, regime, serie,
} from './parada-model.js';

/* Geometria — precisa casar com o viewBox escrito no HTML. */
export const GEO = { x0: 70, x1: 1080, y0: 350, y1: 30, vMax: 140 };

export const px = (t) => GEO.x0 + (t / DOMINIO.max) * (GEO.x1 - GEO.x0);
export const py = (v) => GEO.y0 - (Math.min(v, GEO.vMax) / GEO.vMax) * (GEO.y0 - GEO.y1);

/** Caminho SVG de uma série, com clamp vertical (o excedente sai pelo topo). */
export function caminho(fn) {
  return serie(fn)
    .map(([t, v], i) => `${i === 0 ? 'M' : 'L'}${px(t).toFixed(1)},${py(v).toFixed(1)}`)
    .join(' ');
}

const fmt = (n, casas = 1) => n.toFixed(casas).replace('.', ',');

export function montarParada(raiz = document) {
  const svg = raiz.querySelector('[data-parada-svg]');
  const entradaLambda = raiz.querySelector('#fp-in-lambda');
  const entradaUrgencia = raiz.querySelector('#fp-in-urgencia');
  if (!svg || !entradaLambda || !entradaUrgencia) return false;

  const el = (sel) => svg.querySelector(sel) || raiz.querySelector(sel);
  const alvos = {
    benef: el('[data-parada-benef]'),
    custo: el('[data-parada-custo]'),
    total: el('[data-parada-total]'),
    util: el('[data-parada-util]'),
    degrada: el('[data-parada-degrada]'),
    stop: el('[data-parada-stop]'),
    rotulo: el('[data-parada-rotulo]'),
    saidaT: raiz.querySelector('[data-parada-out-t]'),
    saidaAcum: raiz.querySelector('[data-parada-out-acum]'),
    saidaRegime: raiz.querySelector('[data-parada-out-regime]'),
    outLambda: raiz.querySelector('[data-out-lambda]'),
    outUrgencia: raiz.querySelector('[data-out-urgencia]'),
  };

  function desenhar() {
    const lambda = Number(entradaLambda.value);
    const urgencia = Number(entradaUrgencia.value);
    const params = { lambda, urgencia };
    const t = pontoDeParada(params);
    const x = px(t);

    alvos.benef?.setAttribute('d', caminho(beneficioMarginal));
    alvos.custo?.setAttribute('d', caminho((v) => custoMarginal(v, urgencia)));
    alvos.total?.setAttribute('d', caminho((v) => custoTotal(v, params)));

    alvos.util?.setAttribute('width', String(Math.max(0, x - GEO.x0)));
    if (alvos.degrada) {
      alvos.degrada.setAttribute('x', String(x));
      alvos.degrada.setAttribute('width', String(Math.max(0, GEO.x1 - x)));
    }
    alvos.stop?.setAttribute('x1', String(x));
    alvos.stop?.setAttribute('x2', String(x));
    if (alvos.rotulo) {
      // Mantém o rótulo dentro da área de plotagem quando t* se aproxima da borda.
      alvos.rotulo.setAttribute('x', String(Math.min(x + 8, GEO.x1 - 96)));
      alvos.rotulo.textContent = `PARE AQUI · ${fmt(t)}`;
    }

    if (alvos.saidaT) alvos.saidaT.textContent = `${fmt(t)} rodadas`;
    if (alvos.saidaAcum) alvos.saidaAcum.textContent = fmt(liquidoAcumulado(params, t), 0);
    if (alvos.saidaRegime) alvos.saidaRegime.textContent = regime(t);
    if (alvos.outLambda) alvos.outLambda.textContent = fmt(lambda);
    if (alvos.outUrgencia) alvos.outUrgencia.textContent = fmt(urgencia);

    entradaLambda.setAttribute('aria-valuetext', `lambda ${fmt(lambda)} — parada na rodada ${fmt(t)}`);
    entradaUrgencia.setAttribute('aria-valuetext', `custo de atraso ${fmt(urgencia)} — parada na rodada ${fmt(t)}`);
  }

  for (const entrada of [entradaLambda, entradaUrgencia]) {
    entrada.disabled = false;
    entrada.addEventListener('input', desenhar);
  }

  entradaLambda.min = String(FAIXAS.lambda.min);
  entradaLambda.max = String(FAIXAS.lambda.max);
  entradaLambda.step = String(FAIXAS.lambda.passo);
  entradaUrgencia.min = String(FAIXAS.urgencia.min);
  entradaUrgencia.max = String(FAIXAS.urgencia.max);
  entradaUrgencia.step = String(FAIXAS.urgencia.passo);

  desenhar();
  return true;
}
