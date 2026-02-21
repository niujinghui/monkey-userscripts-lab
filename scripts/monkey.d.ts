declare module "monkey" {
    export function GM_getValue<T = any>(
        key: string,
        defaultValue?: T
    ): T;

    export function GM_setValue<T = any>(
        key: string,
        value: T
    ): void;
}