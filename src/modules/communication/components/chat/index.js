import { Component } from 'react';
import {
  Animated, Easing, KeyboardAvoidingView, ListView, Platform,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { ErrorBox, Loader, StyleSheet, Text } from 'ui';
import { ScreenParams } from 'utils';
import * as _ from 'lodash';

import Footer from './Footer';
import MessageView from './MessageView';
import Header from './Header';
import RedirectDock from './RedirectDock';
import CommunicationStore from '../../../../store/communication';

const ANIM_POSITION_ADJUST = 65;
const MAX_SCREEN_HEIGHT = ScreenParams.height - 130;

@inject('communication')
@observer
export default class Chat extends Component {
  props: {
    communication?: CommunicationStore;
    style?: Object | number;
  };

  state: {
    animMsgPosY: number;
    animMsgValue: Object;
    showRedirectAnim: boolean;
  };

  $listView: ListView;

  constructor(props) {
    super(props);

    this.state = {
      animMsgPosY: 0,
      animMsgValue: new Animated.Value(0),
      showRedirectAnim: false,
    };
  }

  onRedirectMessage(message, posY) {
    const { communication } = this.props;
    const { animMsgValue } = this.state;

    this.setState({
      animMsgPosY: posY - ANIM_POSITION_ADJUST,
      showRedirectAnim: true,
    });

    Animated.timing(animMsgValue, {
      toValue: 10,
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    }).start(() => {
      this.setState({
        animMsgPosY: 0,
        showRedirectAnim: false,
      });
      animMsgValue.setValue(0);

      // Add message to messages for redirect to show it in dock
      // on other screens
      communication.addMessageForRedirect(message);
    });
  }

  renderRow(row) {
    return (
      <MessageView
        message={row}
        onRedirectMessage={::this.onRedirectMessage}
      />
    );
  }

  render() {
    const { communication, style } = this.props;
    const conversation = communication.selectedConversation;
    const ds = communication.selectedConversationDataSource;

    if (!conversation) {
      return (
        <Loader isLoading={ds.isLoading}>
          <ErrorBox message={ds.error} />
        </Loader>
      );
    }

    const {
      animMsgValue, animMsgPosY, showRedirectAnim, msgsForRedirect,
    } = this.state;
    const translateY = animMsgValue.interpolate({
      inputRange: [0, 10],
      outputRange: [animMsgPosY, MAX_SCREEN_HEIGHT],
      extrapolate: 'clamp',
    });

    const opacity = animMsgValue.interpolate({
      inputRange: [0, 10],
      outputRange: [1, 0],
    });

    return (
      <KeyboardAvoidingView
        style={[styles.container, style]}
        contentContainerStyle={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Header status={conversation.status} userName={conversation.name} />
        <ListView
          contentContainerStyle={styles.list}
          dataSource={ds}
          enableEmptySections
          ref={ref => this.$listView = ref}
          renderRow={::this.renderRow}
        />
        <Footer conversationId={conversation.id} />

        {showRedirectAnim && (
          <Animated.View
            style={[styles.animRedirectMsg, {
              opacity,
              transform: [
                {
                  translateY,
                },
              ],
            }]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {_.last(msgsForRedirect) && _.last(msgsForRedirect).body}
            </Text>
          </Animated.View>
        )}

        {communication.isMsgsForRedirectAvailable && <RedirectDock />}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },

  animRedirectMsg: {
    position: 'absolute',
    left: 20,
    height: 40,
    width: 300,
    borderColor: 'yellowgreen',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
});