# turbovec e a Evolução Vetorial: Busca Local Mais Rápida que o FAISS

Vídeo de Maurício Yokoyama Issei, publicado em 8 de junho de 2026 (7 min 23 s).
Assistir: https://www.youtube.com/watch?v=Ukn3dyQZ-q0

## Sobre o vídeo

Neste vídeo, exploramos o turbovec, um índice vetorial de alta performance escrito em Rust com bindings para Python que está transformando a criação de sistemas RAG locais e privados
.
Aprenda como o turbovec utiliza o algoritmo TurboQuant (do Google Research) para realizar feitos impressionantes: comprimir um corpus de 10 milhões de documentos em apenas 4 GB de RAM e realizar buscas mais rápidas que o padrão de mercado, o FAISS
. Tudo isso sem fase de treinamento de dados (ingestão totalmente online) e mantendo a alta precisão
.
No vídeo, abordamos as inovações técnicas que tornam isso possível, incluindo a calibração por coordenada TQ+, a quantização escalar Lloyd-Max e a otimização extrema utilizando instruções de hardware SIMD (NEON para ARM e AVX-512BW para x86)
. Se você constrói arquiteturas RAG (Geração Aumentada por Recuperação) e se preocupa com privacidade de dados, consumo de memória ou baixa latência, essa tecnologia é para você!
.
🔗 Referências e Links Oficiais:
Repositório do turbovec no GitHub: https://github.com/RyanCodrai/turbovec

turbovec no PyPI (Python Package Index): https://pypi.org/project/turbovec/

Artigo TurboQuant (Online Vector Quantization with Near-optimal Distortion Rate): https://arxiv.org/abs/2504.19874

Artigo RaBitQ (Quantizing High-Dimensional Vectors with a Theoretical Error Bound...): https://arxiv.org/abs/2405.12497

Wiki do FAISS (Fast accumulation of PQ and AQ codes / FastScan): https://github.com/facebookresearch/faiss.wiki.git

## Transcrição

Transcrição ainda não disponível.
