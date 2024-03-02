import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';

import React, { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = "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";
function App() {
  const [prompt, setPrompt] = useState("puppy and duck");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function generateImages() {
    setIsLoading(true);

    try {
      const requestData = {
        prompt: prompt,
        n: 2,
        size: "256x256", // Set the desired image size here
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        requestData,
        {
          headers: headers,
        }
      );

      setGeneratedImages(response.data.data);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5E2C8',
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter a prompt"
        onChangeText={newText => setPrompt(newText)}
        defaultValue={prompt}
      />
      <Text>{`
  
  `}</Text>
      <Pressable
        title={isLoading ? "Generating..." : "Generate Images"}
        disabled={isLoading}
        onPress={() => generateImages()}
        style={styles.button}
      >
        <Text style={styles.buttontext}>{isLoading ? "Generating..." : "Generate Images"}</Text>
      </Pressable>
      <Text>{`


  `}</Text>

{isLoading && <p className="mt-4 text-gray-600">Loading...</p>}
      {generatedImages.length > 0 && (
        <div className="mt-4">
          {generatedImages.map((image, index) => (
            <div key={index} className="mt-4">
              <img
                src={image.url}
                alt={`Generated Image ${index}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: '#271502',
  },
  loadingText: {
    color: '#fff',
  },
  resultText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default App;