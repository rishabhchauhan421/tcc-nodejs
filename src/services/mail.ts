import nodeMailer from 'nodemailer';
import Handlebars from 'handlebars';
import { promises as fs } from 'fs';
import * as path from 'path';
import { db } from '../db/prismaDb';
import {
  EmailType,
  Order,
  OrderStatus,
  ProductStatus,
  User,
} from '@prisma/client';
import { NotFoundError } from '../errors/not-found-error';
import { toTitleCase } from '../utils/utils';
import { ProductUtils } from '../utils/productUtils';

type TmailOptions = {
  from: string;
  to: string;
  subject: string;
  body: string;
  html: string;
};

// Registering the "gt" helper to compare values
Handlebars.registerHelper('gt', function (a, b) {
  return a > b;
});

class OrderItemStatusMail {
  static orderItemStatusChangeBodyForUser =
    'Your order item status has been changed';
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

// export const emailRouter = router({
//   // sendOrderConfirmationMail: publicProcedure
//   //   .input(orderConfirmationMailValidator)
//   //   .mutation(async ({ input }) => {
//   //     const { orderId } = input;

//   //   }),
//   sendUserSignupConfirmationMail: publicProcedure
//     .input(signupConfirmationMailValidator)
//     .mutation(async ({ input }) => {
//       const { userId } = input;

//       const user = await db.user.findUnique({
//         where: {
//           id: userId,
//         },
//       });
//       if (!user)
//         throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });

//       const body = 'Your user Id has been created successfully';
//       const templatePath =
//         '/public/mailTemplates/userSignUpConfirmationTemplate.html';

//       try {
//         const __dirname = path.resolve();
//         const filePath = path.join(__dirname, templatePath);
//         console.log({ filePath });
//         const source = (
//           await fs.readFile(process.cwd() + templatePath, 'utf8')
//         ).toString();

//         // const source = fs.readFileSync(filePath, 'utf-8').toString();
//         const template = Handlebars.compile(source);
//         const name = user.firstName;

//         const data = {
//           name: name,
//         };

//         const htmlToSend = template(data);
//         MailRouter.sendMail({
//           toEmail: 'rshbhchauhan@gmail.com',
//           subject: 'Welcome to The Custom Crow',
//           body: body,
//           html: htmlToSend,
//           emailType: EmailType.USERSIGNUP,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     }),
//   sendProductStatusChangeMail: publicProcedure
//     .input(ProductStatusChangeMailValidator)
//     .mutation(async ({ input }) => {
//       const { productId } = input;

//       const product = await db.product.findUnique({
//         where: {
//           productId: productId,
//         },
//         include: {
//           user: true,
//         },
//       });
//       if (!product)
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Product not found',
//         });

//       const body = 'Your product status has been changed';
//       const templatePath = '/mailTemplates/productStatusChangeTemplate.html';

//       try {
//         const __dirname = path.resolve();
//         const filePath = path.join(__dirname, templatePath);
//         console.log({ filePath });

//         const source = (
//           await fs.readFile(process.cwd() + templatePath, 'utf8')
//         ).toString();
//         // const source = fs.readFileSync(filePath, 'utf-8').toString();
//         const template = Handlebars.compile(source);
//         const productTitle = ProductUtils.getProductTitle(product);

//         const data = {
//           name: product.user?.firstName,
//           status: product.productStatus,
//           productTitle: productTitle,
//           productStatus: ProductUtils.getProductStatusText(
//             product.productStatus
//           ),
//         };

//         const htmlToSend = template(data);
//         MailRouter.sendMail({
//           toEmail: 'rshbhchauhan@gmail.com',
//           subject: 'Product Status Change',
//           body: body,
//           html: htmlToSend,
//           emailType: EmailType.PRODUCTSTATUSCHANGE,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     }),
// });

export class MailRouter {
  static async sendOrderItemStatusEmail({
    orderItemId,
    emailType,
  }: {
    orderItemId: string;
    emailType: EmailType;
  }) {
    const orderItemWithDetails = await db.orderItem.findUnique({
      where: {
        orderItemId: orderItemId,
      },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        product: true,
      },
    });

    if (!orderItemWithDetails) throw new NotFoundError();
    const variant = await db.variant.findUnique({
      where: {
        variantId: orderItemWithDetails.variantId,
      },
    });

    //Sending Mail to User
    const orderItemStatusChangeBodyForUser =
      OrderItemStatusMail.orderItemStatusChangeBodyForUser;
    const orderItemStatusChangeTemplatePathForUser =
      OrderItemStatusMail.orderItemStatusChangeTemplatePathForUser;

    //Sending Mail to Admin
    const orderItemStatusChangeBodyForAdmin =
      OrderItemStatusMail.orderItemStatusChangeBodyForAdmin;
    const orderItemStatusChangeTemplatePathForAdmin =
      OrderItemStatusMail.orderItemStatusChangeTemplatePathForAdmin;

    //Sending Mail to Creator for his Order
    const orderItemStatusChangeBodyForCreator =
      OrderItemStatusMail.orderItemStatusChangeBodyForCreator;
    const orderItemStatusChangeTemplatePathForCreator =
      OrderItemStatusMail.orderItemStatusChangeTemplatePathForCreator;

