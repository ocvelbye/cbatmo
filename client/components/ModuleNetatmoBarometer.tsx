import React from 'react';

import ModuleLayout from "../layouts/ModuleLayout";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    reachable?: boolean
    pressure?: number
    unit: string
    device_id: string|undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Outdoor module */
const NetatmoModuleBarmometer: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label="Barometer"
            reachable={props.reachable}
            vertical_divider={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="pressure" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['Pressure'])}>
                        {props.pressure}<small>{props.unit}</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleBarmometer