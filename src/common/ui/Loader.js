import { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import StyleSheet from './StyleSheet';

export default class Loader extends Component {
  props: {
    children: any;
    color?: string;
    isLoading?: boolean;
    style?: Object | Number;
  };

  renderInline() {
    const { isLoading, style } = this.props;
    if (!isLoading) {
      return null;
    }

    return (
<<<<<<< HEAD
      <ActivityIndicator
        size="large"
        style={style}
        color={this.props.color || '#5AC8FA'}/>
=======
      <View style={[styles.loaderContainer, style]}>
        <ActivityIndicator
          size="large"
          color={this.props.color}
        />
      </View>
>>>>>>> c00903091599113e3c62d66f68a4b8d4ff2c7bac
    );
  }

  renderContainer() {
    const { isLoading, children } = this.props;
    if (!isLoading) {
      if (Array.isArray(children)) {
        throw new Error('Loader can contain only a single element');
      }
      return children;
    }
    return this.renderInline();
  }

  render() {
    const { children } = this.props;
    if (children) {
      return this.renderContainer();
    }
    return this.renderInline();
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});