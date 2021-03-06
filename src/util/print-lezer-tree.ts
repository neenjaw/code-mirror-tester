import {
  Input,
  NodeType,
  stringInput,
  SyntaxNode,
  Tree,
  TreeCursor,
} from 'lezer-tree'

enum Color {
  Red = 31,
  Green = 32,
  Yellow = 32,
}

function colorize(value: any, color: number, colorize: boolean = true): string {
  return colorize
    ? '\u001b[' + color + 'm' + String(value) + '\u001b[39m'
    : String(value)
}

function focusedNode(cursor: TreeCursor): {
  readonly type: NodeType
  readonly from: number
  readonly to: number
} {
  const { type, from, to } = cursor
  return { type, from, to }
}

export function printTree(
  cursor: TreeCursor | Tree | SyntaxNode,
  input: Input | string,
  options: {
    from?: number
    to?: number
    start?: number
    includeParents?: boolean
    colorizeOutput?: boolean
  } = {}
): string {
  if (!(cursor instanceof TreeCursor))
    cursor = cursor instanceof Tree ? cursor.cursor() : cursor.cursor
  if (typeof input === 'string') input = stringInput(input)
  const {
    from = -Infinity,
    to = Infinity,
    start = 0,
    includeParents = false,
    colorizeOutput,
  } = options
  let output = ''
  const prefixes: string[] = []
  for (;;) {
    const node = focusedNode(cursor)
    let leave = false
    if (node.from <= to && node.to >= from) {
      const enter =
        !node.type.isAnonymous &&
        (includeParents || (node.from >= from && node.to <= to))
      if (enter) {
        leave = true
        const isTop = output === ''
        if (!isTop || node.from > 0) {
          output += (!isTop ? '\n' : '') + prefixes.join('')
          const hasNextSibling = cursor.nextSibling() && cursor.prevSibling()
          if (hasNextSibling) {
            output += ' ├─ '
            prefixes.push(' │  ')
          } else {
            output += ' └─ '
            prefixes.push('    ')
          }
        }
        output += node.type.isError
          ? colorize(node.type.name, Color.Red, colorizeOutput)
          : node.type.name
      }
      const isLeaf = !cursor.firstChild()
      if (enter) {
        const hasRange = node.from !== node.to
        output +=
          ' ' +
          (hasRange
            ? '[' +
              colorize(start + node.from, Color.Yellow, colorizeOutput) +
              '..' +
              colorize(start + node.to, Color.Yellow, colorizeOutput) +
              ']'
            : colorize(start + node.from, Color.Yellow, colorizeOutput))
        if (hasRange && isLeaf) {
          output +=
            ': ' +
            colorize(
              JSON.stringify(input.read(node.from, node.to)),
              Color.Green,
              colorizeOutput
            )
        }
      }
      if (!isLeaf) continue
    }
    for (;;) {
      if (leave) prefixes.pop()
      leave = cursor.type.isAnonymous
      if (cursor.nextSibling()) break
      if (!cursor.parent()) return output
      leave = true
    }
  }
}

export function logTree(
  tree: TreeCursor | Tree | SyntaxNode,
  input: Input | string,
  options: {
    from?: number
    to?: number
    start?: number
    includeParents?: boolean
  } = {}
): void {
  console.log(printTree(tree, input, options))
}
