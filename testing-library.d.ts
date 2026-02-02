// Type declarations for @testing-library/react
// These provide TypeScript support before npm install

declare module '@testing-library/react' {
  import { ReactElement } from 'react'
  
  interface RenderResult {
    container: HTMLElement
    rerender: (ui: ReactElement) => void
    unmount: () => void
  }
  
  export function render(ui: ReactElement, options?: any): RenderResult
  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement
    getByLabelText: (text: string | RegExp) => HTMLElement
    queryByText: (text: string | RegExp) => HTMLElement | null
    queryByLabelText: (text: string | RegExp) => HTMLElement | null
    getAllByText: (text: string | RegExp) => HTMLElement[]
    [key: string]: any
  }
  export const fireEvent: {
    click: (element: HTMLElement) => void
    change: (element: HTMLElement, event?: any) => void
    [key: string]: any
  }
  export function waitFor(fn: () => void | Promise<void>, options?: any): Promise<void>
}

declare module '@testing-library/user-event' {
  export function setup(options?: any): {
    click: (element: HTMLElement) => Promise<void>
    type: (element: HTMLElement, text: string) => Promise<void>
    [key: string]: any
  }
}

declare module '@testing-library/jest-dom' {
  // Types are extended in jest.d.ts
}
