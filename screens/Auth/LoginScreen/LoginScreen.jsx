import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  TextInput,
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
import { authSignInUser } from '../../../redux/auth/authOperations';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { errorLogin } = useSelector((state) => state.auth);
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const vertical = width < 600;

  function onSubmit() {
    if (!state.email || !state.password) {
      Vibration.vibrate();
      Alert.alert('Увага', 'Заповніть всі поля');
      return;
    }
    //  if (!validator.isEmail(state.email.trim())) {
    //    Vibration.vibrate();
    //    Alert.alert('Увага', 'Некоректний пароль, використовуйте приклад name@bar.com');
    //    return;
    //  }
    if (state.password.trim().length < 8) {
      Vibration.vibrate();
      Alert.alert('Увага', 'Пароль має бути мінімум 8 сивмолів');
      return;
    } else {
      authSignInUser(state)(dispatch);

      if (errorLogin) {
        Vibration.vibrate();
        Alert.alert('Увага', 'Такого користувача не існує');
        return;
      } else {
        Keyboard.dismiss();
        setState(initialState);
      }
    }
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
            paddingTop: 32,
            paddingBottom: vertical ? 92 : 16,
          }}
        >
          <View>
            <Text
              style={{
                ...globalStyle.mainTitle,
                ...styles.title,
              }}
            >
              Увійти
            </Text>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputs}>
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
                maxLength={16}
                value={state.password}
                onChange={(value) => {
                  setState((prevState) => ({ ...prevState, password: value }));
                }}
                withSecurity
              />
            </View>
          </KeyboardAvoidingView>
          <View style={{ marginBottom: 16 }}>
            <CustomButton text={'Зареєструватися'} onPress={onSubmit} />
          </View>

          <TouchableOpacity
            style={styles.link}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Немає акаунта? <Text style={styles.textMod}>Зареєструватися</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
