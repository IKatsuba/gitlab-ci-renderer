import { gitlabCI } from './gitlab-ci.builder';
import { pagesJob } from './pages-job.builder';
import { job } from './job.builder';
import * as path from 'path';

describe('GitlabCiBuilder', () => {
  it('should run', () => {
    const yaml = gitlabCI()
      .setJobs([
        pagesJob().setScript([`echo "Hello World"`]),
        job('test')
          .setStage('test')
          .setScript(['echo "Hello World"'])
          .setRules([
            {
              if: '$CI_COMMIT_BRANCH == "master"',
              changes: ['src/**'],
              variables: {
                CI_JOB_STAGE: 'test',
              },
            },
            {
              if: '$CI_COMMIT_BRANCH == "master"',
              changes: ['src/**'],
              variables: {
                CI_JOB_STAGE: 'test',
              },
            },
          ]),
      ])
      .toYaml();

    expect(yaml).toEqual(`pages:`);
  });

  it('should inline', () => {
    const yaml = gitlabCI()
      .addGitlabCIFile(path.join(__dirname, '__test__/test.yml'))
      .inlineLocalIncludes(__dirname)
      .toYaml();

    expect(yaml).toEqual(`include:
  - ref: master
    file: packages/core/src/lib/builders/__test__/test2.yml
  - project: mygroup/myproject
    file: packages/core/src/lib/builders/__test__/test2.yml
    ref: master
job:
  stage: test
  script:
    - echo "test"
job1:
  stage: test
  script:
    - echo "test"
job3:
  stage: test
  script:
    - echo "test"
`);
  });
});
