import React, {Component, forwardRef} from 'react';
import {Keyboard} from 'react-native';
import _ from 'underscore';
import BaseOptionsList from './BaseOptionsList';
import withWindowDimensions from '../withWindowDimensions';
import {propTypes, defaultProps} from './optionsListPropTypes';
import * as DeviceCapabilities from '../../libs/DeviceCapabilities';

class OptionsList extends Component {
    constructor(props) {
        super(props);

        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount() {
        if (!DeviceCapabilities.canUseTouchScreen()) {
            return;
        }

        // We're setting `isScreenTouched` in this listener only for web platforms with touchscreen (mWeb) where
        // we want to dismiss the keyboard only when the list is scrolled by the user and not when it's scrolled programmatically.
        document.addEventListener('touchstart', this.touchStart);
        document.addEventListener('touchend', this.touchEnd);
    }

    componentWillUnmount() {
        if (!DeviceCapabilities.canUseTouchScreen()) {
            return;
        }

        document.removeEventListener('touchstart', this.touchStart);
        document.removeEventListener('touchend', this.touchEnd);
    }

    touchStart() {
        this.isScreenTouched = true;
    }

    touchEnd() {
        this.isScreenTouched = false;
    }

    render() {
        return (
            <BaseOptionsList
                // eslint-disable-next-line react/jsx-props-no-spreading
                {..._.omit(this.props, 'forwardedRef')}
                ref={this.props.forwardedRef}
                onScroll={() => {
                    // Only dismiss the keyboard whenever the user scrolls the screen
                    if (!this.isScreenTouched) {
                        return;
                    }
                    Keyboard.dismiss();
                }}
            />
        );
    }
}

OptionsList.propTypes = {
    ...propTypes,
};
OptionsList.defaultProps = defaultProps;

export default withWindowDimensions(
    forwardRef((props, ref) => (
        <OptionsList
            forwardedRef={ref}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    )),
);
