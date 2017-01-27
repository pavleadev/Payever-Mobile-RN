import { Component } from 'react';
import { Icon, StyleSheet, Text, View } from 'ui';

import OnlineStatus from './../common/OnlineStatus';

export default class UserInfoHeader extends Component {
  props: {
    userName: string;
  };

  onSettingsPress() {
    console.log('Settings settings');
  }

  onTextChange(text) {
    console.log(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.userName}>{this.props.userName}</Text>
          <Icon
            style={styles.iconSettings}
            hitSlop={14}
            onPress={::this.onSettingsPress}
            source="icon-settings-24"
            touchStyle={styles.iconSettings_offset}
          />
        </View>
        <OnlineStatus isOnline />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 10,
    borderColor: 'red',
    borderWidth: 1,
  },

  userName: {
    fontSize: 24,
  },

  iconSettings: {
    color: '$pe_icons_color',
    fontSize: 16,
    height: 16,
    width: 16,
    borderColor: 'red',
    borderWidth: 1,
  },

  iconSettings_offset: {
    marginTop: 7,
    marginRight: 10,
  },

  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});