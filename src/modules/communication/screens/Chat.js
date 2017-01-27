import { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { NavBar, StyleSheet, View } from 'ui';

import type { Navigator } from 'react-native-navigation';
import type { Config } from '../../../config/index';
import ChatBottomBar from '../components/chat/ChatBottomBar';
import UserInfoHeader from '../components/chat/UserInfoHeader';

//noinspection JSUnresolvedVariable
import imgCommunication from '../images/communication.png';

@inject('communication', 'config')
@observer
export default class Main extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  props: {
    navigator: Navigator;
    config: Config;
  };

  state: {
    isLoading: false;
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar.Default title="Communication" source={imgCommunication} />
        <View style={styles.content}>
          <UserInfoHeader userName="Personal Assistant" />
        </View>
        <ChatBottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
  },
});