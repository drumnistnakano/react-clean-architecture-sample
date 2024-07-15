/// <reference types="vite/client" />
export class NotFoundEnvError extends Error {
  constructor(envName: string) {
    super(`Environment variable ${envName} not found.`);
    this.name = "NotFoundEnvVarError";
  }
}

/**
 * Viteの環境変数の有無をチェックし、存在する場合は値を返す
 * 存在しない場合はエラーを投げる
 *
 * @param {string} envName 環境変数名
 * @returns {string} 環境変数の値
 * @see https://ja.vitejs.dev/guide/env-and-mode#env-files
 */
export const unwrapEnv = (envName: string): string => {
  const viteEnv = `VITE_${envName}`;
  const envValue = import.meta.env[viteEnv];
  if (envValue == null) {
    throw new NotFoundEnvError(envName);
  }
  return envValue;
};
