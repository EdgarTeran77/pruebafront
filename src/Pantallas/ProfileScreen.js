import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  const facebook = <FontAwesome name="facebook" size={30} color="white" />;
  const twitter = <FontAwesome name="twitter" size={30} color="white" />;
  const instagram = <FontAwesome name="instagram" size={30} color="white" />;
  const linkedin = <FontAwesome name="linkedin" size={30} color="white" />;
  const tiktok = <FontAwesome name="youtube-play" size={30} color="white" />;
  const tiktok2 = <FontAwesome name="ellipsis-h" size={30} color="white" />;

  const handleOpenURL = async (url) => {
    // Verifica si el enlace se puede abrir
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Abre el enlace
      await Linking.openURL(url);
    } else {
      console.log(`No se puede abrir el enlace: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Portada */}
      <Image
        source={require('../../images/g.jpg')}
        style={styles.coverImage}
      />
      
      {/* Foto de perfil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../images/h.jpeg')}
          style={styles.profileImage}
        />
      </View>

      {/* Nombre del usuario */}
      <Text style={styles.userName}>Edgar Wladimir Teran Moran</Text>

      {/* Redes sociales */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.facebook.com')}>
          {facebook}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.twitter.com')}>
          {twitter}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.instagram.com')}>
          {instagram}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.linkedin.com')}>
          {linkedin}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.youtube.com')}>
          {tiktok}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleOpenURL('https://www.kwai.com/es')}>
          {tiktok2}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 150,
    left: '50%',
    marginLeft: -50, // Half of the profile image width
    borderRadius: 50, // Half of the profile image width/height
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 120,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    backgroundColor: '#4267B2', // Facebook blue color
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
