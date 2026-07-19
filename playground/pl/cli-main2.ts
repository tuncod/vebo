import { defineCommand, runMain } from 'citty'
import { resolve, join } from 'pathe'
import { basename, dirname, extname, relative } from 'pathe'
import * as p from 'pathe'
import { filename, normalizeAliases, resolveAlias, reverseResolveAlias } from 'pathe/utils'
import * as fss from 'node:fs/promises'
import * as fs from 'node:fs'

console.log(p)

if (!fs.glob) {
  throw new Error(
    "'glob' is not supported in this Node.js version. Please use Node.js v22+ or install the 'glob' package."
  );
}



function pathToTree3(path) {
  const parts = path.split('/').filter(Boolean);

  if (!parts.length) return null;

  const isFile = name => /\.[^/.]+$/.test(name);

  const root = {
    name: parts[0],
    type: 'dir',
    children: []
  };

  let current = root;

  for (let i = 1; i < parts.length; i++) {
    const last = i === parts.length - 1;

    const node =
      last && isFile(parts[i])
        ? {
            name: parts[i],
            type: 'file',
            content: ''
          }
        : {
            name: parts[i],
            type: 'dir',
            children: []
          };

    current.children.push(node);

    if (node.type === 'dir') {
      current = node;
    }
  }

  return root;
}


function pathToTree(path) {
  const parts = path.split('/').filter(Boolean);

  if (!parts.length) return null;

  const build = (i = 0) => {
    const last = i === parts.length - 1;
    const name = parts[i];
    const isFile = /\.[^/.]+$/.test(name);

    return last && isFile
      ? {
          name,
          type: 'file',
          content: ''
        }
      : {
          name,
          type: 'dir',
          children: last ? [] : [build(i + 1)]
        };
  };

  return build();
}

for await (const file of fss.glob('cli/commands/**/*.ts')) {
  // console.log(filename(file))

  // console.log(dirname(file.replace('cli/commands/', '')))

  console.log(pathToTree(file))
}

const media = defineCommand({
  meta: { name: 'Media', description: 'Media command' },
  subCommands: {
    import: () => import('./commands/media/import').then((m) => m.default),
  },
})

const main = defineCommand({
  meta: { name: 'Vebo', version: '1.0.0', description: 'My Awesome CLI App' },
  subCommands: {
    media,
  },
})

// runMain(main)
