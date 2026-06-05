import '@testing-library/jest-dom'

// jsdom in this environment does not provide a functional localStorage —
// install a minimal in-memory implementation for components that read it.
if (typeof globalThis.localStorage === 'undefined' ||
    typeof globalThis.localStorage.getItem !== 'function') {
  const store = new Map<string, string>()
  const localStorageMock: Storage = {
    getItem: (key) => (store.has(key) ? store.get(key)! : null),
    setItem: (key, value) => void store.set(key, String(value)),
    removeItem: (key) => void store.delete(key),
    clear: () => store.clear(),
    key: (i) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size
    },
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  })
}
