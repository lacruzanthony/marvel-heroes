declare global {
    interface ImportMetaEnv extends ImportMeta {
        readonly env: {
            readonly VITE_API_HOST: string;
        };
    }
}

export const { VITE_API_HOST: API_HOST } = import.meta.env