/**
 * Gera duas nuvens de pontos (anel interno e externo) com cores roxo/ciano.
 */
function ring(count: number, radius: number, jitter = 0.9) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius * (0.8 + Math.random() * 0.2);
    const x = Math.cos(a) * r + (Math.random() - 0.5) * jitter;
    const y = (Math.random() - 0.5) * jitter * 0.6;
    const z = Math.sin(a) * r + (Math.random() - 0.5) * jitter;

    const i3 = i * 3;
    positions[i3 + 0] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    // gradiente roxo → ciano
    const t = i / count;
    const rC = 0.55 * (1 - t) + 0.2 * t;
    const gC = 0.2 * (1 - t) + 0.8 * t;
    const bC = 0.9;
    colors[i3 + 0] = rC;
    colors[i3 + 1] = gC;
    colors[i3 + 2] = bC;
  }
  return { positions, colors };
}

const inner = ring(900, 6.5);
const outer = ring(1200, 10);

export const positionsInner = inner.positions;
export const colorsInner = inner.colors;
export const positionsOuter = outer.positions;
export const colorsOuter = outer.colors;
