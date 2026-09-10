/// <reference types="powerapps-component-framework" />

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LabelControl, ILabelControlProps } from "./Label";
import { resolveLocalizedLabel } from "./localization";
import * as React from "react";

/**
 * Coerces TwoOptions raw values to a real boolean. The form designer's
 * design-time preview can hand these through as the string "false"/"true"
 * rather than an actual boolean, which would otherwise be truthy.
 */
function toBoolean(raw: boolean | string | null | undefined): boolean {
    if (typeof raw === 'string') {
        return raw === 'true' || raw === '1';
    }
    return raw ?? false;
}

export class SectionHeaderLabelReact implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: ILabelControlProps = {
            name: resolveLocalizedLabel(context.parameters.Label.raw, context.userSettings.languageId),
            alignment: context.parameters.Alignment.raw ?? 'left',
            showDivider: toBoolean(context.parameters.DividerShow.raw),
            dividerColor: context.parameters.DividerColor.raw ?? '#e0e0e0',
            marginTop: toBoolean(context.parameters.MarginTop.raw),
            isSubsection: toBoolean(context.parameters.IsSubsection.raw)
        };
        return React.createElement(
            LabelControl, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
