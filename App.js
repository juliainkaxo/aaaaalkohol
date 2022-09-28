import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Switch } from 'react-native';
import { useState } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import {darkTheme, lightTheme} from './theme';
import NumericInput from 'react-native-numeric-input';


export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);

  const [gender, setGender] = useState('male');
  const [result, setResult] = useState(0);
  const [isOn, setIsOn] = useState(false);


  function handleSubmit(e) {
    // e.preventDefault();
    let alcohollevel = 0;
    let litrat = bottles * 0.33;
    let grammat = litrat * 8 * 4.5;
    let burning = weight / 10;
    let gramasleft = grammat - (burning * time);

    if (gender === 'male') {
      alcohollevel = gramasleft / (weight * 0.7);
    }
    else {
      alcohollevel = gramasleft / (weight * 0.6);
    }
    setResult(alcohollevel);
  }
  
    const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  return (
    // NÄKYMÄ SIVULLA!!! 
    <View style={isOn ? lightTheme.container : darkTheme.container}> 

    <Switch
      onChange={ () => setIsOn(prev => !prev ) }
      value={isOn}
      thumbColor= 'blue'
      trackColor={{false: 'yellow', true: 'black'}}
    />
    
      <View>
      <Text style={isOn ? lightTheme.text : darkTheme.text}>Alcometer</Text>
      <StatusBar style="auto" />
      </View>

      <View>
        <Text style={isOn ? lightTheme.lowerHeadings : darkTheme.lowerHeadings}>Weight</Text>
          <TextInput 
            style={isOn ? lightTheme.input : darkTheme.input}
            onChangeText={text => setWeight(text)}
            placeholder="Weight (kg)"
            keyboardType='numeric'></TextInput>
      </View>
      <View>
        <Text style={isOn ? lightTheme.lowerHeadings : darkTheme.lowerHeadings}>Bottles</Text>
          <NumericInput onChange={v => setBottles(v)}/>
      </View>

      <View>
        <Text style={isOn ? lightTheme.lowerHeadings : darkTheme.lowerHeadings}>Hours</Text>
          <NumericInput onChange={v => setTime(v)}/>
      </View>

    
      <View>
        <Text style={isOn ? lightTheme.lowerHeadings : darkTheme.lowerHeadings}>Gender</Text>
        <RadioForm
        style={isOn ? lightTheme.radio : darkTheme.radio}
        buttonSize={30}
        radio_props={genders}
        initial={0}
        onPress={(value) => { setGender(value) }}/>
      </View>  
      <Text style={isOn ? lightTheme.result : darkTheme.result}>{result.toFixed(2)}</Text>
      <Button onPress={handleSubmit} title="Calculate">{result}</Button>

    </View>
  );
}