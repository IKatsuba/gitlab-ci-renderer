import { DefaultJob } from '../config';
import { BaseBuilder, Builder, BuilderOr } from './base.builder';

export class DefaultJobBuilder<T extends DefaultJob = DefaultJob>
  extends BaseBuilder<T>
  implements Builder<T>
{
  config: T = {} as T;
  name = 'default';

  setAfterScript(script: BuilderOr<DefaultJob['after_script']>): this {
    return this.setField('after_script', script);
  }

  setArtifacts(artifacts: BuilderOr<DefaultJob['artifacts']>): this {
    return this.setField('artifacts', artifacts);
  }

  setBeforeScript(script: BuilderOr<DefaultJob['before_script']>): this {
    return this.setField('before_script', script);
  }

  setCache(cache: BuilderOr<DefaultJob['cache']>): this {
    return this.setField('cache', cache);
  }

  setHooks(hooks: BuilderOr<DefaultJob['hooks']>): this {
    return this.setField('hooks', hooks);
  }

  setImage(image: BuilderOr<DefaultJob['image']>): this {
    return this.setField('image', image);
  }

  setInterruptible(
    interruptible: BuilderOr<DefaultJob['interruptible']>
  ): this {
    return this.setField('interruptible', interruptible);
  }

  setRetry(retry: BuilderOr<DefaultJob['retry']>): this {
    return this.setField('retry', retry);
  }

  setServices(services: BuilderOr<DefaultJob['services']>): this {
    return this.setField('services', services);
  }

  setTags(tags: BuilderOr<DefaultJob['tags']>): this {
    return this.setField('tags', tags);
  }

  setTimeout(timeout: BuilderOr<DefaultJob['timeout']>): this {
    return this.setField('timeout', timeout);
  }
}

export function defaultJob(): DefaultJobBuilder {
  return new DefaultJobBuilder();
}
