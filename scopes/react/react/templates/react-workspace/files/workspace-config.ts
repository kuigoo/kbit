import { WorkspaceContext } from '@teambit/generator';
import { getWorkspaceConfigTemplateParsed, stringifyWorkspaceConfig } from '@teambit/config';

export async function workspaceConfig({ name, defaultScope, empty }: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  configParsed['teambit.workspace/workspace'].defaultScope = defaultScope || 'company.scope';
  configParsed['teambit.dependencies/dependency-resolver'].packageManager = 'teambit.dependencies/pnpm';
  configParsed['teambit.dependencies/dependency-resolver'].policy = {
    dependencies: {},
    peerDependencies: {
      '@testing-library/react': '11.2.6',
      react: '16.13.1',
      'react-dom': '16.13.1',
    },
  };

  configParsed['teambit.workspace/variants'] = empty
    ? {
        '*': {
          'teambit.react/react': {},
        },
      }
    : {
        '{templates/ui/**}, {templates/pages/**}': {
          'company.scope/templates/envs/my-react': {},
        },
        '{templates/envs/**}': {
          'teambit.harmony/aspect': {},
        },
      };

  return stringifyWorkspaceConfig(configParsed);
}
