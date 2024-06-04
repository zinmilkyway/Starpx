<script setup lang="ts">
import { HOME_PAGE_ROUTE } from '@/common/router'
import { isEmail, isPasswordValid } from '@/common/validationRules'
import ButtonComponent from '@/components/common/StarpxButton.vue'
import StarpxInput from '@/components/common/StarpxInput.vue'
import IconHiddenPassword from '@/components/icon/IconHiddenPassword.vue'
import IconShowPassword from '@/components/icon/IconShowPassword.vue'
import { useLoading } from '@/composables/common/useLoading'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthBackground from './AuthBackground.vue'
import { useAccountStore } from '@/store/accounts/account'

// todo: i18n
const router = useRouter()

const { setLoading } = useLoading()

const isShowPassword = ref(false)
const invalidAccount = ref(false)

export interface SignInModel {
  username: string
  password: string
}

const { setAccount, handleSignIn } = useAccountStore()

const handleSignInClick = async () => {
  try {
    const { valid } = await validate()
    setLoading(true)
    if (valid) {
      await handleSignIn({
        username: values.username,
        password: values.password
      })
      setAccount(values.username)
      router.push(HOME_PAGE_ROUTE)
    } else {
      invalidAccount.value = true
      throw new Error('Invalid email or password')
    }
  } catch {
    invalidAccount.value = true
  } finally {
    setLoading(false)
  }
}

const toggleShowPassword = () => {
  isShowPassword.value = !isShowPassword.value
}

const schema = { username: isEmail, password: isPasswordValid }

const { values, setFieldValue, validate } = useForm<SignInModel>({
  validationSchema: schema,
  initialValues: {
    username: 'hendrik@starpx.com',
    password: 'StarpxStarpx1!'
  }
})

const handleInput = (field, val) => {
  invalidAccount.value = false
  setFieldValue(field, val.trim())
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <AuthBackground />
    <!-- todo: add config color and classes -->
    <div class="bg-forth bg-opacity-50 rounded-lg flex flex-col items-center justify-center relative h-[500px] xl:m-w-[500px] p-10 gap-8">
      <!-- header -->
      <div class="flex flex-row items-center justify-center py-4 gap-4 w-full rounded-md">
        <img class="w-14" alt="starpx" src="/public/favicon.svg" />
        <span class="text-4xl font-bold text-zinc-100">StarPX</span>
      </div>
      <!-- form body -->
      <div class="flex flex-col gap-3 w-5/6 md:min-w-[400px]">
        <div class="flex flex-col gap-2">
          <span class="text-md font-bold text-zinc-100">Enter your username</span>
          <StarpxInput
            :model-value="values.username"
            @update:model-value="(val) => handleInput('username', val?.toString())"
            type="text"
            placeholder="example@starpx.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-md font-bold text-zinc-100">Enter Your Password</span>
          <StarpxInput
            :model-value="values.password"
            @update:model-value="(val) => handleInput('password', val?.toString())"
            :type="isShowPassword ? 'text' : 'password'"
            placeholder="Password"
            @click-icon-right="toggleShowPassword"
          >
            <template v-slot:icon>
              <IconHiddenPassword v-if="isShowPassword" />
              <IconShowPassword v-else />
            </template>
          </StarpxInput>
        </div>
        <div class="h-2">
          <div v-if="invalidAccount">
            <span class="text-red-400 font-bold text-xs" v-if="!values.username || !values.password">Please enter all fields</span>
            <span class="text-red-400 font-bold text-xs" v-else>Invalid email or password</span>
          </div>
        </div>
        <ButtonComponent @click="handleSignInClick" label="Sign In" class="mt-2" />
      </div>
      <!-- footer -->
      <div class="flex flex-row items-center justify-center py-4 gap-4">
        <span class="text-xs font-bold text-zinc-100">© 2024 starpx, Inc 5900 Balcones Drive Austin TX 73781</span>
      </div>
    </div>
  </div>
</template>
