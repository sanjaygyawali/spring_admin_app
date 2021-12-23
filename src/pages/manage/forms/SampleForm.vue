<template>
  <q-page class="container">
    <r-form
      :mode="mode"
      @success="handleSuccess"
      @error="handleError"
      :schema="schema"
      :post="schema.api"
      id="sample_form"
      v-model="form"
      :notifyError="false"
      ref="sampleForm"
    />

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      schema: {
        api: '/forms/sampleForm',
        redirectTo: '/admin',
        redirectToOnCancel: '/admin/forms',
        columnCount: 12,
        successMessage: 'Successfull',
        schema: [
          {
            id: "full_name",
            component: 'QInput',
            label: 'Full Name',
            span: 12,
            outlined: true,
            dense: true,
            required: true
          },
          {
            id: "dob",
            component: 'QInput',
            label: 'Date of Birth',
            span: 6,
            outlined: true,
            dense: true,
            parseInput: (val) => new Date(val),
            parseValue: (val) => new Date(val),
            // component props:
            mask: '####/##/##',
            placeholder: 'YYYY/MM/DD',
            required: true
          },
          {
            id: "gender",
            component: 'QSelect',
            label: 'Gender',
            span: 6,
            outlined: true,
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Others', value: 'others' },
            ],
            dense: true,
            required: true
          },
          {
            id: "contact",
            component: 'QInput',
            label: 'Contact',
            span: 6,
            outlined: true,
            dense: true,
            required: true
          },
          {
            id: "email",
            component: 'QInput',
            label: 'Email',
            type: "email",
            span: 6,
            outlined: true,
            dense: true,
            required: true
          },
          {
            id: "employment_satus",
            component: 'QInput',
            label: 'Email',
            type: "email",
            span: 6,
            outlined: true,
            dense: true,
            required: true
          },
          {
            id: "remarks",
            component: 'QInput',
            label: 'Any Queries?',
            type: "textarea",
            span: 12,
            outlined: true,
            dense: true,
            required: true
          },
        ]
      },
      mode: "edit",
      form: {}
    }
  },
  methods: {
    handleSuccess() {
      this.$notify({message: 'The operation was successfull!', color: 'positive'})
    },
    handleError() {
      this.$notify({message: 'Error occured!', color: 'negative'})
    }
  }
}
</script>

<style>

</style>
