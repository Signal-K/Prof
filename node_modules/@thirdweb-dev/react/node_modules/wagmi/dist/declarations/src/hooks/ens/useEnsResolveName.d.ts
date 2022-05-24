declare type Config = {
    /** Name to look up */
    name?: string;
    /** Disables fetching */
    skip?: boolean;
};
export declare const useEnsResolveName: ({ name, skip }?: Config) => readonly [{
    readonly data: string | null | undefined;
    readonly loading: boolean;
    readonly error: Error | undefined;
}, (config?: {
    name: string;
} | undefined) => Promise<{
    data: string | null;
    error: undefined;
} | {
    data: undefined;
    error: Error;
}>];
export {};