    try {
      const __dirnameForUser = path.resolve();
      const filePathForUser = path.join(
        __dirnameForUser,
        orderItemStatusChangeTemplatePathForUser
      );
      // const sourceForUser = fs
      //   .readFile(
      //     process.cwd() + orderItemStatusChangeTemplatePathForUser,
      //     'utf8'
      //   )
      //   .toString();
      // console.log(sourceForUser);
      // const filePathForUser = '/mailTemplates/orderItemStatusChangeTemplate.html';
      console.log({ filePathForUser });
      const sourceForUser = fs.readFile(filePathForUser, 'utf-8').toString();

      console.log({ sourceForUser });
      console.log('sourceForUser showing above');
      const templateForUser = Handlebars.compile(sourceForUser);

      const __dirnameForAdmin = path.resolve();
      const filePathForAdmin = path.join(
        __dirnameForAdmin,
        orderItemStatusChangeTemplatePathForAdmin
      );
      const sourceForAdmin = fs
        .readFile(
          process.cwd() + orderItemStatusChangeTemplatePathForAdmin,
          'utf8'
        )
        .toString();
      // const sourceForAdmin = fs.readFileSync(filePathForAdmin, 'utf-8').toString();
      const templateForAdmin = Handlebars.compile(sourceForAdmin);

      const __dirnameForCreator = path.resolve();
      const filePathForCreator = path.join(
        __dirnameForCreator,
        orderItemStatusChangeTemplatePathForCreator
      );
      const sourceForCreator = fs
        .readFile(
          process.cwd() + orderItemStatusChangeTemplatePathForCreator,
          'utf8'
        )
        .toString();
      // const sourceForCreator = fs.readFileSync(filePathForCreator, 'utf-8').toString();
      const templateForCreator = Handlebars.compile(sourceForCreator);

      const orderItemStatusChangeData = {
        customerName: toTitleCase(orderItemWithDetails.order.firstName),
        productName: toTitleCase(
          ProductUtils.getProductTitleForVariant({
            variant: variant!,
            product: orderItemWithDetails.product,
          })
        ),
        quantity: orderItemWithDetails.quantity,
        status: toTitleCase(orderItemWithDetails.orderItemStatus),
        templateTitle: 'Order Status Changed',
      };

      console.log({ orderItemStatusChangeData });

      const htmlToSendForUser = templateForUser(orderItemStatusChangeData);
      MailRouter.sendMail({
        toEmail: orderItemWithDetails.order.email,
        subject: `Order #${orderItemWithDetails.order.orderNumber} Changed`,
        body: orderItemStatusChangeBodyForUser,
        html: htmlToSendForUser,
        emailType,
      });

      const htmlToSendForAdmin = templateForAdmin(orderItemStatusChangeData);
      MailRouter.sendMail({
        toEmail: 'rshbhchauhan@gmail.com',
        subject: `Order #${orderItemWithDetails.order.orderNumber} Changed`,
        body: orderItemStatusChangeBodyForAdmin,
        html: htmlToSendForAdmin,
        emailType,
      });

      // const htmlToSendForCreator = templateForCreator(orderItemStatusChangeData);
      // MailRouter.sendMail({ toEmail: "rshbhchauhan@gmail.com", subject: `Order #${orderItemWithDetails.order.orderNumber} Changed`,  body: orderConfirmationBodyForCreator, html: htmlToSendForCreator, emailType: getEmailType(orderItemWithDetails.orderItemStatus)})
    } catch (err) {
      console.error(err);
    }
  }

  static async sendMail({
    toEmail,
    subject,
    body,
    html,
    emailType,
  }: {
    toEmail: string;
    subject: string;
    body: string;
    html: string;
    emailType: EmailType;
  }) {
    // console.log({ toEmail, subject, body, html })
    console.log('creating transporter');
    var transporter = nodeMailer.createTransport({
      host: process.env.ZOHO_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_NOREPLY_EMAIL,
        pass: process.env.ZOHO_NOREPLY_PASSWORD,
      },
    });

    const server = await new Promise((resolve, reject) => {
      // verify connection configuration
      console.log('verifying transporter');
      transporter.verify(function (error: any, success: any) {
        if (success) {
          console.log('Server is ready to take our messages');
          resolve(success);
        }
        console.error(error);
        reject(error);
      });
    });
    if (!server) {
      console.log({ error: 'Error failed' });
      return { success: false };
    }

    console.log('creating mail options');
    const mailOptions: TmailOptions = {
      from: process.env.ZOHO_NOREPLY_EMAIL!,
      to: toEmail,
      subject: subject,
      body: body,
      html: html,
    };

    const success = await new Promise((resolve, reject) => {
      console.log('sending mail');

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.error(error);
          reject(error);
          return { success: false };
        } else {
          resolve(info);
          // console.log("email db record creation started")
          const email = await db.email.create({
            data: {
              toEmail: toEmail,
              fromEmail: process.env.ZOHO_NOREPLY_EMAIL!,
              subject: subject,
              body: body,
              type: emailType,
            },
          });
          console.log('email sent successfully');
          console.log({ email });
          return { success: true };
        }
      });
    });

    if (!success) {
      console.log({ error: 'Error sending email' });
    }
    console.log({ success: success });
  }
}
