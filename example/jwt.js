import jwt from "jsonwebtoken";

jwt.sign({message: 'Hi from mike!'}, 'mylittlesecreatkey')