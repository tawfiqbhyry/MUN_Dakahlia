<template>
  <div :class="fieldName">
    <div class="w-full flex justify-center items-center mt-4">
      <input
        :type="fieldType"
        :name="fieldName"
        :id="fieldName"
        :placeholder="'enter ' + fieldName"
        class="border rounded-lg px-4 py-2 max-w-full"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    modelValue: {
      type: String,
      required: true,
      default: "",
    },
    fieldType: {
      type: String,
      required: true,
      default: "text",
    },
    fieldName: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    return { updateValue };
  },
};
</script>

<style>
</style>