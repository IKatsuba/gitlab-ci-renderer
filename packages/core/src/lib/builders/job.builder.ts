import { Job } from '../config';
import { DefaultJobBuilder } from './default-job.builder';
import { Builder, BuilderOr } from './base.builder';

export class JobBuilder extends DefaultJobBuilder<Job> implements Builder<Job> {
  config: Job = {};

  constructor(public name: string) {
    super();
  }

  setAllowFailure(allowFailure: BuilderOr<Job['allow_failure']>) {
    return this.setField('allow_failure', allowFailure);
  }

  setCoverage(coverage: BuilderOr<Job['coverage']>) {
    return this.setField('coverage', coverage);
  }

  setDependencies(dependencies: BuilderOr<Job['dependencies']>) {
    return this.setField('dependencies', dependencies);
  }

  setEnvironment(environment: BuilderOr<Job['environment']>) {
    return this.setField('environment', environment);
  }

  setExtends(extendsJob: BuilderOr<Job['extends']>) {
    return this.setField('extends', extendsJob);
  }

  setIdTokens(idTokens: BuilderOr<Job['id_tokens']>) {
    return this.setField('id_tokens', idTokens);
  }

  setInherit(inherit: BuilderOr<Job['inherit']>) {
    return this.setField('inherit', inherit);
  }

  setNeeds(needs: BuilderOr<Job['needs']>) {
    return this.setField('needs', needs);
  }

  setOnly(only: BuilderOr<Job['only']>) {
    return this.setField('only', only);
  }

  setParallel(parallel: BuilderOr<Job['parallel']>) {
    return this.setField('parallel', parallel);
  }

  setRelease(release: BuilderOr<Job['release']>) {
    return this.setField('release', release);
  }

  setResourceGroup(resourceGroup: BuilderOr<Job['resource_group']>) {
    return this.setField('resource_group', resourceGroup);
  }

  setRules(rules: BuilderOr<Job['rules']>) {
    return this.setField('rules', rules);
  }

  setScript(script: BuilderOr<Job['script']>) {
    return this.setField('script', script);
  }

  setSecrets(secret: BuilderOr<Job['secrets']>) {
    return this.setField('secrets', secret);
  }

  setStage(stage: BuilderOr<Job['stage']>) {
    return this.setField('stage', stage);
  }

  setTrigger(trigger: BuilderOr<Job['trigger']>) {
    return this.setField('trigger', trigger);
  }

  setVariables(variables: BuilderOr<Job['variables']>) {
    return this.setField('variables', variables);
  }

  getRuleReference(): string {
    return `!reference ["${this.name}", "rules"]`;
  }
}

export function job(name: string): JobBuilder {
  return new JobBuilder(name);
}
