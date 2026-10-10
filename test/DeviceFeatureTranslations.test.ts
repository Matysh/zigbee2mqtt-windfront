import { createInstance } from "i18next";
import { beforeAll, describe, expect, it } from "vitest";
import {
    translateDeviceFeatureDescription,
    translateDeviceFeatureName,
    translateDeviceFeatureUnit,
    translateDeviceFeatureValue,
} from "../src/i18n/deviceFeatureTranslations.js";
import enTranslations from "../src/i18n/locales/en.json" with { type: "json" };
import ruTranslations from "../src/i18n/locales/ru.json" with { type: "json" };

const i18n = createInstance();

beforeAll(async () => {
    await i18n.init({
        fallbackLng: "en",
        lng: "ru",
        ns: Object.keys(enTranslations),
        resources: {
            en: enTranslations,
            ru: ruTranslations,
        },
    });
});

describe("device feature translations", () => {
    it("translates labels and exact Zigbee2MQTT descriptions", () => {
        expect(translateDeviceFeatureName(i18n.t, "external_trigger_mode", "External trigger mode")).toBe("Режим внешнего выключателя");
        expect(translateDeviceFeatureName(i18n.t, "power_on_behavior", "(2) Power-on behavior")).toBe("(2) Поведение после включения питания");
        expect(translateDeviceFeatureName(i18n.t, "sensor", "Temperature source")).toBe("Источник температуры");
        expect(translateDeviceFeatureDescription(i18n.t, "On/off state of the switch")).toBe("Состояние реле: включено или выключено.");
    });

    it("translates values by feature without changing their payload", () => {
        expect(translateDeviceFeatureValue(i18n, i18n.t, "power_on_behavior", "previous")).toBe("Восстановить предыдущее состояние");
        expect(translateDeviceFeatureValue(i18n, i18n.t, "external_trigger_mode", "following(off)")).toBe("Следование положению (инвертировано)");
    });

    it("translates units and falls back for unknown metadata", () => {
        expect(translateDeviceFeatureUnit(i18n.t, "seconds")).toBe("с");
        expect(translateDeviceFeatureName(i18n.t, "unknown_feature", "Unknown feature")).toBe("Unknown feature");
        expect(translateDeviceFeatureValue(i18n, i18n.t, "unknown_feature", "ON")).toBeUndefined();
    });
});
