import { ICepResult } from "./cep-result";

export interface ICepCache {
  [cep: string]: ICepResult;
}
