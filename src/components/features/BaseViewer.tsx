import { memo } from "react";
import { useTranslation } from "react-i18next";
import { translateDeviceFeatureUnit } from "../../i18n/deviceFeatureTranslations.js";
import type { BasicFeature } from "../../types.js";
import DisplayValue from "../value-decorators/DisplayValue.js";
import type { BaseFeatureProps } from "./index.js";

const BaseViewer = memo(({ feature, deviceValue }: BaseFeatureProps<BasicFeature>) => {
    const { t } = useTranslation("deviceFeatureUnits");
    const unit = "unit" in feature ? translateDeviceFeatureUnit(t, feature.unit) : undefined;

    return (
        <div>
            {feature.property && (
                <span className="font-bold">
                    <DisplayValue value={deviceValue} name={feature.name} />
                </span>
            )}
            {unit && <span className="text-xs ms-1">{unit}</span>}
        </div>
    );
});

export default BaseViewer;
