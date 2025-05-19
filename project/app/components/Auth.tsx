import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../../lib/supabase.js'
import { Button as RNEButton, Input as RNEInput, Icon as RNEIcon } from '@rneui/themed';

const authStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  verticallySpaced: {
    marginBottom: 20,
  },
  mt20: {
    marginTop: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
  },
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [])

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={authStyles.container}>
      <View style={[authStyles.verticallySpaced, authStyles.mt20]}>
        <RNEInput
          leftIcon={<RNEIcon name="envelope" type="font-awesome" />}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          inputContainerStyle={authStyles.inputContainer}
        />
      </View>
      <View style={authStyles.verticallySpaced}>
        <RNEInput
          leftIcon={<RNEIcon name="lock" type="font-awesome" />}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          inputContainerStyle={authStyles.inputContainer}
        />
      </View>
      <View style={[authStyles.verticallySpaced, authStyles.mt20]}>
        <RNEButton
          title="Sign in"
          disabled={loading}
          onPress={signInWithEmail}
          containerStyle={authStyles.buttonContainer}
          type="solid"
          loading={loading}
        />
      </View>
      <View style={authStyles.verticallySpaced}>
        <RNEButton
          title="Sign up"
          disabled={loading}
          onPress={signUpWithEmail}
          type="solid"
          containerStyle={authStyles.buttonContainer}
          loading={loading}
        />
      </View>
    </View>
  )
}