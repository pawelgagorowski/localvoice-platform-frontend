export type InitializerTask<T> = () => Promise<T>;

export function InitializerFactory() {
  const tasks: InitializerTask<any>[] = [];
  let resolved: Promise<any>;

  function register<T>(task: InitializerTask<T>) {
    tasks.push(task);
  }

  function resolve(): Promise<any[]> {
    if (resolved) {
      return resolved;
    }

    resolved = Promise.all(tasks.map((initializer) => initializer()));

    return resolved;
  }

  return { register, resolve };
}

export const appInitializer = InitializerFactory();
