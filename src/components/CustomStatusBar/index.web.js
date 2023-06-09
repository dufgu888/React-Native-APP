import React from 'react';
import {StatusBar} from 'react-native';
import themeColors from '../../styles/themes/default';

export default class CustomStatusBar extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);

        // For mobile web browsers, match the default status bar color to the app's background color
        const element = document.querySelector('meta[name=theme-color]');
        if (element) {
            element.content = themeColors.appBG;
        }
    }

    render() {
        return <StatusBar />;
    }
}
