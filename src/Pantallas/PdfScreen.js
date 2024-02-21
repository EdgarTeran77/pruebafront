import React, { useState, useRef } from 'react';
import { View, Button, Text, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const ChatMessage = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [pdfText, setPdfText] = useState(''); // Nuevo estado para almacenar el texto del PDF
  const scrollViewRef = useRef();

  const enviarPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (!result.cancelled) {
        const fileUri = result.assets[0].uri;
        console.log('PDF seleccionado:', result);
        console.log('URI del PDF:', fileUri);

        // Obtener el archivo como bytes
        const pdfBytes = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

        // Crear FormData y adjuntar el archivo como bytes
        const formData = new FormData();
        formData.append('pdf_file', {
          uri: fileUri,
          name: 'pdf_file',
          type: 'application/pdf',
          data: pdfBytes,
        });

        // Realizar la solicitud POST al backend
        const response = await axios.post('http://192.168.237.37:5000/cargar_pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('El Archivo fue enviado correctamente al backend');
          setPdfText(response.data.pdf_text); // Guardar el texto del PDF en el estado
          // Agregar mensaje al chat
          console.log(pdfText)
          setChatMessages(prevMessages => [...prevMessages, 'PDF enviado correctamente al backend']);
        } else {
          console.log('Error al enviar el PDF al backend:', response.statusText);
          // Manejar el error si la solicitud no fue exitosa
          Alert.alert('Error', 'Hubo un problema al enviar el PDF al backend');
        }
      } else {
        console.log('El usuario canceló la selección del PDF');
      }
    } catch (error) {
      console.log('Error al seleccionar el PDF:', error);
      // Manejar el error si ocurre un problema al seleccionar el PDF
      Alert.alert('Error', 'Hubo un problema al seleccionar el PDF');
    }
  };

  const enviarPregunta = async () => {
    try {
      console.log('Pregunta enviada:', pregunta); // Imprimir la pregunta en la consola
  
      // Formatear los datos como x-www-form-urlencoded
      const data = new URLSearchParams();
      data.append('pregunta', pregunta);
      data.append('pdf_text', pdfText);
  
      const response = await axios.post('http://192.168.237.37:5000/hacer_pregunta', data);
      const respuesta = response.data.respuesta;
      console.log('Respuesta recibida:', respuesta); // Imprimir la respuesta en la consola
  
      // Agregar pregunta y respuesta al chat
      setChatMessages(prevMessages => [...prevMessages, pregunta, respuesta]);
  
      // Limpiar el área de entrada de texto
      setPregunta('');
  
      // Desplazar hacia abajo para mostrar la última respuesta
      scrollViewRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error al enviar la pregunta:', error.message);
      // Manejar el error si la solicitud no fue exitosa
      Alert.alert('Error', 'Hubo un problema al enviar la pregunta al backend');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContentContainer}
      >
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Selecionar Archivo" onPress={enviarPDF} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Chatea con migo...."
          value={pregunta}
          onChangeText={setPregunta}
          multiline
        />
        <Button title="Enviar" onPress={enviarPregunta} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default ChatScreen;
