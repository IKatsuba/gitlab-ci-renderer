import {
  DefaultJob,
  GitlabCIConfig,
  GlobalVariable,
  Include,
  Job,
  Workflow,
} from '../config';
import { parse, stringify } from 'yaml';
import { readFileSync } from 'fs';
import { BaseBuilder, Builder, isBuilder } from './base.builder';
import { JobBuilder } from './job.builder';
import * as path from 'path';

export class GitlabCIBuilder
  extends BaseBuilder<GitlabCIConfig>
  implements Builder<GitlabCIConfig>
{
  constructor(public config: GitlabCIConfig = {}) {
    super();
  }

  static fromGitlabCIFile(path: string): GitlabCIBuilder {
    return new GitlabCIBuilder().addGitlabCIFile(path);
  }

  setJob(job: Job, name: string): this;
  setJob(job: JobBuilder): this;
  setJob(job: JobBuilder | Job, name?: string): this {
    return this.setField(isBuilder(job) ? job.name : name, job);
  }

  setJobs(jobs: JobBuilder[]): this {
    jobs.forEach((job) => this.setJob(job));
    return this;
  }

  setDefault(job: DefaultJob): this {
    return this.setField('default', job);
  }

  setInclude(include: Include[]): this {
    this.config.include = include;
    return this;
  }

  pushInclude(include: Include): this {
    this.config.include = this.config.include ?? [];
    this.config.include.push(include);
    return this;
  }

  pushIncludes(includes: Include[]): this {
    this.config.include = this.config.include ?? [];
    this.config.include.push(...includes);
    return this;
  }

  setVariable(
    name: string,
    value: string | number | boolean | GlobalVariable
  ): this {
    this.config.variables = this.config.variables ?? {};
    this.config.variables[name] = value;
    return this;
  }

  setVariables(
    variables: Record<string, string | number | boolean | GlobalVariable>
  ): this {
    this.config.variables = {
      ...(this.config.variables ?? {}),
      ...variables,
    };
    return this;
  }

  setStages(stages: string[]): this {
    this.config.stages = stages;
    return this;
  }

  setWorkflow(workflow: Workflow): this {
    this.config.workflow = workflow;
    return this;
  }

  setPages(job: Job): this {
    this.config.pages = job;
    return this;
  }

  build(): GitlabCIConfig {
    return this.config;
  }

  toYaml(): string {
    return stringify(this.build());
  }

  addGitlabCIFile(
    path: string,
    { inline, root }: { inline?: boolean; root?: string } = {}
  ): this {
    let config: GitlabCIConfig = parse(readFileSync(path, 'utf8').toString());

    const builder =
      inline && root && gitlabCI(config).inlineLocalIncludes(root);

    if (builder) {
      config = builder.build();
      config.include && this.pushIncludes(config.include);
      delete config.include;
    }

    this.mergeConfig(config);
    return this;
  }

  mergeConfig(config: GitlabCIConfig): this {
    this.deepMerge(this.config, config);
    return this;
  }

  inlineLocalIncludes(root: string): this {
    [...(this.config.include ?? [])].forEach((include, index) => {
      if ('local' in include && include.local) {
        this.config.include?.splice(index, 1);

        this.addGitlabCIFile(path.join(root, include.local), {
          inline: true,
          root,
        });
      }
    });

    return this;
  }
}

export function gitlabCI(config?: GitlabCIConfig): GitlabCIBuilder {
  return new GitlabCIBuilder(config);
}
