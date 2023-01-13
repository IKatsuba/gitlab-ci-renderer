export type BuilderOr<T> = Builder<T> | T;

export function isBuilder<T>(builder: BuilderOr<T>): builder is Builder<T> {
  return builder instanceof Object && 'build' in builder;
}

export function build<T>(builder: BuilderOr<T>): T {
  return isBuilder(builder) ? builder.build() : builder;
}

export interface Builder<T> {
  config: T;

  build(): T;
}

export class BaseBuilder<T> implements Builder<T> {
  config: T;

  build(): T {
    return this.config;
  }

  setField<K extends keyof T>(key: K, value: BuilderOr<T[K]>): this {
    this.config[key] = build(value);
    return this;
  }

  removeField<K extends keyof T>(key: K): this {
    delete this.config[key];
    return this;
  }

  updateField<K extends keyof T>(key: K, value: BuilderOr<T[K]>): this {
    this.config[key] = this.deepMerge(this.config[key], build(value));
    return this;
  }

  protected deepMerge(target: any, source: any) {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        Object.assign(source[key], this.deepMerge(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }
}
