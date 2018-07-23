// import User from '../models/user';
import UserService from '../libs/UserService';
module.exports = (app, passport) => {

    app.get('/', async(req, res) => {
        res.render('index.ejs');
    })

    app.get('/api/getList', async(req,res) => {
        var list = ["item1", "item2", "item3"];
        res.json(list);
        console.log('Sent list of items');
    });

    app.get('/login', async(req, res) => {
        res.render('login.ejs', { message: req.flash('loginMessage')});
    })

    app.post('/login',
      passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
      })
    );

    app.get('/signup', async(req, res) => {
        res.render('signup.ejs', { message: ''})
    })

    app.post('/signup', async(req, res) => {
        const service = new UserService();
        const user = await service.findByEmail(req.body.email);
        if (user) {
            res.redirect('/signup?error=true')
        } else {
            await service.createUser(req.body.email, req.body.password);
        }

        res.redirect('/');
    })

    //other routes..
}
