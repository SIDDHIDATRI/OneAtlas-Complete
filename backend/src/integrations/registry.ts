export const INTEGRATION_REGISTRY = {

  whatsapp: {
    id: "whatsapp",
    displayName: "WhatsApp",
    authType: "api_key",

    triggers: [
      "record_created",
      "record_updated",
      "deal_closed"
    ],

    actions: [
      "send_template_message",
      "send_notification"
    ]
  },

  slack: {
    id: "slack",
    displayName: "Slack",
    authType: "oauth2",

    triggers: [
      "task_overdue",
      "lead_assigned",
      "deal_closed"
    ],

    actions: [
      "send_channel_message",
      "send_dm"
    ]
  },

  gmail: {
    id: "gmail",
    displayName: "Gmail",
    authType: "oauth2",

    triggers: [
      "record_created",
      "order_created"
    ],

    actions: [
      "send_email",
      "create_calendar_event"
    ]
  },

  stripe: {
    id: "stripe",
    displayName: "Stripe",
    authType: "api_key",

    triggers: [
      "payment_created",
      "subscription_created"
    ],

    actions: [
      "create_customer",
      "create_payment"
    ]
  },

  webhook: {
    id: "webhook",
    displayName: "Generic Webhook",
    authType: "webhook_secret",

    triggers: [
      "any_event"
    ],

    actions: [
      "post_payload"
    ]
  }

};