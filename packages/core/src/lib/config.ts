export interface Artifacts {
  paths?: string[];
  exclude?: string[];
  expire_in?: string;
  expose_as?: string;
  name?: string;
  public?: boolean;
  reports?: Record<string, string | number | boolean>;
  untracked?: boolean;
  when?: 'on_success' | 'on_failure' | 'always';
}

export interface Cache {
  paths?: string[];
  key?: string | { files: string[]; prefix?: string };
  untracked?: boolean;
  unprotect?: boolean;
  when?: 'on_success' | 'on_failure' | 'always';
  policy?: 'pull-push' | 'pull' | 'push';
}

export interface Hooks {
  pre_get_sources_script?: string;
}

export interface Image {
  name?: string;
  entrypoint?: string[];
  pull_policy?: 'always' | 'if-not-present' | 'never';
}

export interface Retry {
  max?: 0 | 1 | 2;
  when?:
    | 'always'
    | 'unknown_failure'
    | 'script_failure'
    | 'api_failure'
    | 'stuck_or_timeout_failure'
    | 'runner_system_failure'
    | 'runner_unsupported'
    | 'stale_schedule'
    | 'job_execution_timeout'
    | 'archived_failure'
    | 'unmet_prerequisites'
    | 'scheduler_failure'
    | 'data_integrity_failure';
}

export interface Service {
  name?: string;
  alias?: string;
  entrypoint?: string[];
  command?: string[];
  pull_policy?: 'always' | 'if-not-present' | 'never';
}

export interface DefaultJob {
  after_script?: string[];
  artifacts?: Artifacts;
  before_script?: string[];
  cache?: Cache[];
  hooks?: Hooks;
  image?: string | Image;
  interruptible?: boolean;
  retry?: 0 | 1 | 2 | Retry;
  services?: Service[];
  tags?: string[];
  timeout?: string;
}

export type Include =
  | {
      local: string;
    }
  | {
      project: string;
      ref?: string;
      file?: string;
    }
  | {
      template: string;
    }
  | {
      remote: string;
    };

export interface WorkflowRule {
  if?: string;
  changes?: string[];
  exists?: string[];
  when: 'always' | 'never';
  variables?: Record<string, string | number | boolean>;
}

export interface JobRule {
  if?: string;
  changes?: string[] | { paths: string[]; compare_to?: string };
  exists?: string[];
  allow_failure?: boolean;
  variables?: Record<string, string | number | boolean>;
  when?:
    | 'on_success'
    | 'manual'
    | 'never'
    | 'on_failure'
    | 'delayed'
    | 'always';
}

export interface Workflow {
  name?: string;
  rules?: WorkflowRule[];
}

export interface Environment {
  name?: string;
  url?: string;
  on_stop?: string;
  action?: 'start' | 'prepare' | 'stop' | 'verify' | 'access';
  auto_stop_in?: string;
  kubernetes?: {
    namespace?: string;
  };
  deployment_tier?:
    | 'production'
    | 'staging'
    | 'testing'
    | 'development'
    | 'other';
}

export interface Inherit {
  default?: boolean | string[];
  variables?: string[];
}

export interface Need {
  job?: string;
  artifacts?: boolean;
  project?: string;
  pipeline?: string;
  optional?: boolean;
}

export interface Only {
  refs?: Array<
    | string
    | 'api'
    | 'branches'
    | 'chat'
    | 'external'
    | 'external_pull_requests'
    | 'merge_requests'
    | 'pipelines'
    | 'pushes'
    | 'schedules'
    | 'tags'
    | 'triggers'
    | 'web'
  >;
  variables?: string[];
  changes?: string[];
  kubernetes?: 'active';
}

export interface Parallel {
  matrix?: Record<string, string[]>;
}

export interface AssetLink {
  name: string;
  url: string;
  filepath?: string;
  link_type?: string;
}

export interface Release {
  tag_name?: string;
  tag_message?: string;
  name?: string;
  description?: string;
  ref?: string;
  milestones?: string[];
  released_at?: string;
  assets?: { links: AssetLink[] };
}

export interface Secret {
  vault?:
    | string
    | {
        engine: { name: string; path: string };
        path: string;
        field: string;
      };
  file?: boolean;
}

export interface Trigger {
  include?: Array<Include | { artifact: string; job: string }>;
  project?: string;
  branch?: string;
  strategy?: 'depend';
  forward: {
    yaml_variables?: boolean;
    pipeline_variables?: boolean;
  };
}

export interface Job extends DefaultJob {
  allow_failure?: boolean | { exit_codes: number | number[] };
  coverage?: string;
  dependencies?: string[];
  environment?: string | Environment;
  extends?: string[];
  id_tokens?: Record<string, { aud: string | string[] }>;
  inherit?: Inherit;
  needs?: Array<string | Need>;
  only?: Only;
  parallel?: number | Parallel;
  release?: Release;
  resource_group?: string;
  rules?: JobRule[];
  script?: string[];
  secrets?: Record<string, Secret>;
  stage?: string;
  trigger?: string | Trigger;
  variables?: Record<string, string | number | boolean | JobVariable>;
}

export type JobMap = Record<string, Job>;

export interface JobVariable {
  value: string | number | boolean;
  expand?: boolean;
}

export interface GlobalVariable extends JobVariable {
  options?: Array<string | number | boolean>;
  description?: string;
}

export interface GlobalKeywords {
  default?: DefaultJob;
  include?: Include[];
  stages?: string[];
  workflow?: Workflow;
  variables?: Record<string, string | number | boolean | GlobalVariable>;
  pages?: Job;
}

export type GitlabCIConfig = GlobalKeywords & JobMap;
