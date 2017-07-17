declare module "native" {
  interface RegExp {
    /**
     * @deprecated
    */
    compile(): void;
    exec(str: string): string[];
    test(str: string): boolean;
    toString(): string;
  }
}
