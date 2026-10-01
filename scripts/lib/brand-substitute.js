#!/usr/bin/env node
/**
 * Applies the declarative part of the L1 branding to a pristine goose checkout.
 *
 * Usage: node brand-substitute.js <brand.json> <vendor-dir>
 *
 * Every rule names a file and a list of literal (from → to) replacements.
 * Required rules fail the run when `from` is not found: that is the signal
 * that upstream moved a string and the rule needs updating. Optional rules
 * only warn. Nothing here touches translation catalogues; those are branded
 * after compilation by i18n-brand.js.
 */
const fs = require('fs');
const path = require('path');

const [brandPath, vendor] = process.argv.slice(2);
if (!brandPath || !vendor) {
  console.error('usage: brand-substitute.js <brand.json> <vendor-dir>');
  process.exit(2);
}
const B = JSON.parse(fs.readFileSync(brandPath, 'utf8'));
const P = B.product;
const lower = P.toLowerCase();
const S = B.scheme;

/** @type {{file: string, required?: boolean, note?: string, rules: [string, string][]}[]} */
const RULES = [
  {
    file: 'ui/desktop/package.json',
    rules: [
      ['"name": "goose-app"', `"name": "${B.packageName}"`],
      ['"productName": "Goose"', `"productName": "${P}"`],
      ['"description": "Goose App"', `"description": "${B.description}"`],
      ['GOOSE_BUNDLE_NAME:-Goose', `GOOSE_BUNDLE_NAME:-${P}`],
    ],
  },
  {
    file: 'ui/desktop/forge.config.ts',
    rules: [
      ['  asar: true,\n', `  asar: true,\n  appBundleId: '${B.bundleId}',\n`],
      ["name: 'GooseProtocol'", `name: '${P}Protocol'`],
      ["schemes: ['goose']", `schemes: ['${S}']`],
      ["'Goose needs access to your microphone", `'${P} needs access to your microphone`],
      ["'Goose needs access to send Apple Events", `'${P} needs access to send Apple Events`],
      ["process.env.GITHUB_OWNER || 'aaif-goose'", `process.env.GITHUB_OWNER || '${B.updates.owner}'`],
      ["process.env.GITHUB_REPO || 'goose'", `process.env.GITHUB_REPO || '${B.updates.repo}'`],
      ["name: 'Goose',", `name: '${P}',`],
      ["bin: 'Goose',", `bin: '${P}',`],
      ["maintainer: 'AAIF (Agentic AI Foundation)'", `maintainer: '${B.company}'`],
      ["homepage: 'https://goose-docs.ai/'", `homepage: '${B.homepage}'`],
      ["id: 'io.github.block.Goose'", `id: '${B.bundleId}'`],
      ["'x-scheme-handler/goose'", `'x-scheme-handler/${S}'`],
    ],
  },
  {
    file: 'ui/desktop/vite.main.config.mts',
    rules: [
      ["process.env.GITHUB_OWNER || 'aaif-goose'", `process.env.GITHUB_OWNER || '${B.updates.owner}'`],
      ["process.env.GITHUB_REPO || 'goose'", `process.env.GITHUB_REPO || '${B.updates.repo}'`],
      ["process.env.GOOSE_BUNDLE_NAME || 'Goose'", `process.env.GOOSE_BUNDLE_NAME || '${P}'`],
    ],
  },
  {
    file: 'ui/desktop/forge.deb.desktop',
    required: false,
    rules: [
      ['Name=Goose', `Name=${P}`],
      ['/usr/lib/goose/Goose', `/usr/lib/${lower}/${P}`],
      ['goose.png', `${lower}.png`],
      ['x-scheme-handler/goose', `x-scheme-handler/${S}`],
    ],
  },
  {
    file: 'ui/desktop/forge.rpm.desktop',
    required: false,
    rules: [
      ['Name=Goose', `Name=${P}`],
      ['/usr/lib/goose/Goose', `/usr/lib/${lower}/${P}`],
      ['goose.png', `${lower}.png`],
      ['x-scheme-handler/goose', `x-scheme-handler/${S}`],
    ],
  },
  {
    file: 'ui/desktop/index.html',
    rules: [
      ['<title>Goose</title>', `<title>${P}</title>`],
      [
        '<link href="./src/styles/main.css" rel="stylesheet" />',
        '<link href="./src/styles/main.css" rel="stylesheet" />\n    <link href="./src/styles/brand.css" rel="stylesheet" />',
      ],
    ],
  },
  {
    file: 'ui/desktop/src/main.ts',
    rules: [
      ["'Focus Goose Window'", `'Focus ${P} Window'`],
      ["'聚焦 Goose 窗口'", `'聚焦 ${P} 窗口'`],
      ["'About Goose'", `'About ${P}'`],
      ["'关于 Goose'", `'关于 ${P}'`],
      ["'Hide Goose'", `'Hide ${P}'`],
      ["'隐藏 Goose'", `'隐藏 ${P}'`],
      ["'Goose Failed to Start'", `'${P} Failed to Start'`],
      ["'Goose Error'", `'${P} Error'`],
      ["setAsDefaultProtocolClient('goose')", `setAsDefaultProtocolClient('${S}')`],
      ["'--reset-protocol-handler', 'goose'", `'--reset-protocol-handler', '${S}'`],
      ['goose://', `${S}://`],
      ["applicationName: 'Goose',", `applicationName: '${P}',`],
      ["title: 'Goose',", `title: '${P}',`],
      ["item.label === 'Goose'", `item.label === '${P}'`],
    ],
  },
  { file: 'ui/desktop/src/App.tsx', rules: [['goose://', `${S}://`]] },
  { file: 'ui/desktop/src/recipe/index.ts', rules: [['goose://', `${S}://`]] },
  { file: 'ui/desktop/src/components/BaseChat.tsx', required: false, rules: [['goose://', `${S}://`]] },
  { file: 'ui/desktop/src/components/recipes/ImportRecipeForm.tsx', rules: [['goose://', `${S}://`]] },
  { file: 'ui/desktop/src/components/schedule/ScheduleModal.tsx', rules: [['goose://', `${S}://`]] },
  { file: 'ui/desktop/src/components/sessions/SessionListView.tsx', rules: [['goose://', `${S}://`]] },
  {
    file: 'ui/desktop/src/components/settings/extensions/deeplink.ts',
    rules: [
      ["'goose:'", `'${S}:'`],
      ['goose://', `${S}://`],
    ],
  },
  { file: 'ui/desktop/src/utils/urlSecurity.ts', rules: [["'goose:',", `'${S}:',`]] },
  {
    file: 'ui/desktop/src/app-update.yml',
    rules: [
      ['owner: aaif-goose', `owner: ${B.updates.owner}`],
      ['repo: goose', `repo: ${B.updates.repo}`],
      ['updaterCacheDirName: goose-updater', `updaterCacheDirName: ${B.updates.cacheDirName}`],
    ],
  },
  {
    file: 'ui/desktop/src/utils/autoUpdater.ts',
    rules: [
      ["owner: 'aaif-goose',", `owner: '${B.updates.owner}',`],
      ["repo: 'goose',", `repo: '${B.updates.repo}',`],
      ["'Goose - Update Available'", `'${P} - Update Available'`],
      ["setToolTip('Goose')", `setToolTip('${P}')`],
    ],
  },
  {
    file: 'ui/desktop/src/utils/githubUpdater.ts',
    rules: [
      ["process.env.GITHUB_OWNER || 'aaif-goose'", `process.env.GITHUB_OWNER || '${B.updates.owner}'`],
      ["process.env.GITHUB_REPO || 'goose'", `process.env.GITHUB_REPO || '${B.updates.repo}'`],
      ["process.env.GOOSE_BUNDLE_NAME || 'Goose'", `process.env.GOOSE_BUNDLE_NAME || '${P}'`],
      ['`Goose-Desktop/${app.getVersion()}`', '`' + P + '-Desktop/${app.getVersion()}`'],
    ],
  },
  {
    // Only compiled into the engine when it is built from source (l1 engine source).
    file: 'crates/goose/src/prompts/system.md',
    required: false,
    note: 'engine=source only',
    rules: [
      [
        'You are a general-purpose AI agent called goose, created by AAIF (Agentic AI Foundation).\ngoose is being developed as an open-source software project.',
        `${B.identity}`,
      ],
    ],
  },
];

