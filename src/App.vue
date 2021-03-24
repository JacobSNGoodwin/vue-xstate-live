<template>
  <h1>A Basic Counter App</h1>
  <div>
    <button @click="send('INCREMENT')" :disabled="state.matches('inactive')">
      Increment
    </button>
    <button @click="send('DECREMENT')" :disabled="state.matches('inactive')">
      Decrement
    </button>
  </div>
  <h3>Count: {{ state.context.count.toFixed(2) }}</h3>

  <div>
    <button @click="send('TOGGLE')">{{ toggleButtonLabel }}</button>
  </div>
  <h3>Current State: {{ state.value }}</h3>

  <h3>Increment by:</h3>
  <div>
    <input
      type="number"
      v-model.number="incVal"
      :disabled="state.matches('inactive')"
    />
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useMachine } from "@xstate/vue";
import counterMachine from "./counterMachine";

export default {
  name: "App",
  setup() {
    const incVal = ref(1);
    const { state, send } = useMachine(counterMachine);

    const toggleButtonLabel = computed(() => {
      const current = state.value; // have to extract value as state is wrapped in vue "ref"
      if (current.matches("active")) {
        return "Inactivate";
      } else if (current.matches("inactive")) {
        return "Activate";
      } else {
        return "I'm kinda impressed you got to this state!";
      }
    });

    watchEffect(() =>
      send({
        type: "UPDATE_INC_VAL",
        incVal: incVal.value || 0
      })
    );

    return {
      state,
      send,
      toggleButtonLabel,
      incVal
    };
  }
};
</script>

<style>
button {
  margin: 0.5em;
}
</style>
