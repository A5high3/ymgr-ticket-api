export default {
  type: "object",
  properties: {
    requestIds: { type: 'string' }
  },
  required: ['requestIds']
} as const;
