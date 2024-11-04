import { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Alert,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyle } from '../../../styles/global';
import { styles } from '../styles';
import CustomButton from '../../../components/CustomButton';
import Input from '../../../components/Input';
import Avatar from '../../../components/Avatar';

const initialState = {
  nickName: '',
  email: '',
  password: '',
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [state, setState] = useState(initialState);
  const [isAvatar, setIsAvatar] = useState(true);
  const vertical = width < 600;

  function onSubmit() {
    if (Object.values(state).some((value) => !value)) {
      Vibration.vibrate();
      Alert.alert('Увага', 'Заповніть всі поля');
      return;
    }

    console.log('state', state);
    setState(initialState);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground style={styles.image} source={require('../../../assets/images/main-BG.png')}>
        <View
          style={{
            ...styles.page,
            ...globalStyle.container,
            paddingTop: 92,
            paddingBottom: vertical ? 92 : 16,
          }}
        >
          <Avatar />
          <View>
            <Text
              style={{
                ...globalStyle.mainTitle,
                ...styles.title,
              }}
            >
              Реєстрація
            </Text>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputs}>
              <Input
                placeholder={'Логін'}
                maxLength={8}
                value={state.nickName}
                onChange={(value) => {
                  setState((prevState) => ({ ...prevState, nickName: value }));
                }}
              />

              <Input
                placeholder={'Адреса электронної пошти'}
                maxLength={16}
                value={state.email}
                onChange={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
              />

              <Input
                placeholder={'Пароль'}
                maxLength={12}
                value={state.password}
                onChange={(value) => {
                  setState((prevState) => ({ ...prevState, password: value }));
                }}
                withSecurity
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <CustomButton text={'Зареєструватися'} onPress={onSubmit} />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={styles.link}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              Уже маєте акаунт? <Text style={styles.textMod}>Увійти</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
