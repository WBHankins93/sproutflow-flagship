// Jest type declarations - works without requiring @types/jest to be installed
// These declarations provide TypeScript support for Jest globals

interface JestMatchers<R> {
  toBe(expected: any): R
  toEqual(expected: any): R
  toContain(expected: any): R
  not: JestMatchers<R>
  toBeDefined(): R
  toBeTruthy(): R
  toBeFalsy(): R
  toBeNull(): R
  toBeUndefined(): R
  toBeGreaterThan(expected: number): R
  toBeGreaterThanOrEqual(expected: number): R
  toBeLessThan(expected: number): R
  toBeLessThanOrEqual(expected: number): R
  toHaveProperty(prop: string): R
  toHaveAttribute(attr: string, value?: string): R
  toBeInTheDocument(): R
  toHaveClass(...classNames: string[]): R
  toHaveTextContent(text: string | RegExp): R
  toHaveBeenCalled(): R
  toHaveBeenCalledTimes(times: number): R
  toHaveBeenCalledWith(...args: any[]): R
  toThrow(): R
  toThrow(error?: string | RegExp | Error): R
}

interface JestExpect {
  <T = any>(actual: T): JestMatchers<T>
}

interface JestDescribe {
  (name: string, fn: () => void): void
}

interface JestIt {
  (name: string, fn: () => void | Promise<void>): void
}

interface JestLifecycle {
  (fn: () => void | Promise<void>): void
}

interface JestMock {
  resetModules(): void
  fn<T extends (...args: any[]) => any>(implementation?: T): jest.Mock<T>
  mock(moduleName: string, factory?: () => any): void
  spyOn<T extends object, M extends keyof T>(object: T, method: M): jest.SpyInstance
  clearAllMocks(): void
  restoreAllMocks(): void
}

declare namespace jest {
  interface Mock<T extends (...args: any[]) => any = (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T>
    mockReturnValue(value: ReturnType<T>): this
    mockResolvedValue(value: ReturnType<T>): this
    mockImplementation(fn: T): this
  }

  interface SpyInstance {
    mockReturnValue(value: any): this
    mockResolvedValue(value: any): this
    mockImplementation(fn: (...args: any[]) => any): this
  }

  const describe: JestDescribe
  const it: JestIt
  const test: JestIt
  const expect: JestExpect
  const beforeEach: JestLifecycle
  const afterEach: JestLifecycle
  const beforeAll: JestLifecycle
  const afterAll: JestLifecycle
  const resetModules: () => void
  const fn: <T extends (...args: any[]) => any>(implementation?: T) => Mock<T>
  const mock: (moduleName: string, factory?: () => any) => void
  const spyOn: <T extends object, M extends keyof T>(object: T, method: M) => SpyInstance
  const clearAllMocks: () => void
  const restoreAllMocks: () => void
}

// Global declarations for Jest globals
declare var describe: JestDescribe
declare var it: JestIt
declare var test: JestIt
declare var expect: JestExpect
declare var beforeEach: JestLifecycle
declare var afterEach: JestLifecycle
declare var beforeAll: JestLifecycle
declare var afterAll: JestLifecycle
declare var jest: typeof jest

// Testing Library jest-dom extensions
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R
    toHaveClass(...classNames: string[]): R
    toHaveTextContent(text: string | RegExp): R
    toHaveAttribute(attr: string, value?: string): R
  }
}
