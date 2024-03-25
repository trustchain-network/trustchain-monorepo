export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
  tracking: boolean;
  fallbackLanguage: string;
  headerLanguage: string;
  sdmDomain: string;
};
