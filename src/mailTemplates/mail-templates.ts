export class MailTemplateForOrderConfirmation {
  static orderConfirmationBodyForUser =
    'Your order has been placed successfully';
  // static orderConfirmationTemplatePathForUser = `https://drippy-dev-posters.s3.ap-south-1.amazonaws.com/admin/mailTemplates/orderConfirmationTemplate.html`;
  static orderConfirmationTemplatePathForUser = `src/mailTemplates/orderConfirmationTemplate.html`;
  static orderConfirmationBodyForAdmin =
    'Your order has been placed successfully';
  static orderConfirmationTemplatePathForAdmin = `src/mailTemplates/orderConfirmationTemplate.html`;

  static orderConfirmationBodyForCreator =
    'Your order has been placed successfully';
  static orderConfirmationTemplatePathForCreator = `src/mailTemplates/orderConfirmationTemplate.html`;
}

export class MailTemplateForOrderItemStatusChange {
  static orderItemStatusChangeBodyForUser =
    'Your order item status has been changed ';
  static orderItemStatusChangeTemplatePathForUser =
    '/mailTemplates/orderItemStatusChangeTemplate.html';

  static orderItemStatusChangeBodyForAdmin =
    'Your order item status has been changed';
  static orderItemStatusChangeTemplatePathForAdmin =
    '/mailTemplates/orderItemStatusChangeTemplate.html';

  static orderItemStatusChangeBodyForCreator =
    'Your order item status has been changed';
  static orderItemStatusChangeTemplatePathForCreator =
    '/mailTemplates/orderItemStatusChangeTemplate.html';
}
