declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface ImportMeta {
    env: Record<string, unknown>
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
