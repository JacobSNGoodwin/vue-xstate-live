import { assign, createMachine } from "xstate";

const incCount = assign({
  count: ctx => ctx.count + ctx.incVal
});

const decCount = assign({
  count: ctx => ctx.count - ctx.incVal
});

const updateIncVal = assign({
  incVal: (_, event) => event.incVal
});

const counterMachine = createMachine(
  {
    id: "counter",
    initial: "active",
    context: {
      count: 0,
      incVal: 1
    },
    states: {
      active: {
        on: {
          TOGGLE: "inactive",
          INCREMENT: {
            actions: ["incCount"]
          },
          DECREMENT: {
            actions: ["decCount"]
          },
          UPDATE_INC_VAL: {
            actions: ["updateIncVal"]
          }
        }
      },
      inactive: {
        on: {
          TOGGLE: {
            target: "active"
          }
        }
      }
    }
  },
  {
    actions: {
      incCount,
      decCount,
      updateIncVal
    }
  }
);

export default counterMachine;
