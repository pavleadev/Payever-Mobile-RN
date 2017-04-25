import { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import type { Navigator } from 'react-native-navigation';
import { NavBar, StyleSheet, View } from 'ui';
import Chat from '../components/chat';
import Header from '../components/chat/Header';
import CommunicationStore from '../../../store/communication';

@inject('communication')
@observer
export default class ChatScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  props: {
    communication: CommunicationStore;
    navigator: Navigator;
  };

  onSettingsPress() {
    const { communication, navigator } = this.props;
    const { selectedConversation: conversation } = communication;

    if (!conversation) return;

    if (conversation.isGroup) {
      navigator.push({
        screen: 'communication.GroupSettings',
        animated: true,
      });
    } else {
      navigator.push({
        screen: 'communication.ConversationSettings',
        animated: true,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar>
          <NavBar.Back />
          <NavBar.ComplexTitle>
            <Header />
          </NavBar.ComplexTitle>
          <NavBar.IconButton
            imageStyle={styles.settingsIcon}
            onPress={::this.onSettingsPress}
            source="icon-settings-24"
          />
        </NavBar>
        <Chat style={styles.chat} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    borderColor: 'red',
    borderWidth: 1,
  },

  settingsIcon: {
    color: '$pe_color_icon',
    fontSize: 20,
  },

  chat: {
    flex: 1,
  },
});