<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Github, Chrome } from 'lucide-vue-next'

const emit = defineEmits<{
  emailSubmitted: [email: string]
}>()

const { signIn } = useAuth()
const isLoading = ref(false)
const error = ref<string | null>(null)

// Custom email validation function
const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  
  return true
}

// Setup form with vee-validate
const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    email: '',
  },
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})

// Handle email submission
const onSubmit = handleSubmit(async (values) => {
  // Validate email before submission
  const validationResult = validateEmail(values.email)
  if (validationResult !== true) {
    error.value = validationResult
    return
  }

  try {
    isLoading.value = true
    error.value = null

    await signIn.email(
      {
        email: values.email,
      },
      {
        onSuccess: () => {
          console.log('Verification email sent')
          emit('emailSubmitted', values.email)
        },
        onError: (ctx) => {
          error.value = ctx.error.message || 'Failed to send verification email'
        },
      }
    )
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    isLoading.value = false
  }
})

// Social sign-in handlers
const signInWithGithub = async () => {
  try {
    await signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    })
  } catch (err: any) {
    error.value = err.message || 'GitHub sign-in failed'
  }
}

const signInWithGoogle = async () => {
  try {
    await signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  } catch (err: any) {
    error.value = err.message || 'Google sign-in failed'
  }
}
</script>

<template>
  <div class="w-full max-w-md space-y-6">
    <!-- Header -->
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        Authentication
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your email to continue
      </p>
    </div>

    <!-- Social Buttons -->
    <div class="space-y-3">
      <Button
        variant="outline"
        class="w-full"
        type="button"
        @click="signInWithGithub"
      >
        <Github class="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>

      <Button
        variant="outline"
        class="w-full"
        type="button"
        @click="signInWithGoogle"
      >
        <Chrome class="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>

    <!-- Separator -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <Separator class="w-full" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          or continue with email
        </span>
      </div>
    </div>

    <!-- Email Form -->
    <form class="space-y-4" @submit="onSubmit">
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="mail@example.com"
          :disabled="isLoading"
          @blur="() => {
            const result = validateEmail(email)
            if (result !== true) {
              error.value = result
            } else {
              error.value = null
            }
          }"
        />
        <p v-if="errors.email" class="text-sm text-destructive">
          {{ errors.email }}
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="error && !errors.email" class="text-sm text-destructive">
        {{ error }}
      </div>

      <Button type="submit" class="w-full" :disabled="isLoading">
        <span v-if="isLoading">Sending...</span>
        <span v-else>Continue with email</span>
      </Button>
    </form>
  </div>
</template>