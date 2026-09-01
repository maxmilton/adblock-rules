// oxlint-disable max-classes-per-file

declare module "adblock-rs" {
  type METHODS =
    | "get"
    | "head"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace"
    | "patch";

  export enum FilterFormat {
    STANDARD = "STANDARD",
    HOSTS = "HOSTS",
  }

  export enum RuleTypes {
    ALL = "ALL",
    NETWORK_ONLY = "NETWORK_ONLY",
    COSMETIC_ONLY = "COSMETIC_ONLY",
  }

  // https://github.com/brave/adblock-rust/blob/18448c9d89b8d7b5a730e6d3d97b163419a4be0a/js/src/lib.rs#L80
  export class FilterSet<Debug extends boolean = false> {
    public constructor(debug?: Debug);

    public addFilters(
      rules: string | readonly string[],
      options?: {
        readonly format?: FilterFormat;
        readonly rule_types?: RuleTypes;
        readonly permissions?: number;
      },
    ): void;

    public intoContentBlocking(): Debug extends true
      ? {
          contentBlockingRules: {
            action: { type: string };
            trigger: {
              "url-filter": string;
              "resource-type"?: string[];
              "load-type"?: string[];
            };
          }[];
          filtersUsed: string[];
        }
      : undefined;
  }

  export interface ResultDebugInfo {
    filter: string | null;
    exception: null;
    important: boolean;
    redirect: null;
    rewritten_url: string | null;
    should_block: boolean;
  }

  // https://github.com/brave/adblock-rust/blob/18448c9d89b8d7b5a730e6d3d97b163419a4be0a/js/src/lib.rs#L151
  export class Engine {
    public constructor(filter_set: Readonly<FilterSet<boolean>>);

    public check(
      url: string,
      source_url: string,
      request_type: string,
      method: METHODS | null | undefined,
      debug: false | undefined,
    ): boolean;
    public check(
      url: string,
      source_url: string,
      request_type: string,
      method: METHODS | null | undefined,
      debug: true,
    ): ResultDebugInfo;
    public check(
      url: string,
      source_url: string,
      request_type: string,
      method?: METHODS | null,
      debug?: boolean,
    ): boolean | ResultDebugInfo;
  }

  // https://github.com/brave/adblock-rust/blob/18448c9d89b8d7b5a730e6d3d97b163419a4be0a/js/src/lib.rs#L399
  export function uBlockResources(
    resource_dir: string,
    redirect_path: string,
    /** @deprecated */
    scriptlets_path?: string,
  ): unknown[];
}
