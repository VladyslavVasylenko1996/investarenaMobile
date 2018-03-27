import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import AvatarUser from '../core/AvatarUser';
import HeaderRight from './HeaderRight';
import { styles } from './styles';
import PropTypes from 'prop-types';

const propTypes = {
    createPost: PropTypes.func.isRequired,
    currentUserAvatar: PropTypes.shape({
        small: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string
    }),
    currentUserName: PropTypes.string.isRequired,
};

class CreatePostScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Create Post',
            headerTintColor: 'white',
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerRight: <HeaderRight {...navigation} />
        }
    };
    constructor (props) {
        super (props);
        this.state = { content: '', contentValid: false };
    }
    componentDidMount () {
        const { createPost } = this.props;
        this.props.navigation.setParams({ createPost });
    }
    handleOnChangeContent = (content) => {
        const { params } = this.props.navigation.state;
        const contentValid = !!(content.length > 0 || (params && params.selectedPhoto));
        this.props.navigation.setParams({ content, contentValid });
        this.setState({ content, contentValid });
    };
    render () {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.currentUserInfoWrap}>
                    <AvatarUser
                        size='small'
                        componentProps={{
                            containerStyle: styles.currentUserAvatar,
                            rounded: true,
                            activeOpacity: 0.7 }}/>
                    <Text style={styles.currentUserName}>{this.props.currentUserName}</Text>
                </View>
                <TextInput
                    style={styles.inputWrap}
                    placeholder='What do you think?'
                    autogrow={true}
                    multiline={true}
                    maxLength={64000}
                    onChangeText={this.handleOnChangeContent}
                    value={this.state.content}/>
                <View style={styles.imagesWrap}>
                    {params && params.selectedPhoto && <Image style={styles.image} source={{uri: params.selectedPhoto.node.image.uri}}/>}
                </View>
            </ScrollView>
        )
    }
}

CreatePostScreen.propTypes = propTypes;

export default CreatePostScreen;
