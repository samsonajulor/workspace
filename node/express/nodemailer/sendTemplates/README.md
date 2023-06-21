
# Send email templates with Nodemailer + Handlebars

How to send an email template with Nodemailer + handlebars

Prerequisite:
- Nodejs (Installed)


Before running any of the following steps. Make sure you run `npm install` to install any dependencies needed for this project. 


#### Step 1
Create a file named `.env`, and copy everything inside the `.env-example` file to the `.env` file. Inside the *.env* file, fill in the information with your email and password. 



#### Step 2
We need to define our nodemailer transporter to connect to our service. Make sure you fill in with your credentials such as `email` and `password`.
```
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'abc@gmail.com', 
        pass: process.env.PASSWORD || '1234'
    }
});
```


#### Step 3
Register the `nodemailer-handlebars` plugins to nodemailer.

```
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));


```

#### Step 4
Define a `mailOptions` variable. It should contains information that your receiver should know about it. Make sure you specify the template you'd like to send under the `template` property inside mailoptions object. Use the context to send extra data to your templates. 

```
let mailOptions = {
    from: 'abc@gmail.com', 
    to: 'cba@gmail.com',
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    template: 'index',
    context: {
        name: 'Accime Esterling'
    }
};
```


#### Step 5
In order to send an email with nodemailer, we need to bring the transporter that we previously configured above, and invoke the `sendMail` function. If everything goes well, you should receive an email.
```
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});

```



Once you have successfully completed the above steps. Run `npm start` to send an email