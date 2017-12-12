import React from 'react';
/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends React.Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      return (<MaterialUIComponent {...mapProps(this.props)} ref={(c) => { this.component = c; }} />);
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`;
  return InputComponent;
}
