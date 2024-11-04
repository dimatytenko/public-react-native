import { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import { styles } from './styles';
import { globalStyle } from '../../../styles/global';
import CustomButton from '../../../components/CustomButton';

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({ latitude: 1, longitude: 1 });
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [permissionMediaLibraryResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const isFocused = useIsFocused();
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [photo, setPhoto] = useState('');
  const [comment, setComment] = useState('');
  const [place, setPlace] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.containerCameraPerm}>
        <Text style={styles.messageCameraPerm}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    console.log('takePhoto');
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      let location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setPrevPhoto(uri);
      setLocation(coords);
    }
  };

  const deletePhoto = async () => {
    setPrevPhoto(null);
  };

  const downloadPhoto = async (uri) => {
    await MediaLibrary.createAssetAsync(uri);

    setPhoto(uri);
    setPrevPhoto(null);
  };

  // const uploadPostToServer = async () => {
  //   const currentPost = {
  //     photo,
  //     comment,
  //     countComments: 0,
  //     place,
  //     location,
  //     userId,
  //     nickName,
  //     countLike: [],
  //     date: new Date(),
  //     id: '',
  //   };

  //   console.log('currentPost', currentPost);
  // };

  const sendPost = () => {
    console.log('sendPost');
    if (!photo) {
      return;
    }
    console.log('photo', photo);
    console.log('comment', comment);
    console.log('place', place);
    console.log('location', location);
    setPhoto('');
    setComment('');
    setPlace('');
    setLocation({ latitude: 1, longitude: 1 });
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <ScrollView>
      <View
        style={{
          ...globalStyle.screenContainer,
          ...styles.container,
        }}
      >
        <View style={styles.cameraWrap}>
          {isFocused && (
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <TouchableOpacity
                onPress={toggleCameraFacing}
                activeOpacity={0.5}
                style={styles.flipCamera}
              >
                <MaterialIcons name="flip-camera-ios" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePhoto}
                activeOpacity={0.5}
                style={styles.snapContainer}
              >
                <Entypo name="camera" size={24} color="#ffffff" />
              </TouchableOpacity>
            </CameraView>
          )}
        </View>

        {(prevPhoto || photo) && (
          <View style={styles.takePhotoContainer}>
            <Image style={styles.image} source={{ uri: prevPhoto || photo }}></Image>
            <View style={styles.boxPermissions}>
              {prevPhoto && (
                <>
                  <TouchableOpacity onPress={() => downloadPhoto(prevPhoto)} activeOpacity={0.5}>
                    <Text
                      style={{
                        ...globalStyle.placeholder,
                        ...styles.downloadButton,
                      }}
                    >
                      Завантажити фото
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={deletePhoto} activeOpacity={0.5}>
                    <Text
                      style={{
                        ...globalStyle.placeholder,
                        ...styles.downloadButton,
                      }}
                    >
                      Видалити фото
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}

        <View style={styles.commentInputView}>
          <TextInput
            style={{
              ...styles.input,
              ...globalStyle.mainText,
            }}
            onChangeText={setComment}
            value={comment}
            placeholder="Назва..."
            placeholderTextColor={globalStyle.colors.fontSecondary}
          />
        </View>
        <View style={styles.placeInputView}>
          <TextInput
            style={{
              ...styles.input,
              ...globalStyle.mainText,
              paddingLeft: 28,
            }}
            onChangeText={setPlace}
            value={place}
            placeholder="Місцевість..."
            placeholderTextColor={globalStyle.colors.fontSecondary}
          />
          <View style={styles.iconLocation}>
            <Ionicons name="location-outline" size={24} color={globalStyle.colors.fontSecondary} />
          </View>
        </View>
        <View style={styles.boxButton}>
          <CustomButton onPress={sendPost} text={'Публікувати'}></CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreatePostsScreen;
