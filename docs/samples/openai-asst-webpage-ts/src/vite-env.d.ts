/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ASSISTANT_ID: string;
    readonly AZURE_OPENAI_API_KEY: string;
    readonly AZURE_OPENAI_API_VERSION: string;
    readonly AZURE_OPENAI_ENDPOINT: string;
    readonly AZURE_OPENAI_CHAT_DEPLOYMENT: string;
    readonly OPENAI_API_KEY: string;
    readonly OPENAI_ORG_ID: string;
    readonly OPENAI_MODEL_NAME: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }