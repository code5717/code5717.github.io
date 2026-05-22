import { profile, type ProjectEntry } from '../data/profile';

export type DisplayProject = ProjectEntry & {
  image: string;
  imageAlt: string;
  summary: string;
  tags: string[];
};

const tagKeywords: [string, RegExp][] = [
  ['Computer Vision', /yolo|vision|opencv|debris/i],
  ['Embedded', /embedded|raspberry|esp32|cubesat|gyroscope/i],
  ['AI Agents', /agent|autonomous/i],
  ['Compilers', /compiler|lexer|parser|tokeniz|ast|language design/i],
  ['Systems', /c\+\+|c11|c17|systems|memory|malloc|arraylist/i],
  ['RAG', /rag|retrieval|embedding/i],
  ['Simulation', /simulator|godot|orbital/i],
  ['HPC', /cuda|hpc|performance|mb\/s/i],
  ['WASM', /wasm|webassembly/i]
];

export function thumbFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('cubesat') || n.includes('debris')) return '/imgs/proj-cubesat.png';
  if (n.includes('programming language') || n.includes('from scratch')) return '/imgs/proj-vibecoding.png';
  if (n.includes('rotate') || n.includes('high performance')) return '/imgs/proj-compiler.png';
  if (n.includes('arraylist')) return '/imgs/proj-arraylist.png';
  if (n.includes('arcade')) return '/imgs/proj-arcade.png';
  if (n.includes('deep agent')) return '/imgs/proj-agents.png';
  return '/imgs/proj-agents.png';
}

export function tagsFor(bullets: string[]): string[] {
  const joined = bullets.join(' ');
  const out: string[] = [];
  for (const [label, re] of tagKeywords) {
    if (re.test(joined)) out.push(label);
    if (out.length >= 2) break;
  }
  return out;
}

export function summaryFor(project: ProjectEntry): string {
  const first = project.bullets[0] ?? '';
  const cleaned = first.replace(/^[^:]+:\s*/, '').trim();
  if (cleaned.length <= 160) return cleaned;
  return `${cleaned.slice(0, 157).trim()}…`;
}

function imageAltFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('cubesat')) {
    return 'CubeSat debris detection interface showing orbital tracking and telemetry visuals.';
  }
  if (n.includes('arcade')) {
    return 'Custom arcade cabinet hardware with illuminated controls and a retro game display.';
  }
  if (n.includes('programming language')) {
    return 'Programming language project interface with compiler diagnostics and syntax views.';
  }
  if (n.includes('compiler') || n.includes('rotate')) {
    return 'High-performance compiler toolchain with syntax diagnostics and tokenization views.';
  }
  if (n.includes('arraylist')) {
    return 'C dynamic array library documentation and API reference interface.';
  }
  if (n.includes('deep agent')) {
    return 'Multi-agent AI system architecture with orchestration and memory layers.';
  }
  return `${name} project preview.`;
}

export function toDisplayProject(project: ProjectEntry): DisplayProject {
  return {
    ...project,
    image: thumbFor(project.name),
    imageAlt: imageAltFor(project.name),
    summary: summaryFor(project),
    tags: tagsFor(project.bullets)
  };
}

export const displayProjects = profile.projects.map(toDisplayProject);
