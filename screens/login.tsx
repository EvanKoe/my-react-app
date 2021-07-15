import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { colors, icons } from '../Globals';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MUT = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    session {
      logIn(
        email: $email
        password: $password
      ) {
        result {
          token
        }
      }
    }
  }
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPswd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [login] = useMutation(MUT, { variables: { email, password } });

  const makeQuery = async () => {
    if (email)
    setErrorMsg('Loading, please wait ...')
    const {data, loading, error} = await login({
      variables : {
        email: email.toLowerCase(),
        password: password
      }
    });

    console.log({data}.data.session.logIn.result.token);

    if (error) {
      setErrorMsg('Error');
      throw error;
    }
    const token = await AsyncStorage.setItem(
      'auth',
      {data}.data.session.logIn.result.token.toString()
    );
    setErrorMsg('Logged in !')
    navigation.navigate('Index')
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}> Title Login </Text>
      <TextInput
        style={styles.textInput}
        placeholder='Your email'
        placeholderTextColor={colors.primaryLight}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Your password'
        placeholderTextColor={colors.primaryLight}
        onChangeText={(text) => setPswd(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => makeQuery()}
      >
        <Text style={{ color: colors.white, fontSize: 20 }}> Log in </Text>
      </TouchableOpacity>
      <Text> { errorMsg } </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    color: colors.primaryDark,
    fontSize: 18
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    marginVertical: 20,
    alignSelf: 'center'
  },
  title: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 30
  }
});

export default Login;
