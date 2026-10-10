import enTranslations from "./i18n/locales/en.json" with { type: "json" };

type DeviceFeatureNamespace =
    | "deviceFeatureDescriptions"
    | "deviceFeatureLabels"
    | "deviceFeatureNames"
    | "deviceFeatureUnits"
    | "deviceFeatureValues";
type TranslationResources = Omit<typeof enTranslations, DeviceFeatureNamespace> & {
    deviceFeatureDescriptions: Record<string, string>;
    deviceFeatureLabels: Record<string, string>;
    deviceFeatureNames: Record<string, string>;
    deviceFeatureUnits: Record<string, string>;
    deviceFeatureValues: Record<string, Record<string, string>>;
};

declare module "i18next" {
    interface CustomTypeOptions {
        enableSelector: true;
        defaultNS: "common";
        resources: TranslationResources;
    }
}
