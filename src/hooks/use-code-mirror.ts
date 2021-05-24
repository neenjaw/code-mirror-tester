import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup'
import { javascript } from '@codemirror/lang-javascript'

export function useCodeMirror(
  ref: RefObject<HTMLElement>,
  initialDocument: string = ''
): EditorView | null {
  const [view, setView] = useState<EditorView | null>(null)

  useEffect(() => {
    if (ref?.current) {
      const view = new EditorView({
        state: EditorState.create({
          doc: initialDocument,
          extensions: [basicSetup, javascript()],
        }),
        parent: ref.current,
      })
      setView(view)

      return () => {
        setView(null)
        view.destroy()
      }
    }
  }, [initialDocument, ref, setView])

  return view
}
