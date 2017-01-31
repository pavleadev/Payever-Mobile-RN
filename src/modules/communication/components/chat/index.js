import { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { NavBar, StyleSheet, View } from 'ui';

import type { Navigator } from 'react-native-navigation';
import ChatBottomBar from './ChatBottomBar';
import MessagesList from './MessgesList';
import UserInfoHeader from './UserInfoHeader';

//noinspection JSUnresolvedVariable
import imgCommunication from '../../images/communication.png';

@inject('communication')
@observer
export default class Chat extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  context: {
    navigator: Navigator;
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar.Default title="Communication" source={imgCommunication} />
        <View style={styles.content}>
          <UserInfoHeader userName="Personal Assistant" />
          <MessagesList />
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