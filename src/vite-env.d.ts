/* eslint-disable @typescript-eslint/no-empty-object-type */

/// <reference types="vite/client" />

import type { JSX as ReactJSX } from 'react'

declare global {
  namespace JSX {
    type Element = ReactJSX.Element
    interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends ReactJSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
    interface ElementChildrenAttribute extends ReactJSX.ElementChildrenAttribute {}
    interface LibraryManagedAttributes<C, P> extends ReactJSX.LibraryManagedAttributes<C, P> {}
  }
}

export {}
