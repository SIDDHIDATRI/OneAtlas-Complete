export interface AppSpec {

  pages: {
    name: string;
    entity: string;
    description: string;
  }[];

  apiEndpoints: {
    method: string;
    path: string;
    entity: string;
  }[];

  authRules: {
    role: string;
    permissions: string[];
  }[];

  integrationHooks: {
    integration: string;
    event: string;
  }[];

  workflowStubs: {
    name: string;
    integration: string;
    trigger: {
      entity: string;
      event: string;
    };
  }[];
}