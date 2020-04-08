<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="submit"
  >
    <v-text-field
      ref="name-input"
      v-model="formData.name"
      label="Name"
      name="name"
      prepend-icon="mdi-account"
      type="text"
      :rules="rules.name"
      required
    />

    <v-text-field
      ref="email-input"
      v-model="formData.email"
      label="Email"
      name="email"
      prepend-icon="mdi-email"
      type="text"
      :rules="rules.email"
      required
    />

    <v-text-field
      ref="password-input"
      v-model="formData.password"
      label="Password"
      name="password"
      prepend-icon="mdi-lock"
      type="password"
      :rules="rules.password"
      required
    />

    <v-layout justify-space-between>
      <v-spacer />
      <v-btn
        type="submit"
        :disabled="!isValid || isLoading"
        :loading="isLoading"
      >
        Signup
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script src="./main.js"></script>
