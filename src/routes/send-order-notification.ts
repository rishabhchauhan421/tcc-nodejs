import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { db } from '../db/prismaDb';
import { NotFoundError } from '../errors/not-found-error';
import { MailRouter } from '../services/mail';
import { EmailType } from '@prisma/client';
import { ProductUtils } from '../utils/productUtils';
import { toTitleCase } from '../utils/utils';
import { MailTemplateForOrderConfirmation } from '../mailTemplates/mail-templates';
import Handlebars from 'handlebars';
import fs from 'fs';
import * as path from 'path';

const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

router.post(
  '/api/orders/send-notification',
  [body('orderId').trim()],
  validateRequest,
  async (req: Request, res: Response): Promise<any> => {
    console.log('send-notification route hit');
    const body = req.body;
    console.log({ body });
    const { orderId } = req.body;

    const orderWithDetails = await db.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orderWithDetails) {
      console.error("Order doesn't exist: ", orderId);
      throw new NotFoundError();
    }
    const variants = await db.variant.findMany({
      where: {
        variantId: {
          in: orderWithDetails.orderItems.map((item: any) => item.variantId),
        },
      },
    });

    console.log('variants fetched: ', variants.length);

    //Sending Mail to User
    const orderConfirmationBodyForUser =
      MailTemplateForOrderConfirmation.orderConfirmationBodyForUser;
    const orderConfirmationTemplatePathForUser =
      MailTemplateForOrderConfirmation.orderConfirmationTemplatePathForUser;

    //Sending Mail to Admin
    const orderConfirmationBodyForAdmin =
      MailTemplateForOrderConfirmation.orderConfirmationBodyForAdmin;
    const orderConfirmationTemplatePathForAdmin =
      MailTemplateForOrderConfirmation.orderConfirmationTemplatePathForAdmin;

    //Sending Mail to Creator for his Order
    const orderConfirmationBodyForCreator =
      MailTemplateForOrderConfirmation.orderConfirmationBodyForCreator;
    const orderConfirmationTemplatePathForCreator =
      MailTemplateForOrderConfirmation.orderConfirmationTemplatePathForCreator;

    try {
      const __dirnameForUser = path.resolve();

      const filePathForUser = path.join(
        __dirnameForUser,
        orderConfirmationTemplatePathForUser
      );
      const sourceForUser = fs
        .readFileSync(filePathForUser, 'utf-8')
        .toString();
      const templateForUser = Handlebars.compile(sourceForUser);

      const filePathForAdmin = path.join(
        __dirnameForUser,
        orderConfirmationTemplatePathForAdmin
      );
      const sourceForAdmin = fs
        .readFileSync(filePathForAdmin, 'utf-8')
        .toString();
      const templateForAdmin = Handlebars.compile(sourceForAdmin);

      const filePathForCreator = path.join(
        __dirnameForUser,
        orderConfirmationTemplatePathForCreator
      );
      const sourceForCreator = fs
        .readFileSync(filePathForCreator, 'utf-8')
        .toString();
      const templateForCreator = Handlebars.compile(sourceForCreator);

      const items = orderWithDetails.orderItems.map((item: any) => {
        return {
          productName: ProductUtils.getProductTitleForVariant({
            variant: variants.find((v: any) => v.variantId === item.variantId)!,
            product: item.product,
          }),
          quantity: item.quantity,
          price: item.price,
        };
      });
      console.log('items in the order', items);
      const name = orderWithDetails.firstName;
      const totalAmount = orderWithDetails.totalAmount;
      const shippingAmount = orderWithDetails.shippingAmount;
      const discountAmount = orderWithDetails.discountAmount;
      const codAmount = orderWithDetails.codAmount;
      const gstAmount = orderWithDetails.gstAmount;
      const onlinePaymentDiscount = orderWithDetails.onlinePayDiscount;

      const orderConfirmationData = {
        customerName: toTitleCase(name),
        items: items,
        totalAmount: totalAmount,
        shippingAmount: shippingAmount,
        discountAmount: discountAmount,
        codAmount: codAmount,
        gstAmount: gstAmount,
        onlinePayDiscount: onlinePaymentDiscount,
      };

      console.log({ orderConfirmationData });

      const htmlToSendForUser = templateForUser(orderConfirmationData);
      MailRouter.sendMail({
        toEmail: orderWithDetails.email,
        subject: `Order #${orderWithDetails.orderNumber} Confirmed`,
        body: orderConfirmationBodyForUser,
        html: htmlToSendForUser,
        emailType: EmailType.CREATORORDERCONFIRMATION,
      });

      const htmlToSendForAdmin = templateForAdmin(orderConfirmationData);
      MailRouter.sendMail({
        toEmail: 'rshbhchauhan@gmail.com',
        subject: `Order #${orderWithDetails.orderNumber} Confirmed`,
        body: orderConfirmationBodyForAdmin,
        html: htmlToSendForAdmin,
        emailType: EmailType.CREATORORDERCONFIRMATION,
      });

      // const htmlToSendForCreator = templateForCreator(orderConfirmationData);
      // MailRouter.sendMail({
      //   toEmail: 'rshbhchauhan@gmail.com',
      //   subject: `Order #${orderWithDetails.orderNumber} Confirmed`,
      //   body: orderConfirmationBodyForCreator,
      //   html: htmlToSendForCreator,
      //   emailType: EmailType.CREATORORDERCONFIRMATION,
      // });
    } catch (err) {
      console.error(err);
    }

    console.log('route completed');

    // throw new DatabaseConnectionError();
    return res.status(200);
  }
);

export { router as sendNotificationRouter };
