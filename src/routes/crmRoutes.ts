import {Request, Response} from 'express'

import { ContactController } from '../controllers/crmController'
import { NextFunction } from 'express-serve-static-core';


export class Routes {

  public contactController: ContactController = new ContactController();
  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request ok!'
        })
      })

    // Contact
    app.route('/contact')
      .get((req: Request, res: Response, next: NextFunction) => {
        console.log(`Request from : ${req.originalUrl}`)
        console.log(`Request from : ${req.method}`)

        if(req.query !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
          res.status(401).send('You shall not pass!')
        } else {
          next()
        }

      }, this.contactController.getContacts)
      .post(this.contactController.addNewContact)

    // Contact Detail
    app.route('/contact/:contactId')
      .get(this.contactController.getContactWithID)
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact)

  }
  
}