let failures = 0;
let applied = 0;
for (const spec of RULES) {
  const target = path.join(vendor, spec.file);
  const required = spec.required !== false;
  if (!fs.existsSync(target)) {
    const msg = `${spec.file}: file missing upstream`;
    if (required) { console.error(`FAIL ${msg}`); failures++; } else { console.warn(`skip ${msg}`); }
    continue;
  }
  let text = fs.readFileSync(target, 'utf8');
  for (const [from, to] of spec.rules) {
    if (!text.includes(from)) {
      const msg = `${spec.file}: pattern not found: ${JSON.stringify(from).slice(0, 90)}`;
      if (required) { console.error(`FAIL ${msg}`); failures++; } else { console.warn(`skip ${msg}${spec.note ? ` (${spec.note})` : ''}`); }
      continue;
    }
    text = text.split(from).join(to);
    applied++;
  }
  fs.writeFileSync(target, text);
}

// Generated module consumed by the L1 patches (identity hook, lockups).
const brandTs = `// Generated by l1/scripts/lib/brand-substitute.js from brand.json. Do not edit.
export const BRAND = ${JSON.stringify(
  {
    product: B.product,
    productLong: B.productLong,
    company: B.company,
    homepage: B.homepage,
    scheme: B.scheme,
    identity: B.identity,
  },
  null,
  2
)} as const;
`;
fs.mkdirSync(path.join(vendor, 'ui/desktop/src'), { recursive: true });
fs.writeFileSync(path.join(vendor, 'ui/desktop/src/brand.ts'), brandTs);

// Advisory scan: user-facing "Goose" literals that no rule covers. Identifiers
// (GooseLogo, gooseServe) and tests are excluded; the list is for review only.
const scanRoot = path.join(vendor, 'ui/desktop/src');
const leftovers = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/^(api|acp|i18n|__tests__|bin|images)$/.test(entry.name)) continue;
      walk(p);
    } else if (/\.(tsx?|html)$/.test(entry.name) && !/\.test\./.test(entry.name)) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (/['"`>]Goose\b|\bGoose['"`<]|\bgoose:\/\//.test(line) && !/^\s*\/\//.test(line)) {
          leftovers.push(`${path.relative(vendor, p)}:${i + 1}: ${line.trim().slice(0, 110)}`);
        }
      });
    }
  }
})(scanRoot);

console.log(`brand-substitute: ${applied} replacements applied, ${failures} required rule(s) failed.`);
if (leftovers.length) {
  console.log(`brand-substitute: ${leftovers.length} possible user-facing upstream name(s) left (review):`);
  leftovers.forEach((l) => console.log(`  ${l}`));
}
process.exit(failures ? 1 : 0);
