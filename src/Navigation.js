import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons desde expo/vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importa MaterialCommunityIcons desde expo/vector-icons
import { AntDesign } from '@expo/vector-icons';

// Importa las pantallas
import ProfileScreen from './Pantallas/ProfileScreen';
import OpenAiScreen from './Pantallas/OpenAiScreen';
import ListScreen from './Pantallas/ListScreen';
import PdfScreen from './Pantallas/PdfScreen';

// Crea el navegador de pestañas
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Icono de perfil
          } else if (route.name === 'OpenAI') {
            iconName = focused ? 'brain' : 'brain'; // Icono de OpenAI
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Listen') {
            iconName = focused ? 'form' : 'form'; // Icono de lista
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Pdf') {
            iconName = focused ? 'document-text' : 'document-text-outline'; // Icono de PDF
          }

          // Devuelve el componente de icono
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='OpenAI' component={OpenAiScreen} />
      <Tab.Screen name='Listen' component={ListScreen} />
      <Tab.Screen name='Pdf' component={PdfScreen} />
    </Tab.Navigator> 
  );
}

export default function Navigation(){
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
